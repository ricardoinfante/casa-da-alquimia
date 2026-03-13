# Redesign Visual Sagrado Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform the visual aesthetic of Casa da Alquimia from modern/glassmorphism to a sacred/natural "templo natural" look by applying the project's color palette, correcting typography, and removing all gradients, shadows, and pill-shaped buttons.

**Architecture:** Additive-first approach — new tokens are added to Tailwind before old ones are removed, so the codebase is never in a broken state. Components are updated in layers: foundation (tokens/CSS) → layout (Navbar/Hero/Footer) → sections → utilities. Old tokens are removed last, after all components are fixed, verified with a TypeScript build.

**Tech Stack:** React 18, TypeScript, Tailwind CSS 3.4, Vite. Dev server: `npm run dev` (port 8086). Build check: `npm run build`.

**Spec:** `docs/superpowers/specs/2026-03-12-redesign-visual-sagrado-design.md`

---

## Chunk 1: Foundation — Tokens and CSS

---

### Task 1: Add new color tokens and fix borderRadius in tailwind.config.ts

**Files:**
- Modify: `tailwind.config.ts`

Context: The existing Shadcn tokens (`primary`, `secondary`, `accent`, etc.) use `hsl(var(--*))` CSS variables and must NOT be touched structurally. We add new flat-key tokens alongside them, and remove the old project palette tokens (`azul`, `verde`, `marrom`, `nature`, `spirit`, `earth`). We also fix `borderRadius` to guarantee `rounded-sm = 2px` regardless of the `--radius` CSS variable.

- [ ] **Step 1: Open `tailwind.config.ts` and locate the `colors` block inside `extend`**

The block starting around line 22 contains Shadcn tokens followed by old palette tokens (`azul`, `verde`, `marrom`).

- [ ] **Step 2: Insert new flat tokens after the `sidebar` block**

Find the closing `},` of the `sidebar` token block (around line 65). **After** that closing brace — and before the closing `},` of `extend.colors` — insert the following block:

```ts
// Paleta de cores do projeto (nova — tokens adicionais, flat keys)
'primary-dark':    '#1A3A6B',
'secondary-light': '#8FA85C',
'bg-agua':         '#D4E8D8',
'bg-light':        '#F0F5EC',
'dark':            '#2C2C1E',
'terra-1':         '#934211',
'terra-2':         '#7A4900',
'terra-3':         '#B5771C',
```

> **Do NOT remove or touch the existing `azul`, `verde`, `marrom`, `nature`, `spirit`, `earth`, `darktext`, `highlight`, `tag`, `lightbg`, `iconblue` blocks.** They will be removed in Task 12, after all component files have been updated.

- [ ] **Step 3: Fix the `borderRadius` block**

Find the `borderRadius` section in `tailwind.config.ts` (around line 134). Replace it with:

```ts
borderRadius: {
  sm: '2px',
  DEFAULT: '4px',
  md: '6px',
  lg: '8px',
  xl: '12px',
  '2xl': '16px',
  '3xl': '24px',
  full: '9999px',
},
```

- [ ] **Step 4: Run build to verify no TypeScript errors**

```bash
npm run build
```

Expected: build succeeds with no errors. (The old tokens still exist so no existing classes break.)

- [ ] **Step 5: Commit**

```bash
git add tailwind.config.ts
git commit -m "feat: add new palette tokens and fix borderRadius in tailwind config"
```

---

### Task 2: Update CSS variables and global rules in src/index.css

**Files:**
- Modify: `src/index.css`

Context: Update the HSL CSS variables so Shadcn tokens (`bg-primary`, `bg-secondary`, etc.) resolve to the correct palette colors. Also fix the global `h1-h6` rule, update `.chip`, update `.link-underline`, and remove dead gradient classes.

- [ ] **Step 1: Update HSL color variables in the `:root` block**

Find the `:root { ... }` block and update these variables (leave all other variables untouched):

```css
--background: 93 31% 94%;       /* #F0F5EC — Branco Esverdeado */
--foreground: 60 19% 15%;       /* #2C2C1E — Preto Orgânico */
--primary: 218 53% 36%;         /* #2B4F8C — Azul Cobalto */
--primary-foreground: 0 0% 100%;
--secondary: 90 36% 35%;        /* #5A7A3A — Verde Musgo */
--secondary-foreground: 0 0% 100%;
--accent: 44 54% 54%;           /* #C9A84C — Dourado Âmbar */
--accent-foreground: 60 19% 15%;
--muted: 90 14% 90%;            /* approximated from palette — no spec hex */
--muted-foreground: 90 10% 45%; /* approximated from palette — no spec hex */
```

