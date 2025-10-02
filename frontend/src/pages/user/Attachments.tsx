import React, { useEffect, useState } from "react";
import { FaFilePdf, FaHtml5, FaCss3Alt, FaJsSquare } from "react-icons/fa";
import { motion } from "framer-motion";
import { AlertCircle } from "lucide-react";

const BASE_API = import.meta.env.VITE_BASE_API;

const getCategoryIcon = (category) => {
  switch (category.toLowerCase()) {
    case "html": return <FaHtml5 className="text-orange-500 w-10 h-10" />;
    case "css": return <FaCss3Alt className="text-blue-500 w-10 h-10" />;
    case "javascript":
    case "js": return <FaJsSquare className="text-yellow-500 w-10 h-10" />;
    default: return <FaFilePdf className="text-red-500 w-10 h-10" />;
  }
};

function Attachments() {
  const [attachments, setAttachments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoryFilter, setCategoryFilter] = useState("");
  const [expandedIds, setExpandedIds] = useState([]);

  useEffect(() => {
    const fetchAttachments = async () => {
      try {
        const res = await fetch(`${BASE_API}/attachments`);
        const data = await res.json();
        if (data.attachments) setAttachments(data.attachments);
      } catch (err) {
        console.error("Failed to fetch attachments:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAttachments();
  }, []);

  const toggleReadMore = (id) => {
    setExpandedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleDownload = async (url, filename) => {
    try {
      const res = await fetch(url);
      const blob = await res.blob();
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = filename;
      link.click();
      window.URL.revokeObjectURL(link.href);
    } catch (err) {
      console.error("Download failed:", err);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen text-primary text-xl font-arabic-semibold">
        Loading attachments...
      </div>
    );

  if (!loading && attachments.length === 0)
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center py-24"
      >
        <AlertCircle className="w-16 h-16 text-primary mb-6" />
        <h3 className="text-2xl lg:text-4xl font-arabic-bold text-white mb-4">
          لا توجد مرفقات متاحة حاليًا
        </h3>
        <p className="text-gray-300 text-lg text-center max-w-md">
          نحن نعمل على إضافة المزيد من مرفقات قريبًا، تابعنا لتكون أول من
          يستفيد من المحتوى الجديد!
        </p>
      </motion.div>
    );

  const filteredAttachments = attachments.filter((att) =>
    categoryFilter
      ? att.category.toLowerCase() === categoryFilter.toLowerCase()
      : true
  );

  const getBorderClass = (category) => {
    switch (category.toLowerCase()) {
      case "html": return "border-html";
      case "css": return "border-css";
      case "javascript":
      case "js": return "border-js";
      default: return "";
    }
  };

  return (
    <div className="px-6 py-10 max-w-7xl mx-auto">
      {/* Filter */}
      <div className="flex justify-center mb-8">
        <div className="relative w-64">
          <select
            className="appearance-none w-full bg-white border border-gray-300 rounded-xl py-3 px-4 pr-10 shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-700 font-arabic-medium transition-all duration-300 hover:shadow-lg"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="">All Categories</option>
            <option value="HTML">HTML</option>
            <option value="CSS">CSS</option>
            <option value="JS">JS</option>
          </select>
        </div>
      </div>


      <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {filteredAttachments.map((att, index) => {
          const isExpanded = expandedIds.includes(att.id);
          const desc =
            isExpanded
              ? att.description
              : att.description.substring(0, 100) +
              (att.description.length > 100 ? "..." : "");
          return (
            <motion.div
              key={att.id}
              className={`bg-primary-card ${getBorderClass(att.category)} flex flex-col justify-between p-4 rounded-xl shadow-md`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              whileHover={{ scale: 1.03, boxShadow: "0 10px 20px rgba(0,0,0,0.2)" }}
            >
              {/* محتوى البطاقة */}
              <div className="flex items-center mb-4 space-x-4 rtl:space-x-reverse">
                <div>{getCategoryIcon(att.category)}</div>
                <div className="flex-1">
                  <h2 className="font-arabic-bold text-lg text-primary">{att.title}</h2>
                  <p className="text-white font-arabic-medium text-sm">
                    Category: {att.category} | Session: {att.sessionNumber}
                  </p>
                </div>
              </div>

              <p className="text-white font-arabic-normal mb-2">{desc}</p>
              {att.description.length > 100 && (
                <button
                  onClick={() => toggleReadMore(att.id)}
                  className="text-indigo-600 text-sm font-arabic-medium mb-4"
                >
                  {isExpanded ? "Read Less" : "Read More"}
                </button>
              )}

              <div className="flex justify-between gap-4">
                <a href={att.fileUrl} target="_blank" className="btn-default flex-1">Show File</a>
                <button onClick={() => handleDownload(att.fileUrl, att.title)} className="btn-default flex-1">Download File</button>
              </div>

              <span className="text-gray-400 text-xs font-arabic-light mt-6 text-center">
                Added on: {new Date(att.created_at).toLocaleString("en-GB")}
              </span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

export default Attachments;
