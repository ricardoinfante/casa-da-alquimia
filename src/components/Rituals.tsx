import React from 'react';
import { Moon, FlaskConical, Brain, Leaf, Flame, Sprout, Sparkles } from 'lucide-react';

const Rituals = () => {
  return <section id="rituals" className="py-12 md:py-20 bg-gradient-to-b from-muted/50 to-background overflow-hidden">
      <div className="section-container relative">
        {/* Decorative Circles */}
        <div className="absolute -top-20 -left-20 w-40 h-40 bg-azul-2/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-verde-3/10 rounded-full blur-3xl"></div>
        
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="chip inline-flex items-center gap-1 mb-4">
            <Sparkles className="h-3 w-3 text-azul-2" />
            <span>O que fazemos</span>
          </span>
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
        }].map((ritual, index) => <div key={index} className="group bg-white/40 backdrop-blur-sm rounded-xl overflow-hidden border border-muted shadow-sm transition-all duration-500 hover:shadow-md hover:bg-white/60 h-full flex flex-col">
              {ritual.image && (
                <div className="h-52 overflow-hidden">
                  <img src={ritual.image} alt={ritual.title} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" loading="lazy" />
                </div>
              )}
              <div className="p-6 md:p-8 flex-1 flex flex-col">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-background/80 rounded-full">{ritual.icon}</div>
                  <h3 className="text-xl font-display font-semibold">{ritual.title}</h3>
                </div>
                
                <p className="text-foreground/80 mb-6 flex-1">{ritual.description}</p>
                
                <div className="space-y-2 mb-4">
                  {ritual.details.map((detail, idx) => <div key={idx} className="flex items-center text-sm text-foreground/70">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary/70 mr-2"></span>
                      {detail}
                    </div>)}
                </div>
                
                {ritual.link && (
                  <a href={ritual.link.href} className="text-primary hover:text-primary/80 text-sm font-medium transition-colors inline-flex items-center gap-1 mt-2">
                    {ritual.link.text}
                    <span>→</span>
                  </a>
                )}
              </div>
            </div>)}
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-foreground/70 mb-6 max-w-2xl mx-auto">
            Todos os rituais são conduzidos por facilitadores experientes, em ambiente apropriado 
            e com toda a preparação necessária para uma experiência segura e transformadora.
          </p>
          
          <a href="#contact" className="px-6 py-3 bg-foreground/5 border border-foreground/10 text-foreground rounded-full font-medium hover:bg-foreground/10 transition-colors inline-flex items-center gap-2">
            Agende uma conversa preparatória
          </a>
        </div>
      </div>
    </section>;
};
export default Rituals;