- [ ] **Step 2: Fix the global `h1-h6` rule**

Find:
```css
h1, h2, h3, h4, h5, h6 {
  @apply font-display tracking-wide text-[#100B0D];
}
```

Replace with:
```css
h1, h2, h3, h4, h5, h6 {
  @apply font-display;
}
```

- [ ] **Step 3: Update the `.chip` class**

Find:
```css
.chip {
  @apply inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-verde-3 text-[#100B0D];
}
```

Replace with:
```css
.chip {
  @apply inline-flex items-center px-3 py-1 rounded-sm text-[11px] font-bold uppercase tracking-[0.2em] bg-secondary/10 text-terra-1;
}
```

- [ ] **Step 4: Update `.link-underline` underline color**

Find the `.link-underline` rule (typically a `::after` pseudo-element). Locate any `@apply bg-azul-2` inside it and replace with `@apply bg-primary`.

- [ ] **Step 5: Fix the global `p, li, blockquote` rule**

Find (around line 96 in `index.css`):
```css
p, li, blockquote {
  @apply font-lato ... text-[#100B0D]/90 ...;
}
```

The `text-[#100B0D]` color is outside the project palette. Replace only that color portion with `text-dark`. The rest of the rule (font-lato, line-height) should remain as-is.

- [ ] **Step 6: Remove dead CSS classes**

Remove the following class definitions entirely from `index.css`:
- `.glass { ... }`
- `.gradient-heading { ... }`
- `.nature-gradient { ... }`
- `.spirit-gradient { ... }`
- `.earth-gradient { ... }`

- [ ] **Step 7: Run build to verify no errors**

```bash
npm run build
```

Expected: builds successfully. Open `http://localhost:8086` and do a quick sanity check — colors should start shifting to the new palette.

- [ ] **Step 8: Commit**

```bash
git add src/index.css
git commit -m "feat: update CSS variables, global rules, and chip/link-underline classes"
```

---

## Chunk 2: Core Layout — Navbar, Hero, Footer

---

### Task 3: Redesign Hero.tsx

**Files:**
- Modify: `src/components/Hero.tsx`

Context: Remove the mouse parallax handler, the 3 floating orbs, all gradient overlays, the glassmorphism badge, drop-shadows on text, and fix buttons to use `rounded-sm` without shadow/scale.

- [ ] **Step 1: Remove the parallax mouse handler**

Find the `useEffect` containing `handleMouseMove` (the one that listens for `mousemove`). Remove:
- The `mousePosition` state variable from its `useState` destructure
- The entire `useEffect` with the `mousemove` event listener and `handleMouseMove` function
- Any `transform: translate(...)` inline `style` prop that uses `mousePosition.x` or `mousePosition.y` on the background image div

After removal, `mousePosition` must no longer appear anywhere in the file.

- [ ] **Step 2: Fix the fallback gradient background div**

Find the `<div>` rendered while the image loads (conditional on `!imageLoaded` or similar). It has a gradient like:
```
bg-gradient-to-br from-primary/30 via-secondary/20 to-accent/30
```
Replace its className with `bg-bg-agua` (solid, no gradient).

- [ ] **Step 3: Remove the 3 floating orbs**

Find the three `<div>` elements with classes containing `animate-float` and `blur-3xl`. Remove all three divs completely.

- [ ] **Step 4: Replace the gradient overlay**

Find the overlay `<div>` with classes containing `from-background via-primary/5 to-secondary/10`. Replace its className with:
```
absolute inset-0 bg-bg-light/60
```

- [ ] **Step 5: Fix the glassmorphism badge above the heading**

Find the badge `<div>` above the `<h1>` with classes including `rounded-full bg-white/90 backdrop-blur-xl border border-white/20 shadow-lg`. Replace with:
```
rounded-sm bg-secondary/10 border border-terra-1/20 px-3 py-1
```
Also remove `hover:shadow-xl hover:scale-105` and the `animate-pulse` class from the `<Sparkles>` icon inside the badge.

- [ ] **Step 6: Remove drop-shadows from text**

Find any `drop-shadow-[...]` or `drop-shadow-*` classes on `<h1>` or `<p>` elements. Remove them.

- [ ] **Step 7: Fix the primary CTA button**

Find the primary CTA button ("Conhecer nossos rituais"). Update its className:
- Remove: `rounded-full`, `shadow-lg`, `hover:shadow-2xl`, `hover:shadow-primary/50`, `hover:scale-105`
- Add: `rounded-sm`
- Change hover to: `hover:bg-primary-dark`

Result:
```
bg-primary text-white rounded-sm px-8 py-4 transition-colors duration-200 hover:bg-primary-dark
```

