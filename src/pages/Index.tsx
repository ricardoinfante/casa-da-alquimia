
import About from '@/components/About';
import ContactForm from '@/components/ContactForm';
import Donate from '@/components/Donate';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import Navbar from '@/components/Navbar';
import Rituals from '@/components/Rituals';
import SocialMedia from '@/components/SocialMedia';
import SpotifyPlayer from '@/components/SpotifyPlayer';
import TestimonialCard from '@/components/TestimonialCard';
import { useScrollProgress } from '@/utils/animations';

const Index = () => {
  const scrollProgress = useScrollProgress();
  
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
        className="fixed top-0 left-0 right-0 h-1 bg-primary z-50 origin-left" 
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
        <About />
        <Rituals />
        <SocialMedia />
      
      {/* Testimonials Section */}
      <section id="testimonials" className="py-12 md:py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-noise opacity-5"></div>
        <div className="section-container relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="chip inline-flex items-center gap-1 mb-4">
              <span>Depoimentos</span>
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
              Experiências transformadoras com a 
              <span className="gradient-heading ml-2">medicina sagrada</span>
            </h2>
            <p className="text-foreground/80 text-lg">
              Conheça histórias de pessoas que passaram pelos nossos rituais e como a experiência 
              impactou suas vidas de forma profunda e significativa.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {[
              {
                content: "O ritual na Casa da Alquimia mudou minha perspectiva sobre a vida. A experiência foi conduzida com extremo cuidado e respeito pela medicina. Senti-me seguro e acolhido durante todo o processo.",
                author: "Carlos Mendes",
                role: "Professor, 42 anos",
                image: "https://randomuser.me/api/portraits/men/32.jpg"
              },
              {
                content: "Depois de anos lidando com ansiedade, encontrei na ayahuasca um caminho de cura profunda. A Casa da Alquimia proporcionou um ambiente perfeito para esta jornada interior.",
                author: "Mariana Silva",
                role: "Artista, 35 anos",
                image: "https://randomuser.me/api/portraits/women/44.jpg"
              },
              {
                content: "Participar dos rituais mensalmente tem sido fundamental para meu equilíbrio espiritual e emocional. A comunidade que se forma é acolhedora e os facilitadores são extremamente preparados.",
                author: "Roberto Alves",
                role: "Empresário, 51 anos",
                image: "https://randomuser.me/api/portraits/men/62.jpg"
              },
            ].map((testimonial, index) => (
              <TestimonialCard 
                key={index}
                content={testimonial.content}
                author={testimonial.author}
                role={testimonial.role}
                image={testimonial.image}
                className={index === 1 ? "md:translate-y-12" : ""}
              />
            ))}
          </div>
          
          <div className="flex justify-center mt-16 md:mt-20">
            <a 
              href="#contact"
              className="px-6 py-3 bg-azul-2/10 border border-azul-2/20 text-azul-2 rounded-full font-medium hover:bg-azul-2/15 transition-colors"
            >
              Compartilhe sua experiência
            </a>
          </div>
        </div>
      </section>
      
        <Donate />
        <ContactForm />
      </main>
      
      <Footer />
      
      {/* Spotify Player Fixo */}
      <SpotifyPlayer playlistId="5gK8vevkgH2nRAw1LuGdCD" />
    </div>
  );
};

export default Index;
