import { useTranslation } from 'react-i18next';
import { useLocalizedPath } from '@/hooks/useLocalizedPath';
import { ArrowLeft, Mail, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

const PoliticaDePrivacidade = () => {
  const { t } = useTranslation();
  const lp = useLocalizedPath();

  interface PolicySection { title: string; content: string; }
  const sections = t('privacy.sections', { returnObjects: true }) as PolicySection[];

  return (
    <div className="min-h-screen bg-bg-light">
      {/* Header */}
      <header className="bg-dark border-b border-terra-1/30">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <Link
            to={lp('/')}
            className="inline-flex items-center gap-2 text-white/60 hover:text-terra-3 transition-colors text-sm font-body mb-6 group"
          >
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            {t('privacy.back')}
          </Link>

          <div className="flex items-start gap-4">
            <div className="p-3 bg-terra-1/20 border border-terra-1/30 rounded-sm mt-1">
              <Shield className="h-6 w-6 text-terra-3" />
            </div>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-terra-1 font-body mb-2">
                {t('privacy.legalDoc')}
              </p>
              <h1 className="font-display font-bold text-white text-3xl md:text-4xl leading-tight">
                {t('privacy.title')}
              </h1>
              <p className="text-white/50 text-sm font-body mt-2">
                {t('privacy.lastUpdated')}
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Intro */}
      <div className="bg-primary/5 border-b border-primary/10">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <p className="text-dark/80 font-body text-base leading-relaxed">
            A Casa da Alquimia respeita e valoriza a privacidade de todos que fazem parte de nossa comunidade. Esta Política de Privacidade descreve como coletamos, usamos, armazenamos e protegemos suas informações pessoais, em conformidade com a{' '}
            <strong className="text-primary">Lei Geral de Proteção de Dados (LGPD — Lei nº 13.709/2018)</strong>.
            Ao utilizar nosso site ou nos contatar, você concorda com os termos aqui descritos.
          </p>
        </div>
      </div>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="space-y-10">
          {sections.map((section, index) => (
            <section key={index} className="group">
              <div className="flex items-baseline gap-3 mb-4">
                <h2 className="font-display font-semibold text-xl text-primary leading-snug">
                  {section.title}
                </h2>
              </div>
              <div className="border-l-2 border-terra-3/30 pl-5">
                {section.content.split('\n').map((paragraph, i) => {
                  if (!paragraph.trim()) return null;

                  // Bullet-style lines starting with -
                  if (paragraph.trim().startsWith('- ')) {
                    const text = paragraph.trim().slice(2);
                    return (
                      <div key={i} className="flex items-start gap-2 mb-2">
                        <div className="w-1.5 h-1.5 bg-terra-3 rounded-full mt-2 flex-shrink-0" />
                        <p
                          className="text-dark/75 font-body text-base leading-relaxed"
                          dangerouslySetInnerHTML={{
                            __html: text.replace(/\*\*(.*?)\*\*/g, '<strong class="text-dark font-semibold">$1</strong>'),
                          }}
                        />
                      </div>
                    );
                  }

                  return (
                    <p
                      key={i}
                      className="text-dark/75 font-body text-base leading-relaxed mb-3"
                      dangerouslySetInnerHTML={{
                        __html: paragraph.replace(/\*\*(.*?)\*\*/g, '<strong class="text-dark font-semibold">$1</strong>'),
                      }}
                    />
                  );
                })}
              </div>
            </section>
          ))}
        </div>

        {/* Footer CTA */}
        <div className="mt-16 p-6 bg-dark rounded-sm border border-terra-1/30 flex flex-col md:flex-row items-start md:items-center gap-6">
          <div className="flex-1">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-terra-1 font-body mb-1">
              Dúvidas sobre sua privacidade?
            </p>
            <p className="text-white/70 font-body text-sm leading-relaxed">
              Entre em contato. Estamos aqui para garantir a transparência e o respeito ao seu direito de privacidade.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="mailto:casadaalquimia@gmail.com"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-terra-1/20 border border-terra-1/40 rounded-sm text-terra-3 text-sm font-body hover:bg-terra-1/30 transition-colors"
            >
              <Mail className="h-4 w-4" />
              casadaalquimia@gmail.com
            </a>
            <Link
              to={lp('/')}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/10 border border-white/20 rounded-sm text-white/70 text-sm font-body hover:bg-white/20 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              {t('privacy.back')}
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PoliticaDePrivacidade;
