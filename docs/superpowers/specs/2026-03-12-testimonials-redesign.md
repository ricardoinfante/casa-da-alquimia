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

| # | Autor | Tamanho | Posição no grid |
|---|-------|---------|-----------------|
| 1 | Paulo Rios | Longo | Destaque (col×2, row×2) |
| 2 | Ananda | Médio | col-span-2 (linha 1, direita) |
| 3 | Sadgati | Médio | card normal (linha 1) |
| 4 | Bárbara Rocha | Médio | card normal (linha 2) |
| 5 | Thais Mesquita | Curto | card normal (linha 2) |

---

## Layout

Grade assimétrica inspirada no padrão Tailus/shadcn:

```
┌────────────────────┬──────────────────────┐
│                    │       Ananda         │
│   Paulo Rios       │   (col-span-2)       │
│  (col×2, row×2)    ├──────────┬───────────┤
│                    │ Bárbara  │   Thais   │
└────────────────────┴──────────┴───────────┘
```

- Grid: `grid-cols-1 sm:grid-cols-2 md:grid-cols-4`
- Paulo Rios: `sm:col-span-2 lg:row-span-2`
- Ananda: `md:col-span-2`
- Sadgati, Bárbara, Thais: cards padrão

> Nota: Sadgati pode ir junto com Ananda na primeira linha ou na segunda, a ser ajustado conforme balanço visual durante implementação.

---

## Estilo Visual

| Elemento | Valor |
|----------|-------|
| Fundo da seção | `bg-[#D4E8D8]` (verde-água) com noise overlay |
| Cards | `bg-white/70 backdrop-blur-sm` |
| Borda dos cards | `border-[#C9A84C]/30` (dourado-âmbar suave) |
| Ícone de aspas | SVG inline, `text-[#2B4F8C]` (azul cobalto) |
| Texto do depoimento | Fonte serif, itálico, `text-[#2C2C1E]` |
| Nome do autor | `<cite>` sem itálico, `font-medium`, azul cobalto |
| Sem fotos | Sem Avatar, sem imagens de pessoa |
| Sem botão CTA | Botão "Compartilhe sua experiência" removido |

---

## Componentes

### Reuso
- `src/components/ui/card.tsx` — `Card`, `CardContent`, `CardHeader` já existentes
- Nenhuma nova dependência NPM necessária

### Modificações
- **`src/pages/Index.tsx`** — reescrever o bloco `{/* Testimonials Section */}` inline com os novos dados e layout
- **`src/components/TestimonialCard.tsx`** — pode ser removido (não será mais usado)

### Sem novos arquivos de componente
A seção será implementada diretamente em `Index.tsx` (inline, como o restante das seções), sem criar um componente separado `Testimonials.tsx` — mantendo o padrão existente do projeto.

---

## O que NÃO mudar

- ID da seção: `id="testimonials"` — mantido para ancoragem do Navbar
- Estrutura geral da seção (`<section>`, `section-container`)
- Chip de categoria no cabeçalho

---

## Fora de Escopo

- Nenhuma mudança em outras seções
- Nenhuma integração com banco de dados (dados hardcoded)
- Nenhuma animação além das já existentes no projeto
