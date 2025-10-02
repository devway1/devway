import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import logo from '@/assets/logo.png';
import loginHero from "@/assets/login-bg.png";
import { useAuth } from '@/context/AuthContext';

const BASE_API = import.meta.env.VITE_BASE_API;

const AdminLogin = () => {
    const { login } = useAuth();
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({ email: '', password: '' });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch(`${BASE_API}/admin-login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (data.error) {
                toast.error(data.error);
                return;
            }

            toast.success("تم تسجيل الدخول بنجاح!");

            // تسجيل الدخول عبر context
            login({ id: data.admin.id, email: data.admin.email, name: data.admin.name, role: "admin" });

        } catch (err) {
            console.error("Admin login failed:", err);
            toast.error("فشل تسجيل الدخول. حاول مرة اخرى.");
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const formVariants = {
        hidden: { opacity: 0, x: 50 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
    };

    return (
        <div className="min-h-screen bg-background-dark flex flex-col lg:flex-row relative">
            <motion.div
                className="hidden lg:flex flex-1 items-center justify-center p-8 bg-cover bg-center"
                style={{ backgroundImage: `url(${loginHero})` }}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1, transition: { duration: 1 } }}
            />
            <motion.div
                className="flex-1 flex items-center justify-center px-6 py-12"
                initial="hidden"
                animate="visible"
                variants={formVariants}
            >
                <div className="w-full max-w-md space-y-8">
                    <Link to="/" className="flex justify-center">
                        <img src={logo} alt="ITR Education" className="h-16 rounded-[100px] mb-8 lg:absolute left-10 top-10" />
                    </Link>

                    <div className="text-center">
                        <h1 className="text-3xl font-arabic-bold text-white mb-2 border-b-4 border-primary inline-block pb-6">
                            تسجيل دخول الأدمن
                        </h1>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-white font-arabic-medium mb-2">البريد الالكتروني</label>
                            <div className="relative">
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    placeholder="سجل ايميلك"
                                    className="input-field w-full pr-12 text-white bg-white/20 placeholder:text-white"
                                    required
                                />
                                <Mail className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            </div>
                        </div>

                        <div>
                            <label className="block text-white font-arabic-medium mb-2">كلمة المرور</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    placeholder="أدخل كلمة المرور"
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

                        <motion.button
                            type="submit"
                            className="w-full lg:text-2xl font-bold bg-white text-background-darker hover:bg-transparent hover:btn-outline font-arabic-semibold py-2 px-6 rounded-lg transition-all duration-300 hover:scale-105"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            تسجيل الدخول
                        </motion.button>
                    </form>
                </div>
            </motion.div>
        </div>
    );
};

export default AdminLogin;
