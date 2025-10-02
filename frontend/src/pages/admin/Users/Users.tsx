import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { XCircle, ChevronLeft, ChevronRight } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

const BASE_API = import.meta.env.VITE_BASE_API; // ده لو عندك API داخلي

interface User {
    id: string;
    full_name: string;
    phone: string;
    email: string;
}

const Users = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    const totalPages = Math.ceil(users.length / itemsPerPage);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await fetch(`${BASE_API}/profiles`);
                const data = await res.json();

                if (data.error) {
                    toast.error("فشل تحميل المستخدمين");
                } else {
                    setUsers(data.profiles || []);
                }
            } catch (err) {
                toast.error("خطأ في الاتصال بالسيرفر");
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    const handleDelete = async (id: string) => {
        try {
            const res = await fetch(`${BASE_API}/profiles/${id}`, {
                method: "DELETE",
            });

            const data = await res.json();

            if (data.error) {
                toast.error("فشل حذف المستخدم ❌");
            } else {
                toast.success("تم حذف المستخدم بنجاح ✅");
                setUsers((prev) => prev.filter((user) => user.id !== id));
            }
        } catch (err) {
            toast.error("خطأ في الاتصال بالسيرفر ⚡");
        }
    };

    const paginatedUsers = users.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const goToPage = (page: number) => {
        if (page < 1 || page > totalPages) return;
        setCurrentPage(page);
    };

    if (loading) {
        return <p className="text-center text-white">جاري تحميل المستخدمين...</p>;
    }

    return (
        <div className="container-custom section-padding p-8 mt-16 lg:mt-0">
            <h1 className="text-2xl font-arabic-bold text-white pt-8 mb-6 text-right">
                المستخدمين
            </h1>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="card-dark bg-primary-card max-w-6xl mx-auto"
            >
                {/* Table for Desktop */}
                <div className="hidden md:block overflow-x-auto">
                    <table className="w-full text-center border-collapse">
                        <thead>
                            <tr className="bg-primary text-white">
                                <th className="p-3">#</th>
                                <th className="p-3">الاسم</th>
                                <th className="p-3">الرقم</th>
                                <th className="p-3">البريد الالكتروني</th>
                                <th className="p-3">الإجراءات</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedUsers.map((user, index) => (
                                <tr
                                    key={user.id}
                                    className="border-b border-gray-300 hover:bg-gray-100/10 transition text-white"
                                >
                                    <td className="p-3">
                                        {(currentPage - 1) * itemsPerPage + index + 1}
                                    </td>
                                    <td className="p-3">{user.full_name}</td>
                                    <td className="p-3">{user.phone || "—"}</td>
                                    <td className="p-3">{user.email || "—"}</td>

                                    <td className="p-3 flex justify-center">
                                        <Button
                                            onClick={() => handleDelete(user.id)}
                                            className="bg-[#C30005] text-white font-bold flex items-center gap-2"
                                        >
                                            <XCircle className="w-5 h-5" /> حذف
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                            {users.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="p-6 text-gray-400">
                                        لا يوجد مستخدمين حالياً
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Cards for Mobile */}
                <div className="md:hidden space-y-4">
                    {paginatedUsers.map((user, index) => (
                        <div
                            key={user.id}
                            className="border border-gray-700 rounded-xl p-4 bg-gray-900 text-white"
                        >
                            <div className="flex justify-between mb-2">
                                <span className="font-bold text-white">
                                    #{(currentPage - 1) * itemsPerPage + index + 1}
                                </span>

                            </div>
                            <p className="mb-1">👤 {user.full_name}</p>
                            <p className="mb-3">📞 {user.phone || "—"}</p>
                            <div className="flex gap-2">
                                <Button
                                    onClick={() => handleDelete(user.id)}
                                    className="bg-[#C30005] text-white flex-1"
                                >
                                    <XCircle className="w-4 h-4 mr-1" /> حذف
                                </Button>
                            </div>
                        </div>
                    ))}
                    {users.length === 0 && (
                        <p className="text-gray-400 text-center">لا يوجد مستخدمين حالياً</p>
                    )}
                </div>
            </motion.div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-6">
                    <Button
                        variant="outline"
                        size="icon"
                        className="w-10 h-10 rounded-full bg-white text-primary-dark border-0"
                        onClick={() => goToPage(currentPage - 1)}
                    >
                        <ChevronLeft className="h-4 w-4" />
                    </Button>
                    {Array.from({ length: totalPages }, (_, i) => (
                        <Button
                            key={i}
                            className={`w-10 h-10 rounded-full ${currentPage === i + 1
                                ? "bg-primary text-white"
                                : "bg-white text-primary-dark border-0"
                                }`}
                            onClick={() => goToPage(i + 1)}
                        >
                            {i + 1}
                        </Button>
                    ))}
                    <Button
                        variant="outline"
                        size="icon"
                        className="w-10 h-10 rounded-full bg-white text-primary-dark border-0"
                        onClick={() => goToPage(currentPage + 1)}
                    >
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                </div>
            )}
        </div>
    );
};

export default Users;
