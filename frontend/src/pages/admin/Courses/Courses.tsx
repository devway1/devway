import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Play, Eye, Trash2, Plus, Edit, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import courseImg from "@/assets/course.jpg";

const Courses = () => {
    const courses = [
        // { id: 1, title: "كورس T216A - أساسيات الشبكات", image: courseImg },
        // { id: 2, title: "كورس T216B - إدارة الشبكات ", image: courseImg },
        // { id: 3, title: "كورس T316 - أمن المعلومات", image: courseImg },
    ];

    const [currentPage, setCurrentPage] = useState(1);
    const coursesPerPage = 3;
    const totalPages = Math.ceil(courses.length / coursesPerPage);

    const indexOfLastCourse = currentPage * coursesPerPage;
    const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
    const currentCourses = courses.slice(indexOfFirstCourse, indexOfLastCourse);

    const goToPage = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    return (
        <div className="p-8 lg:p-16">
            {/* Title + Add Course Button */}
            <div className="flex flex-col md:flex-row gap-8 items-center justify-center md:justify-between mb-12">
                <h1 className="text-3xl font-bold text-white">الكورسات</h1>
                <Link to="/courses/add-course">
                    <Button className="flex items-center gap-2 bg-primary text-white hover:bg-primary/90 rounded-lg px-6 py-2">
                        <Plus className="w-4 h-4" />
                        إضافة كورس
                    </Button>
                </Link>
            </div>

            {/* لو مفيش كورسات */}
            {currentCourses.length === 0 ? (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col items-center justify-center py-24"
                >
                    <AlertCircle className="w-16 h-16 text-primary mb-6" />
                    <h3 className="text-2xl lg:text-4xl font-arabic-bold text-white mb-4">
                        لا توجد كورسات متاحة حاليًا
                    </h3>
                    <p className="text-gray-300 text-lg text-center max-w-md">
                        نحن نعمل على إضافة المزيد من الكورسات قريبًا، تابعنا لتكون أول من يستفيد من المحتوى الجديد!
                    </p>
                </motion.div>
            ) : (
                <>
                    {/* Courses Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12 w-full">
                        {currentCourses.map((course, i) => (
                            <motion.div
                                key={course.id}
                                className="card-dark bg-primary-card group hover:scale-105 transition-all duration-300 w-full md:w-96 "
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: i * 0.2 }}
                                whileHover={{ scale: 1.05 }}
                            >
                                <div className="relative overflow-hidden rounded-lg mb-6">
                                    <img
                                        src={course.image}
                                        alt={course.title}
                                        className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-background-darkest/60 to-transparent"></div>
                                    <div className="absolute top-4 left-4 bg-primary rounded-full p-2">
                                        <Play className="w-4 h-4 text-white" />
                                    </div>
                                </div>

                                <div className="space-y-6 text-center p-4">
                                    <h3 className="text-xl font-arabic-semibold text-white group-hover:text-primary-light transition-colors">
                                        {course.title}
                                    </h3>

                                    <div className="flex items-center justify-center gap-2 ">
                                        <Link
                                            to={`/courses/${course.id}/lectures`}
                                            className="flex items-center justify-center gap-2 bg-primary text-white hover:bg-primary/90 rounded-lg px-4 py-2"
                                        >
                                            اطلاع
                                            <Eye className="w-4 h-4" />
                                        </Link>
                                        <Link
                                            to={`/courses/${course.id}/edit-course`}
                                            className="flex items-center justify-center gap-2 bg-[#FFA600] text-white hover:bg-primary/90 rounded-lg px-4 py-2"
                                        >
                                            تعديل
                                            <Edit className="w-4 h-4" />
                                        </Link>
                                        <Button
                                            variant="destructive"
                                            className="flex items-center justify-center gap-2 rounded-lg px-4 py-2"
                                        >
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
                            onClick={() => goToPage(currentPage - 1)}
                            disabled={currentPage === 1}
                        >
                            <ChevronRight className="h-4 w-4" />
                        </Button>

                        {Array.from({ length: totalPages }, (_, i) => (
                            <Button
                                key={i + 1}
                                className={`w-10 h-10 rounded-full ${currentPage === i + 1 ? "bg-primary text-white" : "bg-white text-primary-dark"
                                    }`}
                                onClick={() => goToPage(i + 1)}
                            >
                                {i + 1}
                            </Button>
                        ))}

                        <Button
                            variant="outline"
                            size="icon"
                            className="w-10 h-10 rounded-full bg-white text-primary-dark border-0"
                            onClick={() => goToPage(currentPage + 1)}
                            disabled={currentPage === totalPages}
                        >
                            <ChevronLeft className="h-4 w-4" />
                        </Button>
                    </div>
                </>
            )}
        </div>
    );
};

export default Courses;
