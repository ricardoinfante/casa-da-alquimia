# Redesign Visual Sagrado — Casa da Alquimia v2

**Data:** 2026-03-12
**Escopo:** Redesign visual cirúrgico — aplicação de paleta, tipografia, remoção de gradientes/shadows, ajuste de bordas e animações
**Abordagem:** Redesign Cirúrgico + atualização de tokens de cor no Tailwind

---

## Contexto

O site atual usa glassmorphism, gradientes de fundo, blobs animados e botões em formato pílula (`rounded-full`). A estética resultante é moderna/tech, incompatível com a comunicação religiosa, espiritual e sagrada da Casa da Alquimia. O objetivo é transformar a interface em um "templo natural" — orgânico, enraizado, sóbrio — sem reconstruir componentes do zero.

---

## Diretrizes de Design

**Referência visual:** Templo natural — tons de terra e verde musgo predominantes, texturas orgânicas, sensação de enraizamento.

**Princípios:**
- Cores sólidas, sem gradientes em nenhum elemento
- Sem shadows (box-shadow, drop-shadow, text-shadow)
- Sem glassmorphism (backdrop-blur, bg-white/opacity)
- Botões como pedra lavrada (rounded-sm, 2px)
- Animações apenas como fade-in suave no scroll
- Tons terrosos ativos em bordas, divisores e labels

---

## 1. Sistema de Tokens de Cor

### Estratégia de tokens

O projeto usa dois sistemas de tokens em `tailwind.config.ts`:

1. **Tokens Shadcn** (não tocar na estrutura): `primary`, `secondary`, `accent`, `muted`, `card`, etc. — todos usam `hsl(var(--*))` e são necessários para os componentes Shadcn UI funcionarem. A estrutura de objetos nested com `DEFAULT` e `foreground` deve ser preservada.

2. **Tokens de paleta do projeto** (substituir): `azul`, `verde`, `marrom`, `nature`, `spirit`, `earth` — esses serão removidos e substituídos por novos tokens adicionais.

### O que muda em tailwind.config.ts

**Remover** os tokens de paleta antiga (mantendo os Shadcn intactos):
```ts
// REMOVER estes blocos:
azul: { 1: '...', 2: '...', 3: '...' },
verde: { 1: '...', 2: '...', 3: '...', 4: '...' },
marrom: { 1: '...', 2: '...' },
nature: { ... },
spirit: { ... },
earth: { ... },
```

**Adicionar** ao lado dos tokens Shadcn existentes (chaves planas, sem conflito):
```ts
// ADICIONAR — tokens adicionais da paleta do projeto:
'primary-dark':     '#1A3A6B',  // Azul Profundo (hover, H1)
'secondary-light':  '#8FA85C',  // Verde Oliva (ícones, badges)
'bg-agua':          '#D4E8D8',  // Verde-Água (fundo alternado)
'bg-light':         '#F0F5EC',  // Branco Esverdeado (fundo base)
'dark':             '#2C2C1E',  // Preto Orgânico (texto, footer)
'terra-1':          '#934211',  // Terracota (bordas, divisores, labels)
'terra-2':          '#7A4900',  // Âmbar Escuro
'terra-3':          '#B5771C',  // Ocre Dourado (ícones, ornamentos)
```

**Atualizar as variáveis CSS** em `src/index.css` para que os tokens Shadcn (`primary`, `secondary`, `accent`, `background`, `foreground`) apontem para os valores corretos da nova paleta:

| Variável CSS | Valor atual (aproximado) | Novo valor (HSL da paleta) |
|---|---|---|
| `--primary` | azul genérico | HSL equivalente de `#2B4F8C` → `219 52% 36%` |
| `--primary-foreground` | branco | `0 0% 100%` |
| `--secondary` | verde genérico | HSL equivalente de `#5A7A3A` → `90 35% 35%` |
| `--secondary-foreground` | branco | `0 0% 100%` |
| `--accent` | âmbar genérico | HSL equivalente de `#C9A84C` → `43 52% 55%` |
| `--accent-foreground` | escuro | HSL equivalente de `#2C2C1E` → `63 19% 14%` |
| `--background` | branco | HSL equivalente de `#F0F5EC` → `90 22% 95%` |
| `--foreground` | escuro | HSL equivalente de `#2C2C1E` → `63 19% 14%` |

