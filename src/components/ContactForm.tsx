import { useToast } from '@/hooks/use-toast';
import { Check, Mail, MessageCircle, MessageSquare, Phone, User } from 'lucide-react';
import React, { useState } from 'react';

const ContactForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Construir mensagem para WhatsApp
      const whatsappMessage = `
*Nova mensagem do site Casa da Alquimia*

*Nome:* ${formData.name}
*Email:* ${formData.email}
${formData.phone ? `*Telefone:* ${formData.phone}` : ''}

*Mensagem:*
${formData.message}
      `.trim();

      // Construir email
      const emailSubject = encodeURIComponent(`Contato de ${formData.name} - Casa da Alquimia`);
      const emailBody = encodeURIComponent(`
Nome: ${formData.name}
Email: ${formData.email}
${formData.phone ? `Telefone: ${formData.phone}` : ''}

Mensagem:
${formData.message}
      `.trim());
      
      const mailtoURL = `mailto:contato@acasadaalquimia.com.br?subject=${emailSubject}&body=${emailBody}`;

      // Codificar mensagem para URL do WhatsApp
      const encodedMessage = encodeURIComponent(whatsappMessage);
      const whatsappURL = `https://wa.me/5562996538902?text=${encodedMessage}`;
      
      // Aguardar um momento para feedback visual
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Abrir email
      window.location.href = mailtoURL;
      
      // Aguardar um pouco e então abrir WhatsApp
      setTimeout(() => {
        window.open(whatsappURL, '_blank', 'noopener,noreferrer');
      }, 1000);
      
      setIsSuccess(true);
      toast({
        title: "Abrindo Email e WhatsApp!",
        description: "Sua mensagem pode ser enviada por email e/ou WhatsApp.",
      });

      // Reset form
      setFormData({ name: '', email: '', phone: '', message: '' });
      
      setTimeout(() => setIsSuccess(false), 3000);
    } catch (error) {
      toast({
        title: "Erro ao processar",
        description: "Por favor, tente novamente mais tarde.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact-form" className="py-16 md:py-24 bg-gradient-to-b from-background to-muted/30 relative overflow-hidden">
      <div className="absolute inset-0 bg-noise opacity-5"></div>
      
      <div className="section-container relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="chip inline-flex items-center gap-1 mb-4">
              <Mail className="h-3 w-3 text-azul-2" />
              <span>Entre em contato</span>
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
              Tem alguma dúvida?
              <span className="gradient-heading ml-2 block md:inline">Fale conosco</span>
            </h2>
            <p className="text-foreground/80 text-lg max-w-2xl mx-auto">
              Preencha o formulário abaixo e entraremos em contato o mais breve possível 
              para responder suas perguntas sobre nossos rituais e atividades.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 md:p-10 shadow-lg border border-muted">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="name" className="text-sm font-medium text-foreground/80 dark:text-gray-300 mb-2 flex items-center gap-2">
                  <User className="h-4 w-4 text-azul-2" />
                  Nome completo *
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-muted bg-white/50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  placeholder="Seu nome"
                  aria-required="true"
                />
              </div>

              <div>
                <label htmlFor="email" className="text-sm font-medium text-foreground/80 dark:text-gray-300 mb-2 flex items-center gap-2">
                  <Mail className="h-4 w-4 text-azul-2" />
                  E-mail *
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-muted bg-white/50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  placeholder="seu@email.com"
                  aria-required="true"
                />
              </div>
            </div>

            <div className="mb-6">
              <label htmlFor="phone" className="text-sm font-medium text-foreground/80 dark:text-gray-300 mb-2 flex items-center gap-2">
                <Phone className="h-4 w-4 text-azul-2" />
                Telefone (opcional)
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-muted bg-white/50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                placeholder="(00) 00000-0000"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="message" className="text-sm font-medium text-foreground/80 dark:text-gray-300 mb-2 flex items-center gap-2">
                <MessageSquare className="h-4 w-4 text-azul-2" />
                Mensagem *
              </label>
              <textarea
                id="message"
                name="message"
                required
                value={formData.message}
                onChange={handleChange}
                rows={6}
                className="w-full px-4 py-3 rounded-lg border border-muted bg-white/50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
                placeholder="Conte-nos sobre sua intenção, dúvidas ou o que gostaria de saber sobre nossos rituais..."
                aria-required="true"
              />
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <p className="text-sm text-foreground/60">
                * Campos obrigatórios
              </p>
              
              <button
                type="submit"
                disabled={isSubmitting || isSuccess}
                className={`
                  px-8 py-3 rounded-full font-semibold transition-all flex items-center gap-2 shadow-lg hover:shadow-xl
                  ${isSuccess 
                    ? 'bg-green-600 text-white' 
                    : 'bg-green-600 text-white hover:bg-green-700'
                  }
                  ${isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:scale-105'}
                `}
                aria-label={isSubmitting ? "Processando mensagem" : "Enviar mensagem"}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processando...
                  </>
                ) : isSuccess ? (
                  <>
                    <Check className="h-5 w-5" />
                    Mensagem Pronta!
                  </>
                ) : (
                  <>
                    <Mail className="h-5 w-5" />
                    Enviar Mensagem
                  </>
                )}
              </button>
            </div>

            <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-lg border border-green-200 dark:border-green-800">
              <div className="flex items-start gap-3">
                <div className="flex gap-1 flex-shrink-0 mt-0.5">
                  <Mail className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  <MessageCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-foreground/80 dark:text-gray-300 font-medium mb-1">
                    � Email + 📱 WhatsApp
                  </p>
                  <p className="text-sm text-foreground/70 dark:text-gray-400">
                    Ao clicar em "Enviar Mensagem", você será redirecionado para seu cliente de email e WhatsApp com a mensagem pré-preenchida. 
                    Escolha qual canal prefere usar! WhatsApp: 
                    <a 
                      href="https://wa.me/5562996538902" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-600 dark:text-green-400 font-semibold hover:underline ml-1"
                    >
                      (62) 99653-8902
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