- [ ] **Step 8: Fix the secondary CTA button**

Find the secondary CTA button ("Quero saber mais"). Update:
- Remove: `bg-white/90`, `backdrop-blur-xl`, `border-white/20`, `hover:border-primary/50`, `shadow-lg`, `hover:scale-105`, `rounded-full`
- Replace with:
```
border border-terra-1 text-terra-1 rounded-sm px-8 py-4 transition-colors duration-200 hover:bg-terra-1 hover:text-white
```

- [ ] **Step 9: Remove scroll indicator bounce**

Find the scroll indicator `<div>` at the bottom of the hero (has `animate-bounce`). Remove `animate-bounce`.

- [ ] **Step 10: Verify and commit**

```bash
npm run build && git add src/components/Hero.tsx && git commit -m "feat: remove parallax, blobs, gradients and fix buttons in Hero"
```

---

### Task 4: Redesign Navbar.tsx

**Files:**
- Modify: `src/components/Navbar.tsx`

- [ ] **Step 1: Fix the navbar header background**

Find the className on the main `<header>` (or `<nav>`) element. It uses `bg-white/80 backdrop-blur-2xl` (or similar glassmorphism). Replace with:
```
bg-bg-light border-b border-terra-1/20
```
Remove `shadow-*`, `backdrop-blur-*` classes.

- [ ] **Step 2: Fix the logo text gradient**

Find the logo text with `bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent`. Remove gradient classes and replace with `text-primary-dark`.

- [ ] **Step 3: Remove the logo hover gradient halo**

Find the child `<div>` inside the logo link area with:
```
bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full opacity-0 group-hover:opacity-100 blur
```
Remove this div entirely.

Also remove `hover:scale-110` or `transition-transform` from the logo image element if present.

- [ ] **Step 4: Fix the desktop "Apoiar" button**

Find the "Apoiar" button. It uses `bg-[#1A3A6B] rounded-full shadow-lg hover:shadow-xl hover:shadow-[#1A3A6B]/50 hover:scale-105`. Replace with:
```
bg-primary-dark text-white rounded-sm px-5 py-2.5 transition-colors duration-200 hover:bg-primary
```

- [ ] **Step 5: Fix the desktop "Mais informações" secondary button**

Find the "Mais informações" CTA button. It uses `rounded-full shadow-lg hover:shadow-xl hover:shadow-primary/50 hover:scale-105` with a primary background. This is a secondary CTA — replace with:
```
border border-terra-1 text-terra-1 rounded-sm px-5 py-2.5 transition-colors duration-200 hover:bg-terra-1 hover:text-white
```

- [ ] **Step 6: Fix the mobile menu backdrop (gradient + blobs)**

Find the mobile menu backdrop `<div>` with `from-background/98 via-primary/5 to-secondary/5 backdrop-blur-3xl`. Replace its gradient/blur classes with `bg-bg-light`. Also find and remove the two decorative blur child divs inside it:
```
bg-primary/10 rounded-full blur-3xl
bg-secondary/10 rounded-full blur-3xl
```
Remove both divs completely.

- [ ] **Step 7: Fix the mobile menu slide-in panel**

Find the slide-in panel `<div>` (separate from the backdrop above) with `bg-white/95 backdrop-blur-xl border-l border-white/20 shadow-2xl`. Replace with:
```
bg-bg-light border-l border-terra-1/20
```

- [ ] **Step 8: Fix the mobile sticky CTA button**

Find the sticky CTA button at the bottom of the mobile menu (typically "Quero saber mais" or "Conhecer"). It uses:
```
bg-gradient-to-r from-primary to-primary/80 rounded-xl shadow-lg hover:shadow-xl hover:shadow-primary/50
```
Replace with:
```
bg-primary text-white rounded-sm transition-colors duration-200 hover:bg-primary-dark
```
Also remove the `<Sparkles>` icon's `animate-pulse` class inside this button.

- [ ] **Step 9: Remove mobile nav item hover gradient line**

Find the decorative hover line element inside each mobile nav item with `bg-gradient-to-r from-transparent via-primary to-transparent`. Remove these gradient divs entirely.

- [ ] **Step 10: Remove staggered animation delays**

Find `transition-delay` or `delay-*` classes on mobile menu items. Remove them all.

- [ ] **Step 11: Verify and commit**

```bash
npm run build && git add src/components/Navbar.tsx && git commit -m "feat: remove glassmorphism, gradients, and fix all buttons in Navbar"
```

---

### Task 5: Redesign Footer.tsx

**Files:**
- Modify: `src/components/Footer.tsx`

