import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Play, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import courseImg from '@/assets/course.jpg';

const Courses = () => {
  const [activeTab, setActiveTab] = useState<'free' | 'paid'>('free');
  const [currentIndex, setCurrentIndex] = useState(0);

  const freeCourses = [
    // { id: 1, title: 'مقدمة شاملة في HTML', image: courseImg },
    // { id: 2, title: 'تصميم وتنسيق الصفحات بـ CSS', image: courseImg },
    // { id: 3, title: 'أساسيات البرمجة مع JavaScript', image: courseImg },
  ];


  const paidCourses = [
    // { id: 4, title: 'برنامج احترافي متكامل', image: courseImg, price: '299' },
    // { id: 5, title: 'دورة متقدمة مع مشاريع تطبيقية', image: courseImg, price: '399' },
    // { id: 6, title: 'خطة تدريبية شاملة للوصول للاحتراف', image: courseImg, price: '599' },
  ];

  const currentCourses = activeTab === 'free' ? freeCourses : paidCourses;

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % currentCourses.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? currentCourses.length - 1 : prev - 1));
  };

  return (
    <motion.section
      className="section-padding bg-background-dark"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="container-custom relative">
        {/* Section Title */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl lg:text-5xl font-arabic-bold text-white mb-8 inline-block border-b-4 border-primary pb-6">
            الكورسات
          </h2>

          {/* Toggle Buttons */}
          <div className="flex justify-center space-x-2 gap-4 rtl:space-x-reverse">
            <button
              onClick={() => {
                setActiveTab('free');
                setCurrentIndex(0);
              }}
              className={`px-8 py-3 text-2xl rounded-lg font-arabic-medium transition-all duration-300 ${activeTab === 'free'
                ? 'bg-primary text-white shadow-medium'
                : 'bg-transparent border-2 border-primary text-primary hover:bg-primary/10'
                }`}
            >
              مجاني
            </button>
            <button
              onClick={() => {
                setActiveTab('paid');
                setCurrentIndex(0);
              }}
              className={`px-8 py-3 text-2xl rounded-lg font-arabic-medium transition-all duration-300 ${activeTab === 'paid'
                ? 'bg-primary text-white shadow-medium'
                : 'bg-transparent border-2 border-primary text-primary hover:bg-primary/10'
                }`}
            >
              مدفوع
            </button>
          </div>
        </motion.div>

        {/* Courses Grid */}
        <div className="relative">
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
              {/* Desktop Grid */}
              <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {currentCourses.map((course) => (
                  <motion.div
                    key={course.id}
                    className="card-dark bg-primary-card group hover:scale-105 transition-all duration-300 w-80 mx-auto"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
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

                    <div className="space-y-12 text-center">
                      <h3 className="text-xl font-arabic-semibold text-white group-hover:text-primary-light transition-colors">
                        {course.title}
                      </h3>

                      {activeTab === 'paid' && (course as any).price && (
                        <div className="flex items-center justify-center">
                          <span className="text-2xl font-arabic-bold text-primary-light">
                            ${(course as any).price}
                          </span>
                        </div>
                      )}

                      <Link
                        to={`/course/${course.id}`}
                        className="btn-primary text-center block w-48 mx-auto lg:text-2xl"
                      >
                        {activeTab === 'free' ? 'شاهد الآن' : 'اشترِ الكورس'}
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Mobile Slider */}
              <div className="md:hidden mb-12">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentCourses[currentIndex].id + activeTab}
                    className="card-dark bg-primary-card w-full group"
                    initial={{ opacity: 0, x: 80 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -80 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="relative overflow-hidden rounded-lg mb-6">
                      <img
                        src={currentCourses[currentIndex].image}
                        alt={currentCourses[currentIndex].title}
                        className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background-darkest/60 to-transparent"></div>
                      <div className="absolute top-4 left-4 bg-primary rounded-full p-2">
                        <Play className="w-4 h-4 text-white" />
                      </div>
                    </div>

                    <div className="space-y-12 text-center">
                      <h3 className="text-xl font-arabic-semibold text-white group-hover:text-primary-light transition-colors">
                        {currentCourses[currentIndex].title}
                      </h3>

                      {activeTab === 'paid' &&
                        (currentCourses[currentIndex] as any).price && (
                          <div className="flex items-center justify-center">
                            <span className="text-2xl font-arabic-bold text-primary-light">
                              ${(currentCourses[currentIndex] as any).price}
                            </span>
                          </div>
                        )}

                      <Link
                        to={`/course/${currentCourses[currentIndex].id}`}
                        className="btn-primary text-center block w-48 mx-auto"
                      >
                        {activeTab === 'free' ? 'شاهد الآن' : 'اشترِ الكورس'}
                      </Link>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Navigation Arrows */}
                <div className="flex justify-center gap-4 mt-6">
                  <button onClick={handleNext} className="btn-gradient">
                    <ChevronRight className="w-6 h-6" />
                  </button>
                  <button onClick={handlePrev} className="btn-gradient">
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </motion.section>
  );
};

export default Courses;
