import Navigation from '@/components/sections/navigation';
import Hero from '@/components/sections/hero';
import Features from '@/components/sections/features';
import Pricing from '@/components/sections/pricing';
import Contact from '@/components/sections/contact';
import Footer from '@/components/sections/footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-600/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-600/5 rounded-full blur-3xl animate-pulse" />
      </div>
      
      <Navigation />
      <main className="relative z-10">
        <div className="section-transition">
          <Hero />
        </div>
        <div className="section-transition">
          <Features />
        </div>
        <div className="section-transition">
          <Pricing />
        </div>
        <div className="section-transition">
          <Contact />
        </div>
      </main>
      <Footer />
    </div>
  );
}
