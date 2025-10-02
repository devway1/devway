import DashboardLayout from '@/components/DashboardLayout';
import { Card } from '@/components/ui/card';
import { BookOpen, ShoppingCart, Eye, Play, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import courseImg from "@/assets/course.jpg";
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const stats = [
    { title: 'عدد كورسات المنصة', value: '0', icon: BookOpen },
    { title: 'عدد الكورسات التي تمتلكها', value: '0', icon: ShoppingCart },
    { title: 'عدد الكورسات التي شاهدتها', value: '0', icon: Eye },
  ];

  const latestCourses: any[] = [];

  return (
    <div className="p-8 lg:p-16 mt-24 lg:mt-0">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
          >
            <Card className="bg-white text-center shadow-lg rounded-2xl p-6 hover:scale-105 transition-all duration-300">
              <div className="flex flex-col items-center justify-center space-y-6">
                <stat.icon className="w-12 h-12 text-primary-dark" />
                <h3 className="font-bold text-lg text-primary-dark">{stat.title}</h3>
                <div className="text-5xl font-extrabold text-primary-dark">{stat.value}</div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      <hr
        className="border-t-4 mt-6 mb-12 mx-auto w-[50vw]"
        style={{ borderColor: "#040B1D" }}
      />

      {/* Latest Courses */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-3xl lg:text-4xl font-bold text-white mb-12 text-center border-b-4 border-primary pb-4 inline-block">
          الكورسات المضافة حديثاً:
        </h2>

        {latestCourses.length === 0 ? (
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {latestCourses.map((course, i) => (
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

                  <div className="flex items-center justify-center">
                    <span className="text-2xl font-arabic-bold text-primary-light">
                      ${course.price}
                    </span>
                  </div>

                  <Link
                    to={`/course/${course.id}`}
                    className="flex gap-8 btn-primary btn-outline bg-white text-primary-dark font-bold lg:text-xl text-center w-48 mx-auto hover:text-white"
                  >
                    شراء الآن
                    <ShoppingCart className="w-6 h-6 text-primary-dark hover:text-white" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Dashboard;
