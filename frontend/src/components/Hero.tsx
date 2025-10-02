import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import heroStudent from "@/assets/hero-student.jpg";
import heroBg from "@/assets/hero-bg.jpg";

const Hero = () => {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center section-padding"
      style={{
        backgroundImage: `url(${heroBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-background-darkest/70"></div>

      <div className="relative z-10 container-custom">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="w-full order-1 lg:order-2 space-y-8 text-center lg:text-right"
          >
            <motion.h1
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="text-2xl lg:text-5xl font-arabic-bold text-white leading-loose"
            >
              <p className="pb-6">
                مرحبًا بك في <span className="text-primary">DevWay</span>, وجهتك الأولى
              </p>
              <p>
                لتعلم <span className="text-primary">البرمجة</span> وصناعة المستقبل الرقمي!
              </p>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="text-xl text-gray-300 leading-relaxed"
            >
              نوفر لك دورات عملية ومحتوى تعليمي حديث يساعدك على بناء مهاراتك وتطوير مسارك المهني بخطوات واثقة.
            </motion.p>


            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 1, type: "spring", stiffness: 120 }}
            >
              <Link
                to="/register"
                className="btn-primary inline-flex items-center lg:text-2xl px-24 lg:px-32 py-3"
              >
                اشترك الآن
              </Link>
            </motion.div>
          </motion.div>

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="order-1 lg:order-2 flex justify-center"
          >
            <div className="relative">
              {/* Shadow Animation */}
              <motion.div
                className="absolute -inset-4 bg-gradient-to-r from-primary to-primary-light rounded-full lg:rounded-2xl blur-lg opacity-40"
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.4, 0.7, 0.4],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              ></motion.div>

              <img
                src={heroStudent}
                alt="طالب يتعلم الشبكات وأمن المعلومات"
                className="relative rounded-full lg:rounded-2xl  w-80 h-80 lg:w-[600px] lg:h-auto object-cover border-4 border-primary-light shadow-lg"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
