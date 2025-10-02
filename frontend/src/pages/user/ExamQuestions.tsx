import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";
import { Progress } from "@/components/ui/progress";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";

const BASE_API = import.meta.env.VITE_BASE_API;

const ExamQuestions = () => {
    const { user } = useAuth();
    const { examId } = useParams();
    const navigate = useNavigate();
    const [questions, setQuestions] = useState<any[]>([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [timeLeft, setTimeLeft] = useState(0);
    const [exam, setExam] = useState<any>(null);
    const [answers, setAnswers] = useState<Record<number, string>>({});
    const [loading, setLoading] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);

    // ✅ نحفظ حالة الامتحان كاملة
    useEffect(() => {
        if (exam) {
            localStorage.setItem(
                `exam_${examId}`,
                JSON.stringify({
                    answers,
                    currentQuestionIndex,
                    endTime: localStorage.getItem(`exam_${examId}_endTime`),
                })
            );
        }
    }, [answers, currentQuestionIndex, exam, examId]);

    // ✅ عند التحميل نقرأ البيانات من localStorage
    useEffect(() => {
        const saved = localStorage.getItem(`exam_${examId}`);
        const endTime = localStorage.getItem(`exam_${examId}_endTime`);

        if (saved && endTime) {
            const parsed = JSON.parse(saved);
            setAnswers(parsed.answers || {});
            setCurrentQuestionIndex(parsed.currentQuestionIndex || 0);

            const remaining = Math.floor((+endTime - Date.now()) / 1000);
            setTimeLeft(remaining > 0 ? remaining : 0);
        }
    }, [examId]);

    // ✅ تحميل بيانات الامتحان والأسئلة
    useEffect(() => {
        const fetchExam = async () => {
            try {
                const res = await fetch(`${BASE_API}/exams/${examId}`);
                const data = await res.json();
                setExam(data);

                // لو مفيش endTime متسجل، نسجله لأول مرة
                if (!localStorage.getItem(`exam_${examId}_endTime`)) {
                    const endTime = Date.now() + data.duration * 60 * 1000;
                    localStorage.setItem(`exam_${examId}_endTime`, endTime.toString());
                    setTimeLeft(data.duration * 60);
                } else {
                    const endTime = +localStorage.getItem(`exam_${examId}_endTime`)!;
                    const remaining = Math.floor((endTime - Date.now()) / 1000);
                    setTimeLeft(remaining > 0 ? remaining : 0);
                }
            } catch (err) {
                console.error(err);
                toast.error("فشل تحميل بيانات الاختبار");
            }
        };

        const fetchQuestions = async () => {
            try {
                const res = await fetch(`${BASE_API}/exams/${examId}/questions`);
                const data = await res.json();
                const formatted = data.map((q: any) => ({
                    id: q.id,
                    type: q.correct_option ? "multiple" : "boolean",
                    text: q.content,
                    choices: [q.option_a, q.option_b, q.option_c, q.option_d].filter(Boolean),
                }));
                setQuestions(formatted);
            } catch (err) {
                console.error(err);
                toast.error("فشل تحميل الأسئلة");
            }
        };

        fetchExam();
        fetchQuestions();
    }, [examId]);

    // ✅ عداد الوقت
    useEffect(() => {
        if (timeLeft <= 0) return;
        const timer = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    handleFinishExam();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
        return () => clearInterval(timer);
    }, [timeLeft]);

    if (!exam || questions.length === 0) return <p className="text-white text-center mt-12">تحميل الأسئلة...</p>;

    const totalQuestions = questions.length;
    const question = questions[currentQuestionIndex];
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    const progress = exam ? (timeLeft / (exam.duration * 60)) * 100 : 0;

    const getTimeColor = () => {
        if (progress > 50) return "text-green-400";
        if (progress > 20) return "text-yellow-400";
        return "text-red-500";
    };

    const handleNext = () => {
        if (currentQuestionIndex < totalQuestions - 1) setCurrentQuestionIndex(currentQuestionIndex + 1);
    };

    const handlePrev = () => {
        if (currentQuestionIndex > 0) setCurrentQuestionIndex(currentQuestionIndex - 1);
    };

    const handleSelectAnswer = (questionId: number, option: string) => {
        setAnswers(prev => ({ ...prev, [questionId]: option }));
    };

    const handleFinishExam = async () => {
        try {
            setLoading(true);
            const answersArray = Object.entries(answers)
                .map(([question_id, selected_option]) => ({
                    question_id: question_id.toString(),
                    selected_option
                }))
                .filter(ans => ans.question_id && ans.selected_option);

            const res = await fetch(`${BASE_API}/exams/${examId}/submit`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ user_id: user.id, answers: answersArray })
            });

            const data = await res.json();
            if (data.error) toast.error(data.error);
            else toast.success(`تم إنهاء الاختبار!`);

            // نحذف البيانات من localStorage بعد التسليم
            localStorage.removeItem(`exam_${examId}`);
            localStorage.removeItem(`exam_${examId}_endTime`);

            navigate("/exam");
        } catch (err) {
            console.error(err);
            toast.error("حدث خطأ أثناء إرسال الإجابات");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="section-padding">
            <div className="flex flex-col items-center mb-8 space-y-3">
                <p className={`text-3xl font-bold tracking-wide ${getTimeColor()}`}>
                    ⏳ {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
                </p>
                <Progress value={progress} className="w-full h-3 rounded-full bg-background-darkest" />
                <span className="text-sm text-gray-400">
                    الوقت المتبقي من أصل {exam.duration} دقيقة
                </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="col-span-2 flex flex-col gap-8">
                    <motion.div className="card-dark bg-primary-card p-8 space-y-8 shadow-xl border border-white/10">
                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 flex items-center justify-center rounded-full bg-primary text-white font-bold shadow-md">
                                {currentQuestionIndex + 1}
                            </div>
                            <h2 className="text-2xl font-arabic-semibold text-white leading-snug">{question.text}</h2>
                        </div>

                        <div className="space-y-4">
                            {question.choices.map((choice, i) => {
                                const optionLetter = ["a", "b", "c", "d"][i];
                                const isSelected = answers[question.id] === optionLetter;

                                return (
                                    <motion.label
                                        key={i}
                                        whileHover={{ scale: 1.03 }}
                                        whileTap={{ scale: 0.97 }}
                                        className={`flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-shadow
                                            ${isSelected
                                                ? "bg-gradient-to-r from-green-400 to-green-500 text-white shadow-lg"
                                                : "bg-background-darkest text-gray-200 hover:bg-primary/40 hover:text-white"}`}
                                    >
                                        <input
                                            type="radio"
                                            name={`q${question.id}`}
                                            value={optionLetter}
                                            checked={isSelected}
                                            onChange={() => handleSelectAnswer(question.id, optionLetter)}
                                            className="accent-primary w-5 h-5"
                                        />
                                        <span className="text-lg font-arabic-semibold">{choice}</span>
                                    </motion.label>
                                );
                            })}
                        </div>

                        <div className="flex justify-between pt-4">
                            <Button onClick={handlePrev} disabled={currentQuestionIndex === 0}>السابق</Button>
                            <Button onClick={handleNext} disabled={currentQuestionIndex === totalQuestions - 1}>التالي</Button>
                        </div>

                        <Button
                            onClick={() => setDialogOpen(true)}
                            className="w-full bg-red-600 hover:bg-red-700 mt-6 py-4 rounded-xl text-lg font-bold flex items-center gap-2"
                        >
                            إنهاء الاختبار
                        </Button>
                    </motion.div>
                </div>

                <div className="card-dark bg-primary-card p-6 flex flex-col justify-between shadow-lg border border-white/10">
                    <h3 className="text-lg font-arabic-semibold text-white">
                        عدد الأسئلة: <span className="text-primary-light text-lg font-bold">{totalQuestions}</span>
                    </h3>

                    <div className="grid grid-cols-5 gap-3 max-h-64 overflow-y-auto pr-1">
                        {questions.map((q, i) => (
                            <button
                                key={i}
                                onClick={() => setCurrentQuestionIndex(i)}
                                className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold transition 
                                    ${i === currentQuestionIndex
                                        ? "bg-primary text-white shadow-lg"
                                        : "bg-background-darkest text-gray-300 hover:bg-primary/30"}`}
                            >
                                {i + 1}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* ✅ Dialog للتأكيد */}
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogContent className="max-w-sm bg-primary-card text-card-foreground border border-primary/20 rounded-2xl shadow-lg">
                    <DialogHeader>
                        <DialogTitle className="text-xl font-arabic-bold text-white">
                            ⚠️ هل أنت متأكد من إنهاء الاختبار؟
                        </DialogTitle>
                    </DialogHeader>

                    <DialogFooter className="mt-6 flex gap-3">
                        <Button
                            variant="outline"
                            onClick={() => setDialogOpen(false)}
                            className="flex-1"
                        >
                            إلغاء
                        </Button>
                        <Button
                            onClick={handleFinishExam}
                            className="bg-red-600 hover:bg-red-700 text-white flex-1 flex items-center justify-center gap-2"
                            disabled={loading}
                        >
                            {loading && <Loader2 className="w-5 h-5 animate-spin" />}
                            تأكيد
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default ExamQuestions;
