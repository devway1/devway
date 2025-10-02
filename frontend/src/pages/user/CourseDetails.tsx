import { useParams } from 'react-router-dom';
import DashboardLayout from '@/components/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Play, BookOpen, CircleDollarSign } from 'lucide-react';
import { motion } from 'framer-motion';
import courseT216A from "@/assets/course.jpg";

const CourseDetails = () => {
  const { courseId } = useParams();

  const courseData = {
    title: 'كورس T216A - أساسيات الشبكات',
    description:
      'كورس شامل في أساسيات الشبكات يغطي جميع المفاهيم الأساسية المطلوبة للطلاب في الجامعة العربية المفتوحة. يتضمن الكورس شرحاً مفصلاً لأنواع الشبكات، البروتوكولات، وكيفية إعداد وإدارة الشبكات.',
    image: courseT216A,
    price: 299,
    lectures: 12,
  };

  return (

    <div className="relative min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-12">


      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col lg:flex-row-reverse w-full max-w-5xl p-4 lg:p-24"
      >

        {/* الصورة */}
        <div className="lg:w-1/2 h-56 sm:h-72 lg:h-auto">
          <img
            src={courseData.image}
            alt={courseData.title}
            className="w-full h-full object-cover lg:rounded-lg"
          />
        </div>

        {/* التفاصيل */}
        <div className="w-full lg:w-1/2 p-6 sm:p-8 flex flex-col justify-between">
          <div>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
              {courseData.title}
            </h1>

            <p className="text-gray-700 mb-6 leading-relaxed text-sm sm:text-base">
              {courseData.description}
            </p>

            {/* تفاصيل تحت الوصف */}
            <div className="flex flex-wrap items-center gap-6 mb-6">
              <div className="flex items-center gap-2 text-gray-800">
                <BookOpen className="h-5 w-5 text-primary" />
                <span>{courseData.lectures} محاضرة</span>
              </div>
              <div className="flex items-center gap-2 text-gray-800 font-semibold">
                <CircleDollarSign className="h-5 w-5 text-green-600" />
                <span>{courseData.price} ريال</span>
              </div>
            </div>
          </div>

          {/* زر الشراء */}
          <Button className="w-full bg-primary text-white hover:bg-primary/90 h-11 sm:h-12 text-base sm:text-lg mt-4">
            <Play className="h-5 w-5 ml-2" />
            شراء الكورس الآن
          </Button>
        </div>



      </motion.div>
    </div>
  );
};

export default CourseDetails;
