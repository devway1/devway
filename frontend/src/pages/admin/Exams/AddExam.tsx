import { useState } from "react";
import { motion } from "framer-motion";
import { Save, XCircle } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const BASE_API = import.meta.env.VITE_BASE_API;

const AddExam = () => {

    const navigate = useNavigate();
    const [exam, setExam] = useState({
        title: "",
        gradePerQuestion: "",
        duration: "",
        startDate: "",
        endDate: "",
        status: "active", // "active" أو "inactive"
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setExam((prev) => ({ ...prev, [name]: value }));
    };
    const validate = () => {
        if (!exam.title.trim()) return "من فضلك أدخل عنوان الاختبار";
        if (!exam.gradePerQuestion || Number(exam.gradePerQuestion) <= 0)
            return "الدرجة لكل سؤال غير صالحة";
        if (!exam.duration || Number(exam.duration) <= 0)
            return "مدة الاختبار غير صالحة";
        if (!exam.startDate) return "اختر تاريخ بداية الاختبار";
        if (!exam.endDate) return "اختر تاريخ غلق الاختبار";
        if (new Date(exam.endDate) <= new Date(exam.startDate))
            return "تاريخ الغلق يجب أن يكون بعد تاريخ البداية";
        return null;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const error = validate();
        if (error) {
            toast.error(error);
            return;
        }

        try {
            const res = await fetch(`${BASE_API}/exams`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    title: exam.title,
                    mark_per_question: Number(exam.gradePerQuestion),
                    duration: Number(exam.duration),
                    start_time: exam.startDate,
                    end_time: exam.endDate,
                    status: exam.status === "active",
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                toast.error(data.error || "فشل إضافة الاختبار");
                return;
            }

            toast.success("✅ تم إضافة الاختبار بنجاح");
            navigate("/exams");
        } catch (err) {
            toast.error("⚠️ حدث خطأ في الاتصال بالسيرفر");
        }
    };

    return (

        <div className="container-custom section-padding mt-16 lg:mt-0">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl max-w-4xl mx-auto p-8"
            >
                <h1 className="text-3xl font-arabic-bold text-primary mb-10 text-center">
                    إضافة اختبار جديد
                </h1>

                <form onSubmit={handleSubmit} className="space-y-10">
                    {/* البيانات الأساسية */}
                    <div className="card-dark p-6 rounded-xl shadow-md">
                        <h2 className="font-arabic-bold text-lg mb-4 border-b pb-2">
                            البيانات الأساسية
                        </h2>
                        <div className="grid grid-cols-1  gap-6">

                            <div >
                                <label className="block mb-2 font-arabic-medium">
                                    عنوان الاختبار
                                </label>
                                <input
                                    type="text"
                                    name="title"
                                    value={exam.title}
                                    onChange={handleChange}
                                    className="input-field w-full"
                                    placeholder="اختبار تجريبي"
                                />
                            </div>

                            <div>
                                <label className="block mb-2 font-arabic-medium">
                                    الدرجة لكل سؤال
                                </label>
                                <input
                                    type="text"
                                    name="gradePerQuestion"
                                    value={exam.gradePerQuestion}
                                    onChange={handleChange}
                                    className="input-field w-full"
                                />
                            </div>

                            <div>
                                <label className="block mb-2 font-arabic-medium">
                                    مدة الاختبار (دقائق)
                                </label>
                                <input
                                    type="text"
                                    name="duration"
                                    value={exam.duration}
                                    onChange={handleChange}
                                    className="input-field w-full"
                                    placeholder="60"
                                />
                            </div>

                            <div>
                                <label className="block mb-2 font-arabic-medium">
                                    تاريخ البداية
                                </label>
                                <input
                                    type="datetime-local"
                                    name="startDate"
                                    value={exam.startDate}
                                    onChange={handleChange}
                                    className="input-field w-full bg-primary-foreground/20"
                                />
                            </div>

                            <div>
                                <label className="block mb-2 font-arabic-medium">
                                    تاريخ الغلق
                                </label>
                                <input
                                    type="datetime-local"
                                    name="endDate"
                                    value={exam.endDate}
                                    onChange={handleChange}
                                    className="input-field w-full bg-primary-foreground/20"
                                />
                            </div>
                        </div>
                    </div>

                    {/* الحالة */}
                    <div className="card-dark p-6 rounded-xl shadow-md">
                        <h2 className="font-arabic-bold text-lg mb-4 border-b pb-2">الحالة</h2>
                        <div className="flex gap-6">
                            <label className="inline-flex items-center gap-2 cursor-pointer">
                                <input
                                    type="radio"
                                    name="status"
                                    value="active"
                                    checked={exam.status === "active"}
                                    onChange={handleChange}
                                    className="accent-green-600 w-5 h-5"
                                />
                                <span className="text-xl font-bold text-green-600">مفعل</span>
                            </label>
                            <label className="inline-flex items-center gap-2 cursor-pointer">
                                <input
                                    type="radio"
                                    name="status"
                                    value="inactive"
                                    checked={exam.status === "inactive"}
                                    onChange={handleChange}
                                    className="accent-red-600 w-5 h-5"
                                />
                                <span className="text-xl font-bold text-red-600">غير مفعل</span>
                            </label>
                        </div>
                    </div>

                    {/* الأزرار */}
                    <div className="flex justify-center gap-6 pt-4">
                        <button
                            type="submit"
                            className="btn-primary flex items-center gap-2 text-lg px-6 py-3 rounded-xl"
                        >
                            <Save className="w-5 h-5" /> حفظ الاختبار
                        </button>
                        <button
                            type="button"
                            onClick={() => navigate("/exams")}
                            className="btn-outline flex items-center gap-2 text-lg px-6 py-3 rounded-xl"
                        >
                            <XCircle className="w-5 h-5" /> إلغاء
                        </button>
                    </div>
                </form>
            </motion.div>
        </div>

    );
};

export default AddExam;
