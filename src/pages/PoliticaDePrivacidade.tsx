import { ArrowLeft, MapPin, Mail, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

const sections = [
  {
    title: "1. Quem Somos",
    content: `A Casa da Alquimia é um espaço sagrado dedicado à expansão da consciência, ao autoconhecimento e às práticas ancestrais de cura. Atuamos em dois espaços físicos localizados em Cavalcante, Goiás, Brasil, e nos comunicamos com nossa comunidade por meio do site e das redes sociais.

Para fins desta política, o responsável pelo tratamento de dados é a Casa da Alquimia, podendo ser contactada pelo e-mail casadaalquimia@gmail.com.`,
  },
  {
    title: "2. Dados que Coletamos",
    content: `Coletamos apenas os dados estritamente necessários para manter nossa relação com a comunidade:

**Dados fornecidos voluntariamente por você:**
- Nome e endereço de e-mail ao preencher formulários de contato ou inscrições em retiros e atividades;
- Número de telefone / WhatsApp quando você inicia uma conversa conosco;
- Mensagens e conteúdos enviados por meio de formulários ou canais de comunicação.

**Dados coletados automaticamente:**
- Informações técnicas de acesso (endereço IP, tipo de navegador, páginas visitadas e tempo de navegação), coletadas por ferramentas de análise de tráfego para fins estatísticos.`,
  },
  {
    title: "3. Como Usamos Seus Dados",
    content: `Utilizamos as informações coletadas exclusivamente para:

- Responder às suas dúvidas, solicitações e mensagens;
- Informar sobre retiros, workshops, eventos e práticas realizados pela Casa da Alquimia;
- Enviar comunicações sobre conteúdos relacionados ao bem-estar, meditação e práticas ancestrais, quando você optar por recebê-las;
- Melhorar a experiência de navegação em nosso site;
- Cumprir obrigações legais quando necessário.

Seus dados nunca serão vendidos, alugados ou compartilhados com terceiros para fins comerciais.`,
  },
  {
    title: "4. Base Legal para o Tratamento",
    content: `O tratamento de dados pessoais pela Casa da Alquimia está fundamentado nas seguintes bases legais previstas na Lei Geral de Proteção de Dados (Lei nº 13.709/2018 — LGPD):

- **Consentimento:** quando você preenche nossos formulários ou assina nossa lista de comunicações;
- **Legítimo interesse:** para análise estatística de uso do site e melhoria contínua dos serviços;
- **Execução de contrato ou procedimentos preliminares:** ao processar inscrições em retiros e atividades.`,
  },
  {
    title: "5. Compartilhamento de Dados",
    content: `Podemos compartilhar seus dados apenas nas seguintes situações:

- **Prestadores de serviço:** plataformas de envio de e-mail, ferramentas de análise e sistemas de pagamento, exclusivamente para operar nossos serviços — todos sujeitos a obrigações de confidencialidade;
- **Obrigação legal:** quando exigido por autoridades competentes ou por determinação judicial;
- **Proteção de direitos:** quando necessário para fazer valer nossos direitos legais.

Seus dados **não são compartilhados** com empresas de marketing, anunciantes ou quaisquer outros terceiros sem relação direta com a prestação de nossos serviços.`,
  },
  {
    title: "6. Cookies e Tecnologias de Rastreamento",
    content: `Nosso site pode utilizar cookies e tecnologias similares para:

- Garantir o funcionamento correto das páginas (cookies essenciais);
- Analisar o comportamento de navegação de forma agregada e anônima (cookies analíticos);
- Exibir conteúdo de plataformas externas como YouTube, Spotify e Instagram incorporadas ao site.

Você pode configurar seu navegador para recusar cookies ou ser alertado quando cookies estiverem sendo enviados. Ao desativar cookies essenciais, algumas funcionalidades do site podem não operar corretamente.`,
  },
  {
    title: "7. Serviços de Terceiros",
    content: `Este site incorpora ou contém links para serviços de terceiros, incluindo:

- **Instagram, Facebook e YouTube** — redes sociais gerenciadas por seus próprios termos e políticas de privacidade;
- **WhatsApp (Meta)** — utilizado como canal de atendimento;
- **Spotify** — player de áudio incorporado para difusão de conteúdo musical e meditativo.

Recomendamos a leitura das políticas de privacidade de cada uma dessas plataformas, pois a Casa da Alquimia não tem controle sobre a coleta de dados realizada por elas.`,
  },
  {
    title: "8. Retenção de Dados",
    content: `Mantemos seus dados pelo tempo necessário para cumprir as finalidades descritas nesta política ou por prazo exigido por lei. Dados de inscrições em atividades e eventos são mantidos enquanto houver relação ativa e por até 5 anos após o encerramento, para fins de obrigações legais. Dados de contato e listas de comunicação são mantidos até que você solicite a exclusão.`,
  },
  {
    title: "9. Seus Direitos (LGPD)",
    content: `Nos termos da LGPD, você tem o direito de:

- **Confirmar** a existência de tratamento dos seus dados pessoais;
- **Acessar** os dados que temos sobre você;
- **Corrigir** dados incompletos, inexatos ou desatualizados;
- **Solicitar a anonimização, bloqueio ou eliminação** de dados desnecessários ou tratados em desconformidade;
- **Portabilidade** dos seus dados a outro fornecedor de serviço;
- **Revogar o consentimento** a qualquer momento, sem prejuízo da licitude do tratamento realizado anteriormente;
- **Opor-se** ao tratamento realizado com fundamento em outras bases legais, em caso de descumprimento.

Para exercer qualquer desses direitos, entre em contato pelo e-mail: casadaalquimia@gmail.com. Responderemos no prazo de até 15 dias úteis.`,
  },
  {
    title: "10. Segurança dos Dados",
    content: `Adotamos medidas técnicas e organizacionais adequadas para proteger seus dados contra acesso não autorizado, perda, alteração ou divulgação indevida. No entanto, nenhuma transmissão de dados pela internet é completamente segura. Caso identifique qualquer vulnerabilidade ou incidente relacionado aos seus dados, entre em contato imediatamente.`,
  },
  {
    title: "11. Alterações nesta Política",
    content: `Esta política pode ser atualizada periodicamente para refletir mudanças em nossas práticas ou em exigências legais. A versão mais recente estará sempre disponível nesta página, com a data da última atualização indicada no rodapé. Recomendamos a revisão periódica deste documento.`,
  },
  {
    title: "12. Contato e Encarregado de Dados",
    content: `Para dúvidas, solicitações ou exercício dos seus direitos relacionados a esta política, entre em contato:

**Casa da Alquimia**
E-mail: casadaalquimia@gmail.com
WhatsApp: +55 (62) 99653-8902

Espaço Coração de Luz — Rua Cel José Paulino da Silva, Centro, Cavalcante, Goiás
Casa da Alquimia — Estrada da Usina, Fazenda Miraflores, Cavalcante, Goiás`,
  },
];

const PoliticaDePrivacidade = () => {
  return (
    <div className="min-h-screen bg-bg-light">
      {/* Header */}
      <header className="bg-dark border-b border-terra-1/30">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-white/60 hover:text-terra-3 transition-colors text-sm font-body mb-6 group"
          >
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            Voltar ao site
          </Link>

          <div className="flex items-start gap-4">
            <div className="p-3 bg-terra-1/20 border border-terra-1/30 rounded-sm mt-1">
              <Shield className="h-6 w-6 text-terra-3" />
            </div>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-terra-1 font-body mb-2">
                Documento Legal
              </p>
              <h1 className="font-display font-bold text-white text-3xl md:text-4xl leading-tight">
                Política de Privacidade
              </h1>
              <p className="text-white/50 text-sm font-body mt-2">
                Última atualização: março de 2026
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
              to="/"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/10 border border-white/20 rounded-sm text-white/70 text-sm font-body hover:bg-white/20 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Voltar ao site
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PoliticaDePrivacidade;
