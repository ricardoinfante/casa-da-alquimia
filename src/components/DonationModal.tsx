import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { Building2, Check, Copy, CreditCard, Heart, X } from 'lucide-react';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { saveDonation } from '@/integrations/supabase/services';

// Component for the modal container
const DonationModalContainer: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="relative bg-white rounded-sm max-w-md w-full max-h-[90vh] overflow-auto animate-scale-in">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-foreground/60 hover:text-foreground transition-colors"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>

        {children}
      </div>
    </div>
  );
};

// Step One Component
const DonationStepOne: React.FC<{
  amount: number | null;
  setAmount: (amount: number | null) => void;
  customAmount: string;
  setCustomAmount: (amount: string) => void;
  onContinue: () => void;
}> = ({
  amount,
  setAmount,
  customAmount,
  setCustomAmount,
  onContinue,
}) => {
  const { t } = useTranslation();
  const finalAmount = amount || (customAmount ? parseFloat(customAmount) : 0);

  return (
    <div className="p-6 md:p-8">
      <div className="text-center mb-6">
        <div className="mx-auto w-12 h-12 flex items-center justify-center rounded-full bg-primary/10 mb-4">
          <Heart className="h-6 w-6 text-primary" />
        </div>
        <h3 className="text-2xl font-display font-bold mb-2">{t('donate.modal.step1Title')}</h3>
        <p className="text-foreground/70">
          {t('donate.modal.step1Body')}
        </p>
      </div>

      <div className="mb-6">
        <div className="relative">
          <span className="absolute top-0 bottom-0 left-3 flex items-center text-foreground/60">
            R$
          </span>
          <input
            type="text"
            placeholder={t('donate.modal.amountPlaceholder')}
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
        {t('donate.modal.continue')}
      </button>
    </div>
  );
};

// Step Two Component
const DonationStepTwo: React.FC<{
  name: string;
  setName: (name: string) => void;
  email: string;
  setEmail: (email: string) => void;
  paymentMethod: 'pix' | 'bank-transfer';
  setPaymentMethod: (method: 'pix' | 'bank-transfer') => void;
  finalAmount: number;
  isSubmitting: boolean;
  onSubmit: (e: React.FormEvent) => void;
}> = ({
  name,
  setName,
  email,
  setEmail,
  paymentMethod,
  setPaymentMethod,
  finalAmount,
  isSubmitting,
  onSubmit,
}) => {
  const { t } = useTranslation();
  const { toast } = useToast();

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: t('donate.modal.copied'),
      description: t('donate.modal.copiedDesc', { label }),
    });
  };

  return (
    <div className="p-6 md:p-8">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-display font-bold mb-2">{t('donate.modal.step2Title')}</h3>
        <p className="text-foreground/70">
          {t('donate.modal.step2Body')}{' '}
          <span className="font-medium text-primary">R$ {finalAmount.toFixed(2)}</span>
        </p>
      </div>

      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-foreground/80 mb-1">
            {t('donate.modal.fullName')}
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
            {t('donate.modal.email')}
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
          <span className="block text-sm font-medium text-foreground/80 mb-2">
            {t('donate.modal.paymentMethod')}
          </span>
          <div className="flex rounded-lg overflow-hidden border border-muted mb-4">
            <button
              type="button"
              onClick={() => setPaymentMethod('pix')}
              className={cn(
                "flex-1 py-3 text-sm font-medium transition-colors flex items-center justify-center gap-2",
                paymentMethod === 'pix'
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-foreground/70 hover:bg-muted/80"
              )}
            >
              <CreditCard className="h-4 w-4" />
              {t('donate.modal.pix')}
            </button>
            <button
              type="button"
              onClick={() => setPaymentMethod('bank-transfer')}
              className={cn(
                "flex-1 py-3 text-sm font-medium transition-colors flex items-center justify-center gap-2",
                paymentMethod === 'bank-transfer'
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-foreground/70 hover:bg-muted/80"
              )}
            >
              <Building2 className="h-4 w-4" />
              {t('donate.modal.bankTransfer')}
            </button>
          </div>

          {paymentMethod === 'pix' && (
            <div className="bg-muted/50 rounded-lg p-4 space-y-3 border border-muted">
              <div className="text-center">
                <p className="text-sm font-medium text-foreground/80 mb-2">{t('donate.modal.pixKey')}</p>
                <div className="flex items-center gap-2 bg-white dark:bg-gray-800 p-3 rounded-lg">
                  <code className="flex-1 text-sm font-mono text-foreground break-all">
                    30.226.247/0001-91
                  </code>
                  <button
                    type="button"
                    onClick={() => copyToClipboard('30226247000191', 'Chave PIX')}
                    className="p-2 hover:bg-muted rounded-md transition-colors"
                    aria-label="Copiar chave PIX"
                  >
                    <Copy className="h-4 w-4" />
                  </button>
                </div>
                <p className="text-xs text-foreground/60 mt-2">
                  {t('donate.modal.pixInfo')}
                </p>
              </div>
            </div>
          )}

          {paymentMethod === 'bank-transfer' && (
            <div className="bg-muted/50 rounded-lg p-4 space-y-3 border border-muted">
              <div>
                <p className="text-sm font-medium text-foreground/80 mb-3 text-center">{t('donate.modal.bankDetails')}</p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between items-center bg-white dark:bg-gray-800 p-2 rounded">
                    <span className="text-foreground/70">{t('donate.modal.bank')}</span>
                    <span className="font-medium">Cora SCFI - 403</span>
                  </div>
                  <div className="flex justify-between items-center bg-white dark:bg-gray-800 p-2 rounded">
                    <span className="text-foreground/70">{t('donate.modal.branch')}</span>
                    <div className="flex items-center gap-2">
                      <span className="font-medium font-mono">0001</span>
                      <button
                        type="button"
                        onClick={() => copyToClipboard('0001', 'Agência')}
                        className="p-1 hover:bg-muted rounded transition-colors"
                      >
                        <Copy className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                  <div className="flex justify-between items-center bg-white dark:bg-gray-800 p-2 rounded">
                    <span className="text-foreground/70">{t('donate.modal.account')}</span>
                    <div className="flex items-center gap-2">
                      <span className="font-medium font-mono">2123998-5</span>
                      <button
                        type="button"
                        onClick={() => copyToClipboard('21239985', 'Conta')}
                        className="p-1 hover:bg-muted rounded transition-colors"
                      >
                        <Copy className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                  <div className="flex justify-between items-center bg-white dark:bg-gray-800 p-2 rounded">
                    <span className="text-foreground/70">{t('donate.modal.cnpj')}</span>
                    <div className="flex items-center gap-2">
                      <span className="font-medium font-mono">30.226.247/0001-91</span>
                      <button
                        type="button"
                        onClick={() => copyToClipboard('30226247000191', 'CNPJ')}
                        className="p-1 hover:bg-muted rounded transition-colors"
                      >
                        <Copy className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                  <div className="flex justify-between items-center bg-white dark:bg-gray-800 p-2 rounded">
                    <span className="text-foreground/70">{t('donate.modal.payee')}</span>
                    <span className="font-medium">Casa da Alquimia</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

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
              {t('donate.modal.processing')}
            </>
          ) : (
            t('donate.modal.complete')
          )}
        </button>

        <div className="flex items-center gap-2 text-xs text-foreground/60 justify-center">
          <Heart className="h-3 w-3" />
          <span>{t('donate.modal.difference')}</span>
        </div>
      </form>
    </div>
  );
};

