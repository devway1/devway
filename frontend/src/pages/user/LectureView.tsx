import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  ChevronLeft,
  ChevronRight,
  Download,
  FileText,
  Link,
  AlertCircle
} from "lucide-react";
import { motion } from "framer-motion";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import "@videojs/themes/fantasy/index.css";

const attachments = [

]

const LectureView = () => {
  const { courseId, lectureId } = useParams();
  const [activeTab, setActiveTab] = useState("video");
  const videoRef = useRef(null);
  const playerRef = useRef(null);
  const [attachments, setAttachments] = useState([]);


  useEffect(() => {
    if (videoRef.current && !playerRef.current) {
      playerRef.current = videojs(videoRef.current, {
        controls: true,
        autoplay: false,
        preload: "auto",
        fluid: true,
        language: "ar",
        controlBar: {
          volumePanel: { inline: false },
        },
      });
    }
    return () => {
      if (playerRef.current) {
        playerRef.current.dispose();
        playerRef.current = null;
      }
    };
  }, []);

  return (
    <div className="p-6 pt-24 md:p-10">
      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
          مقدمة في الشبكات
        </h1>
      </motion.div>

      {/* Tabs */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="mb-8"
        >
          <TabsList className="bg-primary-card border-b border-primary/20 w-full flex justify-center gap-4 rounded-lg p-6">
            <TabsTrigger
              value="attachments"
              className="data-[state=active]:bg-primary data-[state=active]:text-white 
                           text-white/70 md:px-16 py-2 rounded-lg transition-all md:text-xl"
            >
              📂 المرفقات
            </TabsTrigger>
            <TabsTrigger
              value="video"
              className="data-[state=active]:bg-primary data-[state=active]:text-white 
                           text-white/70 md:px-16 py-2 rounded-lg transition-all md:text-xl"
            >
              🎥 الفيديو
            </TabsTrigger>
          </TabsList>

          {/* Video Section */}
          <TabsContent
            value="video"
            className="mt-6 flex flex-col items-center space-y-6"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="bg-primary-card rounded-2xl shadow-xl overflow-hidden w-full max-w-4xl"
            >
              <div className="aspect-video">
                <video
                  ref={videoRef}
                  className="video-js vjs-big-play-centered"
                >
                  <source
                    src="https://vjs.zencdn.net/v/oceans.mp4"
                    type="video/mp4"
                  />
                  متصفحك لا يدعم تشغيل الفيديو
                </video>
              </div>
            </motion.div>



            {/* Navigation Buttons */}
            <div className="flex flex-col md:flex-row justify-between gap-4 w-full max-w-4xl">
              <Button
                variant="outline"
                className="flex-1 md:flex-none bg-gradient-to-r from-primary to-primary-dark text-white shadow-lg hover:opacity-90"
              >
                <ChevronRight className="h-4 w-4 ml-2" />
                المحاضرة السابقة
              </Button>
              <Button className="flex-1 md:flex-none bg-gradient-to-r from-primary to-primary-dark text-white shadow-lg hover:opacity-90">
                المحاضرة التالية
                <ChevronLeft className="h-4 w-4 mr-2" />
              </Button>
            </div>
          </TabsContent>


          {/* Attachments */}
          <TabsContent value="attachments" className="mt-6 space-y-6">
            {attachments.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center justify-center py-24"
              >
                <AlertCircle className="w-16 h-16 text-primary mb-6" />
                <h3 className="text-2xl lg:text-4xl font-arabic-bold text-white mb-4">
                  لا توجد مرفقات متاحة
                </h3>
                <p className="text-gray-300 text-lg text-center max-w-md">
                  لا يوجد ملفات أو روابط مرفقة بهذه المحاضرة حالياً.
                </p>
              </motion.div>
            ) : (
              <motion.div
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { staggerChildren: 0.2 },
                  },
                }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6"
              >
                {attachments.map((attachment) => (
                  <motion.div
                    key={attachment.id}
                    variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                    whileHover={{ scale: 1.03 }}
                    className="bg-primary-card rounded-xl p-6 border border-primary/20 hover:border-primary/40 
           transition-all shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center">
                        {attachment.type === 'file' ? <FileText className="h-7 w-7 text-primary" /> : <Link className="h-7 w-7 text-primary" />}
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-white">{attachment.title}</h3>
                        <p className="text-white/60 text-sm">{attachment.description}</p>
                      </div>
                    </div>
                    <Button size="sm" className="bg-primary text-white hover:bg-primary/90">
                      <Download className="h-4 w-4 ml-2" />
                      تحميل
                    </Button>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </TabsContent>


        </Tabs>
      </motion.div>
    </div>
  );
};

export default LectureView;
