
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
        <MemoriasGallery />
        <SocialMedia />
      
      {/* Testimonials Section */}
      <section id="testimonials" className="py-12 md:py-20 relative overflow-hidden bg-[#D4E8D8]">
        <div className="absolute inset-0 bg-noise opacity-5"></div>
        <div className="section-container relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="chip inline-flex items-center gap-1 mb-4">
              <span>Depoimentos</span>
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              O que dizem os caminhantes
            </h2>
            <p className="text-foreground/70 text-lg">
              Palavras de quem viveu a transformação
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

            {/* Paulo Rios — card de destaque: 2 colunas × 2 linhas */}
            <Card className="md:col-span-2 md:row-span-2 sm:p-6 bg-white/70 backdrop-blur-sm border-[#C9A84C]/30 hover:shadow-md hover:bg-white/80 transition-all duration-300">
              <CardContent className="h-full pt-6">
                <blockquote className="grid h-full grid-rows-[auto_1fr_auto] gap-6">
                  <div className="text-[#2B4F8C]">
                    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"></path>
                      <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"></path>
                    </svg>
                  </div>
                  <p className="font-serif italic text-[#2C2C1E]/90 text-xl">
                    Estar aqui é a sensação de completude de uma jornada de buscas que já vivi. É a compreensão de que a busca está dentro e que no silencio é que me reencontro. Aqui, vivemos na prática toda a jornada fora e dentro: do plantio, adubo da terra, bioconstrução, técnicas de cultivo e preparo da medicinas no fogo das panelas e fogo interno pessoal de cada um. E isso tudo só é possível aqui com a meditação e a ativação da presença nas atividades diárias, que levam à compreensão e completude do caminho para dentro e a uma alquimia interna para forjar e abrir espaço para este ser florescer.
                  </p>
                  <cite className="text-sm font-medium not-italic text-[#2B4F8C]">— Paulo Rios</cite>
                </blockquote>
              </CardContent>
            </Card>

            {/* Ananda — 2 colunas, linha 1 direita */}
            <Card className="md:col-span-2 bg-white/70 backdrop-blur-sm border-[#C9A84C]/30 hover:shadow-md hover:bg-white/80 transition-all duration-300">
              <CardContent className="h-full pt-6">
                <blockquote className="grid h-full grid-rows-[auto_1fr_auto] gap-6">
                  <div className="text-[#2B4F8C]">
                    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"></path>
                      <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"></path>
                    </svg>
                  </div>
                  <p className="font-serif italic text-[#2C2C1E]/90 text-base">
                    A Casa da Alquimia é a lembrança de que eu sou esse espaço de autotransformação pessoal. É com esse fogo interno que cada um vive isso na prática individual e entre os amigos do caminho, nessa união interior e exterior. E através dos amigos do caminho que nós encontramos o coração de luz - nosso e do outro.
                  </p>
                  <cite className="text-sm font-medium not-italic text-[#2B4F8C]">— Ananda</cite>
                </blockquote>
              </CardContent>
            </Card>

            {/* Sadgati — card normal, linha 2 col 3 */}
            <Card className="bg-white/70 backdrop-blur-sm border-[#C9A84C]/30 hover:shadow-md hover:bg-white/80 transition-all duration-300">
              <CardContent className="h-full pt-6">
                <blockquote className="grid h-full grid-rows-[auto_1fr_auto] gap-6">
                  <div className="text-[#2B4F8C]">
                    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"></path>
                      <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"></path>
                    </svg>
                  </div>
                  <p className="font-serif italic text-[#2C2C1E]/90 text-base">
                    Para mim, a Casa da Alquimia tem um objetivo único de investigação interior e de encontro consigo mesmo. Vivendo isso por meio da troca e da convivência no dia a dia, do compartilhamento da vida. Aqui vivencio a meditação, o silêncio e a conexão.
                  </p>
                  <cite className="text-sm font-medium not-italic text-[#2B4F8C]">— Sadgati</cite>
                </blockquote>
              </CardContent>
            </Card>

            {/* Bárbara Rocha — card normal, linha 2 col 4 */}
            <Card className="bg-white/70 backdrop-blur-sm border-[#C9A84C]/30 hover:shadow-md hover:bg-white/80 transition-all duration-300">
              <CardContent className="h-full pt-6">
                <blockquote className="grid h-full grid-rows-[auto_1fr_auto] gap-6">
                  <div className="text-[#2B4F8C]">
                    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"></path>
                      <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"></path>
                    </svg>
                  </div>
                  <p className="font-serif italic text-[#2C2C1E]/90 text-base">
                    Percebi ao chegar na Casa da Alquimia a saudade que eu estava de mim mesma. Foi só quando silenciei profundamente que relembrei o tamanho do meu ser e do meu amor. Essa casa promove reencontros profundos e momentos de expansão de consciência como eu não tinha experenciado antes. São momentos raríssimos e muito preciosos ao longo da vida e da busca espiritual.
                  </p>
                  <cite className="text-sm font-medium not-italic text-[#2B4F8C]">— Bárbara Rocha</cite>
                </blockquote>
              </CardContent>
            </Card>

            {/* Thais Mesquita — col-span-2 col-start-3, linha 3 */}
            <Card className="md:col-span-2 md:col-start-3 bg-white/70 backdrop-blur-sm border-[#C9A84C]/30 hover:shadow-md hover:bg-white/80 transition-all duration-300">
              <CardContent className="h-full pt-6">
                <blockquote className="grid h-full grid-rows-[auto_1fr_auto] gap-6">
                  <div className="text-[#2B4F8C]">
                    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"></path>
                      <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"></path>
                    </svg>
                  </div>
                  <p className="font-serif italic text-[#2C2C1E]/90 text-base">
                    Vivi uma experiência transformadora no Casulo: força, magia e acolhimento que trouxeram calma, confiança e a sensação de que algo muito especial está (re)nascendo.
                  </p>
                  <cite className="text-sm font-medium not-italic text-[#2B4F8C]">— Thais Mesquita</cite>
                </blockquote>
              </CardContent>
            </Card>

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
