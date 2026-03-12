# Testimonials Redesign Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the fake testimonials section in `Index.tsx` with a real asymmetric card grid using the 5 actual community testimonials from `docs/depoimentos.md`.

**Architecture:** All changes are inline in `src/pages/Index.tsx` — the testimonials section is rewritten in place using shadcn `Card`/`CardContent` components already present in the project. The unused `TestimonialCard.tsx` component is deleted.

**Tech Stack:** React 18, TypeScript, Tailwind CSS, shadcn/ui (`Card`, `CardContent`)

**Spec:** `docs/superpowers/specs/2026-03-12-testimonials-redesign.md`

---

## Chunk 1: Replace Testimonials Section

### Task 1: Remove `TestimonialCard` import and add `Card` import in `Index.tsx`

**Files:**
- Modify: `src/pages/Index.tsx:12`

- [ ] **Step 1: Open `src/pages/Index.tsx` and replace line 12**

Replace:
```tsx
import TestimonialCard from '@/components/TestimonialCard';
```

With:
```tsx
import { Card, CardContent } from '@/components/ui/card';
```

- [ ] **Step 2: Verify no TypeScript errors**

Run: `npm run build`
Expected: build succeeds (or same errors as before — `TestimonialCard` is gone so no new errors should appear)

---

### Task 2: Replace the testimonials section JSX in `Index.tsx`

**Files:**
- Modify: `src/pages/Index.tsx:48–107`

- [ ] **Step 1: Replace the entire `{/* Testimonials Section */}` block (lines 48–107) with the new JSX**

