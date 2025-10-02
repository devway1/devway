import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
const BASE_API = import.meta.env.VITE_BASE_API;

const ExamDetails = () => {
  const { examId } = useParams<{ examId: string }>();
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const res = await fetch(`${BASE_API}/exams/${examId}/results`);
        const data = await res.json();

        if (Array.isArray(data)) {
          setResults(data); 
        } else {
          console.error("Unexpected response:", data);
          setResults([]);
        }
      } catch (error) {
        console.error("Error fetching results:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [examId]);

  if (loading) return <p className="text-white text-center mt-16">⏳ Loading...</p>;

  return (
    <div className="container-custom section-padding p-8 mt-16 lg:mt-0 text-right">
      <h1 className="text-3xl font-bold mb-8 text-white">
        Exam Details
      </h1>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="card-dark bg-primary-card max-w-7xl mx-auto p-4 rounded-xl shadow-md"
      >
        <h2 className="text-xl font-bold text-white mb-4">Student Results</h2>

        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-center border-collapse">
            <thead>
              <tr className="bg-primary text-white">
                <th className="p-3">Student Name</th>
                <th className="p-3">Email</th>
                <th className="p-3">Total Marks</th>
                <th className="p-3">Percentage</th>
                <th className="p-3">Submitted At</th>
                <th className="p-3">Score</th>
              </tr>
            </thead>
            <tbody>
              {results.length === 0 && (
                <tr>
                  <td colSpan={6} className="p-6 text-gray-400 text-center">
                    No results found
                  </td>
                </tr>
              )}
              {results.map((res: any) => {
                const percentageColor =
                  res.percentage >= 85
                    ? "text-green-500 font-bold"
                    : res.percentage >= 60
                    ? "text-yellow-400 font-semibold"
                    : "text-red-500 font-semibold";

                const submittedDate = res.submitted_at
                  ? new Date(res.submitted_at).toLocaleString("en-US", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })
                  : "-";

                return (
                  <tr
                    key={res.id}
                    className="border-b border-gray-700 hover:bg-gray-100/10 transition text-white"
                  >
                    <td className="p-3">{res.profiles?.full_name || "-"}</td>
                    <td className="p-3">{res.profiles?.email || "-"}</td>
                    <td className="p-3">{res.total_marks ?? "-"}</td>
                    <td className={`p-3 ${percentageColor}`}>
                      {res.percentage ?? "-"}%
                    </td>
                    <td className="p-3">{submittedDate}</td>
                    <td className="p-3">{res.score ?? "-"}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden space-y-4 mt-4">
          {results.length === 0 && (
            <p className="text-gray-400 text-center">No results found</p>
          )}
          {results.map((res: any) => {
            const percentageColor =
              res.percentage >= 85
                ? "text-green-500 font-bold"
                : res.percentage >= 60
                ? "text-yellow-400 font-semibold"
                : "text-red-500 font-semibold";

            const submittedDate = res.submitted_at
              ? new Date(res.submitted_at).toLocaleString("en-US", {
                  dateStyle: "medium",
                  timeStyle: "short",
                })
              : "-";

            return (
              <div
                key={res.id}
                className="border border-gray-700 rounded-xl p-4 bg-gray-900 text-white shadow-md"
              >
                <h3 className="font-bold text-lg mb-2">
                  {res.profiles?.full_name || "-"}
                </h3>
                <p className="text-sm text-gray-300 mb-1">{res.profiles?.email || "-"}</p>
                <p className="mb-1">
                  Total Marks: <span className="font-semibold">{res.total_marks ?? "-"}</span>
                </p>
                <p className="mb-1">
                  Percentage: <span className={percentageColor}>{res.percentage ?? "-"}%</span>
                </p>
                <p className="mb-1">Submitted: {submittedDate}</p>
                <p className="mb-1">Score: <span className="font-semibold">{res.score ?? "-"}</span></p>
              </div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
};

export default ExamDetails;
