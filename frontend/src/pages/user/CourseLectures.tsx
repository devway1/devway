import { useParams, Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Play, Lock, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import courseImg from "@/assets/course.jpg";

const CourseLectures = () => {
  const location = useLocation();
  const { title } = location.state || {};
  const { courseId } = useParams();

  const lectures = [
    { id: 1, title: 'مقدمة في HTML وبنية الصفحة', duration: '12:30', unlocked: true, watched: false },
    { id: 2, title: 'العناصر الأساسية والعناوين والفقرات', duration: '18:45', unlocked: true, watched: false },
    { id: 3, title: 'الروابط والصور', duration: '15:20', unlocked: true, watched: false },
    { id: 4, title: 'القوائم والجداول', duration: '20:10', unlocked: false, watched: false },
    { id: 5, title: 'النماذج (Forms) وعناصر الإدخال', duration: '22:40', unlocked: false, watched: false },
    { id: 6, title: 'الوسوم الدلالية (Semantic Tags)', duration: '17:55', unlocked: false, watched: false },
    { id: 7, title: 'إضافة الوسائط المتعددة (Audio & Video)', duration: '19:25', unlocked: false, watched: false },
    { id: 8, title: 'أفضل الممارسات وبنية المشاريع', duration: '21:15', unlocked: false, watched: false },
  ];

  // 👇 Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const lecturesPerPage = 6;

  const totalPages = Math.ceil(lectures.length / lecturesPerPage);

  const startIndex = (currentPage - 1) * lecturesPerPage;
  const currentLectures = lectures.slice(startIndex, startIndex + lecturesPerPage);

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  return (
    <div className="p-8 lg:p-16">
      {/* Title */}
      <div className="mb-12 text-center lg:text-right">
        <h1 className="text-3xl font-bold text-white mb-2">{title}</h1>
      </div>

      {/* Lectures Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {currentLectures.map((lecture, i) => (
          <motion.div
            key={lecture.id}
            className={`card-dark bg-primary-card group hover:scale-105 transition-all duration-300 md:w-96 ${!lecture.unlocked ? 'opacity-60 pointer-events-none' : ''
              }`}
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
                {lecture.unlocked ? (
                  lecture.watched ? (
                    <CheckCircle2 className="w-5 h-5 text-green-400" />
                  ) : (
                    <Play className="w-5 h-5 text-white" />
                  )
                ) : (
                  <Lock className="w-5 h-5 text-white/70" />
                )}
              </div>

              {/* Lecture Number top-right */}
              <div
                className={`absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full text-sm font-bold 
                  ${lecture.watched ? 'bg-green-500 text-white' : 'bg-white text-primary-dark'}`}
              >
                {lecture.id}
              </div>
            </div>

            <div className="space-y-4 text-center p-4">
              <h3 className="text-xl font-arabic-semibold text-white group-hover:text-primary-light transition-colors">
                {lecture.title}
              </h3>

              <p className="text-white/70 text-sm">{lecture.duration}</p>

              {lecture.unlocked && (
                <Link
                  to={`/course/${courseId}/lecture/${lecture.id}`}
                  className={`flex items-center justify-center gap-3 w-48 mx-auto font-bold lg:text-md rounded-lg px-4 py-2 transition-all
                      ${lecture.watched
                      ? 'bg-green-500 text-white hover:bg-green-600'
                      : 'bg-white text-primary-dark hover:bg-primary-dark hover:text-white'
                    }`}
                >
                  {lecture.watched ? 'إعادة المشاهدة' : 'مشاهدة'}
                  <Play className="w-4 h-4" />
                </Link>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-center gap-2">
        <Button
          onClick={handlePrev}
          disabled={currentPage === 1}
          variant="outline"
          size="icon"
          className="w-10 h-10 rounded-full bg-white text-primary-dark border-0 disabled:opacity-50"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>

        {[...Array(totalPages)].map((_, idx) => (
          <Button
            key={idx}
            onClick={() => setCurrentPage(idx + 1)}
            className={`w-10 h-10 rounded-full ${currentPage === idx + 1
              ? 'bg-primary text-white'
              : 'bg-white text-primary-dark'
              }`}
          >
            {idx + 1}
          </Button>
        ))}

        <Button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          variant="outline"
          size="icon"
          className="w-10 h-10 rounded-full bg-white text-primary-dark border-0 disabled:opacity-50"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default CourseLectures;
