
import { Facebook, Instagram, Leaf, Mail, MapPin, Phone } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer id="contact" className="bg-muted/30 border-t border-muted">
      <div className="section-container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="space-y-4">
            <div className="flex items-center gap-2 font-display text-xl mb-2">
              <Leaf className="h-5 w-5 text-spirit-600" />
              <span>A Casa da Alquimia</span>
            </div>
            
            <p className="text-foreground/70 text-sm">
              Um santuário dedicado à expansão da consciência e ao autoconhecimento através de rituais sagrados com ayahuasca.
            </p>
            
            <div className="flex space-x-4 pt-2">
              <a 
                href="https://www.facebook.com/casadaalquimia/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 bg-foreground/5 rounded-full text-green-400 hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a 
                href="https://www.instagram.com/casadaalquimia/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 bg-foreground/5 rounded-full text-green-400 hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a 
                href="https://www.youtube.com/@ACasadaAlquimia" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 bg-foreground/5 rounded-full text-green-400 hover:text-white transition-colors"
                aria-label="YouTube"
              >
                {/* Youtube icon precisa ser importado */}
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a2.994 2.994 0 0 0-2.107-2.12C19.228 3.5 12 3.5 12 3.5s-7.228 0-9.391.566A2.994 2.994 0 0 0 .502 6.186C0 8.36 0 12 0 12s0 3.64.502 5.814a2.994 2.994 0 0 0 2.107 2.12C4.772 20.5 12 20.5 12 20.5s7.228 0 9.391-.566a2.994 2.994 0 0 0 2.107-2.12C24 15.64 24 12 24 12s0-3.64-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-display font-semibold mb-4">Rituais</h3>
            <ul className="space-y-3">
              {[
                "Cerimônias",
                "Feitio",
                "Meditações Guiadas",
                "Workshops de Integração",
                "Retiros de Silêncio"
              ].map((item, index) => (
                <li key={index}>
                  <a 
                    href="#rituals" 
                    className="text-foreground/70 hover:text-primary transition-colors link-underline"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="font-display font-semibold mb-4">Links Úteis</h3>
            <ul className="space-y-3">
              {[
                {name: "Sobre Nós", href: "#about"},
                {name: "Ayahuasca e Segurança", href: "#about"},
                {name: "Preparação para Rituais", href: "#rituals"},
                {name: "FAQ", href: "#about"},
                {name: "Política de Privacidade", href: "#"}
              ].map((item, index) => (
                <li key={index}>
                  <a 
                    href={item.href} 
                    className="text-foreground/70 hover:text-primary transition-colors link-underline"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="font-display font-semibold mb-4">Contato</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-spirit-600 mt-0.5" />
                <span className="text-foreground/70">
                  Estrada da Usina, Fazenda Miraflores<br/>
                  Cavalcante, Goiás<br/>
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-spirit-600" />
                <a 
                  href="tel:+5562965389022" 
                  className="text-foreground/70 hover:text-primary transition-colors link-underline"
                >
                  +55 (62) 9653-8902
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-spirit-600" />
                <a 
                  href="mailto:contato@acasadaalquimia.com.br" 
                  className="text-foreground/70 hover:text-primary transition-colors link-underline"
                >
                  contato@acasadaalquimia.com.br
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-14 pt-8 border-t border-muted flex flex-col md:flex-row justify-between items-center">
          <div className="text-foreground/60 text-sm mb-4 md:mb-0">
            &copy; {currentYear} A Casa da Alquimia. Todos os direitos reservados.
          </div>
          
          <div className="flex flex-wrap justify-center gap-4 text-sm text-foreground/60">
            <a href="#" className="hover:text-primary transition-colors link-underline">Termos de Uso</a>
            <a href="#" className="hover:text-primary transition-colors link-underline">Política de Privacidade</a>
            <a href="#" className="hover:text-primary transition-colors link-underline">Política de Cookies</a>
          </div>
        </div>
      </div>
      
      <div className="bg-gradient-to-r from-spirit-500/20 via-nature-500/20 to-earth-500/20 h-1"></div>
    </footer>
  );
};

export default Footer;
