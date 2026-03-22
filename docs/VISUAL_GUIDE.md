# 🎨 Guia Visual - Casa da Alquimia v2

## 🎯 Sistema de Design

O site usa uma estética **sagrada/natural**: tons terrosos, azuis profundos, verdes orgânicos — remetendo à alquimia e à conexão com a natureza.

---

## 🎨 Paleta de Cores

```
🟦 Azul Cobalto:      #2B4F8C  (Primário — bg-primary, text-primary)
🟦 Azul Profundo:     #1A3A6B  (Primário Dark — bg-primary-dark)
🟢 Verde Musgo:       #5A7A3A  (Secundário)
🟢 Verde Oliva:       #8FA85C  (Secundário Light)
🟩 Verde-Água:        #D4E8D8  (Background — bg-bg-agua)
⬜ Branco Esverdeado: #F0F5EC  (Background Light — bg-bg-light)
🟡 Dourado Âmbar:     #C9A84C  (Acento)
⬛ Preto Orgânico:    #2C2C1E  (Dark — text-dark)
🟫 Terracota:         #934211  (Terroso 1 — text-terra-1, labels/eyebrows)
🟫 Âmbar Escuro:      #7A4900  (Terroso 2 — text-terra-2)
🟡 Ocre Dourado:      #B5771C  (Terroso 3)
```

### Uso das Cores

| Elemento | Cor |
|----------|-----|
| Títulos principais | `text-primary-dark` (#1A3A6B) |
| Títulos secundários | `text-primary` (#2B4F8C) |
| Corpo de texto | `text-dark` (#2C2C1E) |
| Labels / Eyebrows | `text-terra-1` (#934211), uppercase |
| Fundos alternados | `bg-bg-agua` / `bg-bg-light` |
| Botões primários | `bg-primary-dark` com hover `bg-primary` |
| Bordas sutis | `border-terra-1/20` |

---

## ✍️ Tipografia

### Famílias

| Fonte | Variável Tailwind | Uso |
|-------|-------------------|-----|
| Cinzel | `font-display` | Títulos, headings, display |
| Lato | `font-lato` | Corpo, parágrafos, UI |

### Estilos de Texto

| Estilo | Fonte | Tamanho | Peso | Cor |
|--------|-------|---------|------|-----|
| Display / H1 | Cinzel | 38px | 700 | `#1A3A6B` |
| H2 | Cinzel | 24px | 600 | `#2B4F8C` |
| H3 | Cinzel | 18px | 400 | `#2B4F8C` |
| Body | Lato | 16px | 400 | `#2C2C1E` |
| Small / Caption | Lato | 13px | 300 | `#5A7A3A` |
| Label / Eyebrow | Lato | 11px | 700 | `#934211` |

> Label/Eyebrow: `uppercase`, `letter-spacing: 0.2em`

### Padrão de Seção

```tsx
<span className="chip inline-flex items-center gap-1 mb-4">
  <span>Eyebrow Label</span>
</span>
<h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
  Título da Seção
</h2>
<p className="text-foreground/70 text-lg">
  Subtítulo descritivo
</p>
```

---

## 📐 Layout e Espaçamento

### Alternância de Fundos

As seções alternam entre os dois backgrounds para criar ritmo visual:

```tsx
<div className="bg-bg-agua"><About /></div>
<div className="bg-bg-light"><Rituals /></div>
<div className="bg-bg-agua"><MemoriasGallery /></div>
<div className="bg-bg-light"><SocialMedia /></div>
```

### Navegação

```
[Logo] | Início | Sobre | Rituais | Memórias | Depoimentos | Conecte-se | Contato | [Apoiar] [WhatsApp]
```

---

## 🧩 Componentes Visuais

### Chip / Eyebrow
```tsx
<span className="chip inline-flex items-center gap-1 mb-4">
  <span>Label</span>
</span>
```

### Cards de Depoimento
- Fundo branco `bg-white`
- Borda sutil `border-terra-1/20`
- Layout bento grid (4 colunas, com cards de destaque maiores)
- Citação em itálico com cor `text-dark`

### Botões

| Variante | Classes |
|----------|---------|
| Primário (CTA) | `bg-primary-dark text-white hover:bg-primary` |
| Secundário (border) | `border border-terra-1 text-terra-1 hover:bg-terra-1 hover:text-white` |

---

## 📱 Responsividade

| Breakpoint | Colunas | Uso |
|------------|---------|-----|
| Mobile (<640px) | 1 col | Stack vertical |
| Tablet (640-1024px) | 2 col | Layout compacto |
| Desktop (>1024px) | 3-4 col | Layout completo |

---

## 🔧 Tokens Tailwind Customizados

Definidos em `tailwind.config.ts` e `src/index.css`:

```
bg-primary        → #2B4F8C
bg-primary-dark   → #1A3A6B
bg-bg-agua        → #D4E8D8
bg-bg-light       → #F0F5EC
text-terra-1      → #934211
text-terra-2      → #7A4900
text-dark         → #2C2C1E
font-display      → Cinzel
font-lato         → Lato
```

---

**Última atualização**: 2026-03-21
