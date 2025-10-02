import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Clock, Play } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import { useAuth } from '@/context/AuthContext';
import { AlertCircle } from 'lucide-react';

const BASE_API = import.meta.env.VITE_BASE_API;

const Exams = () => {
    const { user } = useAuth();
    const [exams, setExams] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [results, setResults] = useState<Record<string, number>>({});
    useEffect(() => {
        const fetchExams = async () => {
            try {
                const res = await axios.get(`${BASE_API}/exams`);

                // فلترة الاختبارات حسب الحالة
                const activeExams = res.data.filter((exam: any) => exam.status === true);
                setExams(activeExams);

                const resultsData: Record<string, { score: number; percentage: number }> = {};

                for (const exam of activeExams) {
                    try {
                        const r = await axios.get(`${BASE_API}/exams/${exam.id}/results/${user.id}`);
                        if (r.data) {
                            resultsData[exam.id] = {
                                score: r.data.score,
                                percentage: r.data.percentage
                            };
                        }
                    } catch (err) {
                        console.error("Error fetching result for exam", exam.id, err);
                    }
                }

                setResults(resultsData);

            } catch (err: any) {
                toast.error(err.response?.data?.error || "فشل تحميل الاختبارات");
            } finally {
                setLoading(false);
            }
        };

        fetchExams();
    }, [user.id]);



    if (loading) return <div className="text-white text-center mt-12">جاري التحميل...</div>;

    if (!loading && exams.length === 0) {
        return (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center justify-center py-24"
            >
                <AlertCircle className="w-16 h-16 text-primary mb-6" />
                <h3 className="text-2xl lg:text-4xl font-arabic-bold text-white mb-4">
                    لا توجد اختبارات متاحة حاليًا
                </h3>
                <p className="text-gray-300 text-lg text-center max-w-md">
                    نحن نعمل على إضافة المزيد من الاختبارات قريبًا، تابعنا لتكون أول من يستفيد من المحتوى الجديد!
                </p>
            </motion.div>
        );
    }

    return (
        <div className="section-padding">
            <div className="text-center mb-12">
                <h1 className="text-3xl font-arabic-bold text-white">الاختبارات المتاحة</h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2  gap-8">
                {exams.map((exam, i) => (
                    <motion.div
                        key={exam.id}
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: i * 0.2 }}
                        whileHover={{ scale: 1.05 }}
                    >
                        {results[exam.id] !== undefined ? (() => {
                            const score = results[exam.id].score;
                            const percentage = results[exam.id].percentage;

                            let message = '';
                            let quranVerse = '';
                            let cardColor = '';
                            let progressColor = '';

                            if (percentage < 50) {
                                message = 'قول الحمد لله اولًا ومتضايقش نفسك الغلطات هي اللي هتخليك شخص محترف💪';
                                quranVerse = 'وَلَا تَهِنُوا وَلَا تَحْزَنُوا وَأَنتُمُ الْأَعْلَوْنَ ۗ إِن كُنتُم مُّؤْمِنِينَ (آل عمران: 139)';
                                cardColor = 'bg-red-600';
                                progressColor = 'bg-red-400';
                            } else if (percentage < 80) {
                                message = 'ما شاء الله شغلك كويس جدًا حاول تحسّن اكتر المرة الجاية, بالتوفق دايمًا💪';
                                quranVerse = 'فَاسْتَبِقُوا الْخَيْرَاتِ (البقرة: 148)';
                                cardColor = 'bg-yellow-600';
                                progressColor = 'bg-yellow-400';
                            } else {
                                message = 'ما شاء الله مٌمتاز جدًا ربنا يوفقك دايمًا وتبقي من احسن الناس👏';
                                quranVerse = 'وَقُلِ اعْمَلُوا فَسَيَرَى اللَّهُ عَمَلَكُمْ وَرَسُولُهُ وَالْمُؤْمِنُونَ (التوبة: 105)';
                                cardColor = 'bg-green-600';
                                progressColor = 'bg-green-400';
                            }

                            return (
                                <div className={`text-white font-arabic-semibold p-5 rounded-2xl shadow-lg w-full flex flex-col justify-between ${cardColor} transition-transform duration-300 hover:scale-105`}>
                                    <div className="space-y-2">
                                        <h4 className="text-lg font-arabic-bold">{exam.title}</h4>
                                        <div className="flex items-center gap-2 text-gray-200">
                                            <Clock className="w-5 h-5 text-white/80" />
                                            <span>{exam.duration} دقيقة</span>
                                        </div>

                                        <p className="text-2xl font-arabic-bold mt-2">{score} نقطة - {percentage}%</p>
                                        <div className="w-full bg-white/20 rounded-full h-3 overflow-hidden">
                                            <div className={`h-3 rounded-full ${progressColor}`} style={{ width: `${percentage}%` }} />
                                        </div>

                                        <p className="text-yellow-200 mt-2">{message}</p>
                                        <p className="text-black  text-md text-center">{quranVerse}</p>
                                    </div>
                                </div>
                            );
                        })() : (

                            <motion.div
                                className="bg-primary-card text-white rounded-2xl shadow-lg p-5 flex flex-col justify-between items-center gap-10 transition-transform duration-300 hover:scale-105 "
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: i * 0.2 }}
                            >
                                <div className="space-y-3 text-center">
                                    <h4 className="text-xl font-arabic-bold">{exam.title}</h4>
                                    <div className="flex items-center justify-center gap-2 text-gray-300">
                                        <Clock className="w-5 h-5 text-white/80" />
                                        <span>{exam.duration} دقيقة</span>
                                    </div>
                                </div>
                                <div className="mt-4 flex justify-center items-center cursor-pointer">
                                    <Link to={`/exam/${exam.id}/questions`} state={exam} className="w-full">
                                        <Button className="btn-primary flex items-center gap-2">
                                            <Play className="w-4 h-4" />
                                            بدء الاختبار
                                        </Button>
                                    </Link>
                                </div>

                            </motion.div>
                        )}
                    </motion.div>

                ))}
            </div>
        </div >
    );
};

export default Exams;