Com isso, `bg-primary` = `#2B4F8C`, `bg-secondary` = `#5A7A3A`, e os componentes Shadcn que usam `text-primary-foreground` continuam funcionando.

### Utility classes resultantes

- `bg-primary`, `text-primary` → `#2B4F8C` (Azul Cobalto)
- `bg-primary-dark`, `hover:bg-primary-dark`, `text-primary-dark` → `#1A3A6B`
- `bg-secondary`, `text-secondary` → `#5A7A3A`
- `bg-accent` → `#C9A84C`
- `bg-bg-agua` → `#D4E8D8`
- `bg-bg-light` → `#F0F5EC`
- `bg-dark`, `text-dark` → `#2C2C1E`
- `text-terra-1`, `border-terra-1`, `bg-terra-1` → `#934211`

### borderRadius — fixar `rounded-sm` em 2px

O valor atual de `rounded-sm` depende de `calc(var(--radius) - 4px)` e pode variar. Fixar explicitamente para garantir o efeito "pedra lavrada":

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
}
```

> **Nota:** Esta mudança afeta todos os componentes que usam `rounded-*`, incluindo os Shadcn UI (dialogs, dropdowns, cards, popovers). Isso é intencional — a estética de "pedra lavrada" deve ser consistente em toda a interface.

### Tabela de referência de cores

| Token | Hex | Papel |
|---|---|---|
| `primary` | `#2B4F8C` | Azul Cobalto — botões, links, destaque principal |
| `primary-dark` | `#1A3A6B` | Azul Profundo — hover de botão, títulos H1 |
| `secondary` | `#5A7A3A` | Verde Musgo — acento secundário |
| `secondary-light` | `#8FA85C` | Verde Oliva — ícones, badges |
| `bg-agua` | `#D4E8D8` | Verde-Água — fundo de seções alternadas |
| `bg-light` | `#F0F5EC` | Branco Esverdeado — fundo base |
| `accent` | `#C9A84C` | Dourado Âmbar — destaques especiais |
| `dark` | `#2C2C1E` | Preto Orgânico — texto principal, footer |
| `terra-1` | `#934211` | Terracota — bordas, divisores, labels |
| `terra-2` | `#7A4900` | Âmbar Escuro — elementos terrosos escuros |
| `terra-3` | `#B5771C` | Ocre Dourado — ícones, ornamentos |

### index.css — Classes globais

**Regra global de headings** — corrigir cor incorreta (`#100B0D`, fora da paleta) e remover tracking desnecessário:
```css
/* ANTES */
h1, h2, h3, h4, h5, h6 {
  @apply font-display tracking-wide text-[#100B0D];
}

/* DEPOIS */
h1, h2, h3, h4, h5, h6 {
  @apply font-display;
}
```
As cores de heading serão controladas por componente conforme a tabela tipográfica.

**Classe `.chip`** — atualizar para novos tokens e remover `rounded-full`:
```css
/* ANTES */
.chip {
  @apply inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-verde-3 text-[#100B0D];
}

/* DEPOIS */
.chip {
  @apply inline-flex items-center px-3 py-1 rounded-sm text-[11px] font-bold uppercase tracking-[0.2em] bg-secondary/10 text-terra-1;
}
```

**Classes a remover do index.css:** `.glass`, `.gradient-heading`, `.nature-gradient`, `.spirit-gradient`, `.earth-gradient`

---

## 2. Tipografia

### Regras de aplicação (baseadas no CLAUDE.md)

