
import React, { useState } from 'react';
import { X, Check, Heart } from 'lucide-react';
import { cn } from '@/lib/utils';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface DonationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DonationModal: React.FC<DonationModalProps> = ({ isOpen, onClose }) => {
  const { toast } = useToast();
  const [donationType, setDonationType] = useState<'one-time' | 'monthly'>('one-time');
  const [amount, setAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [paymentMethod, setPaymentMethod] = useState<'credit-card' | 'pix'>('pix');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [step, setStep] = useState<1 | 2 | 3>(1);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!finalAmount || finalAmount <= 0) {
      toast({
        title: "Valor inválido",
        description: "Por favor, insira um valor válido para a doação",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // First store the pending donation in Supabase
      const { error: insertError } = await supabase
        .from('donations')
        .insert({
          donor_name: name,
          donor_email: email,
          amount: finalAmount,
          payment_method: paymentMethod,
          donation_type: donationType,
          payment_status: 'pending'
        });
      
      if (insertError) {
        throw new Error(`Erro ao registrar doação: ${insertError.message}`);
      }
      
      // Call Supabase Edge Function to create a Stripe checkout session
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: {
          amount: finalAmount.toString(),
          donorName: name,
          donorEmail: email,
          donationType,
          paymentMethod
        },
      });
      
      if (error) {
        throw new Error(`Erro ao processar pagamento: ${error.message}`);
      }
      
      // Redirect to Stripe Checkout
      if (data?.checkoutUrl) {
        window.location.href = data.checkoutUrl;
      } else {
        throw new Error('URL de checkout não recebida');
      }
      
    } catch (error) {
      console.error('Erro ao processar doação:', error);
      toast({
        title: "Erro no processamento",
        description: error.message || "Houve um erro ao processar sua doação. Por favor, tente novamente.",
        variant: "destructive",
      });
      setIsSubmitting(false);
    }
  };
  
  const finalAmount = amount || (customAmount ? parseFloat(customAmount) : 0);
  
  const handleClose = () => {
    onClose();
    // Reset form after animation completes
    setTimeout(() => {
      setStep(1);
      setAmount(null);
      setCustomAmount('');
      setName('');
      setEmail('');
      setPaymentMethod('pix');
    }, 300);
  };
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={handleClose}
      ></div>
      
      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-xl max-w-md w-full max-h-[90vh] overflow-auto animate-scale-in">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-foreground/60 hover:text-foreground transition-colors"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>
        
        {step === 1 && (
          <div className="p-6 md:p-8">
            <div className="text-center mb-6">
              <div className="mx-auto w-12 h-12 flex items-center justify-center rounded-full bg-primary/10 mb-4">
                <Heart className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-2xl font-display font-bold mb-2">Apoie nossa missão</h3>
              <p className="text-foreground/70">
                Sua contribuição mantém viva a tradição e possibilita que mais pessoas tenham acesso aos rituais
              </p>
            </div>
            
            <div className="mb-6">
              <div className="flex rounded-lg overflow-hidden border border-muted mb-6">
                <button
                  type="button"
                  onClick={() => setDonationType('one-time')}
                  className={cn(
                    "flex-1 py-3 text-sm font-medium transition-colors",
                    donationType === 'one-time' 
                      ? "bg-primary text-primary-foreground" 
                      : "bg-muted text-foreground/70 hover:bg-muted/80"
                  )}
                >
                  Única
                </button>
                <button
                  type="button"
                  onClick={() => setDonationType('monthly')}
                  className={cn(
                    "flex-1 py-3 text-sm font-medium transition-colors",
                    donationType === 'monthly' 
                      ? "bg-primary text-primary-foreground" 
                      : "bg-muted text-foreground/70 hover:bg-muted/80"
                  )}
                >
                  Mensal
                </button>
              </div>
              
              <p className="text-sm text-foreground/70 mb-4">
                {donationType === 'one-time' 
                  ? 'Faça uma doação única para ajudar agora' 
                  : 'Torne-se um apoiador recorrente e ajude continuamente'
                }
              </p>
              
              <div className="grid grid-cols-3 gap-3 mb-4">
                {[50, 100, 200].map((value) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => {
                      setAmount(value);
                      setCustomAmount('');
                    }}
                    className={cn(
                      "py-3 rounded-lg border font-medium transition-all",
                      amount === value
                        ? "border-primary bg-primary/5 text-primary"
                        : "border-muted bg-muted/50 text-foreground/80 hover:bg-muted/80"
                    )}
                  >
                    R$ {value}
                  </button>
                ))}
              </div>
              
              <div className="relative">
                <span className="absolute top-0 bottom-0 left-3 flex items-center text-foreground/60">
                  R$
                </span>
                <input
                  type="text"
                  placeholder="Outro valor"
                  value={customAmount}
                  onChange={(e) => {
                    const value = e.target.value.replace(/[^0-9.,]/g, '');
                    setCustomAmount(value);
                    setAmount(null);
                  }}
                  className="w-full py-3 pl-10 pr-3 rounded-lg border border-muted bg-muted/30 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
                />
              </div>
            </div>
            
            <button
              type="button"
              onClick={() => finalAmount > 0 && setStep(2)}
              disabled={finalAmount <= 0}
              className={cn(
                "w-full py-3 rounded-lg font-medium transition-colors",
                finalAmount > 0
                  ? "bg-primary text-primary-foreground hover:bg-primary/90"
                  : "bg-muted/50 text-foreground/40 cursor-not-allowed"
              )}
            >
              Continuar
            </button>
          </div>
        )}
        
        {step === 2 && (
          <div className="p-6 md:p-8">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-display font-bold mb-2">Complete sua doação</h3>
              <p className="text-foreground/70">
                {donationType === 'one-time' 
                  ? 'Você está fazendo uma doação única de' 
                  : 'Você está se tornando um apoiador mensal com'
                } <span className="font-medium text-primary">R$ {finalAmount.toFixed(2)}</span>
              </p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-foreground/80 mb-1">
                  Nome completo
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-muted bg-muted/30 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-foreground/80 mb-1">
                  E-mail
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-muted bg-muted/30 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
                />
              </div>
              
              <div>
                <span className="block text-sm font-medium text-foreground/80 mb-1">
                  Método de pagamento
                </span>
                <div className="flex rounded-lg overflow-hidden border border-muted">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('credit-card')}
                    className={cn(
                      "flex-1 py-2 text-sm font-medium transition-colors flex items-center justify-center gap-2",
                      paymentMethod === 'credit-card' 
                        ? "bg-primary text-primary-foreground" 
                        : "bg-muted text-foreground/70 hover:bg-muted/80"
                    )}
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="1.3" y="3.3" width="13.4" height="9.4" rx="1.7" stroke="currentColor" strokeWidth="1.5"/>
                      <line x1="1" y1="6.25" x2="15" y2="6.25" stroke="currentColor" strokeWidth="1.5"/>
                    </svg>
                    Cartão
                  </button>
                </div>
              </div>
              
              <p className="text-sm text-foreground/80 text-center my-2">
                Ao clicar em "Finalizar doação", você será redirecionado para a página segura do Stripe para completar o pagamento.
              </p>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className={cn(
                  "w-full py-3 rounded-lg font-medium transition-all flex items-center justify-center gap-2",
                  isSubmitting 
                    ? "bg-primary/70 text-primary-foreground cursor-wait"
                    : "bg-primary text-primary-foreground hover:bg-primary/90"
                )}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processando...
                  </>
                ) : (
                  'Finalizar doação'
                )}
              </button>
              
              <div className="flex items-center gap-2 text-xs text-foreground/60 justify-center">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12.6667 3.33331H3.33333C2.59695 3.33331 2 3.93027 2 4.66665V11.3333C2 12.0697 2.59695 12.6666 3.33333 12.6666H12.6667C13.403 12.6666 14 12.0697 14 11.3333V4.66665C14 3.93027 13.403 3.33331 12.6667 3.33331Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 7H4V9H12V7Z" fill="currentColor"/>
                </svg>
                Todas as transações são seguras e processadas pelo Stripe
              </div>
            </form>
          </div>
        )}
        
        {step === 3 && (
          <div className="p-6 md:p-8 text-center">
            <div className="mx-auto w-16 h-16 flex items-center justify-center rounded-full bg-nature-500/20 mb-6">
              <Check className="h-8 w-8 text-nature-600" />
            </div>
            
            <h3 className="text-2xl font-display font-bold mb-2">Gratidão pela sua doação!</h3>
            <p className="text-foreground/70 mb-6">
              {donationType === 'one-time' 
                ? `Sua contribuição de R$ ${finalAmount.toFixed(2)} ajudará a manter nossa missão viva.` 
                : `Sua contribuição mensal de R$ ${finalAmount.toFixed(2)} nos ajudará continuamente.`
              }
            </p>
            
            <p className="text-sm text-foreground/60 mb-8">
              Enviamos um comprovante para {email}. Você também
              receberá atualizações sobre como sua doação está ajudando nossa comunidade.
            </p>
            
            <button
              type="button"
              onClick={handleClose}
              className="px-6 py-2 bg-muted text-foreground/80 rounded-lg font-medium hover:bg-muted/80 transition-colors"
            >
              Fechar
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DonationModal;
