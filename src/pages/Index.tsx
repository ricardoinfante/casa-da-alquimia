
import About from '@/components/About';
import ContactForm from '@/components/ContactForm';
import Donate from '@/components/Donate';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import MemoriasGallery from '@/components/MemoriasGallery';
import Navbar from '@/components/Navbar';
import Rituals from '@/components/Rituals';
import SocialMedia from '@/components/SocialMedia';
import SpotifyPlayer from '@/components/SpotifyPlayer';
import { Card, CardContent } from '@/components/ui/card';
import { useScrollProgress } from '@/utils/animations';
import { useTranslation } from 'react-i18next';

const Index = () => {
  const { t } = useTranslation();
  const scrollProgress = useScrollProgress();

  interface TestimonialItem { quote: string; author: string; }
  const testimonialItems = t('testimonials.items', { returnObjects: true }) as TestimonialItem[];

  const COL_SPANS = [
    'md:col-span-2 md:row-span-2', // Paulo Rios — featured 2×2
    'md:col-span-2',               // Ananda
    '',                            // Sadgati
    '',                            // Bárbara
    'md:col-span-2',               // Mari
    'md:col-span-2',               // Thais
    'md:col-span-4',               // Angel — full width
  ];
  
  return (
    <div className="relative">
      {/* Skip to main content link for accessibility */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md"
      >
        Pular para o conteúdo principal
      </a>
      
      {/* Progress bar */}
      <div
        className="fixed top-0 left-0 right-0 h-1 bg-terra-1 z-50 origin-left"
        style={{ transform: `scaleX(${scrollProgress})` }}
        role="progressbar"
        aria-label="Progresso de rolagem da página"
        aria-valuenow={Math.round(scrollProgress * 100)}
        aria-valuemin={0}
        aria-valuemax={100}
      ></div>
      
      <Navbar />
      
      <main id="main-content">
        <Hero />
        <div className="bg-bg-agua"><About /></div>
        <div className="bg-bg-light"><Rituals /></div>
        <div className="bg-bg-agua"><MemoriasGallery /></div>
        <div className="bg-bg-light"><SocialMedia /></div>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-10 md:py-14 relative overflow-hidden bg-bg-agua">
        <div className="absolute inset-0 bg-noise opacity-5"></div>
        <div className="section-container relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="chip inline-flex items-center gap-1 mb-4">
              <span>{t('testimonials.badge')}</span>
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              {t('testimonials.title')}
            </h2>
            <p className="text-foreground/70 text-lg">
              {t('testimonials.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

            {testimonialItems.map((item, i) => (
              <Card key={i} className={`${COL_SPANS[i]} bg-white border-terra-1/20 transition-all duration-300`}>
                <CardContent className="h-full pt-6">
                  <blockquote className="grid h-full grid-rows-[auto_1fr_auto] gap-6">
                    <div className="text-[#2B4F8C]">
                      <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"></path>
                        <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"></path>
                      </svg>
                    </div>
                    <p className={`font-lato italic text-dark ${i === 0 || i === 6 ? 'text-xl' : 'text-base'}`}>
                      {item.quote}
                    </p>
                    <cite className="text-sm font-medium not-italic text-[#2B4F8C]">— {item.author}</cite>
                  </blockquote>
                </CardContent>
              </Card>
            ))}

          </div>
        </div>
      </section>
      
        <div className="bg-bg-light"><Donate /></div>
        <div className="bg-bg-agua"><ContactForm /></div>
      </main>
      
      <Footer />
      
      {/* Spotify Player Fixo */}
      <SpotifyPlayer playlistId="5gK8vevkgH2nRAw1LuGdCD" />
    </div>
  );
};

export default Index;
