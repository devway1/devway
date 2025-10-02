import { useState } from "react";
import { motion } from "framer-motion";
import { Save, XCircle, Loader } from "lucide-react"; // استدعاء Loader
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const BASE_API = import.meta.env.VITE_BASE_API;

const AddAttachment = () => {
  const navigate = useNavigate();
  const [attachment, setAttachment] = useState({
    sessionNumber: "",
    category: "",
    title: "",
    description: "",
  });
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false); // حالة التحميل

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setAttachment((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const validate = () => {
    if (!attachment.sessionNumber.trim()) return "من فضلك أدخل رقم الجلسة";
    if (!attachment.category.trim()) return "من فضلك اختر التصنيف";
    if (!attachment.title.trim()) return "من فضلك أدخل عنوان الملف";
    if (!attachment.description.trim()) return "من فضلك أدخل وصف الملف";
    if (!file) return "من فضلك اختر الملف";
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const error = validate();
    if (error) {
      toast.error(error);
      return;
    }

    setLoading(true); // تشغيل الـ spinner

    const formData = new FormData();
    formData.append("file", file!);
    formData.append("sessionNumber", attachment.sessionNumber);
    formData.append("category", attachment.category);
    formData.append("title", attachment.title);
    formData.append("description", attachment.description);

    try {
      const res = await fetch(`${BASE_API}/attachments`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      setLoading(false); // إيقاف الـ spinner

      if (!res.ok) {
        toast.error(data.error || "فشل رفع الملف");
        return;
      }

      toast.success("✅ تم رفع الملف بنجاح");
      navigate("/attachments"); 
    } catch (err) {
      setLoading(false);
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
          إضافة ملف جديد
        </h1>

        <form onSubmit={handleSubmit} className="space-y-10">
          <div className="card-dark p-6 rounded-xl shadow-md">
            <h2 className="font-arabic-bold text-lg mb-4 border-b pb-2">البيانات الأساسية</h2>
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label className="block mb-2 font-arabic-medium">رقم الجلسة</label>
                <input
                  type="text"
                  name="sessionNumber"
                  value={attachment.sessionNumber}
                  onChange={handleChange}
                  className="input-field w-full"
                  placeholder="مثال: 1"
                />
              </div>

              <div>
                <label className="block mb-2 font-arabic-medium">التصنيف</label>
                <input
                  type="text"
                  name="category"
                  value={attachment.category}
                  onChange={handleChange}
                  className="input-field w-full"
                  placeholder="مثال: محاضرة"
                />
              </div>

              <div>
                <label className="block mb-2 font-arabic-medium">عنوان الملف</label>
                <input
                  type="text"
                  name="title"
                  value={attachment.title}
                  onChange={handleChange}
                  className="input-field w-full"
                />
              </div>

              <div>
                <label className="block mb-2 font-arabic-medium">الوصف</label>
                <textarea
                  name="description"
                  value={attachment.description}
                  onChange={handleChange}
                  className="input-field w-full"
                  rows={4}
                />
              </div>

              <div>
                <label className="block mb-2 font-arabic-medium">اختر الملف</label>
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="input-field w-full"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-center gap-6 pt-4">
            <button
              type="submit"
              className="btn-primary flex items-center gap-2 text-lg px-6 py-3 rounded-xl"
              disabled={loading} // تعطيل الزر أثناء التحميل
            >
              {loading ? <Loader className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
              {loading ? "جاري الرفع..." : "رفع الملف"}
            </button>

            <button
              type="button"
              onClick={() => navigate("/attachments")}
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

export default AddAttachment;
