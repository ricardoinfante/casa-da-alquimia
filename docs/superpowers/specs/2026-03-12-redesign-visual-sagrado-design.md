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

### tailwind.config.ts — Atualização de tokens

Substituir os tokens atuais (`azul`, `verde`, `marrom`, `nature`, `spirit`, `earth`) pelos seguintes tokens semânticos alinhados ao CLAUDE.md:

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

### index.css — Variáveis CSS

Sincronizar as variáveis HSL com os valores hex acima. Remover variáveis de gradiente (`.nature-gradient`, `.spirit-gradient`, `.earth-gradient`, `.gradient-heading`). Remover a classe `.glass`.

---

## 2. Tipografia

### Regras de aplicação (baseadas no CLAUDE.md)

| Elemento | Fonte | Peso | Tamanho | Cor |
|---|---|---|---|---|
| H1 / Display | Cinzel | 700 | 38px | `#1A3A6B` |
| H2 | Cinzel | 600 | 24px | `#2B4F8C` |
| H3 | Cinzel | 400 | 18px | `#2B4F8C` |
| Corpo / p | Lato | 400 | 16px | `#2C2C1E` |
| Caption / small | Lato | 300 | 13px | `#5A7A3A` |
| Label / Eyebrow | Lato | 700 | 11px | `#934211` uppercase letter-spacing 0.2em |

### O que muda nos componentes

- Remover `font-serif` (Playfair Display) de todos os componentes — apenas Cinzel para títulos
- Remover `font-sans` (Inter) onde não for corpo de texto
- Substituir classes de título com gradiente (`bg-clip-text text-transparent from-* via-* to-*`) por cor sólida `text-primary-dark`
- Garantir que badges/chips de categoria usem o estilo Label/Eyebrow: `font-lato text-[11px] font-bold uppercase tracking-[0.2em] text-terra-1`

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
- Remover overlay `from-background via-primary/5 to-secondary/10` → substituir por `bg-bg-light/60` sólido sobre a imagem
- Remover os 3 floating orbs com gradiente (`animate-float`)
- Remover `drop-shadow-*` nos textos

**Navbar:**
- Remover `bg-white/80 backdrop-blur-2xl` → `bg-bg-light border-b border-terra-1/20`
- Remover gradiente do menu mobile `from-background/98 via-primary/5 to-secondary/5` → `bg-bg-light`

**Footer:**
- Remover `bg-gradient-to-b from-background to-muted/50` → `bg-dark` (Preto Orgânico)
- Remover linha gradiente `from-primary/50 via-accent/50 to-secondary/50` → `border-t border-terra-1/30`

**About:**
- Remover `bg-gradient-to-b from-background via-muted/30 to-background` → `bg-bg-agua`
- Remover elementos decorativos pulsantes

**Rituals:**
- Remover `bg-gradient-to-b from-background via-muted/20 to-background` → `bg-bg-light`
- Remover floating particles (`bg-primary/20 blur-3xl`)
- Remover overlay de imagem `from-black/60 via-black/20` → `bg-dark/40` sólido

**Cards (About, Rituals, Footer):**
- Remover `bg-white/50 backdrop-blur-sm border border-white/20` → `bg-white border border-terra-1/20`

**Títulos com gradiente de cor:**
- Remover `bg-clip-text text-transparent` → cor sólida `text-primary-dark`

---

## 5. Remoção de Shadows

Remover de todos os componentes:
- `shadow-sm`, `shadow`, `shadow-md`, `shadow-lg`, `shadow-xl`, `shadow-2xl`
- `hover:shadow-*` (todas as variantes incluindo coloridas `hover:shadow-primary/50`)
- `drop-shadow-[...]` (inline no Hero)

---

## 6. Animações

### O que permanece
- `animate-in` (fade-in + translate-y suave) acionado por IntersectionObserver ao entrar no viewport
- `transition-colors duration-200` nos botões e links (hover de cor)

### O que é removido
- Parallax no Hero (mouse tracking, `transform: translate`)
- `animate-float` (blobs no Hero e Rituals)
- `animate-pulse-gentle` (About)
- `animate-bounce` (scroll indicator no Hero)
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

## Arquivos a Modificar

1. `tailwind.config.ts` — atualizar tokens de cor e borderRadius
2. `src/index.css` — sincronizar variáveis CSS, remover classes de gradiente
3. `src/components/Hero.tsx`
4. `src/components/Navbar.tsx`
5. `src/components/Footer.tsx`
6. `src/components/About.tsx`
7. `src/components/Rituals.tsx`
8. `src/components/ContactForm.tsx`
9. `src/components/Donate.tsx`
10. `src/components/DonationModal.tsx`
11. `src/components/MemoriasGallery.tsx`
12. `src/components/SocialMedia.tsx`
13. `src/pages/Index.tsx` — backgrounds de seção e scroll progress bar

---

## Fora de Escopo

- Mudanças de layout (grid, ordem de seções, estrutura HTML)
- Lógica de negócio, formulários, integrações (Supabase, Spotify)
- Componentes de UI da Shadcn (`src/components/ui/`)
- AdminPanel, Library, MediaGallery (painéis internos)
- Dark mode
