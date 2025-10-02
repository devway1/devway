import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Edit, XCircle, Plus, ChevronLeft, ChevronRight } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const BASE_API = import.meta.env.VITE_BASE_API;

const Admins = () => {
    const [admins, setAdmins] = useState<any[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3;

    // Fetch admins from API
    const fetchAdmins = async () => {
        try {
            const res = await fetch(`${BASE_API}/admins`);
            const data = await res.json();
            if (data.error) {
                toast.error(data.error);
            } else {
                setAdmins(data.admins.map((admin: any) => ({
                    id: admin.id,
                    name: admin.name,
                    phone: admin.phone,
                    email: admin.email,
                    date: new Date(admin.created_at).toISOString().split('T')[0]
                })));
            }
        } catch (err) {
            toast.error("حدث خطأ أثناء جلب الأدمن");
        }
    };

    useEffect(() => {
        fetchAdmins();
    }, []);

    const handleDelete = async (id: number) => {
        try {
            const res = await fetch(`${BASE_API}/admins/${id}`, { method: "DELETE" });
            const data = await res.json();
            if (data.error) {
                toast.error(data.error);
            } else {
                toast.success(data.message);
                setAdmins((prev) => prev.filter((admin) => admin.id !== id));
            }
        } catch (err) {
            toast.error("حدث خطأ أثناء الحذف");
        }
    };

    const totalPages = Math.ceil(admins.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentAdmins = admins.slice(startIndex, startIndex + itemsPerPage);

    const goToPage = (page: number) => {
        if (page < 1 || page > totalPages) return;
        setCurrentPage(page);
    };

    return (
        <div className="container-custom section-padding p-8 mt-16 lg:mt-0">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-arabic-bold text-white text-right">الأدمن</h1>
                <Link to="/admins/add-admin">
                    <Button className="bg-primary text-white flex items-center gap-2">
                        <Plus className="w-5 h-5" /> إضافة أدمن
                    </Button>
                </Link>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="card-dark bg-primary-card max-w-6xl mx-auto"
            >
                {/* Desktop Table */}
                <div className="hidden md:block overflow-x-auto">
                    <table className="w-full text-center border-collapse">
                        <thead>
                            <tr className="bg-primary text-white">
                                <th className="p-3">#</th>
                                <th className="p-3">الاسم</th>
                                <th className="p-3">الرقم</th>
                                <th className="p-3">الايميل</th>
                                <th className="p-3">تاريخ التسجيل</th>
                                <th className="p-3">الإجراءات</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentAdmins.map((admin, index) => (
                                <tr
                                    key={admin.id}
                                    className="border-b border-gray-300 hover:bg-gray-100/10 transition text-white"
                                >
                                    <td className="p-3">{startIndex + index + 1}</td>
                                    <td className="p-3">{admin.name}</td>
                                    <td className="p-3">{admin.phone}</td>
                                    <td className="p-3">{admin.email}</td>
                                    <td className="p-3">{admin.date}</td>
                                    <td className="p-3 flex justify-center gap-2">
                                        <Link
                                            to={`/admins/${admin.id}/edit-admin`}
                                            state={{ admin }}
                                        >
                                            <Button className="bg-[#FFA500] text-black flex items-center gap-2 hover:text-white">
                                                <Edit className="w-5 h-5" /> تعديل
                                            </Button>
                                        </Link>
                                        <Button
                                            onClick={() => handleDelete(admin.id)}
                                            className="bg-[#C30005] text-white flex items-center gap-2"
                                        >
                                            <XCircle className="w-5 h-5" /> حذف
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                            {currentAdmins.length === 0 && (
                                <tr>
                                    <td colSpan={6} className="p-6 text-gray-400">
                                        لا يوجد أدمن حاليا
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Mobile Cards */}
                <div className="md:hidden space-y-4">
                    {currentAdmins.map((admin, index) => (
                        <div
                            key={admin.id}
                            className="border border-gray-700 rounded-xl p-4 bg-gray-900 text-white"
                        >
                            <div className="flex justify-between mb-2">
                                <span className="font-bold text-white">#{startIndex + index + 1}</span>
                                <span className="text-sm text-gray-400">{admin.date}</span>
                            </div>
                            <p className="mb-1">👤 {admin.name}</p>
                            <p className="mb-3">📞 {admin.phone}</p>
                            <div className="flex gap-2">
                                <Link
                                    to={`/admins/${admin.id}/edit-admin`}
                                    state={{ admin }}
                                    className="flex-1"
                                >
                                    <Button className="bg-[#FFA500] text-black w-full">
                                        <Edit className="w-4 h-4 mr-1" /> تعديل
                                    </Button>
                                </Link>
                                <Button
                                    onClick={() => handleDelete(admin.id)}
                                    className="bg-[#C30005] text-white flex-1"
                                >
                                    <XCircle className="w-4 h-4 mr-1" /> حذف
                                </Button>
                            </div>
                        </div>
                    ))}
                    {currentAdmins.length === 0 && (
                        <p className="text-gray-400 text-center">لا يوجد أدمن حاليا</p>
                    )}
                </div>
            </motion.div>

            {/* Pagination */}
            <div className="flex items-center justify-center gap-2 mt-6">
                <Button
                    variant="outline"
                    size="icon"
                    className="w-10 h-10 rounded-full bg-white text-primary-dark border-0"
                    onClick={() => goToPage(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    <ChevronLeft className="h-4 w-4" />
                </Button>

                {Array.from({ length: totalPages }, (_, i) => (
                    <Button
                        key={i}
                        className={`w-10 h-10 rounded-full ${currentPage === i + 1 ? "bg-primary text-white" : "bg-white text-primary-dark"}`}
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
                    disabled={currentPage === totalPages}
                >
                    <ChevronRight className="h-4 w-4" />
                </Button>
            </div>
        </div>
    );
};

export default Admins;