- [ ] **Step 1: Fix footer background**

Find the outermost `<footer>` element. Replace `bg-gradient-to-b from-background to-muted/50` with `bg-dark`.

- [ ] **Step 2: Remove decorative blur blobs**

Find the absolute-positioned `<div>` container (around line 10) that holds two blur circles:
```
bg-primary rounded-full blur-3xl
bg-secondary rounded-full blur-3xl
```
Remove the entire container div and both blur circles.

- [ ] **Step 3: Fix the bottom bar gradient separator**

Find the element using `from-primary/50 via-accent/50 to-secondary/50` as a decorative line. Replace it (or its parent wrapper) with `border-t border-terra-1/30`.

- [ ] **Step 4: Fix logo text gradient**

Find the logo text with `bg-clip-text text-transparent from-foreground to-primary`. Remove gradient classes and replace with `text-white`.

- [ ] **Step 5: Remove logo image hover scale**

Find `hover:scale-110` or `transition-transform` on the logo `<img>` element. Remove it.

- [ ] **Step 6: Fix social icon links**

Find the three social icon link elements (Instagram, Facebook, Mail). Each uses `bg-white/60 backdrop-blur-sm hover:scale-110 hover:shadow-lg border border-white/20 rounded-2xl`. Replace with:
```
bg-white/10 border border-white/20 rounded-sm transition-colors duration-200 hover:bg-white/20
```
Also find and remove the gradient halo child div inside each:
```
bg-gradient-to-r from-primary/30 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 blur
```
Remove these gradient divs entirely.

- [ ] **Step 7: Fix contact info cards**

Find the three contact card elements (MapPin, Phone, Mail) with `bg-white/40 backdrop-blur-sm rounded-xl border border-white/20 hover:border-primary/30 hover:bg-white/60`. Replace with:
```
bg-white/10 border border-white/20 rounded-sm transition-colors duration-200 hover:bg-white/15
```

- [ ] **Step 8: Fix text colors**

Ensure body text uses `text-white/70` where it currently uses `text-foreground/70` or `text-muted-foreground`.

- [ ] **Step 9: Remove animate-pulse from Heart icon**

Find `<Heart ... animate-pulse />` in the bottom bar. Remove `animate-pulse`.

- [ ] **Step 10: Verify and commit**

```bash
npm run build && git add src/components/Footer.tsx && git commit -m "feat: use solid dark background, remove gradients/glassmorphism in Footer"
```

---

## Chunk 3: Content Sections

---

### Task 6: Redesign About.tsx

**Files:**
- Modify: `src/components/About.tsx`

- [ ] **Step 1: Fix section background**

Find the outermost section `<div>`. Replace `bg-gradient-to-b from-background via-muted/30 to-background` with `bg-bg-agua`.

- [ ] **Step 2: Remove decorative pulsing elements**

Find `<div>` elements with `animate-pulse-gentle` or `blur-2xl animate-pulse-gentle`. Remove them entirely.

- [ ] **Step 3: Fix title gradient**

Find heading with `bg-clip-text text-transparent from-primary via-accent to-secondary`. Remove gradient classes and replace with `text-primary-dark`.

- [ ] **Step 4: Fix badge/label styling**

Find the eyebrow badge (e.g., "Sobre Nós"). Replace its classes with:
```
inline-flex items-center px-3 py-1 rounded-sm text-[11px] font-bold uppercase tracking-[0.2em] bg-secondary/10 text-terra-1
```

- [ ] **Step 5: Fix the image card container**

Find the image wrapper div with `rounded-3xl shadow-2xl` (line ~46). Remove `shadow-2xl`. Change `rounded-3xl` to `rounded-sm`.

- [ ] **Step 6: Remove image hover scale**

Find `group-hover:scale-105 transition-transform duration-700` on the `<img>` element inside the image card (line ~53). Remove both classes.

- [ ] **Step 7: Remove image overlay gradient**

Find the image overlay div with `bg-gradient-to-t from-black/20 via-transparent to-transparent` (line ~62). Remove the gradient classes or the div entirely.

- [ ] **Step 8: Fix feature cards**

Find cards with `bg-white/50 backdrop-blur-sm border border-white/20`. Replace with:
```
bg-white border border-terra-1/20 transition-colors duration-200 hover:border-terra-1/40
```
Remove `shadow-*`, `hover:scale-*`, `hover:border-primary/30`.

- [ ] **Step 9: Remove icon hover scale**

Find `group-hover:scale-110 transition-transform` on icon elements inside feature cards (line ~121). Remove both classes.

- [ ] **Step 10: Fix image badge overlay**

