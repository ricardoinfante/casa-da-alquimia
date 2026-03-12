import { ExternalLink, Facebook, Heart, Instagram, Mail, MapPin, Phone, Sparkles } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer id="contact" className="relative bg-dark border-t border-foreground/10">
      <div className="section-container py-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Coluna 1 - Sobre */}
          <div className="space-y-6 lg:col-span-2">
            <div className="flex items-center gap-3 font-display text-2xl mb-4 group">
              <div className="relative">
                <img
                  src="/favicon.png"
                  alt="A Casa da Alquimia Logo"
                  className="h-14 w-auto"
                />
              </div>
              <span className="text-white font-bold">
                A Casa da Alquimia
              </span>
            </div>
            
            <p className="text-white/70 text-base leading-relaxed max-w-md">
              Um santuário dedicado à expansão da consciência e ao autoconhecimento através de rituais ancestrais e práticas de meditação.
            </p>
            
            {/* Social Links modernos */}
            <div className="flex flex-wrap gap-3 pt-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative p-3 bg-white/10 border border-white/20 rounded-sm transition-colors duration-200 hover:bg-white/20"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5 text-primary" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative p-3 bg-white/10 border border-white/20 rounded-sm transition-colors duration-200 hover:bg-white/20"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5 text-primary" />
              </a>
              <a
                href="mailto:casadaalquimia@gmail.com"
                className="group relative p-3 bg-white/10 border border-white/20 rounded-sm transition-colors duration-200 hover:bg-white/20"
                aria-label="Email"
              >
                <Mail className="h-5 w-5 text-primary" />
              </a>
            </div>
          </div>
          
          {/* Coluna 2 - Links Rápidos */}
          <div className="space-y-6">
            <h3 className="font-display font-bold text-lg flex items-center gap-2 text-white">
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
                    className="text-white/70 hover:text-primary transition-all duration-300 flex items-center gap-2 group"
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
            <h3 className="font-display font-bold text-lg flex items-center gap-2 text-white">
              <MapPin className="h-5 w-5 text-primary" />
              Contato
            </h3>
            <ul className="space-y-5">
              <li className="group">
                <div className="flex items-start gap-3 p-3 bg-white/10 border border-white/20 rounded-sm transition-colors duration-200 hover:bg-white/15">
                  <MapPin className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-white/70 text-sm leading-relaxed">
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
                  className="flex items-center gap-3 p-3 bg-white/10 border border-white/20 rounded-sm transition-colors duration-200 hover:bg-white/15"
                >
                  <Phone className="h-5 w-5 text-green-600 flex-shrink-0" />
                  <div className="flex flex-col">
                    <span className="text-white/70 dark:text-gray-300 hover:text-green-600 transition-colors font-semibold">
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
                  className="flex items-center gap-3 p-3 bg-white/10 border border-white/20 rounded-sm transition-colors duration-200 hover:bg-white/15"
                >
                  <Mail className="h-5 w-5 text-primary flex-shrink-0" />
                  <span className="text-white/70 hover:text-primary transition-colors text-sm">
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
            <div className="flex items-center gap-2 text-white/60 text-sm">
              <span>&copy; {currentYear} A Casa da Alquimia.</span>
              <Heart className="h-4 w-4 text-accent inline" />
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
                  className="text-white/60 hover:text-primary transition-colors inline-flex items-center gap-1 group"
                >
                  <span>{item.name}</span>
                  <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              ))}
            </div>
          </div>
          
          {/* Desenvolvido por */}
          <div className="mt-6 text-center">
            <p className="text-xs text-white/40">
              Desenvolvido com <span className="text-accent">♥</span> para a expansão da consciência
            </p>
          </div>
        </div>
      </div>
      
      <div className="border-t border-terra-1/30"></div>
    </footer>
  );
};

export default Footer;
