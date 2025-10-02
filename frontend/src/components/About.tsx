import { motion } from "framer-motion";
import aboutMain from "@/assets/about-main.jpg";
import aboutSmall1 from "@/assets/about-small1.jpg";
import aboutSmall2 from "@/assets/about-small2.jpg";

const About = () => {
  return (
    <section id="about" className="py-20 lg:py-32 bg-background-dark">
      <div className="container-custom">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12 lg:mb-16"
        >
          <h2 className="text-3xl lg:text-5xl font-arabic-bold text-white inline-block border-b-4 border-primary pb-4 lg:pb-6">
            نبذة عن DevWay
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="space-y-8 text-center lg:text-right"
          >
            <div className="space-y-6 text-center">
              <h3 className="text-xl lg:text-2xl font-arabic-semibold text-primary mb-6">
                منصتك المتكاملة لتعلم البرمجة والتقنية
              </h3>

              <p className="text-white leading-relaxed font-arabic-medium">
                في <span className="text-primary">DevWay</span> نؤمن أن التعلم رحلة، 
                لذلك نوفر محتوى تعليمي حديث، تمارين عملية، ومشاريع تطبيقية تساعدك 
                على الانتقال من المبتدئ إلى الاحتراف بخطوات ثابتة.
              </p>

              <hr
                className="border-t-4 mt-6 mb-6 mx-auto w-2/3 lg:w-96 lg:mx-auto"
                style={{ borderColor: "hsl(var(--primary))" }}
              />

              <div className="space-y-3">
                <h4 className="text-lg lg:text-xl font-arabic-semibold text-primary">
                  ماذا يميزنا؟
                </h4>
                <ul className="text-white space-y-2 font-arabic-medium">
                  <li>🚀 شروحات عملية مبسطة بخطوات واضحة</li>
                  <li>📚 محتوى يغطي أحدث التقنيات وأفضل الممارسات</li>
                  <li>💻 مشاريع تطبيقية لبناء خبرة عملية حقيقية</li>
                  <li>🌍 مجتمع داعم لتبادل المعرفة والخبرة</li>
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Images Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-6"
          >
            {/* Right Column - One Tall Image */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.4 }}
              className="relative overflow-hidden rounded-xl mt-24"
            >
              <img
                src={aboutMain}
                alt="قاعة تعليم البرمجة"
                className="w-80 h-full object-cover shadow-large"
              />
              <div className="absolute inset-0 from-background-darkest/60 to-transparent"></div>
            </motion.div>

            {/* Left Column - Two Small Images */}
            <div className="space-y-6 relative">
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.4 }}
                className="absolute left-0 lg:-top-32 lg:left-52 overflow-hidden rounded-xl"
              >
                <img
                  src={aboutSmall1}
                  alt="ورشة عمل برمجية"
                  className="w-40 h-40 lg:h-48 lg:w-48 object-cover shadow-medium"
                />
                <div className="absolute inset-0 from-background-darkest/60 to-transparent"></div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.4 }}
                className="overflow-hidden rounded-xl absolute -bottom-16 left-0 lg:-bottom-10 lg:left-72"
              >
                <img
                  src={aboutSmall2}
                  alt="مشروع برمجي جماعي"
                  className="w-40 h-40 lg:h-40 lg:w-40 object-cover shadow-medium"
                />
                <div className="absolute inset-0 from-background-darkest/60 to-transparent"></div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
