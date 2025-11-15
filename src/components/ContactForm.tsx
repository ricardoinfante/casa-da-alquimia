import { useToast } from '@/hooks/use-toast';
import { AlertCircle, Check, Mail, MessageSquare, Send, User } from 'lucide-react';
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
      // Simulação de envio - aqui você integraria com sua API ou serviço de email
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // TODO: Integrar com backend/API de email
      console.log('Form data:', formData);
      
      setIsSuccess(true);
      toast({
        title: "Mensagem enviada!",
        description: "Entraremos em contato em breve.",
      });

      // Reset form
      setFormData({ name: '', email: '', phone: '', message: '' });
      
      setTimeout(() => setIsSuccess(false), 3000);
    } catch (error) {
      toast({
        title: "Erro ao enviar",
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
                <label htmlFor="name" className="block text-sm font-medium text-foreground/80 mb-2 flex items-center gap-2">
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
                <label htmlFor="email" className="block text-sm font-medium text-foreground/80 mb-2 flex items-center gap-2">
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
              <label htmlFor="phone" className="block text-sm font-medium text-foreground/80 mb-2">
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
              <label htmlFor="message" className="block text-sm font-medium text-foreground/80 mb-2 flex items-center gap-2">
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

            <div className="flex items-center justify-between">
              <p className="text-sm text-foreground/60">
                * Campos obrigatórios
              </p>
              
              <button
                type="submit"
                disabled={isSubmitting || isSuccess}
                className={`
                  px-8 py-3 rounded-full font-medium transition-all flex items-center gap-2
                  ${isSuccess 
                    ? 'bg-nature-500 text-white' 
                    : 'bg-azul-2 text-white hover:bg-azul-2/90'
                  }
                  ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}
                `}
                aria-label={isSubmitting ? "Enviando mensagem" : "Enviar mensagem"}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Enviando...
                  </>
                ) : isSuccess ? (
                  <>
                    <Check className="h-5 w-5" />
                    Enviado!
                  </>
                ) : (
                  <>
                    <Send className="h-5 w-5" />
                    Enviar mensagem
                  </>
                )}
              </button>
            </div>

            <div className="mt-6 p-4 bg-azul-1/20 rounded-lg border border-azul-2/20">
              <div className="flex items-start gap-2">
                <AlertCircle className="h-5 w-5 text-azul-2 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-foreground/70">
                  Respondemos geralmente em até 48 horas. Para urgências, entre em contato 
                  diretamente pelo WhatsApp: 
                  <a href="tel:+5562996538902" className="text-azul-2 font-medium hover:underline ml-1">
                    (62) 99653-8902
                  </a>
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
