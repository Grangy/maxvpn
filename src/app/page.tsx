import dynamic from 'next/dynamic';
import Navigation from '@/components/sections/navigation';
import Hero from '@/components/sections/hero';
import LazySection from '@/components/ui/lazy-section';

// Lazy load non-critical components with intersection observer
const Features = dynamic(() => import('@/components/sections/features'), {
  loading: () => <div className="h-96 bg-slate-900/50 animate-pulse rounded-lg" />,
});

const Pricing = dynamic(() => import('@/components/sections/pricing'), {
  loading: () => <div className="h-96 bg-slate-900/50 animate-pulse rounded-lg" />,
});

const Contact = dynamic(() => import('@/components/sections/contact'), {
  loading: () => <div className="h-96 bg-slate-900/50 animate-pulse rounded-lg" />,
});

const Footer = dynamic(() => import('@/components/sections/footer'), {
  loading: () => <div className="h-32 bg-slate-900/50 animate-pulse" />,
});

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
        <LazySection>
          <Features />
        </LazySection>
        <LazySection>
          <Pricing />
        </LazySection>
        <LazySection>
          <Contact />
        </LazySection>
      </main>
      <Footer />
    </div>
  );
}
