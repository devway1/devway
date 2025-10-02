import { Toaster } from "sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Auth Context
import { AuthProvider } from "./context/AuthContext";

// Protected Route
import ProtectedRoute from "./components/ProtectedRoute";


// Layouts
import AdminLayout from "./layouts/AdminLayout";
import DashboardLayout from "./layouts/DashboardLayout";
import LandingLayout from "./layouts/LandingLayout";

// Auth Pages
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";

// User Pages
import Dashboard from "./pages/user/Dashboard";
import MyCourses from "./pages/user/MyCourses";
import PaidCourses from "./pages/user/PaidCourses";
import FreeCourses from "./pages/user/FreeCourses";
import StudentExams from "./pages/user/Exams";
import ExamQuestionsStudents from "./pages/user/ExamQuestions";
import CourseLectures from "./pages/user/CourseLectures";
import LectureView from "./pages/user/LectureView";
import CourseDetails from "./pages/user/CourseDetails";
import Profile from "./pages/user/Profile";
import AttachmentsUser from "./pages/user/Attachments";

// Admin Pages
import AdminDashboard from "./pages/admin/Dashboard"
import Courses from "./pages/admin/Courses/Courses"
import AdminCourseLectures from "./pages/admin/Courses/CourseLectures"
import AddCourse from "./pages/admin/Courses/AddCourse";
import EditCourse from "./pages/admin/Courses/EditCourse";
import AddLecture from "./pages/admin/Courses/AddLecture";
import EditLecture from "./pages/admin/Courses/EditLecture";
import PurchaseOrders from "./pages/admin/Purchases/PurchaseOrders";
import Users from "./pages/admin/Users/Users"
import Admins from "./pages/admin/Admins/Admins";
import AddAdmin from "./pages/admin/Admins/AddAdmin"
import EditAdmin from "./pages/admin/Admins/EditAdmin"
import Exams from "./pages/admin/Exams/Exams";
import AddExam from "./pages/admin/Exams/AddExam";
import EditExam from "./pages/admin/Exams/EditExam";
import ExamQuestions from "./pages/admin/Exams/ExamQuestions";
import AddQuestion from "./pages/admin/Exams/AddQuestion";
import EditQuestion from "./pages/admin/Exams/EditQuestion";
import ExamDetails from "./pages/admin/Exams/ExamDetails";
import Attachments from "./pages/admin/attachments/Attachments";

// Landing Page
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AddAttachment from "./pages/admin/attachments/AddAttachment";
import AdminLogin from "./pages/auth/AdminLogin";
import Leaders from "./pages/Team";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster
        position="top-right"
        richColors
        closeButton
        expand
        duration={4000}
        pauseWhenPageIsHidden
        pauseOnHover
        theme="light"
      />
      <BrowserRouter>
        <AuthProvider>


          <Routes>
            {/* Landing Page */}
            <Route element={<LandingLayout />}>
              <Route path="/" element={<Index />} />
              <Route path="/our-team" element={<Leaders />} />
            </Route>

            {/* Auth Pages */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/admin-login" element={<AdminLogin />} />

            {/* User Pages (Dashboard Layout) */}
            <Route
              element={
                <ProtectedRoute role="user">
                  <DashboardLayout />
                </ProtectedRoute>
              }
            >
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/my-courses" element={<MyCourses />} />
              <Route path="/paid-courses" element={<PaidCourses />} />
              <Route path="/free-courses" element={<FreeCourses />} />
              <Route path="/exam" element={<StudentExams />} />
              <Route path="/exam/:examId/questions" element={<ExamQuestionsStudents />} />
              <Route path="/course/:courseId/lectures" element={<CourseLectures />} />
              <Route path="/course/:courseId/lecture/:lectureId" element={<LectureView />} />
              <Route path="/course/:courseId" element={<CourseDetails />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/attachments-user" element={<AttachmentsUser />} />
            </Route>

            {/* Admin Pages (Admin Layout) */}
            <Route
              element={
                <ProtectedRoute role="admin">
                  <AdminLayout />
                </ProtectedRoute>
              }
            >

              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/courses/add-course" element={<AddCourse />} />
              <Route path="/courses/:courseId/edit-course" element={<EditCourse />} />
              <Route path="/courses/:courseId/lectures" element={<AdminCourseLectures />} />
              <Route path="/courses/:courseId/lectures/:lectureId/edit-lecture" element={<EditLecture />} />
              <Route path="/courses/:courseId/add-lecture" element={<AddLecture />} />
              <Route path="/purchase-orders" element={<PurchaseOrders />} />
              <Route path="/users" element={<Users />} />
              <Route path="/admins" element={<Admins />} />
              <Route path="/admins/add-admin" element={<AddAdmin />} />
              <Route path="/admins/:adminId/edit-admin" element={<EditAdmin />} />
              <Route path="/exams" element={<Exams />} />
              <Route path="/exams/:examId/exam-details" element={<ExamDetails />} />
              <Route path="/exams/add-exam" element={<AddExam />} />
              <Route path="/exams/:examId/edit-exam" element={<EditExam />} />
              <Route path="/exams/:examId/questions" element={<ExamQuestions />} />
              <Route path="/exams/:examId/questions/add-question" element={<AddQuestion />} />
              <Route path="/exams/:examId/questions/:quizId/edit-question" element={<EditQuestion />} />
              <Route path="/attachments" element={<Attachments />} />
              <Route path="/attachments/add-attachment" element={<AddAttachment />} />
            </Route>

            {/* Not Found */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
