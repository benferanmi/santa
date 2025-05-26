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

const Home = () => {
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
                    <FAQSection />
                    <SantaReviewsSlider />
                </div>
            </AppLayout>
        </div>
    )
}

export default Home