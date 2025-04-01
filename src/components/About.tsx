
import React from 'react';
import { Heart, Leaf, Sparkles } from 'lucide-react';
const About = () => {
  return <section id="about" className="py-12 md:py-20 bg-gradient-to-b from-background to-muted/50">
      <div className="section-container">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
          <div className="lg:w-1/2 space-y-6">
            <span className="chip inline-flex items-center gap-1 bg-[#708C5A] text-[#100B0D] px-3 py-1 rounded-full text-xs font-medium">
              <Leaf className="h-3 w-3" />
              <span>Nossa história</span>
            </span>
            
            <h2 className="text-3xl md:text-4xl font-display font-bold">
              A Casa da Alquimia: um santuário de 
              <span className="gradient-heading ml-2 text-[#DAC751]">transformação espiritual</span>
            </h2>
            
            <p className="text-foreground/80 text-lg leading-relaxed">&quot;A Casa da Alquimia é um farol, um espaço para as pessoas que estão chegando para meditar.&quot; - Jalal</p>
            
            <p className="text-foreground/80 text-lg leading-relaxed font-normal">A Casa da Alquimia é um espaço sagrado e transformador, guiado pelo propósito de promover a cura, o autoconhecimento e a conexão espiritual por meio da Medicina Sagrada da Ayahuasca. Como uma associação sem fins lucrativos, somos movidos pelo desejo genuíno de servir à verdade, à luz e ao bem-estar de cada ser que se une a nós nessa jornada. Nosso compromisso está alicerçado em pilares sólidos que perpassam áreas essenciais da vida, como música, meditação, terapias, yoga, reinados, culinária, permacultura, educação, retiros e artes. Acreditamos na força unificadora desses elementos, que, em harmonia, criam um ambiente propício à transformação interior e à elevação da consciência.</p>
            
            <div className="mt-10">
              <p className="text-foreground/80 text-lg leading-relaxed font-normal">Na Casa da Alquimia, cada ritual é uma celebração da vida e um convite ao reencontro com a essência divina que habita em cada um de nós. Nossa missão é honrar e expandir os conhecimentos ancestrais que nos foram transmitidos, integrando práticas de cura profunda, autocuidado e crescimento espiritual. Aqui, você encontrará um espaço acolhedor, dedicado ao despertar do potencial humano e à comunhão com a Mãe Terra, em todos os seus aspectos.</p>
            </div>
            
            <div className="mt-10">
              <p className="text-foreground/80 text-lg leading-relaxed font-normal">Venha conhecer nosso trabalho e embarque em uma experiência que transcende o individual, conectando-nos ao coletivo e ao sagrado, em um caminho de amor, verdade e harmonia.</p>
            </div>
          </div>
          
          <div className="lg:w-1/2 relative">
            <div className="relative z-10 rounded-2xl overflow-hidden shadow-xl">
              <img src="/lovable-uploads/ac57f24e-68d6-46c2-aafc-a7107053254a.png" alt="Arte representando a alquimia espiritual" className="w-full h-auto object-contain" loading="lazy" />
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -z-10 -top-6 -left-6 right-6 bottom-6 rounded-2xl border border-primary/20 bg-primary/5"></div>
            <div className="absolute -right-5 -bottom-5 w-24 h-24 rounded-full bg-nature-500/20 blur-xl"></div>
          </div>
        </div>
      </div>
    </section>;
};
export default About;
