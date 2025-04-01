
import React, { useState } from 'react';
import { Heart } from 'lucide-react';
import DonationModal from './DonationModal';

const Donate = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  return (
    <section id="donate" className="py-16 md:py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-[#CDE9EC]/40 to-[#CDE9EC]/20"></div>
      <div className="absolute inset-0 bg-noise opacity-5"></div>
      
      <div className="section-container relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="chip inline-flex items-center gap-1 mb-4">
            <Heart className="h-3 w-3 text-[#120F52]" />
            <span>Apoie nossa missão</span>
          </span>
          
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
            Contribua para a 
            <span className="gradient-heading ml-2">preservação da medicina</span>
          </h2>
          
          <p className="text-foreground/80 text-lg max-w-2xl mx-auto">
            Sua contribuição ajuda a manter nosso espaço sagrado, apoiar comunidades indígenas e preservar
            o conhecimento ancestral sobre as plantas de poder.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Apoio Único (agora à esquerda) */}
          <div className="p-6 md:p-8 bg-white/70 backdrop-blur-sm rounded-xl border border-muted shadow-sm flex flex-col justify-between h-full">
            <div>
              <h3 className="text-xl font-display font-semibold mb-4">Apoio Único</h3>
              <p className="text-foreground/70 mb-6">
                Faça uma contribuição única para apoiar nossos projetos e a manutenção do espaço.
              </p>
              <ul className="space-y-2 mb-8">
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#264F7D] mt-2 mr-2"></span>
                  <span className="text-foreground/70">Certificado de agradecimento</span>
                </li>
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#264F7D] mt-2 mr-2"></span>
                  <span className="text-foreground/70">Menção especial em nosso espaço</span>
                </li>
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#264F7D] mt-2 mr-2"></span>
                  <span className="text-foreground/70">Convite para próxima cerimônia</span>
                </li>
              </ul>
            </div>
            <button onClick={() => setIsModalOpen(true)} className="w-full px-6 py-3 bg-[#264F7D] text-white rounded-full font-medium hover:bg-[#264F7D]/90 transition-all">
              Fazer uma doação
            </button>
          </div>
          
          {/* Apoio Mensal (agora no centro com a tag mais popular) */}
          <div className="p-6 md:p-8 bg-white/90 backdrop-blur-sm rounded-xl border border-[#264F7D]/20 shadow-md flex flex-col justify-between h-full relative overflow-hidden">
            <div className="absolute -right-12 -top-12 w-24 h-24 bg-[#264F7D]/10 rounded-full blur-xl"></div>
            <div className="absolute -left-12 -bottom-12 w-24 h-24 bg-[#708C5A]/10 rounded-full blur-xl"></div>
            
            <div className="relative z-10">
              <div className="bg-[#DAC751] text-[#100B0D] text-xs font-bold uppercase tracking-wider py-1 px-3 rounded-full inline-block mb-4">
                Mais popular
              </div>
              
              <h3 className="text-xl font-display font-semibold mb-4">Apoio Mensal</h3>
              <p className="text-foreground/70 mb-6">
                Torne-se um apoiador recorrente da nossa comunidade e ajude a manter o espaço sagrado.
              </p>
              <ul className="space-y-2 mb-8">
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#264F7D] mt-2 mr-2"></span>
                  <span className="text-foreground/70">Acesso a conteúdo exclusivo</span>
                </li>
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#264F7D] mt-2 mr-2"></span>
                  <span className="text-foreground/70">Convites para eventos especiais</span>
                </li>
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#264F7D] mt-2 mr-2"></span>
                  <span className="text-foreground/70">10% de desconto em nossas cerimônias</span>
                </li>
              </ul>
            </div>
            
            <button onClick={() => setIsModalOpen(true)} className="w-full px-6 py-3 bg-[#264F7D] text-white rounded-full font-medium hover:bg-[#264F7D]/90 transition-all relative z-10">
              Contribuir mensalmente
            </button>
          </div>
          
          {/* Apoio a projetos (permanece à direita) */}
          <div className="p-6 md:p-8 bg-white/70 backdrop-blur-sm rounded-xl border border-muted shadow-sm flex flex-col justify-between h-full">
            <div>
              <h3 className="text-xl font-display font-semibold mb-4">Apoio a projetos</h3>
              <p className="text-foreground/70 mb-6">
                Contribua para projetos específicos de preservação da medicina e apoio às comunidades.
              </p>
              <ul className="space-y-2 mb-8">
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#264F7D] mt-2 mr-2"></span>
                  <span className="text-foreground/70">Relatórios de impacto do projeto</span>
                </li>
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#264F7D] mt-2 mr-2"></span>
                  <span className="text-foreground/70">Participação em reuniões de feedback</span>
                </li>
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#264F7D] mt-2 mr-2"></span>
                  <span className="text-foreground/70">Reconhecimento como parceiro</span>
                </li>
              </ul>
            </div>
            <button onClick={() => setIsModalOpen(true)} className="w-full px-6 py-3 bg-[#264F7D] text-white rounded-full font-medium hover:bg-[#264F7D]/90 transition-all">
              Apoiar projetos
            </button>
          </div>
        </div>
        
        <div className="bg-white/50 backdrop-blur-sm p-6 rounded-xl border border-muted shadow-sm max-w-2xl mx-auto">
          <h3 className="text-lg font-semibold font-display mb-4 text-center">Nosso compromisso de transparência</h3>
          <p className="text-foreground/70 text-sm text-center mb-0">Todas as contribuições são direcionadas para a manutenção dos nossos espaços, construções e melhorias de novos serviços e apoios, cuidados com as os reinados de Chacrona e Cipó. </p>
        </div>
      </div>
      
      <DonationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
};

export default Donate;
