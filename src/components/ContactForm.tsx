import { useToast } from '@/hooks/use-toast';
import { Mail, MessageCircle, Phone, User } from 'lucide-react';
import { useState, type ChangeEvent, type FormEvent } from 'react';

const ContactForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [focused, setFocused] = useState<string | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    const url = import.meta.env.VITE_CONTACT_SHEET_URL;
    if (!url) {
      toast({
        title: 'Erro de configuração',
        description: 'Formulário não configurado. Entre em contato pelo email ou WhatsApp.',
        variant: 'destructive',
      });
      setStatus('idle');
      return;
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    try {
      const response = await fetch(url, {
        method: 'POST',
        // Google Apps Script não trata preflight OPTIONS — text/plain evita o preflight CORS
        headers: { 'Content-Type': 'text/plain' },
        body: JSON.stringify(formData),
        signal: controller.signal,
      });

      if (!response.ok) {
        throw new Error(`Servidor respondeu com ${response.status}`);
      }

      const result = await response.json();

      if (result.status !== 'ok') {
        throw new Error(result.message || 'Erro ao enviar mensagem');
      }

      setStatus('success');
    } catch (err) {
      const isTimeout = err instanceof Error && err.name === 'AbortError';
      toast({
        title: 'Erro ao enviar',
        description: isTimeout
          ? 'A conexão demorou demais. Tente novamente.'
          : 'Não foi possível enviar sua mensagem. Tente novamente.',
        variant: 'destructive',
      });
      setStatus('idle');
    } finally {
      clearTimeout(timeoutId);
    }
  };

  const fieldClass = (name: string) =>
    `w-full bg-transparent border-0 border-b py-3 px-0 text-[#2C2C1E] placeholder-transparent outline-none transition-all duration-300 font-['Lato'] text-base ${
      focused === name
        ? 'border-[#7A4900]'
        : 'border-[#2C2C1E]/20'
    }`;

  const labelClass = (name: string, hasValue: boolean) =>
    `absolute left-0 pointer-events-none transition-all duration-300 font-['Lato'] ${
      focused === name || hasValue
        ? 'text-[10px] font-bold tracking-[0.18em] uppercase top-0 text-[#7A4900]'
        : 'text-sm text-[#7A4900]/60 top-3'
    }`;

  return (
    <section id="contact-form" className="py-16 md:py-24 bg-[#F0F5EC] relative overflow-hidden">

      {/* Subtle botanical texture */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, #2B4F8C 0%, transparent 50%), radial-gradient(circle at 80% 20%, #5A7A3A 0%, transparent 40%)`,
        }}
      />

      <div className="section-container relative z-10">
        <div className="max-w-5xl mx-auto">

          {/* Layout: info + form */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-20 items-start">

            {/* Left — editorial copy */}
            <div className="lg:col-span-2 pt-2">
              <p className="text-[11px] font-bold tracking-[0.22em] uppercase text-[#934211] font-['Lato'] mb-4">
                Entre em contato
              </p>
              <h2 className="font-['Cinzel'] text-3xl md:text-4xl font-bold text-[#1A3A6B] leading-[1.2] mb-6">
                Tem alguma<br />dúvida?
              </h2>
              <div className="w-10 h-px bg-[#7A4900] mb-8" />
              <p className="text-[#2C2C1E]/70 font-['Lato'] text-base leading-relaxed mb-10">
                Preencha o formulário e entraremos em contato o mais breve possível sobre nossos rituais e atividades.
              </p>

              {/* Contact channels */}
              <div className="space-y-5">
                <a
                  href="mailto:contato@acasadaalquimia.com.br"
                  className="flex items-center gap-4 group"
                >
                  <div className="w-10 h-10 rounded-sm border border-[#2B4F8C]/20 flex items-center justify-center group-hover:border-[#C9A84C] group-hover:bg-[#C9A84C]/5 transition-all duration-300">
                    <Mail className="h-4 w-4 text-[#2B4F8C]" />
                  </div>
                  <span className="text-sm font-['Lato'] text-[#2C2C1E]/60 group-hover:text-[#2B4F8C] transition-colors">
                    contato@acasadaalquimia.com.br
                  </span>
                </a>

                <a
                  href="https://wa.me/5562996538902"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 group"
                >
                  <div className="w-10 h-10 rounded-sm border border-[#5A7A3A]/20 flex items-center justify-center group-hover:border-[#C9A84C] group-hover:bg-[#C9A84C]/5 transition-all duration-300">
                    <MessageCircle className="h-4 w-4 text-[#5A7A3A]" />
                  </div>
                  <span className="text-sm font-['Lato'] text-[#2C2C1E]/60 group-hover:text-[#5A7A3A] transition-colors">
                    (62) 99653-8902
                  </span>
                </a>
              </div>
            </div>

            {/* Right — form */}
            <div className="lg:col-span-3">
              <form
                onSubmit={handleSubmit}
                className="bg-white/70 backdrop-blur-sm border border-[#2C2C1E]/8 rounded-sm p-8 md:p-10 shadow-[0_2px_40px_rgba(44,44,30,0.06)]"
              >
                {/* Name + Email row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-8">
                  <div className="relative pt-5">
                    <label htmlFor="name" className={labelClass('name', !!formData.name)}>
                      <span className="flex items-center gap-1.5">
                        <User className="h-3 w-3" />
                        Nome completo *
                      </span>
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      onFocus={() => setFocused('name')}
                      onBlur={() => setFocused(null)}
                      disabled={status === 'submitting'}
                      className={`${fieldClass('name')} disabled:opacity-50`}
                      placeholder="Seu nome"
                      aria-required="true"
                    />
                  </div>

                  <div className="relative pt-5">
                    <label htmlFor="email" className={labelClass('email', !!formData.email)}>
                      <span className="flex items-center gap-1.5">
                        <Mail className="h-3 w-3" />
                        E-mail *
                      </span>
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      onFocus={() => setFocused('email')}
                      onBlur={() => setFocused(null)}
                      disabled={status === 'submitting'}
                      className={`${fieldClass('email')} disabled:opacity-50`}
                      placeholder="seu@email.com"
                      aria-required="true"
                    />
                  </div>
                </div>

                {/* Phone */}
                <div className="relative pt-5 mb-8">
                  <label htmlFor="phone" className={labelClass('phone', !!formData.phone)}>
                    <span className="flex items-center gap-1.5">
                      <Phone className="h-3 w-3" />
                      Telefone (opcional)
                    </span>
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    onFocus={() => setFocused('phone')}
                    onBlur={() => setFocused(null)}
                    disabled={status === 'submitting'}
                    className={`${fieldClass('phone')} disabled:opacity-50`}
                    placeholder="(00) 00000-0000"
                  />
                </div>

                {/* Message */}
                <div className="relative pt-5 mb-10">
                  <label htmlFor="message" className={labelClass('message', !!formData.message)}>
                    Mensagem *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    onFocus={() => setFocused('message')}
                    onBlur={() => setFocused(null)}
                    rows={5}
                    disabled={status === 'submitting'}
                    className={`${fieldClass('message')} resize-none disabled:opacity-50`}
                    placeholder="Sua mensagem..."
                    aria-required="true"
                  />
                </div>

                {/* Footer row */}
                <div className="flex items-center justify-between gap-4">
                  <p className="text-[11px] text-[#2C2C1E]/40 font-['Lato'] tracking-wide">
                    * Campos obrigatórios
                  </p>

                  <button
                    type="submit"
                    disabled={status !== 'idle'}
                    className={`
                      relative inline-flex items-center gap-2.5 px-7 py-3.5 text-sm font-['Lato'] font-semibold tracking-wider uppercase transition-all duration-300
                      ${status === 'submitting'
                        ? 'bg-[#2B4F8C]/60 text-white cursor-not-allowed'
                        : status === 'success'
                          ? 'bg-[#5A7A3A] text-white cursor-default'
                          : 'bg-[#2B4F8C] text-white hover:bg-[#1A3A6B] hover:-translate-y-px'
                      }
                    `}
                    aria-label={status === 'submitting' ? "Enviando mensagem" : "Enviar mensagem"}
                  >
                    {status === 'submitting' ? (
                      <>
                        <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Enviando…
                      </>
                    ) : (
                      <>
                        <Mail className="h-4 w-4" />
                        Enviar
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