// Step Three Component
const DonationStepThree: React.FC<{
  finalAmount: number;
  name: string;
  onClose: () => void;
}> = ({ finalAmount, name, onClose }) => {
  const { t } = useTranslation();

  return (
    <div className="p-6 md:p-8 text-center">
      <div className="mx-auto w-16 h-16 flex items-center justify-center rounded-full bg-green-500/20 mb-6">
        <Check className="h-8 w-8 text-green-600" />
      </div>

      <h3 className="text-2xl font-display font-bold mb-2">{t('donate.modal.step3Title', { name })}</h3>
      <p className="text-foreground/70 mb-6">
        {t('donate.modal.step3Body', { amount: finalAmount.toFixed(2) })}
      </p>

      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 mb-6 border border-blue-200 dark:border-blue-800">
        <p className="text-sm text-foreground/70 mb-2">
          <strong>{t('donate.modal.nextSteps')}</strong>
        </p>
        <ol className="text-sm text-left text-foreground/70 space-y-2 ml-4">
          <li>1. {t('donate.modal.nextStep1')}</li>
          <li>2. {t('donate.modal.nextStep2')}</li>
        </ol>
      </div>

      <button
        type="button"
        onClick={onClose}
        className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
      >
        {t('donate.modal.close')}
      </button>
    </div>
  );
};

// Main Donation Modal Component
const DonationModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
}> = ({ isOpen, onClose }) => {
  const [amount, setAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [paymentMethod, setPaymentMethod] = useState<'pix' | 'bank-transfer'>('pix');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [step, setStep] = useState<1 | 2 | 3>(1);

  const finalAmount = amount || (customAmount ? parseFloat(customAmount) : 0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await saveDonation({
        donor_name: name,
        donor_email: email,
        amount: finalAmount,
        payment_method: paymentMethod,
      });
    } catch (e) {
      console.error('saveDonation failed:', e);
    }
    setStep(3);
    setIsSubmitting(false);
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setStep(1);
      setAmount(null);
      setCustomAmount('');
      setName('');
      setEmail('');
      setPaymentMethod('pix');
    }, 300);
  };

  return (
    <DonationModalContainer isOpen={isOpen} onClose={handleClose}>
      {step === 1 && (
        <DonationStepOne
          amount={amount}
          setAmount={setAmount}
          customAmount={customAmount}
          setCustomAmount={setCustomAmount}
          onContinue={() => finalAmount > 0 && setStep(2)}
        />
      )}

      {step === 2 && (
        <DonationStepTwo
          name={name}
          setName={setName}
          email={email}
          setEmail={setEmail}
          paymentMethod={paymentMethod}
          setPaymentMethod={setPaymentMethod}
          finalAmount={finalAmount}
          isSubmitting={isSubmitting}
          onSubmit={handleSubmit}
        />
      )}

      {step === 3 && (
        <DonationStepThree
          finalAmount={finalAmount}
          name={name}
          onClose={handleClose}
        />
      )}
    </DonationModalContainer>
  );
};

export default DonationModal;
