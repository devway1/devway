import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, User, Phone } from 'lucide-react';
import { motion } from 'framer-motion';
import logo from '@/assets/logo.png';
import loginHero from "@/assets/login-bg.png";
import { toast } from 'sonner';

const BASE_API = import.meta.env.VITE_BASE_API;

const Register = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("كلمات المرور غير متطابقة");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${BASE_API}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          full_name: formData.full_name,
          email: formData.email,
          password: formData.password,
          confirm_password: formData.confirmPassword,
          phone: formData.phone,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("تم إنشاء الحساب بنجاح");
        setFormData({
          full_name: '',
          email: '',
          password: '',
          confirmPassword: '',
          phone: '',
        });
        navigate("/login");
      } else {
        toast.error(data.error || "فشل في إنشاء الحساب");
      }
    } catch (err) {
      console.error(err);
      toast.error("حدث خطأ غير متوقع");
    } finally {
      setLoading(false);
    }
  };

  const formVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
  };

  return (
    <div className="min-h-screen bg-background-dark flex flex-col lg:flex-row">
      <div
        className="hidden lg:flex flex-1 items-center justify-center p-8 bg-cover bg-center"
        style={{ backgroundImage: `url(${loginHero})` }}
      />
      <motion.div
        className="flex-1 flex items-center justify-center px-6 py-12"
        initial="hidden"
        animate="visible"
        variants={formVariants}
      >
        <div className="w-full max-w-md space-y-8">
          <Link to="/">
            <img
              src={logo}
              alt="ITR Education"
              className="rounded-[100px] h-16 mx-auto mb-8 lg:absolute left-10 top-10"
            />
          </Link>

          <div className="text-center relative">
            <h1 className="text-3xl font-arabic-bold text-white mb-2 border-b-4 border-primary inline-block pb-4">
              اشتراك
            </h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Field */}
            <div>
              <label className="block text-white font-arabic-medium mb-2">
                الاسم الكامل
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="full_name"
                  value={formData.full_name}
                  onChange={handleInputChange}
                  placeholder="أدخل اسمك الكامل"
                  className="input-field w-full pr-12 pl-12 text-white bg-white/20 placeholder:text-white"
                  required
                />
                <User className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-white font-arabic-medium mb-2">
                البريد الالكتروني
              </label>
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="سجل ايميلك"
                  className="input-field w-full pr-12 pl-12 text-white bg-white/20 placeholder:text-white"
                  required
                />
                <Mail className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              </div>
            </div>

            {/* Phone Field */}
            <div>
              <label className="block text-white font-arabic-medium mb-2">
                رقم الهاتف
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="أدخل رقم هاتفك"
                  className="input-field w-full pr-12 pl-12 text-white bg-white/20 placeholder:text-white"
                  required
                />
                <Phone className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-white font-arabic-medium mb-2">
                كلمة المرور
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="أدخل كلمة مرور قوية"
                  className="input-field w-full pr-12 pl-12 text-white bg-white/20 placeholder:text-white"
                  required
                />
                <Lock className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-primary transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Confirm Password Field */}
            <div>
              <label className="block text-white font-arabic-medium mb-2">
                تأكيد كلمة المرور
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="أعد إدخال كلمة المرور"
                  className="input-field w-full pr-12 pl-12 text-white bg-white/20 placeholder:text-white"
                  required
                />
                <Lock className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-primary transition-colors"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Register Button */}
            <motion.button
              type="submit"
              className="lg:text-2xl font-bold w-full bg-white text-background-darker hover:btn-outline hover:bg-gray-100 font-arabic-semibold py-3 px-6 rounded-lg transition-all duration-300 hover:scale-105"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={loading}
            >
              {loading ? 'جارٍ التسجيل...' : 'اشتراك'}
            </motion.button>

            {/* Login Link */}
            <div className="text-center mt-4">
              <span className="text-gray-500 lg:text-xl"> هل لديك حساب بالفعل؟ </span>
              <Link
                to="/login"
                className="lg:text-xl underline text-primary hover:text-primary-light transition-colors font-arabic-medium"
              >
                تسجيل دخول
              </Link>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
