import { ArrowRight, Brain, Flame, FlaskConical, Leaf, Moon, Sparkles, Sprout } from 'lucide-react';
import { useState } from 'react';

const Rituals = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  
  return <section id="rituals" className="py-20 md:py-32 bg-gradient-to-b from-background via-muted/20 to-background overflow-hidden relative">
      {/* Background decorativo aprimorado */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      </div>
      
      <div className="section-container relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/80 backdrop-blur-xl border border-white/20 shadow-lg mb-6">
            <Sparkles className="h-4 w-4 text-primary animate-pulse" />
            <span className="text-sm font-semibold text-foreground">O que fazemos</span>
          </span>
          
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            <span className="bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">
              Nossos Rituais
            </span>
          </h2>
          
          <p className="text-lg text-foreground/70">
            Experiências transformadoras guiadas por facilitadores experientes
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {[{
          icon: <Moon className="h-8 w-8 text-azul-2" />,
          title: "Cerimônias com medicina da floresta",
          description: "Rituais que buscam a introspecção por meio da meditação e da expansão da consciência. Podem acontecer no círculo de fogo ou no salão. Também contam com chamadas e algumas músicas de elevação.",
          details: ["Duração: cerca de 6 horas", "Periodicidade: entre em contato para consultar nossa agenda"],
          image: "/recursos/cerimonias.jpeg"
        }, {
          icon: <FlaskConical className="h-8 w-8 text-verde-3" />,
          title: "Preparo das medicinas (feitio)",
          description: "Momento sagrado no qual os participantes vivenciam todo o processo tradicional de preparação e apuração da medicina: da colheita ao engarrafamento.",
          details: ["Duração: 3-7 dias", "Inclui: Colheita, preparo e cerimônias", "Periodicidade: Semestral"],
          image: "/recursos/feitio.jpeg"
        }, {
          icon: <Brain className="h-8 w-8 text-azul-2" />,
          title: "Meditações guiadas",
          description: "Momento diário de introspecção e silêncio como forma de interiorização da rotina do dia a dia e abertura do canal interno para o autoconhecimento e a meditação.",
          details: ["Duração: 1h", "Periodicidade: diariamente"],
          image: "/recursos/meditacao.jpeg"
        }, {
          icon: <Leaf className="h-8 w-8 text-verde-3" />,
          title: "Terapia do Casulo",
          description: "Ritual de reencontro e reabastecimento de si em forma de um casulo com ervas cozidas em que o participante entra em estado meditativo",
          details: ["Duração: pelo menos 3 dias", "Inclui: colheita e preparo das ervas, cozimento e momentos de silêncio e aprofundamento no casulo"],
          link: { text: "Conheça mais aqui", href: "#" },
          image: "/recursos/casulo.jpeg"
        }, {
          icon: <Flame className="h-8 w-8 text-azul-2" />,
          title: "Temazcal (tenda do suor)",
          description: "Ritual de tenda do suor com origem dos povos tradicionais da América Central, que visa purificar corpo e espírito através do contato com os elementos da natureza (terra, ar, fogo e água)",
          details: ["Duração: 4 horas", "Inclui: tenda do suor, meditação e banho de ervas"]
        }, {
          icon: <Sprout className="h-8 w-8 text-verde-3" />,
          title: "Vivência de permacultura e bioconstrução",
          description: "Quem participa ativamente da Casa da Alquimia, tem a oportunidade de vivenciar a prática da permacultura e da bioconstrução em processos coletivos de compartilhamento de saberes",
          details: [],
          image: "/recursos/permacultura.jpeg"
        }].map((ritual, index) => (
            <div 
              key={index} 
              className="group relative h-full"
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Card com efeito 3D e glassmorphism */}
              <div className={`relative h-full bg-white/60 backdrop-blur-xl rounded-3xl overflow-hidden border border-white/20 shadow-lg transition-all duration-500 flex flex-col ${
                hoveredCard === index ? 'shadow-2xl scale-105 -translate-y-2' : ''
              }`}>
                {/* Imagem com overlay gradiente */}
                {ritual.image && (
                  <div className="relative h-64 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent z-10" />
                    <img 
                      src={ritual.image} 
                      alt={ritual.title} 
                      className={`w-full h-full object-cover transition-transform duration-700 ${
                        hoveredCard === index ? 'scale-110' : 'scale-100'
                      }`}
                      loading="lazy" 
                    />
                    
                    {/* Ícone flutuante na imagem */}
                    <div className="absolute top-4 right-4 z-20 p-3 bg-white/90 backdrop-blur-xl rounded-2xl shadow-lg group-hover:scale-110 transition-transform">
                      {ritual.icon}
                    </div>
                  </div>
                )}
                
                {/* Conteúdo do card */}
                <div className="p-6 md:p-8 flex-1 flex flex-col">
                  <h3 className="text-xl md:text-2xl font-display font-bold mb-3 text-foreground group-hover:text-primary transition-colors">
                    {ritual.title}
                  </h3>
                  
                  <p className="text-foreground/70 mb-6 flex-1 leading-relaxed">
                    {ritual.description}
                  </p>
                  
                  {/* Detalhes com ícones */}
                  {ritual.details.length > 0 && (
                    <div className="space-y-3 mb-6 p-4 bg-muted/30 rounded-2xl">
                      {ritual.details.map((detail, idx) => (
                        <div key={idx} className="flex items-start gap-3 text-sm text-foreground/80">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                          <span>{detail}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {/* Link de ação */}
                  {ritual.link && (
                    <a 
                      href={ritual.link.href} 
                      className="inline-flex items-center gap-2 px-5 py-3 bg-primary text-primary-foreground rounded-full font-semibold text-sm hover:shadow-lg hover:shadow-primary/50 transition-all duration-300 hover:gap-3 group/link"
                    >
                      <span>{ritual.link.text}</span>
                      <ArrowRight className="h-4 w-4 group-hover/link:translate-x-1 transition-transform" />
                    </a>
                  )}
                </div>
                
                {/* Brilho de hover */}
                <div className={`absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />
              </div>
              
              {/* Sombra decorativa 3D */}
              <div className="absolute -inset-1 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-3xl -z-10 opacity-0 group-hover:opacity-100 blur-xl transition-all duration-500" />
            </div>
          ))}
        </div>
        
        {/* CTA final modernizado */}
        <div className="mt-20 text-center">
          <div className="max-w-3xl mx-auto p-8 md:p-12 bg-gradient-to-br from-white/70 to-white/40 backdrop-blur-2xl rounded-3xl border border-white/20 shadow-2xl">
            <p className="text-lg md:text-xl text-foreground/80 mb-8 leading-relaxed">
              Todos os rituais são conduzidos por <span className="font-semibold text-primary">facilitadores experientes</span>, em ambiente apropriado e com toda a preparação necessária para uma experiência <span className="font-semibold text-secondary">segura e transformadora</span>.
            </p>
            
            <a 
              href="#contact" 
              className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground rounded-full font-semibold shadow-lg hover:shadow-2xl hover:shadow-primary/50 transition-all duration-300 hover:scale-105 group"
            >
              <span>Agende uma conversa preparatória</span>
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </div>
    </section>;
};
export default Rituals;
