import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Upload, XCircle, Trash2, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useNavigate, useParams } from "react-router-dom";

const EditLecture = () => {
    const navigate = useNavigate();
    const { lectureId } = useParams();

    const [loading, setLoading] = useState(false);

    const [lecture, setLecture] = useState<{
        lectureTitle: string;
        lectureDescription: string;
        status: "active" | "inactive";
        courseId: string;
        resources: File[];
        lectureVideo?: File;
    }>({
        lectureTitle: "",
        lectureDescription: "",
        status: "active",
        courseId: "",
        resources: [],
        lectureVideo: undefined,
    });

    const courses = [
        { id: "1", name: "كورس الشبكات" },
        { id: "2", name: "كورس البرمجة" },
    ];

    useEffect(() => {
        // مثال لجلب بيانات المحاضرة حسب lectureId
        const fetchLecture = async () => {
            // هنا تضع استدعاء API الحقيقي
            const data = {
                lectureTitle: "مقدمة في الشبكات",
                lectureDescription: "وصف المحاضرة",
                status: "active",
                courseId: "1",
                resources: [],
                lectureVideo: undefined,
            };
            setLecture(data);
        };
        fetchLecture();
    }, [lectureId]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setLecture((prev) => ({ ...prev, [name]: value }));
    };

    const handleResourcesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files ? Array.from(e.target.files) : [];
        setLecture((prev) => ({ ...prev, resources: [...prev.resources, ...files] }));
    };

    const removeResourceAt = (idx: number) => {
        setLecture((prev) => ({
            ...prev,
            resources: prev.resources.filter((_, i) => i !== idx),
        }));
    };

    const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) setLecture((prev) => ({ ...prev, lectureVideo: file }));
    };

    const validate = () => {
        if (!lecture.lectureTitle.trim()) return "من فضلك أدخل عنوان المحاضرة";
        if (!lecture.courseId) return "من فضلك اختر الكورس";
        return null;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const error = validate();
        if (error) {
            toast.error(error);
            return;
        }
        setLoading(true);
        // هنا ضع استدعاء API التحديث الحقيقي
        setTimeout(() => {
            setLoading(false);
            toast.success("تم تحديث المحاضرة بنجاح!");
            navigate("/lectures");
        }, 2000);
    };

    return (
        <div className="container-custom section-padding mt-16 lg:mt-0">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl max-w-5xl mx-auto p-8"
            >
                <h1 className="text-3xl font-arabic-bold text-primary mb-10 text-center">
                    تعديل المحاضرة
                </h1>

                <form onSubmit={handleSubmit} className="space-y-10">
                    {/* Section: Basic Info */}
                    <div className="card-dark p-6 rounded-xl shadow-md w-full">
                        <h2 className="font-arabic-bold text-lg mb-4 border-b pb-2">
                            البيانات الأساسية
                        </h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block mb-2 font-arabic-medium">
                                    اسم المحاضرة
                                </label>
                                <input
                                    type="text"
                                    name="lectureTitle"
                                    value={lecture.lectureTitle}
                                    onChange={handleChange}
                                    className="input-field w-full"
                                    placeholder="أدخل اسم المحاضرة"
                                />
                            </div>

                        </div>
                    </div>
                    {/* Section: Status */}
                    <div className="card-dark p-6 rounded-xl shadow-md">
                        <h2 className="font-arabic-bold text-lg mb-4 border-b pb-2">
                            الحالة
                        </h2>
                        <div className="flex gap-6">
                            <label className="inline-flex items-center gap-2 cursor-pointer">
                                <input
                                    type="radio"
                                    name="status"
                                    value="active"
                                    checked={lecture.status === "active"}
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
                                    checked={lecture.status === "inactive"}
                                    onChange={handleChange}
                                    className="accent-red-600 w-5 h-5"
                                />
                                <span className="text-xl font-bold text-red-600">غير مفعل</span>
                            </label>
                        </div>
                    </div>

                    {/* Section: Description */}
                    <div className="card-dark p-6 rounded-xl shadow-md">
                        <h2 className="font-arabic-bold text-lg mb-4 border-b pb-2">
                            وصف المحاضرة
                        </h2>
                        <textarea
                            name="lectureDescription"
                            value={lecture.lectureDescription}
                            onChange={handleChange}
                            className="input-field w-full h-32 resize-none"
                            placeholder="أدخل وصفًا للمحاضرة"
                        />
                    </div>

                    {/* Section: Lecture Video */}
                    <div className="card-dark p-6 rounded-xl shadow-md mt-6">
                        <h2 className="font-arabic-bold text-lg mb-4 border-b pb-2">
                            فيديو المحاضرة
                        </h2>
                        <input
                            type="file"
                            accept="video/*"
                            name="lectureVideo"
                            onChange={handleVideoChange}
                            className="hidden"
                            id="videoUpload"
                        />
                        <label
                            htmlFor="videoUpload"
                            className="btn-outline cursor-pointer text-primary font-bold text-lg flex items-center gap-2 w-full"
                        >
                            <Upload className="w-5 h-5" /> اختر فيديو
                        </label>

                        {lecture.lectureVideo && (
                            <div className="mt-4 flex items-center justify-between bg-white/5 rounded-md px-4 py-2">
                                <span className="truncate text-sm">{lecture.lectureVideo.name}</span>
                                <button
                                    type="button"
                                    onClick={() => setLecture((prev) => ({ ...prev, lectureVideo: undefined }))}
                                    className="text-red-500 hover:text-red-600 flex items-center gap-1"
                                >
                                    <Trash2 className="w-4 h-4" /> إزالة
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Section: Attachments */}
                    <div className="card-dark p-6 rounded-xl shadow-md">
                        <h2 className="font-arabic-bold text-lg mb-4 border-b pb-2">
                            مرفقات المحاضرة
                        </h2>
                        <input
                            type="file"
                            multiple
                            name="resources"
                            onChange={handleResourcesChange}
                            className="hidden"
                            id="resourcesUpload"
                        />
                        <label
                            htmlFor="resourcesUpload"
                            className="btn-outline cursor-pointer text-primary font-bold text-lg flex items-center gap-2 w-full"
                        >
                            <Upload className="w-5 h-5" /> اختر ملفات
                        </label>

                        {lecture.resources.length > 0 && (
                            <ul className="mt-4 space-y-3">
                                {lecture.resources.map((f, idx) => (
                                    <li
                                        key={idx}
                                        className="flex items-center justify-between bg-white/5 rounded-md px-4 py-2"
                                    >
                                        <span className="truncate text-sm">{f.name}</span>
                                        <button
                                            type="button"
                                            onClick={() => removeResourceAt(idx)}
                                            className="text-red-500 hover:text-red-600 flex items-center gap-1"
                                        >
                                            <Trash2 className="w-4 h-4" /> إزالة
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-center gap-6 pt-4">
                        <button
                            type="submit"
                            className="btn-primary flex items-center gap-2 text-md px-3 py-2 lg:px-6 lg:py-3 rounded-xl"
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" /> جاري الحفظ...
                                </>
                            ) : (
                                <>
                                    <Upload className="w-5 h-5" /> تحديث المحاضرة
                                </>
                            )}
                        </button>
                        <button
                            type="button"
                            onClick={() => navigate("/lectures")}
                            className="btn-outline flex items-center gap-2 text-md px-3 py-2 lg:px-6 lg:py-3 rounded-xl"
                            disabled={loading}
                        >
                            <XCircle className="w-5 h-5" /> إلغاء
                        </button>
                    </div>
                </form>
            </motion.div>
        </div>
    );
};

export default EditLecture;
