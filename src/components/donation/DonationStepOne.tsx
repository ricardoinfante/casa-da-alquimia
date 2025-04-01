
import React from 'react';
import { Heart } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DonationStepOneProps {
  donationType: 'one-time' | 'monthly';
  setDonationType: (type: 'one-time' | 'monthly') => void;
  amount: number | null;
  setAmount: (amount: number | null) => void;
  customAmount: string;
  setCustomAmount: (amount: string) => void;
  onContinue: () => void;
}

const DonationStepOne: React.FC<DonationStepOneProps> = ({
  donationType,
  setDonationType,
  amount,
  setAmount,
  customAmount,
  setCustomAmount,
  onContinue,
}) => {
  const finalAmount = amount || (customAmount ? parseFloat(customAmount) : 0);

  return (
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
        onClick={onContinue}
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
  );
};

export default DonationStepOne;
