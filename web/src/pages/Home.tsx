import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import CoreSolutions from "../components/CoreSolutions";
import WhyUs from "../components/WhyUs";
import JoinUs from "../components/JoinUs";
import ContactUs from "../components/ContactUs";

export default function Home() {
  return (
    <div className="pt-20">
      <Navbar />
      <HeroSection />
      <CoreSolutions />
      <WhyUs/>
      <JoinUs />
      <ContactUs />
    </div>
  );
}
