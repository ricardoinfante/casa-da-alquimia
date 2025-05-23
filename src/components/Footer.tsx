import React from 'react';
import { Instagram, Facebook, Mail, MapPin, Phone } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return <footer id="contact" className="bg-muted/30 border-t border-muted">
      <div className="section-container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="space-y-4">
            <div className="flex items-center gap-2 font-display text-xl mb-2">
              <img src="/lovable-uploads/80c43e92-35ac-4e66-a9bf-727ba993b5f9.png" alt="A Casa da Alquimia Logo" className="h-12 w-auto" />
              <span>A Casa da Alquimia</span>
            </div>
            
            <p className="text-foreground/70 text-sm">Trabalhamos pela evolução do ser humano ― no sentido de desenvolver suas virtudes verdadeiramente morais, intelectuais e espirituais ― sem preconceitos de origem, religião, raça, gênero, idade.</p>
            
            <div className="flex space-x-4 pt-2">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-foreground/5 rounded-full text-iconblue hover:text-spirit-600 hover:bg-spirit-50 transition-colors" aria-label="Instagram">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-foreground/5 rounded-full text-iconblue hover:text-spirit-600 hover:bg-spirit-50 transition-colors" aria-label="Facebook">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="mailto:contato@acasadaalquimia.com.br" className="p-2 bg-foreground/5 rounded-full text-iconblue hover:text-spirit-600 hover:bg-spirit-50 transition-colors" aria-label="Email">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-display font-semibold mb-4">Rituais</h3>
            <ul className="space-y-3">
              {["Cerimônias", "Feitio", "Meditações Guiadas", "Workshops de Integração", "Retiros de Silêncio"].map((item, index) => <li key={index}>
                  <a href="#rituals" className="text-foreground/70 hover:text-primary transition-colors link-underline">
                    {item}
                  </a>
                </li>)}
            </ul>
          </div>
          
          <div>
            <h3 className="font-display font-semibold mb-4">Links Úteis</h3>
            <ul className="space-y-3">
              {[{
              name: "Sobre Nós",
              href: "#about"
            }, {
              name: "Ayahuasca e Segurança",
              href: "#about"
            }, {
              name: "Preparação para Rituais",
              href: "#rituals"
            }, {
              name: "FAQ",
              href: "#about"
            }, {
              name: "Política de Privacidade",
              href: "#"
            }].map((item, index) => <li key={index}>
                  <a href={item.href} className="text-foreground/70 hover:text-primary transition-colors link-underline">
                    {item.name}
                  </a>
                </li>)}
            </ul>
          </div>
          
          <div>
            <h3 className="font-display font-semibold mb-4">Contato</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-iconblue mt-0.5" />
                <span className="text-foreground/70">
                  Estrada da Usina, Fazenda Miraflores<br />
                  Cavalcante, Goiás<br />
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-iconblue" />
                <a href="tel:+5562965389022" className="text-foreground/70 hover:text-primary transition-colors link-underline">+55 (62) 99653-8902</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-iconblue" />
                <a href="mailto:contato@acasadaalquimia.com.br" className="text-foreground/70 hover:text-primary transition-colors link-underline">casadaalquimia@gmail.com
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
    </footer>;
};

export default Footer;
