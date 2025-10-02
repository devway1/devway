import DashboardLayout from '@/components/DashboardLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, ChevronLeft, ChevronRight, Play, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import courseImg from "@/assets/course.jpg";
import { Link } from 'react-router-dom';

const MyCourses = () => {

  const courses: { id: number; title: string; image: string; owned?: boolean }[] = [
    // { id: 1, title: 'مقدمة شاملة في HTML', image: courseImg },
    // { id: 2, title: 'تصميم وتنسيق الصفحات بـ CSS', image: courseImg },
    // { id: 3, title: 'أساسيات البرمجة مع JavaScript', image: courseImg },
  ];

  return (
    <div className="p-8 lg:p-16">
      {/* Title + Search */}
      <div className="flex flex-col md:flex-row gap-8 items-center justify-center md:justify-between mb-12">
        <h1 className="text-3xl font-bold text-white">كورساتي</h1>
        <div className="relative">
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-primary-dark h-4 w-4" />
          <Input
            placeholder="البحث في الكورسات..."
            className="pr-10 px-10 bg-white border-primary/20 text-primary-dark placeholder:text-primary-dark"
          />
        </div>
      </div>

      {/* Courses or Empty State */}
      {courses.length > 0 ? (
        <>
          {/* Courses Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {courses.map((course, i) => (
              <motion.div
                key={course.id}
                className="card-dark bg-primary-card group hover:scale-105 transition-all duration-300 md:w-96"
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

                  <Link
                    to={`/course/${course.id}/lectures`}
                    state={{ title: course.title }}
                    className={`flex items-center justify-center gap-3 btn-primary w-48 mx-auto font-bold lg:text-xl ${course.owned
                      ? 'bg-white text-primary-dark hover:bg-gray-100'
                      : 'bg-primary text-white hover:bg-primary/90'
                      }`}
                  >
                    مشاهدة
                    <Play />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-center gap-2">
            <Button variant="outline" size="icon" className="w-10 h-10 rounded-full bg-white text-primary-dark border-0">
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button className="w-10 h-10 rounded-full bg-primary text-white">1</Button>
            <Button variant="outline" className="w-10 h-10 rounded-full bg-white text-primary-dark border-0">2</Button>
            <Button variant="outline" className="w-10 h-10 rounded-full bg-white text-primary-dark border-0">3</Button>
            <Button variant="outline" size="icon" className="w-10 h-10 rounded-full bg-white text-primary-dark border-0">
              <ChevronLeft className="h-4 w-4" />
            </Button>
          </div>
        </>
      ) : (
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
      )}
    </div>
  );
};

export default MyCourses;
