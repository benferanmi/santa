import AppLayout from '../ui/AppLayout'
import HeroSection from '../ui/components/HerorSection'
import HowItWorksSection from '../ui/components/HowItWorks'
import SantaVideoSection from '../ui/components/SantaVideoSection'
import VideoSlider from '../ui/components/VideoSlider'
import SantaVideoForm from '../ui/components/SantaVideoForm'
import SantaWishesSection from '../ui/components/SantaWishesSection'
import SantaHelpersSection from '../ui/components/SantaHelpersSection'
import SantaMagicCTASection from '../ui/components/SantaMagicCTASection'
import FAQSection from '../ui/components/FAQSection'
import SantaReviewsSlider from '../ui/components/Review'
import { useLocation } from 'react-router-dom'
import { useEffect } from 'react'

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
                    <section id='faq-section'>
                        <FAQSection />
                    </section>
                    <SantaReviewsSlider />
                </div>
            </AppLayout>
        </div>
    )
}

export default Home