Find the badge overlaid on the image with `bg-white/90 backdrop-blur-xl shadow-lg`. Replace with:
```
bg-white border border-terra-1/20
```

- [ ] **Step 11: Verify and commit**

```bash
npm run build && git add src/components/About.tsx && git commit -m "feat: apply natural aesthetic to About section"
```

---

### Task 7: Redesign Rituals.tsx and fix its icon tokens

**Files:**
- Modify: `src/components/Rituals.tsx`

- [ ] **Step 1: Fix section background**

Replace `bg-gradient-to-b from-background via-muted/20 to-background` with `bg-bg-light`.

- [ ] **Step 2: Remove floating particles**

Find absolute-positioned `<div>` elements with `bg-primary/20 blur-3xl` and `bg-secondary/20 blur-3xl`. Remove them completely.

- [ ] **Step 3: Fix the section header badge**

Find the header badge with `rounded-full bg-white/80 backdrop-blur-xl border border-white/20 shadow-lg` (line ~16). Replace with:
```
rounded-sm bg-secondary/10 border border-terra-1/20
```

- [ ] **Step 4: Fix ritual card container**

Find the card element. Its className uses conditional JavaScript logic for hover state (e.g., `hoveredCard === index ? 'shadow-2xl scale-105 -translate-y-2' : ''`). Change the truthy branch to `''` (empty string). Also replace `bg-white/60 backdrop-blur-xl border border-white/20` with:
```
bg-white border border-terra-1/20
```

- [ ] **Step 5: Remove card image conditional hover scale**

Find the `<img>` inside each card using conditional logic `hoveredCard === index ? 'scale-110' : 'scale-100'`. Replace the truthy value `'scale-110'` with `'scale-100'` (or remove the entire conditional, keeping only static classes).

- [ ] **Step 6: Remove hover glow div inside each card**

Find `<div>` with `bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100` (line ~135). Remove this div entirely.

- [ ] **Step 7: Remove 3D decorative shadow div behind each card**

Find `<div>` with `bg-gradient-to-br from-primary/20 to-secondary/20 rounded-3xl blur-xl` (line ~139). Remove this div entirely.

- [ ] **Step 8: Fix the icon float badge inside card images**

Find the icon overlay with `bg-white/90 backdrop-blur-xl rounded-2xl shadow-lg group-hover:scale-110` (line ~94). Replace with:
```
bg-white border border-terra-1/20 rounded-sm
```
Remove `group-hover:scale-110 transition-transform`.

- [ ] **Step 9: Fix image overlay gradient**

Find the image overlay with `from-black/60 via-black/20 to-transparent`. Replace with `bg-dark/40`.

- [ ] **Step 10: Fix the inline ritual link button**

Find the optional link button with `rounded-full hover:shadow-lg hover:shadow-primary/50 hover:gap-3` (line ~126). Replace with:
```
rounded-sm transition-colors duration-200 hover:text-primary-dark
```
Remove `shadow-*`, `hover:shadow-*`, `hover:gap-3`.

- [ ] **Step 11: Fix the bottom CTA box**

Find `bg-gradient-to-br from-white/70 to-white/40 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/20`. Replace with:
```
bg-white border border-terra-1/20 rounded-sm p-8 md:p-12
```

- [ ] **Step 12: Fix the CTA button**

Find the CTA button and apply primary styles:
```
bg-primary text-white rounded-sm px-6 py-3 transition-colors duration-200 hover:bg-primary-dark
```
Remove any `shadow-*`, `hover:shadow-*`.

- [ ] **Step 13: Fix icon token references**

- `text-azul-2` (lines ~34, 46, 59) → `text-primary`
- `text-verde-3` (lines ~40, 52, 64) → `text-secondary`

- [ ] **Step 14: Verify and commit**

```bash
npm run build && git add src/components/Rituals.tsx && git commit -m "feat: apply natural aesthetic to Rituals section and fix icon tokens"
```

---

### Task 8: Redesign SocialMedia.tsx, SocialMediaPost.tsx, and InstagramSection.tsx

**Files:**
- Modify: `src/components/SocialMedia.tsx`
- Modify: `src/components/social/SocialMediaPost.tsx`
- Modify: `src/components/social/InstagramSection.tsx`

**SocialMedia.tsx:**

- [ ] **Step 1: Fix section background**

Replace `bg-gradient-to-b from-background via-muted/20 to-background` with `bg-bg-light`.

- [ ] **Step 2: Remove floating blobs**

Find and remove both `<div>` elements with `bg-primary/30 rounded-full blur-3xl animate-float` and `bg-secondary/30 rounded-full blur-3xl animate-float`.

- [ ] **Step 3: Fix title gradient**

