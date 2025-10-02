import { useState } from "react";
import { motion } from "framer-motion";
import { Save, XCircle, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { useNavigate, useLocation } from "react-router-dom";

const BASE_API = import.meta.env.VITE_BASE_API;

const EditAdmin = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const adminState = location.state?.admin;

    const [admin, setAdmin] = useState({
        name: adminState?.name || "",
        phone: adminState?.phone || "",
        email: adminState?.email || "",
        password: "",
    });

    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setAdmin({ ...admin, [name]: value });
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        if (!admin.name || !admin.phone || !admin.email) {
            toast.error("الاسم، رقم الهاتف والبريد الإلكتروني مطلوبة!");
            return;
        }

        try {
            const res = await fetch(`${BASE_API}/admins/${adminState.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(admin),
            });

            const data = await res.json();
            if (data.error) {
                toast.error(data.error);
            } else {
                toast.success("تم تعديل بيانات الأدمن بنجاح!");
                navigate("/admins");
            }
        } catch (error: any) {
            toast.error("حدث خطأ أثناء التعديل");
            console.error(error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 w-full">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="card-dark bg-primary-card w-full lg:w-[40vw] mx-auto"
            >
                <h1 className="text-2xl font-arabic-bold text-primary mb-6 text-center">
                    تعديل بيانات الأدمن
                </h1>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* الاسم */}
                    <div>
                        <label className="block mb-2 font-arabic-medium text-primary-light">الاسم</label>
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

                    {/* الرقم */}
                    <div>
                        <label className="block mb-2 font-arabic-medium text-primary-light">رقم الهاتف</label>
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

                    {/* البريد الإلكتروني */}
                    <div>
                        <label className="block mb-2 font-arabic-medium text-primary-light">البريد الإلكتروني</label>
                        <input
                            type="email"
                            name="email"
                            value={admin.email}
                            onChange={handleChange}
                            placeholder="أدخل البريد الإلكتروني"
                            className="input-field w-full"
                            required
                        />
                    </div>

                    {/* كلمة المرور */}
                    <div className="relative">
                        <label className="block mb-2 font-arabic-medium text-primary-light">كلمة المرور</label>
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            value={admin.password}
                            onChange={handleChange}
                            placeholder="أدخل كلمة المرور (اختياري)"
                            className="input-field w-full pr-10"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute top-[50px] left-4 text-gray-500"
                        >
                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-center gap-4 pt-4 flex-col lg:flex-row">
                        <button type="submit" className="btn-primary flex items-center gap-2">
                            <Save className="w-5 h-5" /> حفظ
                        </button>
                        <button
                            type="button"
                            onClick={() => navigate("/admins")}
                            className="btn-outline flex items-center gap-2 text-white"
                        >
                            <XCircle className="w-5 h-5" /> إلغاء
                        </button>
                    </div>
                </form>
            </motion.div>
        </div>
    );
};

export default EditAdmin;
