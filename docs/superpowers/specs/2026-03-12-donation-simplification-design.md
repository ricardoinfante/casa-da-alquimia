# Donation Simplification — Design Spec

**Date:** 2026-03-12
**Status:** Approved

## Overview

Simplify the donation section of Casa da Alquimia from three tier cards to a single support card. Streamline the donation modal to three steps (remove one-time/monthly toggle), remove WhatsApp integration, and register donations in Supabase. Add a donation button to the Navbar.

## Goals

- Reduce cognitive load: one card instead of three tiers
- Remove unnecessary options: no monthly vs one-time distinction (all donations are one-time)
- Register donations in Supabase (table already exists, currently unused)
- Improve discoverability: add "Apoiar" button to Navbar
- Remove WhatsApp dependency from the donation flow

## Out of Scope

- Payment gateway integration (Stripe, PagSeguro)
- Automated email confirmation
- Monthly recurring donations
- Admin dashboard for donations

---

## Components

### 1. `src/components/Donate.tsx` — Simplified Card

**Current state:** Section with three donation tier cards (Apoio Único, Apoio Mensal, Apoio a Projetos).

**New state:** Single card centered on the page.

**Section wrapper:** Keep the existing `<section id="donate">` wrapper with its background gradient and padding. Remove the "Nosso compromisso de transparência" block at the bottom of the section — it was tied to the three-tier model and is no longer relevant.

**Card content:**
- Eyebrow label: "APOIO" (uppercase, terracota `#934211`, letter-spacing 0.2em)
- Title: "Apoie a Casa da Alquimia" (Cinzel, `#1A3A6B`)
- Description: "Sua contribuição mantém vivos os rituais, os ensinamentos e o espaço de cura da Casa da Alquimia." (1 line, warm and spiritual tone)
- Single CTA button: "Quero apoiar" (opens DonationModal)

**Card layout:** `max-w-lg` centered, use the plain `bg-white/70 backdrop-blur-sm rounded-xl` style (same as the non-highlighted existing cards). Do not use the elevated center-card style.

**Removed:**
- Three tier cards
- Benefits list per tier
- "Most Popular" badge
- "Nosso compromisso de transparência" block
- Existing section header above the cards (eyebrow chip + H2 title + paragraph). The card itself carries the title and description — keeping the section header would create a redundant heading structure.

---

### 2. `src/components/DonationModal.tsx` — Simplified Modal

**Current state:** 3-step modal with donation type (one-time/monthly), amount, donor info, payment method, WhatsApp redirect.

**New state:** 3-step modal — step 1 is amount only, step 2 is donor info + payment, step 3 is thank you.

#### Step 1 — Amount

- Remove `donationType` and `setDonationType` from `DonationStepOne`'s props and call signature.
- Custom amount input with Brazilian real formatting — keep the existing stripping logic (`replace(/[^0-9.,]/g, '')`) and `parseFloat()` as-is. Note: this may misparse comma-as-decimal inputs (e.g. "1.500,50") but fixing locale-aware parsing is out of scope for this task.
- "Continuar" button — disabled until amount > 0
- No suggested amount pill buttons (the existing R$50 / R$100 / R$200 pills are removed)
- No one-time/monthly toggle (all donations are one-time)

#### Step 2 — Donor Info + Payment Method

- Remove `donationType` from `DonationStepTwo`'s props. Replace the conditional subtitle ("Você está fazendo uma doação única de..." / "…tornando-se um apoiador mensal…") with the static text: "Você está fazendo uma doação de R$ {finalAmount}."
- Fields: `name` (required), `email` (required)
- Payment method selector: PIX or Depósito Bancário. **PIX is selected by default.**
- On PIX selected: show CNPJ key (`30.226.247/0001-91`) with copy button. Remove the existing WhatsApp informational banner ("envie o comprovante para nosso WhatsApp") from this panel.
- On Depósito selected: show Cora SCFI bank details with copy buttons. Remove the existing WhatsApp informational banner from this panel:
  - Banco: Cora SCFI (403)
  - Agência: 0001
  - Conta: 2123998-5
  - CNPJ: 30.226.247/0001-91
  - Favorecido: Casa da Alquimia
- Submit button label: **"Concluir doação"** (rename from the existing "Confirmar doação") → calls `saveDonation()` → advances to step 3. During submission (`isSubmitting`), retain the existing "Processando..." spinner state.
- Remove the "Em breve teremos a opção de pagamento por cartão de crédito" notice.

**Removed:**
- WhatsApp redirect on submit
- WhatsApp informational banners inside PIX and Depósito panels
- One-time/monthly toggle
- `donationType` state variable entirely — remove it from `DonationModal`, remove all props and conditional copy that branch on it in `DonationStepTwo` and `DonationStepThree`

#### Step 3 — Thank You