Find the heading with `bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent`. Remove gradient classes, replace with `text-primary-dark`.

- [ ] **Step 4: Fix chip/badge glassmorphism**

Find the chip element with `bg-white/80 backdrop-blur-xl border border-white/20 shadow-lg`. Replace with:
```
bg-secondary/10 border border-terra-1/20
```

- [ ] **Step 5: Remove animate-pulse from icon**

Find `animate-pulse` on any icon element. Remove the class.

**SocialMediaPost.tsx:**

- [ ] **Step 6: Fix shadows and scale on the post anchor wrapper**

Find the `<a>` element wrapping each post with `shadow-md hover:shadow-lg transition-all duration-300` (line ~41). Remove `shadow-md hover:shadow-lg`. Also find the `<img>` with `group-hover:scale-110` (line ~53). Remove `group-hover:scale-110`.

- [ ] **Step 7: Fix hover overlay token**

Find `bg-azul-2/0 group-hover:bg-azul-2/20` on the thumbnail overlay div. Replace with:
```
bg-primary/0 group-hover:bg-primary/20
```

- [ ] **Step 8: Fix text token**

Find `text-darktext` (or `text-[#100B0D]`). Replace with `text-dark`.

**InstagramSection.tsx:**

- [ ] **Step 8: Fix text-highlight token**

Find `text-highlight` (line ~37). Replace with `text-primary`.

- [ ] **Step 9: Fix follow button tokens**

Find `bg-azul-2/10 border border-azul-2/20 text-azul-2` (line ~45). Replace with:
```
bg-primary/10 border border-primary/20 text-primary
```

- [ ] **Step 10: Verify and commit**

```bash
npm run build && git add src/components/SocialMedia.tsx src/components/social/SocialMediaPost.tsx src/components/social/InstagramSection.tsx && git commit -m "feat: fix social media section gradients and token references"
```

---

## Chunk 4: Supporting Components and Index.tsx

---

### Task 9: Fix ContactForm.tsx, Donate.tsx, DonationModal.tsx

**Files:**
- Modify: `src/components/ContactForm.tsx`
- Modify: `src/components/Donate.tsx`
- Modify: `src/components/DonationModal.tsx`

**ContactForm.tsx:**

- [ ] **Step 1: Fix section background gradient**

Find the `<section>` element with `bg-gradient-to-b from-background to-muted/30` (line ~88). Remove the gradient classes — the section background is controlled by Index.tsx's wrapper.

- [ ] **Step 2: Fix icon token references**

Find all 5 `text-azul-2` on icon elements (lines ~95, 112, 130, 149, 165). Replace each with `text-primary`.

- [ ] **Step 3: Fix form container glassmorphism**

Find the `<form>` element with `bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-muted` (line ~108). Replace with:
```
bg-white rounded-sm border border-terra-1/20
```

- [ ] **Step 4: Fix submit button**

Find the submit button with `rounded-full shadow-lg hover:shadow-xl` (and conditional `hover:scale-105`) (line ~190). Replace with:
```
bg-primary text-white rounded-sm px-6 py-3 transition-colors duration-200 hover:bg-primary-dark
```
Remove `shadow-*`, `hover:shadow-*`, `hover:scale-*`.

- [ ] **Step 5: Fix info box gradient**

Find the info box with `bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-200` (line ~221). Replace with:
```
bg-secondary/10 rounded-sm border border-terra-1/20
```

- [ ] **Step 6: Clean up gradient-heading class reference**

Find `className="gradient-heading ml-2 block md:inline"` (line ~100) on a `<span>`. Remove the `gradient-heading` class (it will be deleted from index.css in Task 2). Keep `ml-2 block md:inline`.

**Donate.tsx:**

- [ ] **Step 7: Remove the gradient overlay div**

Find `<div>` with `bg-gradient-to-r from-azul-1/40 to-azul-1/20` (line ~9). Remove the entire div.

- [ ] **Step 8: Fix the support card container**

Find the card with `bg-white/70 backdrop-blur-sm rounded-xl shadow-sm` (line ~13). Replace with:
```
bg-white border border-terra-1/20 rounded-sm
```

- [ ] **Step 9: Fix the CTA button**

Find `bg-azul-2 rounded-full hover:bg-azul-2/90`. Replace with:
```
bg-primary text-white rounded-sm px-6 py-3 transition-colors duration-200 hover:bg-primary-dark
```

**DonationModal.tsx:**

- [ ] **Step 10: Fix modal backdrop blur**

Find the backdrop overlay `<div>` with `bg-black/40 backdrop-blur-sm` (line ~19). Remove `backdrop-blur-sm`.

