# Design Spec: Redesign da Seção de Depoimentos

**Data:** 2026-03-12
**Status:** Aprovado

---

## Objetivo

Substituir a seção de depoimentos atual (dados fictícios, fotos de randomuser, layout 3 colunas uniforme) por uma seção renovada usando os depoimentos reais da comunidade Casa da Alquimia, com layout assimétrico, sem fotos e identidade visual alinhada à paleta do projeto.

---

## Cabeçalho da Seção

- **Chip:** "Depoimentos"
- **Título:** "O que dizem os caminhantes"
- **Subtítulo:** "Palavras de quem viveu a transformação"
- Sem parágrafo longo explicativo
- Alinhamento central

---

## Dados (depoimentos reais — `docs/depoimentos.md`)

5 depoimentos hardcoded. Nenhum campo `role` ou descrição adicional — apenas texto e nome do autor.

---

## Layout

### Elemento `<section>`
- Manter `id="testimonials"` e `py-12 md:py-20`
- Adicionar `bg-[#D4E8D8]` diretamente na tag `<section>`
- Manter `relative overflow-hidden`
- Manter `<div className="absolute inset-0 bg-noise opacity-5"></div>`
- Manter `<div className="section-container relative z-10">`

### Grid
```
grid grid-cols-1 md:grid-cols-4 gap-4
```

### Breakpoint mobile (< md)
Todos os cards empilhados em coluna única, ordem de cima para baixo: Paulo Rios → Ananda → Sadgati → Bárbara Rocha → Thais Mesquita.

### Breakpoint md+ — Classes Tailwind por card

| Card | Classes de posicionamento |
|------|--------------------------|
| Paulo Rios | `md:col-span-2 md:row-span-2` |
| Ananda | `md:col-span-2` |
| Sadgati | *(nenhuma — 1 coluna, auto-placement)* |
| Bárbara Rocha | *(nenhuma — 1 coluna, auto-placement)* |
| Thais Mesquita | `md:col-span-2 md:col-start-3` |

### Layout resultante (md+, 4 colunas)

```
Col:    1         2         3         4
       ┌──────────────────┬─────────┬─────────┐
Row 1  │                  │                   │
       │   Paulo Rios     │     Ananda        │
Row 2  │  col 1–2, row 1–2│  col 3–4, row 1   │
       │                  ├─────────┬─────────┤
       │                  │ Sadgati │ Bárbara │
       ├──────────────────┴─────────┴─────────┤
Row 3  │ (cols 1–2 vazio) │  Thais Mesquita   │
       │                  │  col 3–4, row 3   │
       └──────────────────┴───────────────────┘
```

> Colunas 1–2 na row 3 ficam vazias, o que é intencional — cria assimetria visual e direciona o olhar para o lado direito.

---

## Estrutura JSX dos Cards

Cada card segue a estrutura abaixo (usando shadcn `Card`):

```tsx
<Card className="[classes de grid acima] bg-white/70 backdrop-blur-sm border-[#C9A84C]/30 hover:shadow-md hover:bg-white/80 transition-all duration-300">
  <CardContent className="h-full pt-6">
    <blockquote className="grid h-full grid-rows-[auto_1fr_auto] gap-6">
      {/* Ícone de aspas */}
      <div className="text-[#2B4F8C]">
        <svg ...> {/* mesmo SVG do TestimonialCard.tsx atual */}
      </div>
      {/* Texto */}
      <p className="font-serif italic text-[#2C2C1E]/90 text-base">
        {depoimento}
      </p>
      {/* Autor */}
      <cite className="text-sm font-medium not-italic text-[#2B4F8C]">
        — {autor}
      </cite>
    </blockquote>
  </CardContent>
</Card>
```

Card de Paulo Rios: adicionar `sm:p-6` e usar `text-xl` no `<p>` do depoimento (em vez de `text-base`).

---

## Estilo Visual

| Elemento | Valor |
|----------|-------|
| Fundo da seção | `bg-[#D4E8D8]` na tag `<section>` |
| Noise overlay | `<div className="absolute inset-0 bg-noise opacity-5">` (existente, manter) |
| Cards | `bg-white/70 backdrop-blur-sm rounded-xl` |
| Borda dos cards | `border border-[#C9A84C]/30` |
| Hover dos cards | `hover:shadow-md hover:bg-white/80 transition-all duration-300` (manter padrão existente) |
| Ícone de aspas | SVG inline (copiar do `TestimonialCard.tsx` atual), `text-[#2B4F8C]` |
| Texto do depoimento | `font-serif italic text-[#2C2C1E]/90` |
| Card Paulo Rios — tamanho do texto | `text-xl` |
| Demais cards — tamanho do texto | `text-base` |
| Nome do autor | `<cite>` com `text-sm font-medium not-italic text-[#2B4F8C]` |
| Sem fotos | Sem Avatar, sem imagens de pessoa |
| Sem botão CTA | Botão "Compartilhe sua experiência" removido |

---

## Modificações em Arquivos

### `src/pages/Index.tsx`
1. Remover o import: `import TestimonialCard from '@/components/TestimonialCard';`
2. Substituir todo o bloco `{/* Testimonials Section */}` (linhas 48–107) pelo novo JSX inline
3. Verificar que não há outros imports de `TestimonialCard` antes de deletar o arquivo

### `src/components/TestimonialCard.tsx`
- Deletar o arquivo após confirmar que só é importado em `Index.tsx`

### Imports a adicionar em `Index.tsx`
```tsx
import { Card, CardContent } from '@/components/ui/card';
```
> `Card` e `CardContent` já existem em `src/components/ui/card.tsx`. Não instalar nenhuma nova dependência NPM.

---

## Fora de Escopo

- Nenhuma mudança em outras seções
- Nenhuma integração com banco de dados (dados hardcoded)
- Nenhuma animação nova além do hover pattern existente
- Nenhum campo `role` ou descrição abaixo do nome do autor
