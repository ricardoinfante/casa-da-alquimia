# Galeria Memórias — Design Spec

**Data:** 2026-03-11
**Status:** Aprovado

---

## Objetivo

Substituir a "Biblioteca de Memórias" (componente `LibraryGallery.tsx` com abas, categorias e álbuns complexos) por uma galeria única, curada e visualmente impactante chamada **"Memórias"**.

A galeria exibe até 20 fotos selecionadas em um grid masonry (estilo colagem), com abertura em modo teatro ao clicar.

---

## Arquitetura

### Arquivos alterados

| Arquivo | Ação |
|---------|------|
| `src/components/MemoriasGallery.tsx` | **Criar** — componente principal |
| `src/pages/Index.tsx` | **Editar** — trocar `<LibraryGallery />` por `<MemoriasGallery />` |
| `src/components/Navbar.tsx` | **Editar** — link "Biblioteca de Memórias" → "Memórias" (`#memorias`), atualizar `id` de `'biblioteca'` para `'memorias'`, e adicionar `'memorias'` ao array `sections` de detecção de seção ativa |
| `src/components/LibraryGallery.tsx` | **Deletar** o arquivo — não é mais utilizado |

### Sem novas dependências

CSS `columns` nativo para masonry. React `createPortal` para o modal theater.

---

## Estrutura do Componente

```
MemoriasGallery.tsx
  ├── const PHOTOS: Photo[]          ← array hardcoded das fotos
  ├── type Photo = { id: number; src: string; alt: string }
  ├── <section id="memorias">
  │     ├── Cabeçalho (título + divider)
  │     ├── MasonryGrid
  │     │     └── thumbnails clicáveis
  │     └── TheaterModal (via createPortal → document.body)
  │           ├── overlay escuro
  │           ├── foto em destaque
  │           ├── seta anterior
  │           ├── seta próxima
  │           ├── contador (X de N)
  │           └── thumbnail strip horizontal
```

---

## Dados

```ts
type Photo = {
  id: number;
  src: string;   // ex: '/img/feitio2025/WhatsApp_Image_2026-01-05_at_18.22.56.jpeg'
  alt: string;   // descrição breve para acessibilidade
};

const PHOTOS: Photo[] = [
  // até 20 itens — curados manualmente
];
```

Sem título, fotógrafo ou categoria exibidos. Apenas `src` e `alt`.

---

## Grid Masonry

- CSS `columns` nativo (sem biblioteca externa)
- **Desktop** (≥ 1024px): 4 colunas
- **Tablet** (≥ 640px): 3 colunas
- **Mobile** (< 640px): 2 colunas
- Gap entre fotos: `8px`
- `break-inside: avoid` em cada item
- `border-radius: 4px` nos thumbnails
- Hover: leve scale (1.04) + brightness dim + overlay azul cobalto sutil
- Transição suave (0.35s ease)

---

## Cabeçalho da Seção

```
MEMÓRIAS              ← uppercase, letra-espaçada, Preto Orgânico (#2C2C1E)
────────              ← divider 60px, Dourado Âmbar (#C9A84C)
```

- Background da seção: Branco Esverdeado (`#F0F5EC`)
- Padding: `py-16 md:py-24` (acima e abaixo)

---

## Modo Teatro (Lightbox)

### Visual
- Overlay: `rgba(28, 28, 20, 0.96)` — escuro quase total, mantém foco na foto
- Foto centralizada, `max-height: calc(100vh - 180px)`, `max-width: calc(100vw - 140px)`
- Bordas arredondadas (4px)

### Elementos
| Elemento | Posição | Detalhes |
|----------|---------|----------|
| Botão fechar (✕) | Topo direito | `rgba(255,255,255,0.7)` |
| Contador | Topo centro | "7 de 20", `rgba(255,255,255,0.5)`, `letter-spacing` |
| Seta anterior (‹) | Esquerda central | Círculo `48x48px`, `rgba(255,255,255,0.08)` com hover |
| Seta próxima (›) | Direita central | Idem |
| Thumbnail strip | Rodapé | Horizontal, `52x52px` cada, scroll horizontal |
| Thumbnail ativa | No strip | Border `2px solid #C9A84C` |

### Navegação
| Ação | Resultado |
|------|-----------|
| Clique no grid | Abre theater na foto clicada |
| Seta ‹ / tecla `←` | Foto anterior (circular: última → primeira) |
| Seta › / tecla `→` | Próxima foto (circular: última → primeira) |
| Clique em thumbnail no strip | Navega para aquela foto |
| Thumbnail ativa | Scroll automático para ficar visível |
| Tecla `Escape` | Fecha o theater |
| Clique no overlay (fora da foto) | Fecha o theater |

### Estado React
```ts
const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
// null = fechado; número = índice da foto aberta
```

### Scroll lock do body
Ao abrir o theater: `document.body.style.overflow = 'hidden'`
Ao fechar: `document.body.style.overflow = ''`
Isso previne scroll do body atrás do overlay (especialmente no iOS).

### Scroll automático do thumbnail ativo
Usar `useRef` em cada thumbnail. Ao mudar `selectedIndex`, chamar:
```ts
thumbRefs.current[selectedIndex]?.scrollIntoView({
  behavior: 'smooth',
  block: 'nearest',
  inline: 'center',
});
```

### Loading e erros de imagem
- Imagens carregam com `loading="lazy"` no grid
- Em caso de erro (`onError`): substituir por um placeholder cinza neutro
- No theater mode: não é necessário skeleton — a imagem carrega rapidamente pois já foi pré-carregada no grid

### Swipe em mobile (theater)
Suporte a swipe horizontal no theater via touch events:
- `touchstart`: registrar `clientX` inicial
- `touchend`: calcular delta; se `|delta| > 50px`, navegar para a direção
- Sem biblioteca externa — eventos nativos do React

### Nomenclatura dos arquivos de imagem
Atenção: os arquivos em `/public/img/` usam dois padrões de nomes:
- Com espaços: `WhatsApp Image 2026-01-05 at 18.22.56.jpeg`
- Com underscores: `WhatsApp_Image_2026-01-05_at_18.22.56.jpeg`
Verificar o nome exato no sistema de arquivos antes de adicionar ao array `PHOTOS`.

---

## Paleta aplicada

| Elemento | Cor |
|----------|-----|
| Background seção | `#F0F5EC` (Branco Esverdeado) |
| Título | `#2C2C1E` (Preto Orgânico) |
| Divider | `#C9A84C` (Dourado Âmbar) |
| Overlay hover thumbnail | `rgba(43,79,140,0.18)` (Azul Cobalto) |
| Theater overlay | `rgba(28,28,20,0.96)` |
| Thumbnail ativa (border) | `#C9A84C` (Dourado Âmbar) |

---

## Fora de Escopo

- Integração com Supabase (futuro — estrutura preparada para migração trivial)
- Upload/gestão de fotos por painel admin
- Vídeos
- Legendas ou metadados visíveis
- Filtros ou categorias