- [ ] **Step 11: Fix modal container**

Find the modal container `<div>` with `rounded-2xl shadow-xl` (line ~24). Replace `rounded-2xl` with `rounded-sm`. Remove `shadow-xl`.

- [ ] **Step 12: Remove remaining shadows and fix rounded-full buttons**

Search for any remaining `shadow-*` in the modal. Remove them. Replace `rounded-full` on action buttons with `rounded-sm`. (Decorative circular containers like icon wrappers may keep `rounded-full`.)

- [ ] **Step 13: Verify and commit**

```bash
npm run build && git add src/components/ContactForm.tsx src/components/Donate.tsx src/components/DonationModal.tsx && git commit -m "feat: fix tokens, remove gradients and shadows in ContactForm, Donate, DonationModal"
```

---

### Task 10: Fix MemoriasGallery.tsx and SpotifyPlayer.tsx

**Files:**
- Modify: `src/components/MemoriasGallery.tsx`
- Modify: `src/components/SpotifyPlayer.tsx`

**MemoriasGallery.tsx:**

- [ ] **Step 1: Remove any gradient backgrounds or shadows**

Search for `bg-gradient-*`, `shadow-*`, `backdrop-blur-*`. Remove all. Replace glassmorphism cards with solid `bg-white border border-terra-1/20`.

- [ ] **Step 2: Fix any rounded-full elements**

Replace `rounded-full` on interactive elements (buttons, tags) with `rounded-sm`. Keep `rounded-full` only on circular avatar/dot decorations if any.

**SpotifyPlayer.tsx:**

- [ ] **Step 3: Fix the floating re-open button**

Find the floating button rendered when the player is hidden (line ~61). It has `rounded-full shadow-2xl hover:shadow-green-500/50 hover:scale-110`. Replace with:
```
rounded-sm transition-colors duration-200
```
Remove all `shadow-*`, `hover:shadow-*`, `hover:scale-*`.

- [ ] **Step 4: Fix the player bar gradient background**

Find `bg-gradient-to-r from-[#1DB954] to-[#1ed760]` on the main player bar. Replace with `bg-[#1DB954]` (solid Spotify green — keep brand color).

- [ ] **Step 5: Fix the minimized bar gradient**

Find `bg-gradient-to-r from-[#191414] to-[#1DB954]` on the minimized bar (line ~118). Replace with `bg-[#191414]` (solid dark Spotify color).

- [ ] **Step 6: Remove shadows**

Remove all `shadow-2xl`, `shadow-lg`, `hover:shadow-green-500/50` from the component.

- [ ] **Step 7: Fix rounded-full control buttons**

Find control buttons inside the player (Minimize, Close, etc.) with `rounded-full`. Replace with `rounded-sm`.

- [ ] **Step 8: Fix glassmorphism**

Find `backdrop-blur-sm border border-white/20`. Replace with `border border-white/10`.

- [ ] **Step 9: Remove animate-pulse**

Find `animate-pulse` on the music icon. Remove it.

- [ ] **Step 10: Verify and commit**

```bash
npm run build && git add src/components/MemoriasGallery.tsx src/components/SpotifyPlayer.tsx && git commit -m "feat: remove gradients and fix buttons in MemoriasGallery and SpotifyPlayer"
```

---

### Task 11: Update Index.tsx — Section backgrounds and Testimonials

**Files:**
- Modify: `src/pages/Index.tsx`

Context: Add alternating section backgrounds and fix the inline Testimonials section (5 Cards with glassmorphism, shadows, and font-serif quotes).

- [ ] **Step 1: Add section background alternation**

For each section wrapper `<div>` or `<section>` in Index.tsx, add the appropriate background class according to this table:

| Section | Background class |
|---|---|
| About | `bg-bg-agua` |
| Rituals | `bg-bg-light` |
| MemoriasGallery | `bg-bg-agua` |
| SocialMedia | `bg-bg-light` |
| Testimonials | `bg-bg-agua` |
| Donate | `bg-bg-light` |
| ContactForm | `bg-bg-agua` |

Remove any existing `bg-*` or `bg-gradient-*` from these section wrappers.

- [ ] **Step 2: Fix Testimonials cards**

Find the 5 testimonial `<Card>` components (lines ~67, 85, 103, 121, 139). For each:
- Remove `bg-white/70 backdrop-blur-sm` → add `bg-white`
- Remove `hover:shadow-md`
- Replace `border-[#C9A84C]/30` → `border-terra-1/20`

- [ ] **Step 3: Fix Testimonials blockquote text**

Find each `<p>` inside the testimonial blockquotes with `font-serif italic text-[#2C2C1E]/90`. Replace with:
```
font-lato italic text-dark
```

