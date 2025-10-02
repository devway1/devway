import { Facebook, Instagram, Linkedin } from 'lucide-react';
import { BsWhatsapp } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import footerBg from '@/assets/footer-bg.jpg';
import logo from '@/assets/logo.png';

const Footer = () => {
  const links = [
    { name: 'نبذة', href: '#about' },
    { name: 'لماذا تختارنا', href: '#why-choose-us' },
    { name: 'الكورسات', href: '#courses' },
    { name: 'الآراء', href: '#testimonials' },
  ];

  const socialIcons = [
    { icon: Facebook, href: 'https://www.facebook.com/share/19eereAJcG/', name: 'Facebook' },
    { icon: Instagram, href: 'https://www.instagram.com/_ahmed__magdi_?igsh=MXZ3ZTdidmI3NjhsMg==', name: 'Instagram' },
    { icon: Linkedin, href: 'www.linkedin.com/in/ahmed-magdy-023536240', name: 'Linkedin' },
    { icon: BsWhatsapp, href: 'https://wa.me/+201127346022', name: 'WhatsApp' },
  ];

  // Animation Variants
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2, duration: 0.6, ease: "easeOut" },
    }),
  };

  return (
    <footer
      className="relative bg-background-darkest text-white"
      style={{
        backgroundImage: `url(${footerBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-background-darkest/90"></div>

      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="section-padding border-b border-primary/20">
          <div className="container-custom">
            <div className="grid lg:grid-cols-3 gap-12 text-center lg:text-right">
              {/* Social Media */}
              <motion.div
                className="flex flex-col justify-evenly items-center order-3 lg:order-1"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={0}
              >
                <h3 className="text-xl font-arabic-semibold text-primary-light mb-4">
                  اتصل بنا
                </h3>
                <div className="flex space-x-4" dir='ltr'>
                  {socialIcons.map((social, i) => (
                    <motion.a
                      key={social.name}
                      href={social.href}
                      className="group"
                      aria-label={social.name}
                      variants={fadeUp}
                      custom={i + 1}
                    >
                      <div className="p-3 bg-gradient-to-br from-primary to-primary-light rounded-full hover:scale-110 transition-all duration-300 shadow-medium hover:shadow-large">
                        <social.icon className="w-5 h-5 text-primary-card" />
                      </div>
                    </motion.a>
                  ))}
                </div>
              </motion.div>

              {/* Quick Links */}
              <motion.div
                className="lg:border-r lg:border-white/20 lg:pr-12 flex justify-center  order-2 lg:order-2 "
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={1}
              >
                <ul className="space-y-4" >
                  {links.map((link, i) => (
                    <motion.li key={link.name} variants={fadeUp} custom={i + 2} >
                      <a
                        href={link.href}
                        className="text-gray-300 hover:text-primary-light transition-colors duration-300 flex items-center group "
                      >
                        <span className="ml-10 w-3 h-3 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                        {link.name}
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>

              {/* Contact Info + Logo */}
              <motion.div
                className="lg:border-r lg:border-white/20 lg:pr-12 flex flex-col items-center text-center  space-y-6 order-1 lg:order-3"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={2}
              >
                <Link to="/" className="inline-block">
                  <img src={logo} alt="ITR Education" className="rounded-full h-16 w-auto" />
                </Link>
                <p className="text-gray-300 leading-relaxed max-w-sm">
                  DevWay منصة تعليمية متخصصة في تقديم أفضل الدورات لتعلم البرمجة والتقنيات الحديثة.
                  نحن ملتزمون بتقديم تعليم عالي الجودة يواكب أحدث التطورات في عالم التكنولوجيا.
                </p>

              </motion.div>
            </div>

          </div>
        </div>

        {/* Bottom Footer */}
        <motion.div
          className="py-6 mb-6 lg:mb-0"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          custom={3}
        >
          <div className="container-custom">
            <div className="flex flex-col justify-center items-center space-y-4 md:space-y-0">
              <p className="text-gray-400 text-center md:text-right" dir="rtl">
                جميع الحقوق محفوظة © 2025 DevWay
              </p>
              <p className="text-gray-400 text-center md:text-right" dir="rtl">
                تصميم وتطوير بواسطة&nbsp;
                <strong>
                  <a
                    className="text-primary-light font-bold"
                    href="https://wa.me/+201127346022"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Ahmed Magdy 👨‍💻
                  </a>
                </strong>
              </p>
            </div>

          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
