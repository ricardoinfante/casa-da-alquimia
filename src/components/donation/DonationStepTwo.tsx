
import React, { useState } from 'react';
import { cn } from '@/lib/utils';

interface DonationStepTwoProps {
  name: string;
  setName: (name: string) => void;
  email: string;
  setEmail: (email: string) => void;
  paymentMethod: 'credit-card' | 'pix';
  setPaymentMethod: (method: 'credit-card' | 'pix') => void;
  finalAmount: number;
  donationType: 'one-time' | 'monthly';
  isSubmitting: boolean;
  onSubmit: (e: React.FormEvent) => void;
}

const DonationStepTwo: React.FC<DonationStepTwoProps> = ({
  name,
  setName,
  email,
  setEmail,
  paymentMethod,
  setPaymentMethod,
  finalAmount,
  donationType,
  isSubmitting,
  onSubmit,
}) => {
  return (
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
      
      <form onSubmit={onSubmit} className="space-y-4">
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
  );
};

export default DonationStepTwo;
