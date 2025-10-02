import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Edit, XCircle, PlusCircle } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { useParams, Link } from "react-router-dom";

const BASE_API = import.meta.env.VITE_BASE_API;


const ExamQuestions = () => {
    const { examId } = useParams();
    const [questions, setQuestions] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const res = await fetch(`${BASE_API}/exams/${examId}/questions`);
                const data = await res.json();
                if (Array.isArray(data)) {
                    setQuestions(data);
                } else {
                    toast.error("حدث خطأ أثناء تحميل الأسئلة");
                }
            } catch (err) {
                toast.error("خطأ في الاتصال بالسيرفر");
            } finally {
                setLoading(false);
            }
        };

        fetchQuestions();
    }, [examId]);

    const handleDelete = async (id: string) => {
        try {
            const res = await fetch(`${BASE_API}/questions/${id}`, {
                method: "DELETE",
            });
            const data = await res.json();

            if (res.ok) {
                toast.success("تم حذف السؤال");
                setQuestions((prev) => prev.filter((q) => q.id !== id));
            } else {
                toast.error(data.error || "فشل الحذف");
            }
        } catch (err) {
            toast.error("خطأ في الاتصال بالسيرفر");
        }
    };

    return (

        <div className="container-custom section-padding p-16 mt-16 lg:mt-0">
            {/* Header */}
            <div className="flex justify-between flex-col lg:flex-row items-center mb-6">
                <h1 className="text-3xl font-arabic-bold mb-6 text-white text-right">
                    أسئلة الاختبار
                </h1>
                <Link to={`/exams/${examId}/questions/add-question`} >
                    <Button className="bg-primary text-white flex items-center gap-2 lg:text-xl lg:p-6">
                        <PlusCircle className="w-5 h-5" /> إضافة سؤال
                    </Button>
                </Link>
            </div>

            {/* Table */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="card-dark bg-primary-card max-w-7xl mx-auto"
            >
                {/* Desktop Table */}
                <div className="hidden md:block overflow-x-auto">
                    <table className="w-full text-center border-collapse">
                        <thead>
                            <tr className="bg-primary text-white">

                                <th className="p-3">#</th>
                                <th className="p-3">السؤال</th>
                                <th className="p-3">الاختيارات</th>
                                <th className="p-3">الإجابة الصحيحة</th>
                                <th className="p-3">الإجراءات</th>
                            </tr>
                        </thead>
                        <tbody>
                            {questions.map((q, i) => (
                                <tr key={q.id} className="border-b border-gray-300 hover:bg-gray-100/10 transition text-white">
                                    <td className="p-3 font-bold">{i + 1}</td>
                                    <td className="p-3">{q.content}</td>
                                    <td className="p-3">{[q.option_a, q.option_b, q.option_c, q.option_d].join(" , ")}</td>
                                    <td className="p-3 text-green-500 font-bold">{q.correct_option}</td>
                                    <td className="p-3 flex justify-center gap-2 flex-wrap">
                                        <Link to={`/exams/${examId}/questions/${q.id}/edit-question`} state={q}>
                                            <Button className="bg-[#FFA500] text-black flex items-center gap-2 hover:text-white">
                                                <Edit className="w-4 h-4" /> تعديل
                                            </Button>
                                        </Link>
                                        <Button
                                            onClick={() => handleDelete(q.id)}
                                            className="bg-[#C30005] text-white flex items-center gap-2"
                                        >
                                            <XCircle className="w-4 h-4" /> حذف
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                            {questions.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="p-6 text-gray-400">
                                        لا يوجد أسئلة حاليا
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Mobile Cards */}
                <div className="md:hidden grid gap-4">
                    {questions.map((q, i) => {
                        const options = [q.option_a, q.option_b, q.option_c, q.option_d].filter(Boolean);

                        return (
                            <div
                                key={q.id}
                                className="bg-gray-800 border border-gray-700 rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow"
                            >
                                {/* Header */}
                                <div className="flex justify-between items-center mb-3">
                                    <span className="font-bold text-white text-lg">سؤال {i + 1}</span>
                                </div>

                                {/* نص السؤال */}
                                <p className="text-white font-semibold mb-3">{q.content}</p>

                                {/* الاختيارات */}
                                <div className="mb-3">
                                    <p className="text-gray-300 font-medium mb-1">📌 الاختيارات:</p>
                                    <ul className="list-disc list-inside text-gray-200 space-y-1">
                                        {options.length > 0 ? (
                                            options.map((opt, idx) => (
                                                <li key={idx}>{opt}</li>
                                            ))
                                        ) : (
                                            <li className="text-gray-400">لا يوجد اختيارات</li>
                                        )}
                                    </ul>
                                </div>

                                {/* الإجابة الصحيحة */}
                                <div className="mb-3">
                                    <p className="text-green-400 font-semibold flex items-center gap-1">
                                        ✅ الإجابة الصحيحة: <span className="font-bold">{q.correct_option}</span>
                                    </p>
                                </div>

                                {/* الأزرار */}
                                <div className="flex gap-2 mt-2">
                                    <Link to={`/exams/${examId}/questions/${q.id}/edit-question`} className="flex-1">
                                        <Button className="bg-[#FFA500] text-black w-full flex items-center justify-center gap-2 hover:text-white transition">
                                            <Edit className="w-4 h-4" /> تعديل
                                        </Button>
                                    </Link>
                                    <Button
                                        onClick={() => handleDelete(q.id)}
                                        className="bg-[#C30005] text-white flex-1 flex items-center justify-center gap-2 transition"
                                    >
                                        <XCircle className="w-4 h-4" /> حذف
                                    </Button>
                                </div>
                            </div>
                        );
                    })}

                    {questions.length === 0 && (
                        <p className="text-gray-400 text-center py-6">لا يوجد أسئلة حاليا</p>
                    )}
                </div>


            </motion.div>
        </div>
    );
};

export default ExamQuestions;
