# Donation Simplification Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the three-tier donation section with a single card, simplify the modal to remove the monthly/one-time toggle and WhatsApp redirect, register donations in Supabase, and add an "Apoiar" button to the Navbar.

**Architecture:** Refactor the four existing files in place — no new files. The `saveDonation()` function is added to `services.ts` first (no UI dependencies), then `Donate.tsx` and `DonationModal.tsx` are updated, and finally `Navbar.tsx` gets the new button.

**Tech Stack:** React 18, TypeScript 5, Tailwind CSS, Supabase JS client, Lucide React icons.

**Spec:** `docs/superpowers/specs/2026-03-12-donation-simplification-design.md`

> **Note on testing:** The project has no test suite configured. Verification steps use TypeScript compilation (`npm run build`) and manual browser checks (`npm run dev`). All verification commands must pass before committing.

---

## Chunk 1: Supabase saveDonation()

### Task 1: Add `saveDonation()` to services.ts

**Files:**
- Modify: `src/integrations/supabase/services.ts`

- [ ] **Step 1: Add the `saveDonation` function**

Append the following to `src/integrations/supabase/services.ts` after the closing brace of `mediaLibraryService`:

```typescript
// ============ DONATIONS ============

export async function saveDonation(data: {
  donor_name: string;
  donor_email: string;
  amount: number;
  payment_method: 'pix' | 'bank-transfer';
}): Promise<void> {
  const { error } = await supabase
    .from('donations')
    .insert([
      {
        donor_name: data.donor_name,
        donor_email: data.donor_email,
        amount: data.amount,
        payment_method: data.payment_method,
        donation_type: 'one-time',
        payment_status: 'pending',
      },
    ]);

  if (error) throw error;
}
```

- [ ] **Step 2: Verify TypeScript compilation**

```bash
cd c:/Users/USER/Documents/Projetos/casa-da-alquimia-v2
npm run build
```

Expected: build completes with no TypeScript errors. If errors appear, fix them before continuing.

- [ ] **Step 3: Commit**

```bash
git add src/integrations/supabase/services.ts
git commit -m "feat: add saveDonation() to supabase services"
```

---

## Chunk 2: Simplified Donate.tsx

### Task 2: Replace three-tier cards with a single support card

**Files:**
- Modify: `src/components/Donate.tsx`

- [ ] **Step 1: Replace the entire file content**

Replace `src/components/Donate.tsx` with:

```tsx
import React, { useState } from 'react';
import DonationModal from './DonationModal';

const Donate = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section id="donate" className="py-16 md:py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-azul-1/40 to-azul-1/20"></div>
      <div className="absolute inset-0 bg-noise opacity-5"></div>

      <div className="section-container relative z-10 flex justify-center">
        <div className="p-6 md:p-8 bg-white/70 backdrop-blur-sm rounded-xl border border-muted shadow-sm max-w-lg w-full text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#934211] mb-3">
            Apoio
          </p>
          <h2 className="font-display font-bold text-[#1A3A6B] text-2xl md:text-3xl mb-4">
            Apoie a Casa da Alquimia
          </h2>
          <p className="text-foreground/70 mb-8">
            Sua contribuição mantém vivos os rituais, os ensinamentos e o espaço de cura da Casa da Alquimia.
          </p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="w-full px-6 py-3 bg-azul-2 text-white rounded-full font-medium hover:bg-azul-2/90 transition-all"
          >
            Quero apoiar
          </button>
        </div>
      </div>

      <DonationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
};

export default Donate;
```

- [ ] **Step 2: Verify compilation**

```bash
npm run build
```

Expected: no errors.

- [ ] **Step 3: Verify in browser**

```bash
npm run dev
```

Open http://localhost:8086, scroll to the donate section. You should see a single centered card with the eyebrow "APOIO", the title, description, and a "Quero apoiar" button. No three-tier grid, no transparency block, no section header.

- [ ] **Step 4: Commit**

```bash
git add src/components/Donate.tsx
git commit -m "feat: replace three-tier donation cards with single support card"
```

---

## Chunk 3: Simplified DonationModal.tsx

### Task 3: Remove donationType state and toggle

**Files:**
- Modify: `src/components/DonationModal.tsx`

This task refactors the modal in three focused sub-steps to keep each change reviewable.

#### Sub-task 3a: Simplify DonationStepOne (remove toggle + pills)

- [ ] **Step 1: Replace DonationStepOne with simplified version**

Replace the `DonationStepOne` component (lines 40–160) with:

```tsx
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
        <div className="relative">
          <span className="absolute top-0 bottom-0 left-3 flex items-center text-foreground/60">
            R$
          </span>
          <input
            type="text"
            placeholder="Digite o valor"
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
```

#### Sub-task 3b: Simplify DonationStepTwo (remove WhatsApp banners, credit card notice, rename button, fix subtitle)

- [ ] **Step 2: Replace DonationStepTwo with simplified version**

Replace the `DonationStepTwo` component (lines 162–421) with:

```tsx
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
  const { toast } = useToast();

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copiado!",
      description: `${label} copiado para a área de transferência.`,
    });
  };

  return (
    <div className="p-6 md:p-8">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-display font-bold mb-2">Complete sua doação</h3>
        <p className="text-foreground/70">
          Você está fazendo uma doação de{' '}
          <span className="font-medium text-primary">R$ {finalAmount.toFixed(2)}</span>
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
          <span className="block text-sm font-medium text-foreground/80 mb-2">
            Método de pagamento
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
              PIX
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
              Depósito
            </button>
          </div>

          {paymentMethod === 'pix' && (
            <div className="bg-muted/50 rounded-lg p-4 space-y-3 border border-muted">
              <div className="text-center">
                <p className="text-sm font-medium text-foreground/80 mb-2">Chave PIX</p>
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
                  Tipo: CNPJ • Favorecido: Casa da Alquimia
                </p>
              </div>
            </div>
          )}

          {paymentMethod === 'bank-transfer' && (
            <div className="bg-muted/50 rounded-lg p-4 space-y-3 border border-muted">
              <div>
                <p className="text-sm font-medium text-foreground/80 mb-3 text-center">Dados bancários</p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between items-center bg-white dark:bg-gray-800 p-2 rounded">
                    <span className="text-foreground/70">Banco:</span>
                    <span className="font-medium">Cora SCFI - 403</span>
                  </div>
                  <div className="flex justify-between items-center bg-white dark:bg-gray-800 p-2 rounded">
                    <span className="text-foreground/70">Agência:</span>
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
                    <span className="text-foreground/70">Conta:</span>
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
                    <span className="text-foreground/70">CNPJ:</span>
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
                    <span className="text-foreground/70">Favorecido:</span>
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
              Processando...
            </>
          ) : (
            'Concluir doação'
          )}
        </button>

        <div className="flex items-center gap-2 text-xs text-foreground/60 justify-center">
          <Heart className="h-3 w-3" />
          <span>Sua contribuição faz toda a diferença</span>
        </div>
      </form>
    </div>
  );
};
```

#### Sub-task 3c: Simplify DonationStepThree (remove email prop, simplify próximos passos)

- [ ] **Step 3: Replace DonationStepThree with simplified version**

Replace the `DonationStepThree` component (lines 423–475) with:

```tsx
// Step Three Component
const DonationStepThree: React.FC<{
  finalAmount: number;
  name: string;
  onClose: () => void;
}> = ({ finalAmount, name, onClose }) => {
  return (
    <div className="p-6 md:p-8 text-center">
      <div className="mx-auto w-16 h-16 flex items-center justify-center rounded-full bg-green-500/20 mb-6">
        <Check className="h-8 w-8 text-green-600" />
      </div>

      <h3 className="text-2xl font-display font-bold mb-2">Gratidão, {name}!</h3>
      <p className="text-foreground/70 mb-6">
        Sua doação de <span className="font-medium text-primary">R$ {finalAmount.toFixed(2)}</span> faz toda a diferença.
      </p>

      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 mb-6 border border-blue-200 dark:border-blue-800">
        <p className="text-sm text-foreground/70 mb-2">
          <strong>Próximos passos:</strong>
        </p>
        <ol className="text-sm text-left text-foreground/70 space-y-2 ml-4">
          <li>1. Realize a transferência utilizando os dados fornecidos no passo anterior.</li>
          <li>2. Sua doação será processada em breve. Obrigado por apoiar a Casa da Alquimia.</li>
        </ol>
      </div>

      <button
        type="button"
        onClick={onClose}
        className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
      >
        Fechar
      </button>
    </div>
  );
};
```

#### Sub-task 3d: Update DonationModal (state, handleSubmit, render calls)

- [ ] **Step 4: Replace the DonationModal main component**

Replace the `DonationModal` main component (lines 477–609) with:

```tsx
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
```

- [ ] **Step 5: Add import for saveDonation**

At the top of `DonationModal.tsx`, add the import after the existing imports:

```tsx
import { saveDonation } from '@/integrations/supabase/services';
```

**Keep** the existing `import { useToast } from '@/hooks/use-toast';` on line 2 — `DonationStepTwo` calls `useToast()` internally and requires it. Do not remove this import.

- [ ] **Step 6: Verify TypeScript compilation**

```bash
npm run build
```

Expected: no errors. Common issues to watch for:
- `donationType` referenced anywhere → search and remove all occurrences
- `email` prop still passed to `DonationStepThree` → remove it from the render call

- [ ] **Step 7: Verify in browser**

```bash
npm run dev
```

Test the full modal flow:
1. Click "Quero apoiar" on the card → modal opens on step 1 with only a value input (no pills, no toggle)
2. Enter a value (e.g. 50) → "Continuar" button becomes active
3. Click "Continuar" → step 2 shows "Você está fazendo uma doação de R$ 50.00"
4. Fill name + email, confirm PIX is selected by default, copy button works
5. Switch to "Depósito" → bank details appear, no WhatsApp banner visible
6. Click "Concluir doação" → spinner shows briefly → step 3 appears with name + amount
7. "Próximos passos" has exactly 2 items, no WhatsApp mention
8. Click "Fechar" → modal closes and form resets

