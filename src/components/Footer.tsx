import React from 'react';
import { useTranslation } from 'react-i18next';
import { ExternalLink, Facebook, Heart, Instagram, Mail, MapPin, Phone, Sparkles, Youtube } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLocalizedPath } from '@/hooks/useLocalizedPath';

const Footer = () => {
  const { t } = useTranslation();
  const lp = useLocalizedPath();
  const currentYear = new Date().getFullYear();

  return (
    <footer id="contact" className="relative bg-dark border-t border-terra-1/30">
      <div className="section-container py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Coluna 1 - Sobre */}
          <div className="space-y-6 lg:col-span-2">
            <div className="flex items-center gap-3 font-display text-2xl mb-4 group">
              <div className="relative rounded-sm overflow-hidden bg-bg-light p-1">
                <img
                  src="/favicon.png"
                  alt="A Casa da Alquimia Logo"
                  className="h-14 w-auto mix-blend-multiply"
                />
              </div>
              <span className="text-white font-bold">
                A Casa da Alquimia
              </span>
            </div>

            <p className="text-white/70 text-base leading-relaxed max-w-md">
              {t('footer.description')}
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
                <Instagram className="h-5 w-5 text-terra-3" />
              </a>
              <a
                href="https://www.facebook.com/casadaalquimia/"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative p-3 bg-white/10 border border-white/20 rounded-sm transition-colors duration-200 hover:bg-white/20"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5 text-terra-3" />
              </a>
              <a
                href="https://www.youtube.com/@ACasadaAlquimia"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative p-3 bg-white/10 border border-white/20 rounded-sm transition-colors duration-200 hover:bg-white/20"
                aria-label="YouTube"
              >
                <Youtube className="h-5 w-5 text-terra-3" />
              </a>
              <a
                href="mailto:casadaalquimia@gmail.com"
                className="group relative p-3 bg-white/10 border border-white/20 rounded-sm transition-colors duration-200 hover:bg-white/20"
                aria-label="Email"
              >
                <Mail className="h-5 w-5 text-terra-3" />
              </a>
            </div>
          </div>

          {/* Coluna 2 - Links Rápidos */}
          <div className="space-y-6">
            <h3 className="font-display font-bold text-lg flex items-center gap-2 text-white">
              <Sparkles className="h-5 w-5 text-terra-3" />
              {t('footer.quickLinks')}
            </h3>
            <ul className="space-y-3">
              {[
                { name: t('footer.link1'), href: '#about' },
                { name: t('footer.link2'), href: '#rituals' },
                { name: t('footer.link3'), href: '#testimonials' },
              ].map((item, index) => (
                <li key={index}>
                  <a
                    href={item.href}
                    className="text-white/70 hover:text-terra-3 transition-all duration-300 flex items-center gap-2 group"
                  >
                    <div className="w-1 h-1 bg-terra-3/50 rounded-full group-hover:w-2 group-hover:h-2 transition-all" />
                    <span>{item.name}</span>
                  </a>
                </li>
              ))}
              <li>
                <Link
                  to={lp('/politica_de_privacidade')}
                  className="text-white/70 hover:text-terra-3 transition-all duration-300 flex items-center gap-2 group"
                >
                  <div className="w-1 h-1 bg-terra-3/50 rounded-full group-hover:w-2 group-hover:h-2 transition-all" />
                  <span>{t('footer.privacy')}</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Coluna 3 - Contato */}
          <div className="space-y-6">
            <h3 className="font-display font-bold text-lg flex items-center gap-2 text-white">
              <MapPin className="h-5 w-5 text-terra-3" />
              {t('footer.contactTitle')}
            </h3>
            <ul className="space-y-3">
              <li className="group">
                <div className="flex items-start gap-3 p-2.5 bg-white/10 border border-white/20 rounded-sm transition-colors duration-200 hover:bg-white/15">
                  <MapPin className="h-4 w-4 text-terra-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-terra-1 mb-0.5">{t('footer.location1Label')}</p>
                    <span className="text-white/70 text-xs leading-relaxed">
                      {t('footer.location1Address').split('\n').map((line, i) => (
                        <React.Fragment key={i}>{line}{i === 0 && <br />}</React.Fragment>
                      ))}
                    </span>
                  </div>
                </div>
              </li>
              <li className="group">
                <div className="flex items-start gap-3 p-2.5 bg-white/10 border border-white/20 rounded-sm transition-colors duration-200 hover:bg-white/15">
                  <MapPin className="h-4 w-4 text-terra-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-terra-1 mb-0.5">{t('footer.location2Label')}</p>
                    <span className="text-white/70 text-xs leading-relaxed">
                      {t('footer.location2Address').split('\n').map((line, i) => (
                        <React.Fragment key={i}>{line}{i === 0 && <br />}</React.Fragment>
                      ))}
                    </span>
                  </div>
                </div>
              </li>
              <li className="group">
                <a
                  href="https://wa.me/5562996538902?text=Olá!%20Gostaria%20de%20mais%20informações%20sobre%20a%20Casa%20da%20Alquimia"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 bg-white/10 border border-white/20 rounded-sm transition-colors duration-200 hover:bg-white/15"
                >
                  <Phone className="h-5 w-5 text-terra-3 flex-shrink-0" />
                  <div className="flex flex-col">
                    <span className="text-white/70 hover:text-terra-3 transition-colors font-semibold">
                      +55 (62) 99653-8902
                    </span>
                    <span className="text-xs text-terra-3">
                      {t('footer.clickWhatsApp')}
                    </span>
                  </div>
                </a>
              </li>
              <li className="group">
                <a
                  href="mailto:casadaalquimia@gmail.com"
                  className="flex items-center gap-3 p-3 bg-white/10 border border-white/20 rounded-sm transition-colors duration-200 hover:bg-white/15"
                >
                  <Mail className="h-5 w-5 text-terra-3 flex-shrink-0" />
                  <span className="text-white/70 hover:text-terra-3 transition-colors text-sm">
                    casadaalquimia@gmail.com
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar modernizada */}
        <div className="mt-16 pt-8 border-t border-terra-1/30">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2 text-white/60 text-sm">
              <span>&copy; {currentYear} A Casa da Alquimia.</span>
              <Heart className="h-4 w-4 text-accent inline" />
              <span>{t('footer.allRights')}</span>
            </div>

            <div className="flex flex-wrap justify-center gap-6 text-sm">
              {[
                { name: t('footer.terms'), href: "#" },
                { name: t('footer.cookies'), href: "#" }
              ].map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  className="text-white/60 hover:text-terra-3 transition-colors inline-flex items-center gap-1 group"
                >
                  <span>{item.name}</span>
                  <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              ))}
              <Link
                to={lp('/politica_de_privacidade')}
                className="text-white/60 hover:text-terra-3 transition-colors inline-flex items-center gap-1 group"
              >
                <span>{t('footer.privacyShort')}</span>
                <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            </div>
          </div>

          {/* Desenvolvido por */}
          <div className="mt-6 text-center">
            <p className="text-xs text-white/40">
              {t('footer.madeWith')} <span className="text-accent">♥</span> {t('footer.forConsciousness')}
            </p>
          </div>
        </div>
      </div>

      <div className="border-t border-terra-1/30"></div>
    </footer>
  );
};

export default Footer;
