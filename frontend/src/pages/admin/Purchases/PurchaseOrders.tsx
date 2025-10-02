import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle, XCircle, ChevronLeft, ChevronRight } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import AcceptDialog from "@/components/AcceptDialog";

const PurchaseOrders = () => {
    const [orders, setOrders] = useState([
        // { id: 1, name: "أحمد مجدي", phone: "01127346022", date: "2025-08-24", courseName: "React Basics" },
        // { id: 2, name: "احمد رفعت", phone: "01127346022", date: "2025-08-23", courseName: "JavaScript Advanced" },
        // { id: 3, name: "محمد حجاج", phone: "01127346022", date: "2025-08-22", courseName: "Node.js API" },
    ]);

    const [dialogOpen, setDialogOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState<number | null>(null);

    const handleOpenDialog = (id: number) => {
        setSelectedOrder(id);
        setDialogOpen(true);
    };

    const handleConfirmDialog = (dates: { startDate: string; endDate: string }) => {
        toast.success(`تم تحديد مواعيد الكورس: من ${dates.startDate} إلى ${dates.endDate}`);
        setOrders((prev) => prev.filter((order) => order.id !== selectedOrder));
        setSelectedOrder(null);
    };

    const handleDelete = (id: number) => {
        toast.error("تم حذف الطلب ");
        setOrders((prev) => prev.filter((order) => order.id !== id));
    };

    return (

        <div className="container-custom section-padding p-8 mt-16 lg:mt-0 ">
            <h1 className="text-2xl font-arabic-bold text-white pt-8 mb-6 text-right">
                طلبات الشراء
            </h1>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="card-dark bg-primary-card max-w-6xl mx-auto"
            >
                {/* Table for Desktop */}
                <div className="hidden md:block overflow-x-auto">
                    <table className="w-full text-center border-collapse ">
                        <thead>
                            <tr className="bg-primary text-white">
                                <th className="p-3">#</th>
                                <th className="p-3">الاسم</th>
                                <th className="p-3">الرقم</th>
                                <th className="p-3">اسم الكورس</th>
                                <th className="p-3">تاريخ الطلب</th>
                                <th className="p-3">الإجراءات</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order, index) => (
                                <tr
                                    key={order.id}
                                    className="border-b border-gray-300 hover:bg-gray-100/10 transition text-white"
                                >
                                    <td className="p-3">{index + 1}</td>
                                    <td className="p-3">{order.name}</td>
                                    <td className="p-3">{order.phone}</td>
                                    <td className="p-3">{order.courseName}</td>
                                    <td className="p-3">{order.date}</td>
                                    <td className="p-3 flex justify-center gap-3">
                                        <Button
                                            onClick={() => handleOpenDialog(order.id)}
                                            className="bg-[#00E632] text-black font-bold flex items-center gap-2 hover:text-white"
                                        >
                                            <CheckCircle className="w-5 h-5" /> قبول
                                        </Button>
                                        <Button
                                            onClick={() => handleDelete(order.id)}
                                            className="bg-[#C30005] text-white font-bold flex items-center gap-2"
                                        >
                                            <XCircle className="w-5 h-5" /> حذف
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                            {orders.length === 0 && (
                                <tr>
                                    <td colSpan={6} className="p-6 text-gray-400">
                                        لا توجد طلبات شراء حالياً
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Cards for Mobile */}
                <div className="md:hidden space-y-4">
                    {orders.map((order, index) => (
                        <div
                            key={order.id}
                            className="border border-gray-700 rounded-xl p-4 bg-gray-900 text-white"
                        >
                            <div className="flex justify-between mb-2">
                                <span className="font-bold text-white">#{index + 1}</span>
                                <span className="text-sm text-gray-400">{order.date}</span>
                            </div>
                            <p className="mb-1">👤 {order.name}</p>
                            <p className="mb-1">📞 {order.phone}</p>
                            <p className="mb-3">📘 {order.courseName}</p>
                            <div className="flex gap-2">
                                <Button
                                    onClick={() => handleOpenDialog(order.id)}
                                    className="bg-[#00E632] text-black flex-1 "
                                >
                                    <CheckCircle className="w-4 h-4 mr-1" /> قبول
                                </Button>
                                <Button
                                    onClick={() => handleDelete(order.id)}
                                    className="bg-[#C30005] text-white flex-1"
                                >
                                    <XCircle className="w-4 h-4 mr-1" /> حذف
                                </Button>
                            </div>
                        </div>
                    ))}
                    {orders.length === 0 && (
                        <p className="text-gray-400 text-center">لا توجد طلبات شراء حالياً</p>
                    )}
                </div>
            </motion.div>

            {/* Custom Dialog */}
            <AcceptDialog
                open={dialogOpen}
                onClose={() => setDialogOpen(false)}
                onConfirm={handleConfirmDialog}
            />
        </div>

    );
};

export default PurchaseOrders;
