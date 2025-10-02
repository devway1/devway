import Sidebar from '../components/Sidebar';
import { Outlet } from 'react-router-dom';


const DashboardLayout = () => {
  return (
    <div className="min-h-screen bg-[#084657]">
      <Sidebar />
      <main className="md:mr-80 min-h-screen">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;