import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { XCircle, PlusCircle } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const BASE_API = import.meta.env.VITE_BASE_API;

const Attachments = () => {
    const navigate = useNavigate();
    const [attachments, setAttachments] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    // جلب البيانات
    useEffect(() => {
        const fetchAttachments = async () => {
            try {
                const res = await fetch(`${BASE_API}/attachments`);
                const data = await res.json();
                if (res.ok) {
                    setAttachments(data.attachments);
                } else {
                    toast.error(data.error || "حدث خطأ أثناء جلب المرفقات");
                }
            } catch (err) {
                toast.error("فشل الاتصال بالسيرفر");
            } finally {
                setLoading(false);
            }
        };
        fetchAttachments();
    }, []);

    // حذف مرفق
    const handleDelete = async (id: string) => {
        if (!window.confirm("هل أنت متأكد من حذف هذا المرفق؟")) return;
        try {
            const res = await fetch(`${BASE_API}/attachments/${id}`, {
                method: "DELETE",
            });
            const data = await res.json();

            if (res.ok) {
                toast.success("تم حذف المرفق");
                setAttachments((prev) => prev.filter((att) => att.id !== id));
            } else {
                toast.error(data.error || "فشل حذف المرفق");
            }
        } catch (err) {
            toast.error("مشكلة في السيرفر");
        }
    };

    if (loading) {
        return (
            <div className="p-16 text-center text-white">⏳ جاري تحميل المرفقات...</div>
        );
    }

    return (
        <div className="container-custom section-padding p-16 mt-16 lg:mt-0">
            {/* Header */}
            <div className="flex justify-between flex-col lg:flex-row items-center mb-6">
                <h1 className="text-3xl font-arabic-bold mb-6 text-white text-right">
                    المرفقات
                </h1>
                <Button 
                onClick={() => navigate("/attachments/add-attachment")}
                className="bg-primary text-white flex items-center gap-2 lg:text-xl lg:p-6">
                    <PlusCircle className="w-5 h-5" /> إضافة مرفق
                </Button>
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
                                <th className="p-3">رقم السيشن</th>
                                <th className="p-3">الفئة</th>
                                <th className="p-3">العنوان</th>
                                <th className="p-3">الوصف</th>
                                <th className="p-3">رابط الملف</th>
                                <th className="p-3">تاريخ الإضافة</th>
                                <th className="p-3">الإجراءات</th>
                            </tr>
                        </thead>
                        <tbody>
                            {attachments.map((att, index) => (
                                <tr
                                    key={att.id}
                                    className="border-b border-gray-300 hover:bg-gray-100/10 transition text-white"
                                >
                                    <td className="p-3">{index + 1}</td>
                                    <td className="p-3">{att.sessionNumber}</td>
                                    <td className="p-3">{att.category}</td>
                                    <td className="p-3">{att.title}</td>
                                    <td className="p-3">{att.description}</td>
                                    <td className="p-3">
                                        <a
                                            href={att.fileUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-400 underline break-all"
                                        >
                                            عرض الملف
                                        </a>
                                    </td>
                                    <td className="p-3">
                                        {new Date(att.created_at).toLocaleString("ar-EG", {
                                            dateStyle: "medium",
                                            timeStyle: "short",
                                        })}
                                    </td>
                                    <td className="p-3 flex justify-center gap-2 flex-wrap">
                                        <Button
                                            onClick={() => handleDelete(att.id)}
                                            className="bg-[#C30005] text-white flex items-center gap-2"
                                        >
                                            <XCircle className="w-5 h-5" /> حذف
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                            {attachments.length === 0 && (
                                <tr>
                                    <td colSpan={8} className="p-6 text-gray-400">
                                        لا يوجد مرفقات حاليا
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Mobile Cards */}
                <div className="md:hidden space-y-4">
                    {attachments.map((att) => (
                        <div
                            key={att.id}
                            className="border border-gray-700 rounded-xl p-4 bg-gray-900 text-white w-full"
                        >
                            <div className="flex justify-between mb-2">
                                <span className="font-bold">{att.sessionNumber}</span>
                            </div>
                            <p className="mb-1">📂 الفئة: {att.category}</p>
                            <p className="mb-1">📌 العنوان: {att.title}</p>
                            <p className="mb-1">📝 الوصف: {att.description}</p>
                            <p className="mb-1">
                                🔗 رابط الملف:{" "}
                                <a
                                    href={att.fileUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-400 underline break-all"
                                >
                                    عرض الملف
                                </a>
                            </p>
                            <p className="mb-3">
                                📅 تاريخ الإضافة:{" "}
                                {new Date(att.created_at).toLocaleString("ar-EG", {
                                    dateStyle: "medium",
                                    timeStyle: "short",
                                })}
                            </p>
                            <Button
                                onClick={() => handleDelete(att.id)}
                                className="bg-[#C30005] text-white w-full"
                            >
                                <XCircle className="w-5 h-5 mr-2" /> حذف
                            </Button>
                        </div>
                    ))}
                    {attachments.length === 0 && (
                        <p className="text-gray-400 text-center">لا يوجد مرفقات حاليا</p>
                    )}
                </div>
            </motion.div>
        </div>
    );
};

export default Attachments;
