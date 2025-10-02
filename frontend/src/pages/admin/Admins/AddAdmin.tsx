import { useState } from "react";
import { motion } from "framer-motion";
import { Save, XCircle, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";

import { useNavigate } from "react-router-dom";

const BASE_API = import.meta.env.VITE_BASE_API;


const AddAdmin = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [admin, setAdmin] = useState({
        name: "",
        phone: "",
        email: "",
        password: ""
    });


    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setAdmin({ ...admin, [name]: value });
    };
    const handleSubmit = async (e: any) => {
        e.preventDefault();

        if (!admin.name || !admin.phone || !admin.email || !admin.password) {
            toast.error("جميع الحقول مطلوبة!");
            return;
        }

        try {
            const res = await fetch(`${BASE_API}/admins`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(admin),
            });

            const data = await res.json();

            if (data.error) {
                toast.error(data.error);
            } else {
                toast.success("تم إضافة الأدمن بنجاح!");
                navigate("/admins");
            }
        } catch (error: any) {
            toast.error("حدث خطأ أثناء الإضافة");
            console.error(error);
        }
    };

    return (

        <div className="min-h-screen flex items-center justify-center p-4 w-full">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="card-dark bg-primary-card h-auto w-full lg:w-[40vw] mx-auto"
            >
                <h1 className="text-2xl font-arabic-bold text-primary mb-6 text-center">
                    إضافة أدمن جديد
                </h1>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* الاسم */}
                    <div>
                        <label className="block mb-2 font-arabic-medium text-primary text-xl">الاسم</label>
                        <input
                            type="text"
                            name="name"
                            value={admin.name}
                            onChange={handleChange}
                            placeholder="أدخل اسم الأدمن"
                            className="input-field w-full"
                            required
                        />
                    </div>

                    {/* Number */}
                    <div>
                        <label className="block mb-2 font-arabic-medium text-primary text-xl">رقم الهاتف</label>
                        <input
                            type="text"
                            name="phone"
                            value={admin.phone}
                            onChange={handleChange}
                            placeholder="أدخل رقم الهاتف"
                            className="input-field w-full"
                            required
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block mb-2 font-arabic-medium text-primary text-xl"> البريد الالكتروني</label>
                        <input
                            type="email"
                            name="email"
                            value={admin.email}
                            onChange={handleChange}
                            placeholder="أدخل  البريد الالكتروني"
                            className="input-field w-full"
                            required
                        />
                    </div>


                    <div className="relative">
                        <label className="block mb-2 font-arabic-medium text-primary text-xl">كلمة المرور</label>
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            value={admin.password}
                            onChange={handleChange}
                            placeholder="أدخل كلمة المرور"
                            className="input-field w-full "
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute top-[50px] left-3  text-gray-500"
                        >
                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                    </div>


                    {/* Buttons */}
                    <div className="flex justify-center flex-col lg:flex-row gap-4 pt-4">
                        <button type="submit" className="btn-primary flex items-center gap-2">
                            <Save className="w-5 h-5" /> حفظ
                        </button>
                        <button
                            type="button"
                            onClick={() => navigate("/admins")}
                            className="btn-outline text-white flex items-center gap-2"
                        >
                            <XCircle className="w-5 h-5" /> إلغاء
                        </button>
                    </div>
                </form>
            </motion.div>
        </div>

    );
};

export default AddAdmin;
