import { useState } from "react";
import { motion } from "framer-motion";
import { Save, XCircle } from "lucide-react";
import { toast } from "sonner";
import { useNavigate, useParams } from "react-router-dom";

const BASE_API = import.meta.env.VITE_BASE_API;

const AddQuestion = () => {
  const navigate = useNavigate();
  const { examId } = useParams();

  const [question, setQuestion] = useState({
    content: "",
    options: ["", "", "", ""],
    correct: 0,
  });

  const optionKey = ["a", "b", "c", "d"];

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...question.options];
    newOptions[index] = value;
    setQuestion((prev) => ({ ...prev, options: newOptions }));
  };

  const validate = () => {
    if (!question.content.trim()) return "أدخل نص السؤال أو ارفع صورة";
    if (question.options.some((opt) => !opt.trim()))
      return "من فضلك أدخل جميع الاختيارات";
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const error = validate();
    if (error) return toast.error(error);

    try {
      const res = await fetch(`${BASE_API}/questions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          exam_id: examId,
          content: question.content,
          option_a: question.options[0],
          option_b: question.options[1],
          option_c: question.options[2],
          option_d: question.options[3],
          correct_option: optionKey[question.correct],
        }),
      });
      const data = await res.json();
      if (!res.ok) return toast.error(data.error || "حصل خطأ أثناء إضافة السؤال");

      toast.success("تم إضافة السؤال بنجاح 🎉");
      navigate(`/exams/${examId}/questions`);
    } catch (err) {
      toast.error("خطأ في الاتصال بالسيرفر");
      console.error(err);
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
          إضافة سؤال جديد
        </h1>

        <form onSubmit={handleSubmit} className="space-y-10">
          {/* محتوى السؤال */}
          <div className="card-dark p-6 rounded-xl shadow-md">
            <h2 className="font-arabic-bold text-lg mb-4 border-b pb-2">محتوى السؤال</h2>
            <input
              type="text"
              value={question.content}
              onChange={(e) => setQuestion((prev) => ({ ...prev, content: e.target.value }))}
              className="input-field w-full"
              placeholder="اكتب نص السؤال هنا"
            />
          </div>

          {/* الاختيارات */}
          <div className="card-dark p-6 rounded-xl shadow-md">
            <h2 className="font-arabic-bold text-lg mb-4 border-b pb-2">الاختيارات</h2>
            <div className="space-y-4">
              {["أ", "ب", "ج", "د"].map((label, i) => (
                <div key={i} className="flex items-center gap-4">
                  <input
                    type="radio"
                    name="correct"
                    checked={question.correct === i}
                    onChange={() => setQuestion((prev) => ({ ...prev, correct: i }))}
                    className="accent-green-600 w-5 h-5"
                  />
                  <input
                    type="text"
                    value={question.options[i]}
                    onChange={(e) => handleOptionChange(i, e.target.value)}
                    className="input-field w-full"
                    placeholder={`الإجابة ${label}`}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* الأزرار */}
          <div className="flex justify-center gap-6 pt-4">
            <button type="submit" className="btn-primary flex items-center gap-2 rounded-xl px-6 py-3">
              <Save className="w-5 h-5" /> حفظ السؤال
            </button>
            <button
              type="button"
              onClick={() => navigate(`/exams/${examId}/questions`)}
              className="btn-outline flex items-center gap-2 rounded-xl px-6 py-3"
            >
              <XCircle className="w-5 h-5" /> إلغاء
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default AddQuestion;