```tsx
{/* Testimonials Section */}
<section id="testimonials" className="py-12 md:py-20 relative overflow-hidden bg-[#D4E8D8]">
  <div className="absolute inset-0 bg-noise opacity-5"></div>
  <div className="section-container relative z-10">
    <div className="text-center max-w-3xl mx-auto mb-10">
      <span className="chip inline-flex items-center gap-1 mb-4">
        <span>Depoimentos</span>
      </span>
      <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
        O que dizem os caminhantes
      </h2>
      <p className="text-foreground/70 text-lg">
        Palavras de quem viveu a transformação
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

      {/* Paulo Rios — card de destaque: 2 colunas × 2 linhas */}
      <Card className="md:col-span-2 md:row-span-2 sm:p-6 bg-white/70 backdrop-blur-sm border-[#C9A84C]/30 hover:shadow-md hover:bg-white/80 transition-all duration-300">
        <CardContent className="h-full pt-6">
          <blockquote className="grid h-full grid-rows-[auto_1fr_auto] gap-6">
            <div className="text-[#2B4F8C]">
              <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"></path>
                <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"></path>
              </svg>
            </div>
            <p className="font-serif italic text-[#2C2C1E]/90 text-xl">
              Estar aqui é a sensação de completude de uma jornada de buscas que já vivi. É a compreensão de que a busca está dentro e que no silencio é que me reencontro. Aqui, vivemos na prática toda a jornada fora e dentro: do plantio, adubo da terra, bioconstrução, técnicas de cultivo e preparo da medicinas no fogo das panelas e fogo interno pessoal de cada um. E isso tudo só é possível aqui com a meditação e a ativação da presença nas atividades diárias, que levam à compreensão e completude do caminho para dentro e a uma alquimia interna para forjar e abrir espaço para este ser florescer.
            </p>
            <cite className="text-sm font-medium not-italic text-[#2B4F8C]">— Paulo Rios</cite>
          </blockquote>
        </CardContent>
      </Card>

      {/* Ananda — 2 colunas, linha 1 direita */}
      <Card className="md:col-span-2 bg-white/70 backdrop-blur-sm border-[#C9A84C]/30 hover:shadow-md hover:bg-white/80 transition-all duration-300">
        <CardContent className="h-full pt-6">
          <blockquote className="grid h-full grid-rows-[auto_1fr_auto] gap-6">
            <div className="text-[#2B4F8C]">
              <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"></path>
                <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"></path>
              </svg>
            </div>
            <p className="font-serif italic text-[#2C2C1E]/90 text-base">
              A Casa da Alquimia é a lembrança de que eu sou esse espaço de autotransformação pessoal. É com esse fogo interno que cada um vive isso na prática individual e entre os amigos do caminho, nessa união interior e exterior. E através dos amigos do caminho que nós encontramos o coração de luz - nosso e do outro.
            </p>
            <cite className="text-sm font-medium not-italic text-[#2B4F8C]">— Ananda</cite>
          </blockquote>
        </CardContent>
      </Card>

      {/* Sadgati — card normal, linha 2 col 3 */}
      <Card className="bg-white/70 backdrop-blur-sm border-[#C9A84C]/30 hover:shadow-md hover:bg-white/80 transition-all duration-300">
        <CardContent className="h-full pt-6">
          <blockquote className="grid h-full grid-rows-[auto_1fr_auto] gap-6">
            <div className="text-[#2B4F8C]">
              <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"></path>
                <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"></path>
              </svg>
            </div>
            <p className="font-serif italic text-[#2C2C1E]/90 text-base">
              Para mim, a Casa da Alquimia tem um objetivo único de investigação interior e de encontro consigo mesmo. Vivendo isso por meio da troca e da convivência no dia a dia, do compartilhamento da vida. Aqui vivencio a meditação, o silêncio e a conexão.
            </p>
            <cite className="text-sm font-medium not-italic text-[#2B4F8C]">— Sadgati</cite>
          </blockquote>
        </CardContent>
      </Card>

      {/* Bárbara Rocha — card normal, linha 2 col 4 */}
      <Card className="bg-white/70 backdrop-blur-sm border-[#C9A84C]/30 hover:shadow-md hover:bg-white/80 transition-all duration-300">
        <CardContent className="h-full pt-6">
          <blockquote className="grid h-full grid-rows-[auto_1fr_auto] gap-6">
            <div className="text-[#2B4F8C]">
              <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"></path>
                <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"></path>
              </svg>
            </div>
            <p className="font-serif italic text-[#2C2C1E]/90 text-base">
              Percebi ao chegar na Casa da Alquimia a saudade que eu estava de mim mesma. Foi só quando silenciei profundamente que relembrei o tamanho do meu ser e do meu amor. Essa casa promove reencontros profundos e momentos de expansão de consciência como eu não tinha experenciado antes. São momentos raríssimos e muito preciosos ao longo da vida e da busca espiritual.
            </p>
            <cite className="text-sm font-medium not-italic text-[#2B4F8C]">— Bárbara Rocha</cite>
          </blockquote>
        </CardContent>
      </Card>

      {/* Thais Mesquita — col-span-2 col-start-3, linha 3 */}
      <Card className="md:col-span-2 md:col-start-3 bg-white/70 backdrop-blur-sm border-[#C9A84C]/30 hover:shadow-md hover:bg-white/80 transition-all duration-300">
        <CardContent className="h-full pt-6">
          <blockquote className="grid h-full grid-rows-[auto_1fr_auto] gap-6">
            <div className="text-[#2B4F8C]">
              <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"></path>
                <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"></path>
              </svg>
            </div>
            <p className="font-serif italic text-[#2C2C1E]/90 text-base">
              Vivi uma experiência transformadora no Casulo: força, magia e acolhimento que trouxeram calma, confiança e a sensação de que algo muito especial está (re)nascendo.
            </p>
            <cite className="text-sm font-medium not-italic text-[#2B4F8C]">— Thais Mesquita</cite>
          </blockquote>
        </CardContent>
      </Card>

    </div>
  </div>
</section>
```

- [ ] **Step 2: Verify the build compiles**

Run: `npm run build`
Expected: build completes with no new errors

- [ ] **Step 3: Verify visually in dev server**

Run: `npm run dev`
Open browser at `http://localhost:8086/#testimonials`

Check:
- Fundo da seção em verde-água (`#D4E8D8`)
- Paulo Rios ocupa metade esquerda em 2 linhas (tela larga)
- Ananda ao lado, Sadgati e Bárbara abaixo à direita, Thais na linha 3 à direita
- Textos em fonte serif itálico
- Nome dos autores em azul cobalto sem itálico
- Sem fotos, sem botão CTA
- Mobile: todos os cards empilhados em coluna única

- [ ] **Step 4: Commit**

```bash
git add src/pages/Index.tsx
git commit -m "feat: redesign testimonials section with real community quotes and asymmetric grid"
```

---

### Task 3: Delete `TestimonialCard.tsx`

**Files:**
- Delete: `src/components/TestimonialCard.tsx`

- [ ] **Step 1: Confirm the file is no longer imported anywhere**

Run: `grep -r "TestimonialCard" src/`
Expected: zero results (the import was removed in Task 1)

- [ ] **Step 2: Delete the file**

```bash
rm src/components/TestimonialCard.tsx
```

- [ ] **Step 3: Verify build still passes**

Run: `npm run build`
Expected: build completes with no errors

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "chore: remove unused TestimonialCard component"
```