- [ ] **Step 8: Commit**

```bash
git add src/components/DonationModal.tsx
git commit -m "feat: simplify donation modal — remove monthly toggle, WhatsApp redirect, save to Supabase"
```

---

## Chunk 4: Navbar "Apoiar" Button

### Task 4: Add "Apoiar" button to desktop and mobile nav

**Files:**
- Modify: `src/components/Navbar.tsx`

- [ ] **Step 1: Add "Apoiar" button to desktop nav**

In `src/components/Navbar.tsx`, locate the desktop CTA button (the `<a>` tag with `href="https://wa.me/..."` around line 95). Add the "Apoiar" button **before** it:

Replace this block (lines 94–103):
```tsx
          {/* CTA Button */}
          <a
            href="https://wa.me/5562996538902?text=Ol%C3%A1!%20Gostaria%20de%20conhecer%20e%20saber%20mais%20informa%C3%A7%C3%B5es%20sobre%20os%20trabalhos%20da%20Casa%20da%20Alquimia."
            target="_blank"
            rel="noopener noreferrer"
            className="ml-4 px-5 py-2.5 bg-primary text-primary-foreground rounded-full font-semibold text-sm shadow-lg hover:shadow-xl hover:shadow-primary/50 transition-all duration-300 hover:scale-105 inline-flex items-center gap-2"
          >
            <Sparkles className="h-4 w-4" />
            <span>Mais informações</span>
          </a>
```

With:
```tsx
          {/* Apoiar Button */}
          <a
            href="#donate"
            className="ml-2 px-5 py-2.5 bg-[#1A3A6B] text-white rounded-full font-semibold text-sm shadow-lg hover:shadow-xl hover:shadow-[#1A3A6B]/50 transition-all duration-300 hover:scale-105 inline-flex items-center gap-2"
          >
            <span>Apoiar</span>
          </a>

          {/* CTA Button */}
          <a
            href="https://wa.me/5562996538902?text=Ol%C3%A1!%20Gostaria%20de%20conhecer%20e%20saber%20mais%20informa%C3%A7%C3%B5es%20sobre%20os%20trabalhos%20da%20Casa%20da%20Alquimia."
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 px-5 py-2.5 bg-primary text-primary-foreground rounded-full font-semibold text-sm shadow-lg hover:shadow-xl hover:shadow-primary/50 transition-all duration-300 hover:scale-105 inline-flex items-center gap-2"
          >
            <Sparkles className="h-4 w-4" />
            <span>Mais informações</span>
          </a>
```

Note: changed `ml-4` to `ml-2` on the WhatsApp button to keep spacing consistent with the new neighbor.

- [ ] **Step 2: Add "Apoiar" item to mobile nav list**

In the mobile nav, locate the closing `</nav>` tag that ends the scrollable nav list (around line 211). Add the "Apoiar" button as the last item **before** `</nav>`:

Replace (include the blank line between `</nav>` and the comment, exactly as it appears in the file):
```tsx
          </nav>

          {/* CTA no mobile - Sticky bottom */}
```

With:
```tsx
            {/* Apoiar Button */}
            <a
              href="#donate"
              className={cn(
                "group relative p-4 rounded-xl text-left transition-all duration-300",
                "bg-[#1A3A6B] text-white hover:bg-[#1A3A6B]/90 hover:shadow-md active:scale-95",
                isMobileMenuOpen ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
              )}
              style={{
                transitionDelay: isMobileMenuOpen ? `${menuItems.length * 70}ms` : '0ms'
              }}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <span className="text-xl font-semibold">Apoiar</span>
            </a>
          </nav>

          {/* CTA no mobile - Sticky bottom */}
```

- [ ] **Step 3: Verify TypeScript compilation**

```bash
npm run build
```

Expected: no errors.

- [ ] **Step 4: Verify in browser**

```bash
npm run dev
```

Desktop checks:
- Navbar shows "Apoiar" button (dark blue `#1A3A6B`) to the left of "Mais informações"
- Clicking "Apoiar" scrolls to the donate section

Mobile checks (resize browser to < 1024px or use DevTools):
- Open mobile menu → "Apoiar" button appears as last item in the nav list, dark blue background, white text
- Clicking "Apoiar" closes the menu and scrolls to the donate section

- [ ] **Step 5: Commit**

```bash
git add src/components/Navbar.tsx
git commit -m "feat: add Apoiar button to navbar (desktop and mobile)"
```

---

## Final Verification

- [ ] **Run full build one final time**

```bash
npm run build
```

Expected: clean build, no warnings about unused variables.

- [ ] **End-to-end flow test in browser**

Complete the full user journey:
1. Open the site → Navbar shows "Apoiar" button
2. Click "Apoiar" in navbar → page scrolls to donate section
3. See single card with "Quero apoiar" button
4. Click "Quero apoiar" → modal opens, step 1 with amount input
5. Enter amount → "Continuar" enables
6. Step 2: fill name/email, select PIX, copy key, no WhatsApp banner
7. Click "Concluir doação" → step 3 with 2-item próximos passos
8. Close → form resets
9. Repeat with "Depósito" option to confirm bank details still show correctly
