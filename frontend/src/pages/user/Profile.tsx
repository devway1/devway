import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { useState, useEffect } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useAuth } from "../../context/AuthContext"
import axios from 'axios';
import { toast } from 'sonner';

const BASE_API = import.meta.env.VITE_BASE_API;

const Profile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<any>(null);
  const [showPassword, setShowPassword] = useState({ old: false, new: false });
  const [passwords, setPasswords] = useState({ old: "", new: "" });

  useEffect(() => {
    if (!user) return;

    const fetchProfile = async () => {
      try {
        const res = await axios.get(`${BASE_API}/profiles/${user.id}`);
        if (res.data.profile) setProfile(res.data.profile);
      } catch (err: any) {
        toast.error(err.response?.data?.error || "فشل تحميل البيانات");
      }
    };

    fetchProfile();
  }, [user]);

  const handlePasswordChange = async () => {
    if (!passwords.old || !passwords.new) {
      toast.error("الرجاء ملء جميع الحقول");
      return;
    }

    try {
      const res = await axios.put(`${BASE_API}/profiles/${user?.id}/password`, {
        old_password: passwords.old,
        new_password: passwords.new
      });

      if (res.data.message) {
        toast.success(res.data.message);
        setPasswords({ old: "", new: "" });
      }
    } catch (err: any) {
      toast.error(err.response?.data?.error || "فشل تغيير كلمة المرور");
    }
  };

  if (!profile) return <div className="text-white">جاري التحميل...</div>;

  return (
    <div className="p-6 md:p-12 max-w-7xl mx-auto">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl md:text-4xl font-bold text-white mt-16 lg:mt-0 mb-8 text-center md:text-right"
      >
        الصفحة الشخصية
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="flex items-center flex-col gap-6 mb-12"
      >
        <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center shadow-lg">
          <span className="text-3xl font-bold text-primary-dark">{profile.full_name?.charAt(0)}</span>
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-white">{profile.full_name}</h2>
        <h6 className="text-md md:text-lg font-bold text-white">{profile.student_code}</h6>
      </motion.div>

      <div className="space-y-12">
        {/* Personal Information */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="bg-transparent border-none shadow-none">
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-primary text-lg md:text-2xl font-medium">
                  البريد الإلكتروني
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={profile.email}
                  disabled
                  className="bg-white/20 border-white/20 text-white w-full"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-primary text-lg md:text-2xl font-medium">
                  رقم الهاتف
                </Label>
                <Input
                  id="phone"
                  value={profile.phone}
                  disabled
                  className="bg-white/20 border-white/20 text-white w-full"
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <hr className="border-t-4 mt-6 mb-12 mx-auto w-[50vw]" style={{ borderColor: "#040B1D" }} />

        {/* Change Password */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Card className="bg-transparent border-none shadow-none">
            <CardHeader>
              <h2 className="text-xl md:text-2xl font-bold text-white mb-4">تغيير كلمة المرور</h2>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-8">

              {/* Old Password */}
              <div className="relative space-y-2">
                <Label htmlFor="old-password" className="text-primary text-lg md:text-2xl font-medium">
                  كلمة المرور الحالية
                </Label>
                <div className="relative">
                  <Input
                    id="old-password"
                    type={showPassword.old ? "text" : "password"}
                    placeholder="ادخل كلمة المرور الحالية"
                    value={passwords.old}
                    onChange={e => setPasswords(prev => ({ ...prev, old: e.target.value }))}
                    className="bg-white/20 border-white/20 text-white w-full pr-12 placeholder:text-primary-dark"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 left-3 flex items-center text-white"
                    onClick={() => setShowPassword(prev => ({ ...prev, old: !prev.old }))}
                  >
                    {showPassword.old ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {/* New Password */}
              <div className="relative space-y-2">
                <Label htmlFor="new-password" className="text-primary text-lg md:text-2xl font-medium">
                  كلمة المرور الجديدة
                </Label>
                <div className="relative">
                  <Input
                    id="new-password"
                    type={showPassword.new ? "text" : "password"}
                    placeholder="ادخل كلمة المرور الجديدة"
                    value={passwords.new}
                    onChange={e => setPasswords(prev => ({ ...prev, new: e.target.value }))}
                    className="bg-white/20 border-white/20 text-white w-full pr-12 placeholder:text-primary-dark"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 left-3 flex items-center text-white"
                    onClick={() => setShowPassword(prev => ({ ...prev, new: !prev.new }))}
                  >
                    {showPassword.new ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

            </CardContent>
          </Card>
        </motion.div>

        {/* Save Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Button
            className="w-full bg-white text-primary-dark hover:bg-white/90 h-12 text-lg font-bold"
            onClick={handlePasswordChange}
          >
            حفظ التغييرات
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;