| Elemento | Fonte | Peso | Tamanho | Cor |
|---|---|---|---|---|
| H1 / Display | Cinzel | 700 | 38px | `text-primary-dark` (`#1A3A6B`) |
| H2 | Cinzel | 600 | 24px | `text-primary` (`#2B4F8C`) |
| H3 | Cinzel | 400 | 18px | `text-primary` (`#2B4F8C`) |
| Corpo / p | Lato | 400 | 16px | `text-dark` (`#2C2C1E`) |
| Caption / small | Lato | 300 | 13px | `text-secondary` (`#5A7A3A`) |
| Label / Eyebrow | Lato | 700 | 11px | `text-terra-1` uppercase letter-spacing 0.2em |

### O que muda nos componentes

- Remover `font-serif` (Playfair Display) de todos os componentes — apenas Cinzel para títulos
- Remover `font-sans` (Inter) onde não for corpo de texto
- Substituir classes de título com gradiente (`bg-clip-text text-transparent from-* via-* to-*`) por `text-primary-dark`
- Substituir `font-serif italic` em citações/depoimentos por `font-lato italic text-dark`
- Garantir que badges/chips usem o estilo Label/Eyebrow: `font-lato text-[11px] font-bold uppercase tracking-[0.2em] text-terra-1`

---

## 3. Botões

### Primário (CTAs principais)
```
bg-primary text-white rounded-sm px-6 py-3
transition-colors duration-200
hover:bg-primary-dark
```
- Sem shadow, sem scale, sem blur

### Secundário (outline)
```
border border-terra-1 text-terra-1 rounded-sm px-6 py-3
transition-colors duration-200
hover:bg-terra-1 hover:text-white
```

### Link / ação menor
```
text-primary underline-offset-4 hover:underline
transition-colors duration-200
```

### O que é removido em todos os botões
- `rounded-full`, `rounded-lg`, `rounded-xl`, `rounded-2xl`
- `shadow-lg`, `shadow-xl`, `shadow-2xl`
- `hover:shadow-*` (todas as variantes)
- `hover:scale-*`
- `backdrop-blur-*`
- `bg-white/90`, `bg-white/80` (glassmorphism)
- `border-white/20`, `border-white/50` (glassmorphism)

---

## 4. Remoção de Gradientes

### Por componente

**Hero:**
- Remover overlay `from-background via-primary/5 to-secondary/10` → `bg-bg-light/60` sólido sobre a imagem
- Remover os 3 floating orbs com gradiente (`animate-float`)
- Remover `drop-shadow-*` nos textos

**Navbar:**
- Remover `bg-white/80 backdrop-blur-2xl` → `bg-bg-light border-b border-terra-1/20`
- Remover gradiente do menu mobile `from-background/98 via-primary/5 to-secondary/5` → `bg-bg-light`

**Footer:**
- Remover `bg-gradient-to-b from-background to-muted/50` → `bg-dark`
- Remover linha gradiente `from-primary/50 via-accent/50 to-secondary/50` → `border-t border-terra-1/30`
- Remover `bg-clip-text text-transparent` no logo → `text-white`

**About:**
- Remover `bg-gradient-to-b from-background via-muted/30 to-background` → `bg-bg-agua`
- Remover elementos decorativos pulsantes
- Remover badge de título com gradiente → `text-primary-dark`

**Rituals:**
- Remover `bg-gradient-to-b from-background via-muted/20 to-background` → `bg-bg-light`
- Remover floating particles (`bg-primary/20 blur-3xl`)
- Remover overlay de imagem `from-black/60 via-black/20` → `bg-dark/40` sólido
- Remover gradiente no CTA bottom: `from-white/70 to-white/40 backdrop-blur-2xl rounded-3xl` → `bg-white border border-terra-1/20 rounded-sm`

