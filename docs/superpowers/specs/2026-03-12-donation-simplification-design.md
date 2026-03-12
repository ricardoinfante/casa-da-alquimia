# Donation Simplification — Design Spec

**Date:** 2026-03-12
**Status:** Approved

## Overview

Simplify the donation section of Casa da Alquimia from three tier cards to a single support card. Streamline the donation modal to two steps (remove one-time/monthly toggle), remove WhatsApp integration, and register donations in Supabase. Add a donation button to the Navbar.

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

**Card content:**
- Eyebrow label: "APOIO" (uppercase, terracota `#934211`, letter-spacing 0.2em)
- Title: "Apoie a Casa da Alquimia" (Cinzel, `#1A3A6B`)
- Short description (1–2 lines) about the impact of the donation
- Single CTA button: "Quero apoiar" (opens DonationModal)

**Removed:**
- Three tier cards
- Benefits list per tier
- "Most Popular" badge

---

### 2. `src/components/DonationModal.tsx` — Simplified Modal

**Current state:** 3-step modal with donation type (one-time/monthly), amount, donor info, payment method, WhatsApp redirect.

**New state:** 3-step modal — step 1 is amount only, step 2 is donor info + payment, step 3 is thank you.

#### Step 1 — Amount

- Custom amount input with Brazilian real formatting (existing logic kept)
- "Continuar" button — disabled until amount > 0
- No suggested amount pill buttons on this step
- No one-time/monthly toggle (all donations are one-time)

#### Step 2 — Donor Info + Payment Method

- Fields: `name` (required), `email` (required)
- Payment method selector: PIX or Depósito Bancário
- On PIX selected: show CNPJ key (`30.226.247/0001-91`) with copy button
- On Depósito selected: show Cora SCFI bank details with copy buttons:
  - Banco: Cora SCFI (403)
  - Agência: 0001
  - Conta: 2123998-5
  - CNPJ: 30.226.247/0001-91
  - Favorecido: Casa da Alquimia
- "Concluir doação" button → saves to Supabase → advances to step 3

**Removed:**
- WhatsApp redirect on submit
- One-time/monthly toggle

#### Step 3 — Thank You

- Personalized thank you message with donor's name
- Reminder of chosen payment method and instructions
- Close button

---

### 3. `src/components/Navbar.tsx` — Donation Button

**Addition:** "Apoiar" button to the right of the navigation links.

**Desktop:**
- Button with `background: #1A3A6B` (Azul Profundo), white text
- Positioned at the end of the nav links row
- On click: smooth scroll to `#donate` section

**Mobile:**
- Entry in the mobile menu with distinct highlighted style
- Same scroll behavior

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
| `donation_type` | always `"one-time"` |
| `payment_status` | always `"pending"` |
| `created_at` | Supabase default (now()) |

**Error handling:**
- If save fails, log error to console but do NOT block the modal from advancing to step 3
- Donation UX must not be disrupted by technical failures

---

## Data Flow

```
User clicks "Quero apoiar" (card or navbar)
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
