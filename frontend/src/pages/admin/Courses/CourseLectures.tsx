import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import AdminLayout from '@/components/AdminLayout';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Play, Edit, Trash2, Plus } from 'lucide-react';
import { motion } from 'framer-motion';
import courseImg from "@/assets/course.jpg";

const CourseLectures = () => {
    const { courseId } = useParams();
    const [currentPage, setCurrentPage] = useState(1);
    const lecturesPerPage = 3;

    const lectures = [
        { id: 1, title: 'مقدمة في الشبكات', duration: '15:30', unlocked: true },
        { id: 2, title: 'أنواع الشبكات', duration: '20:15', unlocked: true },
        { id: 3, title: 'بروتوكولات الشبكات', duration: '18:45', unlocked: true },
        { id: 4, title: 'أساسيات TCP/IP', duration: '25:20', unlocked: false },
        { id: 5, title: 'أمن الشبكات', duration: '22:10', unlocked: true },
        { id: 6, title: 'الشبكات اللاسلكية', duration: '19:40', unlocked: true },
    ];

    const totalPages = Math.ceil(lectures.length / lecturesPerPage);
    const startIndex = (currentPage - 1) * lecturesPerPage;
    const currentLectures = lectures.slice(startIndex, startIndex + lecturesPerPage);

    return (
        <div className="p-8 lg:p-16">
            {/* Title + Add Lecture Button */}
            <div className="flex flex-col md:flex-row items-center justify-between mt-16 lg:mt-0 mb-12">
                <h1 className="text-xl md:text-3xl font-bold text-white mb-4 md:mb-0">كورس T216A - أساسيات الشبكات</h1>
                <Link to={`/courses/${courseId}/add-lecture`}>
                    <Button className="flex items-center gap-2 bg-primary text-white hover:bg-primary/90 rounded-lg px-6 py-2">
                        <Plus className="w-4 h-4" />
                        إضافة محاضرة
                    </Button>
                </Link>
            </div>

            {/* Lectures Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {currentLectures.map((lecture, i) => (
                    <motion.div
                        key={lecture.id}
                        className={`card-dark bg-primary-card group hover:scale-105 transition-all duration-300 md:w-96 ${!lecture.unlocked ? 'opacity-60 pointer-events-none' : ''}`}
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: i * 0.2 }}
                        whileHover={{ scale: 1.05 }}
                    >
                        <div className="relative overflow-hidden rounded-lg mb-6">
                            <img
                                src={courseImg}
                                alt={lecture.title}
                                className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-background-darkest/60 to-transparent"></div>

                            {/* Icon top-left */}
                            <div className="absolute top-4 left-4 bg-primary rounded-full p-2">
                                <Play className="w-5 h-5 text-white" />
                            </div>

                            <div className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full text-sm font-bold bg-white text-primary-dark">
                                {startIndex + i + 1}
                            </div>
                        </div>

                        <div className="space-y-4 text-center p-4">
                            <h3 className="text-xl font-arabic-semibold text-white group-hover:text-primary-light transition-colors">
                                {lecture.title}
                            </h3>
                            <p className="text-white/70 text-sm">{lecture.duration}</p>

                            {/* Action Buttons */}
                            <div className="flex items-center justify-center gap-4">
                                <Link to={`/courses/${courseId}/lectures/${lecture.id}/edit-lecture`}>
                                    <Button className="flex items-center gap-2 bg-[orange] text-primary-dark hover:bg-primary/90 hover:text-white rounded-lg px-4 py-2">
                                        تعديل
                                        <Edit className="w-4 h-4" />
                                    </Button>
                                </Link>
                                <Button variant="destructive" className="flex items-center gap-2 rounded-lg px-4 py-2">
                                    حذف
                                    <Trash2 className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-center gap-2">
                <Button
                    variant="outline"
                    size="icon"
                    className="w-10 h-10 rounded-full bg-white text-primary-dark border-0"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                >
                    <ChevronLeft className="h-4 w-4" />
                </Button>

                {Array.from({ length: totalPages }, (_, i) => (
                    <Button
                        key={i}
                        className={`w-10 h-10 rounded-full ${currentPage === i + 1 ? 'bg-primary text-white' : 'bg-white text-primary-dark border-0'}`}
                        onClick={() => setCurrentPage(i + 1)}
                    >
                        {i + 1}
                    </Button>
                ))}

                <Button
                    variant="outline"
                    size="icon"
                    className="w-10 h-10 rounded-full bg-white text-primary-dark border-0"
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                >
                    <ChevronRight className="h-4 w-4" />
                </Button>
            </div>
        </div >
    );
};

export default CourseLectures;
