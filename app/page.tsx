import Navbar from '@/components/Navbar';
import HeroCanvas from '@/components/HeroCanvas';
import TextOverlays from '@/components/TextOverlays';
import PostSequenceContent from '@/components/PostSequenceContent';
import FinalCTA from '@/components/FinalCTA';
import Footer from '@/components/Footer';

export default function Home() {
    return (
        <main className="relative bg-black overflow-x-hidden">
            <Navbar />

            {/* PHASE 1: Canvas Animation (249 frames) - 1400vh tall */}
            <div className="relative">
                <HeroCanvas />
                <TextOverlays />
            </div>

            {/* PHASE 2: Traveling Machine + Content Sections - 300vh tall
          IMPORTANT: PostSequenceContent now includes TravelingMachine inside it
          to ensure proper scroll sync */}
            <PostSequenceContent />

            {/* PHASE 3: Final CTA with open machine */}
            <FinalCTA />

            <Footer />
        </main>
    );
}
