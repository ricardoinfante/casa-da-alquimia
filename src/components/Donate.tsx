
import React, { useState } from 'react';
import { Heart, Sparkles, ArrowRight } from 'lucide-react';
import DonationModal from './DonationModal';

const Donate = () => {
  const [isDonationModalOpen, setIsDonationModalOpen] = useState(false);
  
  return (
    <section id="donate" className="py-20 md:py-32 bg-gradient-to-b from-background to-muted/30 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-spirit-400/10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-earth-400/10 rounded-full blur-3xl"></div>
      
      <div className="section-container relative">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-xl overflow-hidden border border-muted relative z-10">
            <div className="p-8 md:p-12">
              <div className="flex flex-col md:flex-row gap-12 items-center">
                <div className="md:w-3/5 space-y-6">
                  <div className="inline-flex items-center gap-1 chip bg-spirit-500/10 text-spirit-700">
                    <Heart className="h-3 w-3" />
                    <span>Apoie nossa missão</span>
                  </div>
                  
                  <h2 className="text-3xl md:text-4xl font-display font-bold">
                    Sua doação torna possível
                    <span className="gradient-heading ml-2">nossa jornada espiritual</span>
                  </h2>
                  
                  <p className="text-foreground/80 text-lg">
                    Ao contribuir com A Casa da Alquimia, você ajuda a preservar as tradições 
                    ancestrais e permite que pessoas de todos os caminhos tenham acesso 
                    a experiências transformadoras.
                  </p>
                  
                  <div className="space-y-4 pt-2">
                    {[
                      "Manutenção e ampliação do espaço sagrado",
                      "Cultivo sustentável das plantas medicinais",
                      "Bolsas para pessoas sem condições financeiras",
                      "Pesquisa e documentação das tradições ancestrais"
                    ].map((item, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="mt-1 p-1 rounded-full bg-nature-500/10">
                          <Check className="h-3 w-3 text-nature-700" />
                        </div>
                        <span className="text-foreground/80">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="md:w-2/5 bg-gradient-to-br from-spirit-50 to-white p-6 rounded-xl border border-spirit-100">
                  <h3 className="text-xl font-display font-semibold text-center mb-6">
                    Escolha como você deseja contribuir
                  </h3>
                  
                  <div className="space-y-4">
                    <button
                      onClick={() => setIsDonationModalOpen(true)}
                      className="w-full flex items-center justify-between py-4 px-6 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-all duration-300 shadow-sm hover:shadow hover:-translate-y-0.5"
                    >
                      <span className="flex items-center gap-2">
                        <Heart className="h-5 w-5" />
                        Fazer uma doação única
                      </span>
                      <ArrowRight className="h-4 w-4" />
                    </button>
                    
                    <button
                      onClick={() => setIsDonationModalOpen(true)}
                      className="w-full flex items-center justify-between py-4 px-6 bg-white border border-primary/20 text-primary rounded-lg font-medium hover:bg-primary/5 transition-all duration-300"
                    >
                      <span className="flex items-center gap-2">
                        <Sparkles className="h-5 w-5" />
                        Tornar-se doador mensal
                      </span>
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                  
                  <div className="mt-6 text-center text-foreground/60 text-sm">
                    Todas as doações são processadas com segurança
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-16 text-center max-w-2xl mx-auto space-y-4">
            <h3 className="text-2xl font-display font-semibold">
              Outras formas de contribuir
            </h3>
            
            <p className="text-foreground/80">
              Além de doações financeiras, você também pode contribuir com seu tempo, 
              habilidades ou materiais para nossos rituais e atividades.
            </p>
            
            <a 
              href="#contact"
              className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors link-underline font-medium"
            >
              Saiba mais sobre voluntariado
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
      
      <DonationModal 
        isOpen={isDonationModalOpen} 
        onClose={() => setIsDonationModalOpen(false)} 
      />
    </section>
  );
};

const Check = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="3" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

export default Donate;
