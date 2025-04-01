
import React from 'react';
import { Check } from 'lucide-react';

interface DonationStepThreeProps {
  finalAmount: number;
  donationType: 'one-time' | 'monthly';
  email: string;
  onClose: () => void;
}

const DonationStepThree: React.FC<DonationStepThreeProps> = ({
  finalAmount,
  donationType,
  email,
  onClose,
}) => {
  return (
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
        onClick={onClose}
        className="px-6 py-2 bg-muted text-foreground/80 rounded-lg font-medium hover:bg-muted/80 transition-colors"
      >
        Fechar
      </button>
    </div>
  );
};

export default DonationStepThree;
