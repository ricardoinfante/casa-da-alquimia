import { ExternalLink, Facebook, Heart, Instagram, Mail, MapPin, Phone, Sparkles } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer id="contact" className="relative bg-gradient-to-b from-background to-muted/50 border-t border-foreground/10">
      {/* Background decorativo */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-secondary rounded-full blur-3xl" />
      </div>
      
      <div className="section-container py-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Coluna 1 - Sobre */}
          <div className="space-y-6 lg:col-span-2">
            <div className="flex items-center gap-3 font-display text-2xl mb-4 group">
              <div className="relative">
                <img 
                  src="/favicon.png" 
                  alt="A Casa da Alquimia Logo" 
                  className="h-14 w-auto transition-transform group-hover:scale-110 duration-300" 
                />
                <div className="absolute -inset-2 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full opacity-0 group-hover:opacity-100 blur transition-opacity duration-300" />
              </div>
              <span className="bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent font-bold">
                A Casa da Alquimia
              </span>
            </div>
            
            <p className="text-foreground/70 text-base leading-relaxed max-w-md">
              Um santuário dedicado à expansão da consciência e ao autoconhecimento através de rituais ancestrais e práticas de meditação.
            </p>
            
            {/* Social Links modernos */}
            <div className="flex flex-wrap gap-3 pt-4">
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="group relative p-3 bg-white/60 backdrop-blur-sm hover:bg-primary/10 rounded-2xl transition-all duration-300 hover:scale-110 hover:shadow-lg border border-white/20"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5 text-primary group-hover:scale-110 transition-transform" />
                <div className="absolute -inset-1 bg-gradient-to-r from-primary/30 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 blur transition-opacity" />
              </a>
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="group relative p-3 bg-white/60 backdrop-blur-sm hover:bg-primary/10 rounded-2xl transition-all duration-300 hover:scale-110 hover:shadow-lg border border-white/20"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5 text-primary group-hover:scale-110 transition-transform" />
                <div className="absolute -inset-1 bg-gradient-to-r from-primary/30 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 blur transition-opacity" />
              </a>
              <a 
                href="mailto:casadaalquimia@gmail.com" 
                className="group relative p-3 bg-white/60 backdrop-blur-sm hover:bg-primary/10 rounded-2xl transition-all duration-300 hover:scale-110 hover:shadow-lg border border-white/20"
                aria-label="Email"
              >
                <Mail className="h-5 w-5 text-primary group-hover:scale-110 transition-transform" />
                <div className="absolute -inset-1 bg-gradient-to-r from-primary/30 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 blur transition-opacity" />
              </a>
            </div>
          </div>
          
          {/* Coluna 2 - Links Rápidos */}
          <div className="space-y-6">
            <h3 className="font-display font-bold text-lg flex items-center gap-2 text-foreground">
              <Sparkles className="h-5 w-5 text-primary" />
              Links Rápidos
            </h3>
            <ul className="space-y-3">
              {[
                { name: "Sobre Nós", href: "#about" },
                { name: "Nossas alquimias em movimento", href: "#rituals" },
                { name: "Depoimentos", href: "#testimonials" },
                { name: "FAQ", href: "#about" },
                { name: "Política de Privacidade", href: "#" }
              ].map((item, index) => (
                <li key={index}>
                  <a 
                    href={item.href} 
                    className="text-foreground/70 hover:text-primary transition-all duration-300 flex items-center gap-2 group"
                  >
                    <div className="w-1 h-1 bg-primary/50 rounded-full group-hover:w-2 group-hover:h-2 transition-all" />
                    <span>{item.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Coluna 3 - Contato */}
          <div className="space-y-6">
            <h3 className="font-display font-bold text-lg flex items-center gap-2 text-foreground">
              <MapPin className="h-5 w-5 text-primary" />
              Contato
            </h3>
            <ul className="space-y-5">
              <li className="group">
                <div className="flex items-start gap-3 p-3 bg-white/40 backdrop-blur-sm rounded-xl border border-white/20 hover:border-primary/30 hover:bg-white/60 transition-all duration-300">
                  <MapPin className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-foreground/70 text-sm leading-relaxed">
                    Estrada da Usina, Fazenda Miraflores<br />
                    Cavalcante, Goiás
                  </span>
                </div>
              </li>
              <li className="group">
                <a 
                  href="https://wa.me/5562996538902?text=Olá!%20Gostaria%20de%20mais%20informações%20sobre%20a%20Casa%20da%20Alquimia"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 bg-white/40 dark:bg-gray-800/40 backdrop-blur-sm rounded-xl border border-white/20 hover:border-green-500/50 hover:bg-green-50/60 dark:hover:bg-green-900/20 transition-all duration-300"
                >
                  <Phone className="h-5 w-5 text-green-600 flex-shrink-0" />
                  <div className="flex flex-col">
                    <span className="text-foreground/70 dark:text-gray-300 hover:text-green-600 transition-colors font-semibold">
                      +55 (62) 99653-8902
                    </span>
                    <span className="text-xs text-green-600 dark:text-green-400">
                      Clique para WhatsApp
                    </span>
                  </div>
                </a>
              </li>
              <li className="group">
                <a 
                  href="mailto:casadaalquimia@gmail.com" 
                  className="flex items-center gap-3 p-3 bg-white/40 backdrop-blur-sm rounded-xl border border-white/20 hover:border-primary/30 hover:bg-white/60 transition-all duration-300"
                >
                  <Mail className="h-5 w-5 text-primary flex-shrink-0" />
                  <span className="text-foreground/70 hover:text-primary transition-colors text-sm">
                    casadaalquimia@gmail.com
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Bottom bar modernizada */}
        <div className="mt-16 pt-8 border-t border-foreground/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2 text-foreground/60 text-sm">
              <span>&copy; {currentYear} A Casa da Alquimia.</span>
              <Heart className="h-4 w-4 text-accent inline animate-pulse" />
              <span>Todos os direitos reservados.</span>
            </div>
            
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              {[
                { name: "Termos de Uso", href: "#" },
                { name: "Privacidade", href: "#" },
                { name: "Cookies", href: "#" }
              ].map((item, index) => (
                <a 
                  key={index}
                  href={item.href} 
                  className="text-foreground/60 hover:text-primary transition-colors inline-flex items-center gap-1 group"
                >
                  <span>{item.name}</span>
                  <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              ))}
            </div>
          </div>
          
          {/* Desenvolvido por */}
          <div className="mt-6 text-center">
            <p className="text-xs text-foreground/40">
              Desenvolvido com <span className="text-accent">♥</span> para a expansão da consciência
            </p>
          </div>
        </div>
      </div>
      
      {/* Gradiente decorativo final */}
      <div className="h-1 bg-gradient-to-r from-primary/50 via-accent/50 to-secondary/50"></div>
    </footer>
  );
};

export default Footer;
