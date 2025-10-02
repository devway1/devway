import Hero from '@/components/Hero';
import About from '@/components/About';
import WhyChooseUs from '@/components/WhyChooseUs';
import Courses from '@/components/Courses';
import Testimonials from '@/components/Testimonials';


const Index = () => {
  return (
    <div className="min-h-screen w-full overflow-x-hidden lg:overflow-visible bg-background-dark">

      <Hero />
      <About />
      <WhyChooseUs />
      <Courses />
      <Testimonials />

    </div>
  );
};

export default Index;
