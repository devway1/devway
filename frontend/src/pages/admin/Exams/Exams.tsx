import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Eye, Edit, XCircle, PlusCircle } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const BASE_API = import.meta.env.VITE_BASE_API;

const Exams = () => {
    const [exams, setExams] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchExams = async () => {
            try {
                const res = await fetch(`${BASE_API}/exams`);
                const data = await res.json();
                if (res.ok) {
                    setExams(data);
                } else {
                    toast.error(data.error || "حدث خطأ أثناء جلب الاختبارات");
                }
            } catch (err) {
                toast.error("فشل الاتصال بالسيرفر");
            } finally {
                setLoading(false);
            }
        };

        fetchExams();
    }, []);

    const handleDelete = async (id: number) => {
        try {
            const res = await fetch(`${BASE_API}/exams/${id}`, {
                method: "DELETE",
            });
            const data = await res.json();

            if (res.ok) {
                toast.error("تم حذف الاختبار");
                setExams((prev) => prev.filter((exam) => exam.id !== id));
            } else {
                toast.error(data.error || "فشل حذف الاختبار");
            }
        } catch (err) {
            toast.error("مشكلة في السيرفر");
        }
    };

    if (loading) {
        return (
            <div className="p-16 text-center text-white">
                ⏳ جاري تحميل الاختبارات...
            </div>
        );
    }

    return (
        <div className="container-custom section-padding p-16 mt-16 lg:mt-0">
            {/* Header */}
            <div className="flex justify-between flex-col lg:flex-row items-center mb-6">
                <h1 className="text-3xl font-arabic-bold mb-6 text-white text-right">
                    الاختبارات
                </h1>
                <Link to="/exams/add-exam">
                    <Button className="bg-primary text-white flex items-center gap-2 lg:text-xl lg:p-6">
                        <PlusCircle className="w-5 h-5" /> إضافة اختبار
                    </Button>
                </Link>
            </div>

            {/* Table */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="card-dark bg-primary-card lg:max-w-7xl mx-auto"
            >
                {/* Desktop Table */}
                <div className="hidden md:block overflow-x-auto">
                    <table className="w-full text-center border-collapse">
                        <thead>
                            <tr className="bg-primary text-white">
                                <th className="p-3">#</th>
                                <th className="p-3">العنوان</th>
                                <th className="p-3">الدرجة لكل سؤال</th>
                                <th className="p-3">المدة (دقائق)</th>
                                <th className="p-3">تاريخ البدأ</th>
                                <th className="p-3">تاريخ الغلق</th>
                                <th className="p-3">الحالة</th>
                                <th className="p-3">الإجراءات</th>
                            </tr>
                        </thead>
                        <tbody>
                            {exams.map((exam, index) => (
                                <tr
                                    key={exam.id}
                                    className="border-b border-gray-300 hover:bg-gray-100/10 transition text-white"
                                >
                                    <td className="p-3 ">{index + 1}</td>
                                    <Link to={`/exams/${exam.id}/questions`}
                                        state={exam}>
                                        <td className="p-3 border-b-2 border-[red]">{exam.title}</td>
                                    </Link>
                                    <td className="p-3">{exam.mark_per_question}</td>
                                    <td className="p-3">{exam.duration}</td>
                                    <td className="p-3">
                                        {new Date(exam.start_time).toLocaleString("ar-EG", {
                                            dateStyle: "medium",
                                            timeStyle: "short",
                                        })}
                                    </td>
                                    <td className="p-3">
                                        {new Date(exam.end_time).toLocaleString("ar-EG", {
                                            dateStyle: "medium",
                                            timeStyle: "short",
                                        })}
                                    </td>
                                    <td className="p-3">
                                        <div
                                            className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-semibold whitespace-nowrap ${exam.status ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                                                }`}
                                        >
                                            {exam.status ? (
                                                <svg
                                                    className="w-4 h-4 flex-shrink-0"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth={2}
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                                </svg>
                                            ) : (
                                                <svg
                                                    className="w-4 h-4 flex-shrink-0"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth={2}
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                            )}
                                            {exam.status ? "مفعل" : "غير مفعل"}
                                        </div>
                                    </td>


                                    <td className="p-3 flex justify-center gap-2 flex-wrap">
                                        <Link to={`/exams/${exam.id}/exam-details`}>
                                            <Button className="bg-blue-600 text-white flex items-center gap-2">
                                                <Eye className="w-5 h-5" /> عرض
                                            </Button>
                                        </Link>
                                        <Link to={`/exams/${exam.id}/questions/add-question`}>
                                            <Button className="bg-green-600 text-white flex items-center gap-2">
                                                <PlusCircle className="w-5 h-5" /> سؤال
                                            </Button>
                                        </Link>
                                        <Link to={`/exams/${exam.id}/edit-exam`} state={exam}>
                                            <Button className="bg-[#FFA500] text-black flex items-center gap-2 hover:text-white">
                                                <Edit className="w-5 h-5" /> تعديل
                                            </Button>
                                        </Link>
                                        <Button
                                            onClick={() => handleDelete(exam.id)}
                                            className="bg-[#C30005] text-white flex items-center gap-2"
                                        >
                                            <XCircle className="w-5 h-5" /> حذف
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                            {exams.length === 0 && (
                                <tr>
                                    <td colSpan={8} className="p-6 text-gray-400">
                                        لا يوجد اختبارات حاليا
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Mobile Cards */}
                <div className="md:hidden space-y-4">
                    {exams.map((exam) => (
                        <div
                            key={exam.id}
                            className="border border-gray-700 rounded-xl p-4 bg-gray-900 text-white w-full"
                        >
                            <div className="flex justify-between mb-2">
                                <span className="font-bold">{exam.code}</span>
                                <span
                                    className={`px-3 py-1 rounded-full text-xs ${exam.status === true
                                        ? "bg-green-600 text-white"
                                        : "bg-red-600 text-white"
                                        }`}
                                >
                                    {exam.status === true ? "مفعل" : "غير مفعل"}
                                </span>
                            </div>
                            <Link to={`/exams/${exam.id}/questions`}>
                                <p className="mb-2 pb-2 border-b-2 border-[red]">{exam.title}</p>
                            </Link>
                            <p className="mb-1">📝 الدرجة لكل سؤال: {exam.mark_per_question}</p>
                            <p className="mb-1">⏱️ المدة: {exam.duration} دقيقة</p>
                            <p className="mb-1">
                                📅 يبدأ:{" "}
                                {new Date(exam.start_time).toLocaleString("ar-EG", {
                                    dateStyle: "medium",
                                    timeStyle: "short",
                                })}
                            </p>
                            <p className="mb-3">
                                📅 ينتهي:{" "}
                                {new Date(exam.end_time).toLocaleString("ar-EG", {
                                    dateStyle: "medium",
                                    timeStyle: "short",
                                })}
                            </p>
                            <div className="flex flex-wrap gap-2">
                                <Link to={`/exams/${exam.id}/exam-details`} className="flex-1">
                                    <Button className="bg-blue-600 text-white w-full">
                                        <Eye className="w-4 h-4 mr-1" /> عرض
                                    </Button>
                                </Link>
                                <Link
                                    to={`/exams/${exam.id}/questions/add-question`}
                                    className="flex-1"
                                >
                                    <Button className="bg-green-600 text-white w-full">
                                        <PlusCircle className="w-4 h-4 mr-1" /> + سؤال
                                    </Button>
                                </Link>
                                <Link to={`/exams/${exam.id}/edit-exam`} state={exam} className="flex-1">
                                    <Button className="bg-[#FFA500] text-black w-full">
                                        <Edit className="w-4 h-4 mr-1" /> تعديل
                                    </Button>
                                </Link>
                                <Button
                                    onClick={() => handleDelete(exam.id)}
                                    className="bg-[#C30005] text-white flex-1"
                                >
                                    <XCircle className="w-4 h-4 mr-1" /> حذف
                                </Button>
                            </div>
                        </div>
                    ))}
                    {exams.length === 0 && (
                        <p className="text-gray-400 text-center">لا يوجد اختبارات حاليا</p>
                    )}
                </div>
            </motion.div>
        </div>
    );
};

export default Exams;
