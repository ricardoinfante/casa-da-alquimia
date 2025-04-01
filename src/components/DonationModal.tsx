
import React, { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import DonationModalContainer from './donation/DonationModalContainer';
import DonationStepOne from './donation/DonationStepOne';
import DonationStepTwo from './donation/DonationStepTwo';
import DonationStepThree from './donation/DonationStepThree';

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
  
  return (
    <DonationModalContainer isOpen={isOpen} onClose={handleClose}>
      {step === 1 && (
        <DonationStepOne
          donationType={donationType}
          setDonationType={setDonationType}
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
          donationType={donationType}
          isSubmitting={isSubmitting}
          onSubmit={handleSubmit}
        />
      )}
      
      {step === 3 && (
        <DonationStepThree
          finalAmount={finalAmount}
          donationType={donationType}
          email={email}
          onClose={handleClose}
        />
      )}
    </DonationModalContainer>
  );
};

export default DonationModal;
