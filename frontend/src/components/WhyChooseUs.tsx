import { BookOpen, Users, TrendingUp, Headphones } from "lucide-react";
import { motion } from "framer-motion";
import whyChooseUsImage from "@/assets/why-choose-us.jpg";

const WhyChooseUs = () => {
  const features = [
    {
      icon: BookOpen,
      title: "محتوى شامل ومتنوع",
      description:
        "مسارات تعليمية تغطي مختلف مجالات البرمجة والتقنية من البداية حتى الاحتراف.",
    },
    {
      icon: Users,
      title: "تعليم مناسب للجميع",
      description:
        "سواء كنت مبتدئًا أو مطورًا محترفًا، ستجد خطة تناسب مستواك وطموحك.",
    },
    {
      icon: TrendingUp,
      title: "مواكبة أحدث الاتجاهات",
      description:
        "محتوى محدث باستمرار ليغطي أحدث التقنيات والأدوات المطلوبة في سوق العمل.",
    },
    {
      icon: Headphones,
      title: "دعم وتوجيه مستمر",
      description:
        "فريقنا يقدم المساعدة والإرشاد لحل مشاكلك والإجابة على جميع أسئلتك.",
    },
  ];

  return (
    <section id="why-choose-us" className="section-padding bg-background-dark">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image with Title */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative flex flex-col justify-center items-center"
          >
            <img
              src={whyChooseUsImage}
              alt="فريق DevWay"
              className="w-32 h-52 object-cover rounded-xl shadow-lg"
            />

            {/* Centered Title */}
            <div className="flex items-center justify-center mt-4">
              <motion.h3
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-lg lg:text-2xl font-arabic-bold text-white px-6 py-3 rounded-lg border-b-4 border-primary text-center"
              >
                لماذا تختار DevWay؟
              </motion.h3>
            </div>
          </motion.div>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="grid sm:grid-cols-2 gap-8"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="card-gradient group p-6 text-center rounded-xl shadow-md"
              >
                <feature.icon className="w-10 h-10 text-primary mx-auto mb-4" />
                <p className="text-lg font-arabic-semibold text-white mb-3 group-hover:text-primary-light transition-colors">
                  {feature.title}
                </p>
                <p className="text-gray-300 text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
