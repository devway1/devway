import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '@/assets/logo.png';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: 'الرئيسية', href: '/#hero', type: 'scroll' },
    { name: 'فريقنا', href: '/our-team', type: 'route' },
    { name: 'نبذة عنا', href: '/#about', type: 'scroll' },
    { name: 'لماذا تختارنا', href: '/#why-choose-us', type: 'scroll' },
    { name: 'بعض الآراء', href: '/#testimonials', type: 'scroll' },
  ];

  const renderNavItem = (item: typeof navItems[0]) => {
    if (item.type === 'route') {
      return (
        <Link
          key={item.name}
          to={item.href}
          className="block text-3xl font-semibold text-primary/70 hover:text-primary transition-colors duration-200"
          onClick={() => setIsMenuOpen(false)}
        >
          {item.name}
        </Link>
      );
    } else {
      return (
        <HashLink
          key={item.name}
          smooth
          to={item.href}
          className="block text-3xl font-semibold text-primary/70 hover:text-primary transition-colors duration-200"
          onClick={() => setIsMenuOpen(false)}
        >
          {item.name}
        </HashLink>
      );
    }
  };

  return (
    <nav className="p-4 sticky top-0 z-50 border-b border-primary/20 backdrop-blur">
      <div className="lg:container-custom flex items-center justify-between flex-row-reverse">

        {/* Logo */}
        <Link to="/" className="flex gap-2 items-center">
          <img src={logo} alt="DevWay Logo" className="rounded-[100px] h-16 lg:h-24" />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-12 rtl:space-x-reverse rounded-2xl border border-primary px-32 py-3">
          {navItems.map((item) => renderNavItem(item))}
        </div>

        {/* Login Button */}
        <div className="hidden md:block">
          <Link to="/login" className="btn-outline py-4 px-12 font-bold text-2xl">
            تسجيل دخول
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2 text-white hover:bg-primary/10 rounded-lg transition-colors"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              key="mobile-menu"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="md:hidden absolute top-full left-0 right-0 bg-primary-dark rounded-2xl shadow-lg p-6 border border-primary/20 overflow-hidden"
            >
              <div className="flex flex-col items-center space-y-4">
                {navItems.map((item) => renderNavItem(item))}

                <Link
                  to="/login"
                  className="btn-outline text-center py-4 px-16 mt-4"
                  onClick={() => setIsMenuOpen(false)}
                >
                  تسجيل الدخول
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </nav>
  );
};

export default Navbar;