**SocialMedia:**
- Remover `bg-gradient-to-b from-background via-muted/20 to-background` → `bg-bg-light`
- Remover blobs flutuantes: `bg-primary/30 rounded-full blur-3xl animate-float` e `bg-secondary/30 rounded-full blur-3xl animate-float` → remover completamente
- Remover `bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent` no título → `text-primary-dark`
- Remover `bg-white/80 backdrop-blur-xl border border-white/20 shadow-lg` no chip → `bg-secondary/10 border border-terra-1/20`
- Remover `animate-pulse` no ícone

**Cards (About, Rituals, Footer):**
- Remover `bg-white/50 backdrop-blur-sm border border-white/20` → `bg-white border border-terra-1/20`

**Títulos com gradiente de cor:**
- Remover `bg-clip-text text-transparent` → `text-primary-dark`

**Testimonials (em Index.tsx):**
- Remover `bg-white/70 backdrop-blur-sm` nos Cards → `bg-white border border-terra-1/20`
- Remover `hover:shadow-md` → sem shadow
- Substituir `border-[#C9A84C]/30` → `border-terra-1/20`
- Substituir `font-serif italic text-[#2C2C1E]/90` nos blockquotes → `font-lato italic text-dark`

---

## 5. Remoção de Shadows

Remover de todos os componentes:
- `shadow-sm`, `shadow`, `shadow-md`, `shadow-lg`, `shadow-xl`, `shadow-2xl`
- `hover:shadow-*` (todas as variantes incluindo coloridas `hover:shadow-primary/50`)
- `drop-shadow-[...]` (inline no Hero)

---

## 6. Animações

### O que permanece
- `animate-in` (fade-in + translate-y suave) ao entrar no viewport
- `transition-colors duration-200` nos botões e links (hover de cor)
- Overlays com `bg-noise` (textura orgânica sutil) — manter, compatível com a estética

### O que é removido
- Parallax no Hero (mouse tracking, `transform: translate`)
- `animate-float` (blobs no Hero, Rituals e SocialMedia)
- `animate-pulse-gentle` (About)
- `animate-bounce` (scroll indicator no Hero)
- `animate-pulse` (SocialMedia, SpotifyPlayer)
- `hover:scale-105`, `hover:scale-110`, `hover:-translate-y-2` em cards
- `transition-delay` escalonados no menu mobile

---

## 7. Backgrounds de Seção

| Seção | Background |
|---|---|
| Hero | Imagem + overlay `bg-bg-light/50` sólido |
| About | `bg-bg-agua` (`#D4E8D8`) |
| Rituals | `bg-bg-light` (`#F0F5EC`) |
| Memories Gallery | `bg-bg-agua` |
| Social Media | `bg-bg-light` |
| Testimonials | `bg-bg-agua` |
| Donate | `bg-bg-light` |
| Contact Form | `bg-bg-agua` |
| Footer | `bg-dark` (`#2C2C1E`) com texto claro |

Divisores entre seções: `border-b border-terra-1/25` (linha Terracota discreta).

---

## 8. SpotifyPlayer

O SpotifyPlayer é um elemento público fixo, visível em todas as visitas. Está no escopo do redesign.

Alterações:
- Remover `bg-gradient-to-r from-[#1DB954] to-[#1ed760]` → `bg-[#1DB954]` sólido (cor Spotify, mantida por ser identidade de terceiro)
- Remover `shadow-2xl`, `shadow-lg`, `hover:shadow-green-500/50`
- Remover `rounded-full` nos botões internos → `rounded-sm`
- Remover `backdrop-blur-sm border border-white/20` → `border border-white/10`
- Remover `animate-pulse` no ícone de música

---

## 9. Substituições de Tokens Antigos por Componente

Os tokens `azul-*`, `verde-*`, `marrom-*`, `nature-*`, `spirit-*`, `earth-*` serão removidos do `tailwind.config.ts`. Qualquer referência remanescente em componentes deve ser substituída conforme abaixo.