- [ ] **Step 4: Fix Testimonials section heading**

Find the `.chip` label above the testimonials heading. Verify it uses the `.chip` class (which we already updated). If it uses inline classes instead, apply:
```
inline-flex items-center px-3 py-1 rounded-sm text-[11px] font-bold uppercase tracking-[0.2em] bg-secondary/10 text-terra-1
```

- [ ] **Step 5: Fix scroll progress bar**

Find the scroll progress bar at the top of the page (the inner `<div>` that grows with scroll width). The source currently uses `bg-primary`. Replace with `bg-terra-1` to use the terracotta accent.

- [ ] **Step 6: Verify and commit**

```bash
npm run build && git add src/pages/Index.tsx && git commit -m "feat: add section background alternation and fix Testimonials in Index"
```

---

### Task 12: Remove old tokens from tailwind.config.ts and final verification

**Files:**
- Modify: `tailwind.config.ts`

- [ ] **Step 1: Remove old palette token blocks from tailwind.config.ts**

Find and remove the following blocks entirely from the `colors` object:

```ts
azul: {
  1: '#8BB6CC',
  2: '#173D90',
  3: '#1D3F6C',
},
verde: {
  1: '#BED19F',
  2: '#9CB96B',
  3: '#80A94D',
  4: '#507030',
},
marrom: {
  1: '#A68943',
  2: '#674321',
},
```

Also remove these blocks if present: `nature`, `spirit`, `earth`.

Also remove these individual flat tokens (lines ~83-87):
```ts
darktext: '...',
highlight: '...',
tag: '...',
lightbg: '...',
iconblue: '...',
```

- [ ] **Step 2: Run full TypeScript build**

```bash
npm run build
```

Expected: **zero errors**. If any `azul-*`, `verde-*`, or `marrom-*` token references remain in component files, they will NOT cause TypeScript errors (Tailwind classes are strings) but will produce no style. Run a search to confirm none remain:

```bash
grep -r "azul-\|verde-\|marrom-\|nature-\|spirit-\|earth-\|darktext\|highlight\|iconblue\|lightbg\b" src/ --include="*.tsx" --include="*.ts" --include="*.css"
```

Expected: no results. If any found, apply the token mapping from spec Section 9.

- [ ] **Step 3: Run dev server and do full visual review**

```bash
npm run dev
```

Open `http://localhost:8086` and verify each section top-to-bottom:
- [ ] Navbar: solid `#F0F5EC` background, `rounded-sm` "Apoiar" button, no glassmorphism
- [ ] Hero: clean overlay, `rounded-sm` buttons, no floating blobs
- [ ] About: Verde-Água background, no pulsing elements
- [ ] Rituals: light background, solid cards, correct icon colors
- [ ] SocialMedia: light background, no floating blobs
- [ ] Testimonials: Verde-Água background, solid white cards, no glassmorphism
- [ ] Donate: light background, square CTA button
- [ ] ContactForm: Verde-Água background
- [ ] Footer: dark background, no gradient

- [ ] **Step 4: Commit**

```bash
git add tailwind.config.ts
git commit -m "feat: remove legacy palette tokens from tailwind config"
```

- [ ] **Step 5: Final commit — mark redesign complete**

```bash
git commit --allow-empty -m "feat: complete visual redesign — sacred/natural aesthetic applied throughout"
```

---

## Summary

| Task | Files | Scope |
|---|---|---|
| 1 | `tailwind.config.ts` | Add new tokens, fix borderRadius |
| 2 | `src/index.css` | CSS variables, h1-h6, .chip, .link-underline, remove dead classes |
| 3 | `Hero.tsx` | Remove parallax, blobs, gradients, fix buttons |
| 4 | `Navbar.tsx` | Remove glassmorphism, fix buttons |
| 5 | `Footer.tsx` | Dark background, remove gradient, fix text |
| 6 | `About.tsx` | Verde-Água background, remove decorations, fix cards |
| 7 | `Rituals.tsx` | Light background, fix cards, fix icon tokens |
| 8 | `SocialMedia.tsx` + `SocialMediaPost.tsx` + `InstagramSection.tsx` | Fix gradients and tokens |
| 9 | `ContactForm.tsx` + `Donate.tsx` + `DonationModal.tsx` | Fix tokens, buttons, shadows |
| 10 | `MemoriasGallery.tsx` + `SpotifyPlayer.tsx` | Remove gradients and shadows |
| 11 | `Index.tsx` | Section backgrounds, Testimonials |
| 12 | `tailwind.config.ts` | Remove legacy tokens, final verification |
