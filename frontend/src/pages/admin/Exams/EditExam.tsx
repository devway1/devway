import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Save, XCircle } from "lucide-react";
import { toast } from "sonner";
import { useNavigate, useParams, useLocation } from "react-router-dom";

const BASE_API = import.meta.env.VITE_BASE_API;

const EditExam = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const examData = location.state;

    const [exam, setExam] = useState({
        title: "",
        mark_per_question: "",
        duration: "",
        start_time: "",
        end_time: "",
        status: true,
    });

    useEffect(() => {
        if (examData) {
            setExam({
                title: examData.title || "",
                mark_per_question: examData.mark_per_question?.toString() || "",
                duration: examData.duration?.toString() || "",
                start_time: examData.start_time
                    ? new Date(examData.start_time).toISOString().slice(0, 16) // ⬅️ التحويل لصيغة datetime-local
                    : "",
                end_time: examData.end_time
                    ? new Date(examData.end_time).toISOString().slice(0, 16)
                    : "",
                status: examData.status ?? true,
            });
        }
    }, [id, examData]);


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setExam((prev) => ({ ...prev, [name]: value }));
    };

    const validate = () => {

        if (!exam.title.trim()) return "من فضلك أدخل عنوان الاختبار";
        if (!exam.mark_per_question || Number(exam.mark_per_question) <= 0)
            return "الدرجة لكل سؤال غير صالحة";
        if (!exam.duration || Number(exam.duration) <= 0)
            return "مدة الاختبار غير صالحة";
        if (!exam.start_time) return "اختر تاريخ بداية الاختبار";
        if (!exam.end_time) return "اختر تاريخ غلق الاختبار";
        if (new Date(exam.end_time) <= new Date(exam.start_time))
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
            const res = await fetch(`${BASE_API}/exams/${examData.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    title: exam.title,
                    mark_per_question: Number(exam.mark_per_question),
                    duration: Number(exam.duration),
                    start_time: new Date(exam.start_time).toISOString(),
                    end_time: new Date(exam.end_time).toISOString(),
                    status: exam.status,
                }),
            });

            const data = await res.json();
            if (res.ok) {
                toast.success("تم تعديل الاختبار بنجاح");
                navigate("/exams");
            } else {
                toast.error(data.error || "فشل تعديل الاختبار");
            }
        } catch (err) {
            toast.error("مشكلة في السيرفر");
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
                    تعديل اختبار
                </h1>

                <form onSubmit={handleSubmit} className="space-y-10">
                    {/* البيانات الأساسية */}
                    <div className="card-dark p-6 rounded-xl shadow-md">
                        <h2 className="font-arabic-bold text-lg mb-4 border-b pb-2">البيانات الأساسية</h2>
                        <div className="grid grid-cols-1 gap-6">

                            <div>
                                <label className="block mb-2 font-arabic-medium">عنوان الاختبار</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={exam.title}
                                    onChange={handleChange}
                                    className="input-field w-full"
                                />
                            </div>


                            <div>
                                <label className="block mb-2 font-arabic-medium">الدرجة لكل سؤال</label>
                                <input
                                    type="number"
                                    name="mark_per_question"
                                    value={exam.mark_per_question}
                                    onChange={handleChange}
                                    className="input-field w-full"
                                />

                            </div>

                            <div>
                                <label className="block mb-2 font-arabic-medium">مدة الاختبار (دقائق)</label>
                                <input
                                    type="text"
                                    name="duration"
                                    value={exam.duration}
                                    onChange={handleChange}
                                    className="input-field w-full"
                                />
                            </div>

                            <div>
                                <label className="block mb-2 font-arabic-medium">تاريخ البداية</label>
                                <input
                                    type="datetime-local"
                                    name="start_time"
                                    value={exam.start_time}
                                    onChange={handleChange}
                                    className="input-field w-full"
                                />
                            </div>

                            <div>
                                <label className="block mb-2 font-arabic-medium">تاريخ الغلق</label>

                                <input
                                    type="datetime-local"
                                    name="end_time"
                                    value={exam.end_time}
                                    onChange={handleChange}
                                    className="input-field w-full"
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
                                    value="true"
                                    className="accent-green-600 w-5 h-5"
                                    checked={exam.status === true}
                                    onChange={() => setExam((prev) => ({ ...prev, status: true }))}
                                />
                                <span className="text-xl font-bold text-green-600">مفعل</span>
                            </label>
                            <label className="inline-flex items-center gap-2 cursor-pointer">
                                <input
                                    type="radio"
                                    name="status"
                                    value="false"
                                    className="accent-red-600 w-5 h-5"
                                    checked={exam.status === false}
                                    onChange={() => setExam((prev) => ({ ...prev, status: false }))}
                                />
                                <span className="text-xl font-bold text-red-600">غير مفعل</span>
                            </label>
                        </div>
                    </div>

                    {/* الأزرار */}
                    <div className="flex justify-center gap-6 pt-4">
                        <button
                            type="submit"
                            className="btn-primary flex items-center text-md px-3 py-2 gap-2 lg:text-lg lg:px-6 lg:py-3 rounded-xl"
                        >
                            <Save className="w-5 h-5" /> حفظ التعديلات
                        </button>
                        <button
                            type="button"
                            onClick={() => navigate("/exams")}
                            className="btn-outline flex items-center text-md px-3 py-2 gap-2 lg:text-lg lg:px-6 lg:py-3 rounded-xl"
                        >
                            <XCircle className="w-5 h-5" /> إلغاء
                        </button>
                    </div>
                </form>
            </motion.div>
        </div>

    );
};

export default EditExam;