**Regra geral de mapeamento:**
- `azul-1` (`#8BB6CC`) → `text-primary` / `bg-primary` (tom mais claro, usar primary como mais próximo)
- `azul-2` (`#173D90`), `azul-3` (`#1D3F6C`) → `text-primary` / `bg-primary` / `border-primary`
- `verde-3` (`#80A94D`), `verde-4` (`#507030`) → `text-secondary` / `bg-secondary`
- `verde-1` (`#BED19F`), `verde-2` (`#9CB96B`) → `text-secondary-light` / `bg-secondary-light`
- `marrom-1` (`#A68943`) → `text-terra-3` / `bg-terra-3`
- `marrom-2` (`#674321`) → `text-terra-2` / `bg-terra-2`
- `darktext` / `text-[#100B0D]` → `text-dark`

**Após remover os tokens antigos, buscar no código** por qualquer ocorrência remanescente de `azul-`, `verde-`, `marrom-`, `nature-`, `spirit-`, `earth-` e aplicar a regra geral acima.

**Casos específicos identificados:**

**`src/components/social/InstagramSection.tsx`:**
- `text-highlight` (linha 37) → `text-primary`
- `bg-azul-2/10 border border-azul-2/20 text-azul-2` (linha 45) → `bg-primary/10 border border-primary/20 text-primary`

**`src/components/ContactForm.tsx`:**
- Todas as ocorrências de `text-azul-2` nos ícones de campo (linhas 95, 112, 130, 149, 165) → `text-primary`

**`src/components/Donate.tsx`:**
- Botão CTA: `bg-azul-2 rounded-full hover:bg-azul-2/90` → `bg-primary rounded-sm hover:bg-primary-dark`
- Overlay decorativo: `bg-gradient-to-r from-azul-1/40 to-azul-1/20` (linha 9) → remover completamente (per Seção 4 — no gradients)

**`src/components/Rituals.tsx`:**
- `text-azul-2` nos ícones dos cards (linhas 34, 46, 59) → `text-primary`
- `text-verde-3` nos ícones dos cards (linhas 40, 52, 64) → `text-secondary`

**`src/components/social/SocialMediaPost.tsx`:**
- `bg-azul-2/0 group-hover:bg-azul-2/20` (linha 62) → `bg-primary/0 group-hover:bg-primary/20`
- `text-darktext` (linha 70) → `text-dark`

**`src/index.css` — classe `.link-underline`:**
- `.link-underline:after { @apply bg-azul-2 ... }` → `@apply bg-primary`

---

## Arquivos a Modificar

1. `tailwind.config.ts` — remover tokens antigos, adicionar tokens adicionais, atualizar borderRadius
2. `src/index.css` — variáveis CSS (HSL para nova paleta), regra h1-h6, `.chip`, `.link-underline`, remover `.glass` e classes de gradiente
3. `src/components/Hero.tsx`
4. `src/components/Navbar.tsx`
5. `src/components/Footer.tsx`
6. `src/components/About.tsx`
7. `src/components/Rituals.tsx`
8. `src/components/SocialMedia.tsx`
9. `src/components/ContactForm.tsx`
10. `src/components/Donate.tsx`
11. `src/components/DonationModal.tsx`
12. `src/components/MemoriasGallery.tsx`
13. `src/components/SpotifyPlayer.tsx`
14. `src/components/social/InstagramSection.tsx`
15. `src/components/social/SocialMediaPost.tsx`
16. `src/pages/Index.tsx` — backgrounds de seção, scroll progress bar, Testimonials inline

---

## Fora de Escopo

- Mudanças de layout (grid, ordem de seções, estrutura HTML)
- Lógica de negócio, formulários, integrações (Supabase)
- Componentes de UI da Shadcn (`src/components/ui/`)
- AdminPanel, Library, MediaGallery (painéis internos)
- Dark mode
- `src/components/social/YouTubeSection.tsx` (sem violações visuais identificadas)
