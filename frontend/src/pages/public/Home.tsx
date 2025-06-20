import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import AppLayout from "@/components/layout/AppLayout";
import HeroSection from "@/components/features/HerorSection";
import HowItWorksSection from "@/components/features/HowItWorks";
import SantaVideoSection from "@/components/features/SantaVideoSection";
import VideoSlider from "@/components/features/VideoSlider";
import SantaVideoForm from "@/components/features/SantaVideoForm";
import SantaWishesSection from "@/components/features/SantaWishesSection";
import SantaHelpersSection from "@/components/features/SantaHelpersSection";
import SantaMagicCTASection from "@/components/features/SantaMagicCTASection";
import FAQSection from "@/components/features/FAQSection";
import SantaReviewsSlider from "@/components/features/Review";

const Home = () => {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [hash]);
  return (
    <div>
      <AppLayout>
        <div>
          <HeroSection />
          <HowItWorksSection />
          <SantaVideoSection />
          <VideoSlider />
          <SantaVideoForm />
          <SantaWishesSection />
          <SantaHelpersSection />
          <SantaMagicCTASection />
          <section id="faq-section">
            <FAQSection />
          </section>
          <SantaReviewsSlider />
        </div>
      </AppLayout>
    </div>
  );
};

export default Home;