- Personalized thank you message with donor's name and amount (e.g., "Gratidão, {name}! Sua doação de R$ {amount} faz toda a diferença."). Keep the `finalAmount` prop — it is displayed in step 3.
- Remove `email` from `DonationStepThree`'s props and from its call site in the parent — it was only used for the email-confirmation sentence which is being removed.
- "Próximos passos" section with exactly **two items** (intentionally generic — same text regardless of PIX or Depósito):
  1. Realize a transferência utilizando os dados fornecidos no passo anterior.
  2. Sua doação será processada em breve. Obrigado por apoiar a Casa da Alquimia.
- Remove the existing "Aguarde nossa confirmação" third step.
- Remove the existing sentence that references an email confirmation ("enviaremos um email de agradecimento para {email}") — no automated email is sent (per Out of Scope).
- Close button

---

### 3. `src/components/Navbar.tsx` — Donation Button

**Addition:** "Apoiar" button added to the Navbar. The existing "Mais informações" / "Quero saber mais" WhatsApp CTA button is kept — both buttons coexist.

**State:** `Donate.tsx` continues to own the modal open/close state. The Navbar "Apoiar" button only scrolls to `#donate`; it does not open the modal directly.

**Desktop:**
- Button styled to match the existing "Mais informações" / "Quero saber mais" button shape and padding (`rounded-full`, `px-5 py-2.5`, `shadow-lg`, `hover:scale-105`), with `bg-[#1A3A6B]` substituted for the background. Do **not** use `bg-primary` — that maps to `#2B4F8C` (Azul Cobalto), a different color. No icon.
- Positioned to the **left** of the existing "Quero saber mais" WhatsApp button
- On click: smooth scroll to `#donate` section (standard browser anchor behavior — no-op if already at section)

**Mobile:**
- New "Apoiar" item added **inside the scrollable nav list**, after the last nav link and before the sticky bottom footer div (which contains the WhatsApp CTA). Do not place it inside the sticky footer div.
- Style: `bg-[#1A3A6B]`, white text, same `rounded-full` pill shape as desktop. No icon.
- On click: closes the mobile menu (`setIsMobileMenuOpen(false)`) then scrolls to `#donate` — consistent with all other mobile menu items

---

### 4. `src/integrations/supabase/services.ts` — New Function

New `saveDonation()` function added to existing services file.

**Signature:**
```typescript
saveDonation(data: {
  donor_name: string
  donor_email: string
  amount: number
  payment_method: 'pix' | 'bank-transfer'
}): Promise<void>
```

**Fields written to `donations` table:**
| Field | Value |
|-------|-------|
| `donor_name` | from form |
| `donor_email` | from form |
| `amount` | from form |
| `payment_method` | from form |
| `donation_type` | always `"one-time"` (hardcoded internally — not a function parameter) |
| `payment_status` | always `"pending"` |
| `created_at` | Supabase default (now()) |

**Import in DonationModal.tsx:** `import { saveDonation } from '@/integrations/supabase/services';`

**Call pattern in `DonationModal`:**
```typescript
try {
  await saveDonation({ ... });
} catch (e) {
  console.error('saveDonation failed:', e);
}
setStep(3); // always advance, regardless of outcome
```

**Toast behavior:** Remove the existing WhatsApp-related toasts ("Informações enviadas!") from `handleSubmit`. Do not add new toasts for `saveDonation()` success or failure — the only feedback is the transition to step 3.

**Form reset on close:** The existing `handleClose` reset behavior (resetting step, amount, name, email, paymentMethod after 300ms delay) is preserved. Delete the `donationType` `useState` declaration and all references to it throughout the file — there is no explicit reset call for it in `handleClose`, so no change is needed in that block specifically.

---

## Data Flow

```
User clicks "Quero apoiar" (card button only — Navbar only scrolls)
  → DonationModal opens (step 1)
  → User enters amount → clicks "Continuar"
  → Step 2: enters name, email, selects payment method
  → Sees PIX key or bank details
  → Clicks "Concluir doação"
  → saveDonation() called (Supabase) — non-blocking
  → Step 3: thank you screen with payment reminder
  → User closes modal
```

---

## Supabase Table

Table `donations` already exists in Supabase with the required schema. No migration needed.

Fields: `id`, `donor_name`, `donor_email`, `amount`, `donation_type`, `payment_method`, `payment_status`, `payment_id`, `created_at`.

---

## Implementation Approach

Refactor existing components rather than rewriting from scratch:
- Preserve working logic: currency formatting, copy-to-clipboard, bank details
- Remove unused logic: monthly toggle, WhatsApp redirect, tier cards
- Add new logic: Supabase save, Navbar button

## Files to Modify

| File | Change |
|------|--------|
| `src/components/Donate.tsx` | Replace 3 cards with 1 card |
| `src/components/DonationModal.tsx` | Remove monthly toggle + WhatsApp, simplify steps |
| `src/components/Navbar.tsx` | Add "Apoiar" button |
| `src/integrations/supabase/services.ts` | Add `saveDonation()` |

No new files needed.
