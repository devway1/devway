import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Outlet } from 'react-router-dom';

const LandingLayout = () => {
    return (
        <div className="min-h-screen w-full overflow-x-hidden lg:overflow-visible bg-background-dark">
            <Navbar />
            <Outlet />
            <Footer />
        </div>
    );
};

export default LandingLayout;
