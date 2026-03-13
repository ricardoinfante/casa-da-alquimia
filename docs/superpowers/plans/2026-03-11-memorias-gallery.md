# Galeria Memórias Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Substituir `LibraryGallery` pela galeria `MemoriasGallery` — grid masonry com até 20 fotos hardcoded e theater mode com setas, thumbnail strip e contador.

**Architecture:** Componente único `MemoriasGallery.tsx` com CSS `columns` para masonry e `createPortal` para o theater modal. Estado gerenciado por `selectedIndex: number | null`. Sem novas dependências.

**Tech Stack:** React 18, TypeScript, Tailwind CSS, Vite — sem adições.

---

## Chunk 1: Limpeza e Scaffold

### Task 1: Atualizar Navbar

**Files:**
- Modify: `src/components/Navbar.tsx:17`
- Modify: `src/components/Navbar.tsx:37`

- [ ] **Step 1: Adicionar `'memorias'` ao array `sections`**

Em `Navbar.tsx` linha 17, trocar:
```ts
const sections = ['hero', 'about', 'rituals', 'testimonials', 'instagram', 'contact'];
```
por:
```ts
const sections = ['hero', 'about', 'rituals', 'memorias', 'testimonials', 'instagram', 'contact'];
```

- [ ] **Step 2: Atualizar o item de menu**

Em `Navbar.tsx` linha 37, trocar:
```ts
{ name: 'Biblioteca de Memórias', href: '#biblioteca', id: 'biblioteca' },
```
por:
```ts
{ name: 'Memórias', href: '#memorias', id: 'memorias' },
```

- [ ] **Step 3: Verificar manualmente**

```bash
npm run dev
```
Abrir `http://localhost:8086`, confirmar:
- Menu desktop mostra "Memórias"
- Menu mobile idem

- [ ] **Step 4: Commit**

```bash
git add src/components/Navbar.tsx
git commit -m "feat: rename navbar item to Memórias with #memorias anchor"
```

---

### Task 2: Criar MemoriasGallery.tsx — scaffold

**Files:**
- Create: `src/components/MemoriasGallery.tsx`

> **Por que antes de editar Index.tsx:** criar o arquivo primeiro garante que o import nunca fique quebrado em nenhum commit.

- [ ] **Step 1: Criar o arquivo com type, array PHOTOS e cabeçalho da seção**

Criar `src/components/MemoriasGallery.tsx`:

```tsx
import { createPortal } from 'react-dom';
import { useEffect, useRef, useState } from 'react';

type Photo = {
  id: number;
  src: string;
  alt: string;
};

// Curar as fotos desejadas aqui — máximo 20
// ATENÇÃO: verificar o nome exato dos arquivos em /public/img/
// /public/img/         → usa espaços:      "WhatsApp Image 2025-12-28 at 10.46.22.jpeg"
// /public/img/feitio2025/ → usa underscores: "WhatsApp_Image_2025-12-30_at_12.25.03.jpeg"
const PHOTOS: Photo[] = [
  { id: 1,  src: '/img/01.jpeg',                                                alt: 'Momento na Casa da Alquimia' },
  { id: 2,  src: '/img/06.jpeg',                                                alt: 'Ritual sagrado' },
  { id: 3,  src: '/img/07.jpeg',                                                alt: 'Memória do feitio' },
  { id: 4,  src: '/img/08.jpeg',                                                alt: 'Celebração coletiva' },
  { id: 5,  src: '/img/09.jpeg',                                                alt: 'Encontro espiritual' },
  { id: 6,  src: '/img/WhatsApp Image 2025-12-27 at 13.10.59.jpeg',             alt: 'Feitio 2025' },
  { id: 7,  src: '/img/WhatsApp Image 2025-12-28 at 10.46.22.jpeg',             alt: 'Preparação do ritual' },
  { id: 8,  src: '/img/WhatsApp Image 2025-12-28 at 14.16.23.jpeg',             alt: 'Momento de cura' },
  { id: 9,  src: '/img/WhatsApp Image 2025-12-28 at 16.52.36.jpeg',             alt: 'Comunidade reunida' },
  { id: 10, src: '/img/WhatsApp Image 2025-12-29 at 01.22.37.jpeg',             alt: 'Noite de feitio' },
  { id: 11, src: '/img/WhatsApp Image 2025-12-30 at 12.41.30.jpeg',             alt: 'Alquimia e natureza' },
  { id: 12, src: '/img/WhatsApp Image 2025-12-30 at 16.24.27.jpeg',             alt: 'Tarde sagrada' },
  { id: 13, src: '/img/WhatsApp Image 2025-12-30 at 16.24.28.jpeg',             alt: 'Conexão espiritual' },
  { id: 14, src: '/img/WhatsApp Image 2025-12-30 at 16.24.29.jpeg',             alt: 'Memória coletiva' },
  { id: 15, src: '/img/WhatsApp Image 2025-12-30 at 16.24.30.jpeg',             alt: 'Ritual de encerramento' },
  { id: 16, src: '/img/feitio2025/WhatsApp_Image_2025-12-30_at_12.25.03.jpeg',  alt: 'Feitio — momento especial' },
  { id: 17, src: '/img/feitio2025/WhatsApp_Image_2025-12-30_at_16.24.27.jpeg',  alt: 'Feitio — tarde' },
  { id: 18, src: '/img/feitio2025/WhatsApp_Image_2025-12-30_at_16.58.17.jpeg',  alt: 'Feitio — entardecer' },
  { id: 19, src: '/img/feitio2025/WhatsApp_Image_2025-12-30_at_17.28.38.jpeg',  alt: 'Feitio — celebração' },
  { id: 20, src: '/img/feitio2025/WhatsApp_Image_2025-12-29_at_08.24.10.jpeg',  alt: 'Feitio — manhã' },
];

const MemoriasGallery = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  return (
    <section id="memorias" className="bg-[#F0F5EC] py-16 md:py-24">
      <div className="text-center mb-10 px-6">
        <h2 className="text-3xl md:text-4xl font-display font-semibold tracking-[0.14em] uppercase text-[#2C2C1E]">
          Memórias
        </h2>
        <div className="w-16 h-0.5 bg-[#C9A84C] mx-auto mt-4" />
      </div>

      {/* Grid — implementado na Task 4 */}
      <div className="px-8 max-w-6xl mx-auto">
        <p className="text-center text-gray-400 text-sm">Galeria em construção…</p>
      </div>
    </section>
  );
};

export default MemoriasGallery;
```

- [ ] **Step 2: Verificar que o arquivo compila**

```bash
npm run build 2>&1 | grep -i error
```
Esperado: sem erros. O componente ainda não está conectado ao `Index.tsx`.

- [ ] **Step 3: Commit**

```bash
git add src/components/MemoriasGallery.tsx
git commit -m "feat: scaffold MemoriasGallery with PHOTOS array and section header"
```

---

### Task 3: Conectar e limpar Index.tsx + deletar LibraryGallery

**Files:**
- Modify: `src/pages/Index.tsx:7,45`
- Delete: `src/components/LibraryGallery.tsx`

> Estas duas ações são feitas juntas num único commit para que o histórico nunca tenha o import novo com o arquivo antigo ainda presente.

- [ ] **Step 1: Trocar import em Index.tsx**

Em `Index.tsx` linha 7, trocar:
```ts
import LibraryGallery from '@/components/LibraryGallery';
```
por:
```ts
import MemoriasGallery from '@/components/MemoriasGallery';
```

- [ ] **Step 2: Trocar JSX em Index.tsx**

Em `Index.tsx` linha 45, trocar:
```tsx
<LibraryGallery />
```
por:
```tsx
<MemoriasGallery />
```

- [ ] **Step 3: Deletar LibraryGallery.tsx**

```bash
git rm src/components/LibraryGallery.tsx
```

- [ ] **Step 4: Verificar build limpo**

```bash
npm run build 2>&1 | grep -i error
```
Esperado: sem erros.

- [ ] **Step 5: Verificar no browser**

```bash
npm run dev
```
Confirmar:
- Página carrega sem console errors
- Seção "Memórias" aparece com título e divider dourado
- Texto placeholder "Galeria em construção…" visível no lugar da LibraryGallery antiga

- [ ] **Step 6: Commit**

```bash
git add src/pages/Index.tsx
git commit -m "feat: connect MemoriasGallery to Index and remove LibraryGallery"
```

---

## Chunk 2: Grid e Theater Mode

### Task 4: Implementar o grid masonry

**Files:**
- Modify: `src/components/MemoriasGallery.tsx`

- [ ] **Step 1: Substituir o placeholder pelo grid masonry**

Em `MemoriasGallery.tsx`, substituir o bloco:
```tsx
{/* Grid — implementado na Task 4 */}
<div className="px-8 max-w-6xl mx-auto">
  <p className="text-center text-gray-400 text-sm">Galeria em construção…</p>
</div>
```

por:

```tsx
{/* Masonry Grid */}
<div className="px-8 max-w-6xl mx-auto columns-2 sm:columns-3 lg:columns-4 gap-2">
  {PHOTOS.map((photo, index) => (
    <div
      key={photo.id}
      className="break-inside-avoid mb-2 overflow-hidden rounded-[4px] cursor-pointer group relative"
      onClick={() => setSelectedIndex(index)}
    >
      <img
        src={photo.src}
        alt={photo.alt}
        loading="lazy"
        className="block w-full transition-transform duration-[350ms] ease-in-out group-hover:scale-[1.04] group-hover:brightness-[0.85]"
        onError={(e) => {
          const target = e.currentTarget;
          target.style.display = 'none';
          const placeholder = document.createElement('div');
          placeholder.style.cssText = 'width:100%;aspect-ratio:1;background:#e5e7eb;border-radius:4px;';
          target.parentElement?.appendChild(placeholder);
        }}
      />
      <div className="absolute inset-0 bg-[rgba(43,79,140,0)] group-hover:bg-[rgba(43,79,140,0.18)] transition-colors duration-[350ms] rounded-[4px]" />
    </div>
  ))}
</div>
```

- [ ] **Step 2: Verificar grid no browser**

```bash
npm run dev
```
Confirmar:
- Fotos aparecem em grid masonry (colunas com alturas variadas)
- Desktop: 4 colunas — tablet: 3 — mobile: 2
- Hover: scale suave + overlay azul cobalto
- Clicar foto não causa erro (selectedIndex muda, modal ainda não existe)

- [ ] **Step 3: Commit**

```bash
git add src/components/MemoriasGallery.tsx
git commit -m "feat: implement masonry grid for MemoriasGallery"
```

---

### Task 5: Implementar o TheaterModal

**Files:**
- Modify: `src/components/MemoriasGallery.tsx`

- [ ] **Step 1: Adicionar TheaterModal antes da função MemoriasGallery**

Inserir o seguinte código **antes** de `const MemoriasGallery = () => {`:

```tsx
type TheaterModalProps = {
  photos: Photo[];
  initialIndex: number;
  onClose: () => void;
};

const TheaterModal = ({ photos, initialIndex, onClose }: TheaterModalProps) => {
  const [current, setCurrent] = useState(initialIndex);
  const thumbRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const touchStartX = useRef<number | null>(null);

  const total = photos.length;
  const prev = () => setCurrent((c) => (c - 1 + total) % total);
  const next = () => setCurrent((c) => (c + 1) % total);

  // Scroll lock
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft')  prev();
      if (e.key === 'ArrowRight') next();
      if (e.key === 'Escape')     onClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onClose]);
  // Nota: `prev` e `next` usam functional setState updaters e não capturam estado stale.
  // `onClose` é prop e está listado. Se lint reclamar de `prev`/`next`, ignorar — é seguro.

  // Scroll active thumbnail into view
  useEffect(() => {
    thumbRefs.current[current]?.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'center',
    });
  }, [current]);

  // Touch swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(delta) > 50) delta < 0 ? next() : prev();
    touchStartX.current = null;
  };

  return (
    <div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
      style={{ background: 'rgba(28,28,20,0.96)' }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Click outside to close */}
      <div className="absolute inset-0 -z-10" onClick={onClose} aria-hidden="true" />

      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-5 right-6 text-white/70 hover:text-white text-3xl leading-none bg-transparent border-none cursor-pointer z-10"
        aria-label="Fechar"
      >
        ✕
      </button>

      {/* Counter */}
      <div className="absolute top-5 left-1/2 -translate-x-1/2 text-white/50 text-sm tracking-widest select-none">
        {current + 1} de {total}
      </div>

      {/* Main image area */}
      <div className="flex-1 flex items-center justify-center w-full relative">
        {/* Prev arrow */}
        <button
          onClick={prev}
          className="absolute left-5 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center text-white text-xl cursor-pointer transition-colors duration-200 border border-white/15 hover:bg-white/[0.18]"
          style={{ background: 'rgba(255,255,255,0.08)' }}
          aria-label="Foto anterior"
        >
          ‹
        </button>

        {/* Photo */}
        <img
          src={photos[current].src}
          alt={photos[current].alt}
          className="rounded-[4px] object-contain"
          style={{
            maxHeight: 'calc(100vh - 180px)',
            maxWidth: 'calc(100vw - 140px)',
          }}
        />

        {/* Next arrow */}
        <button
          onClick={next}
          className="absolute right-5 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center text-white text-xl cursor-pointer transition-colors duration-200 border border-white/15 hover:bg-white/[0.18]"
          style={{ background: 'rgba(255,255,255,0.08)' }}
          aria-label="Próxima foto"
        >
          ›
        </button>
      </div>

      {/* Thumbnail strip */}
      <div className="flex gap-1.5 px-6 pb-5 overflow-x-auto max-w-full">
        {photos.map((photo, i) => (
          <button
            key={photo.id}
            ref={(el) => { thumbRefs.current[i] = el; }}
            onClick={() => setCurrent(i)}
            className="flex-shrink-0 overflow-hidden rounded-[3px] cursor-pointer bg-transparent border-0 p-0"
            style={{
              width: '52px',
              height: '52px',
              outline: i === current ? '2px solid #C9A84C' : '2px solid transparent',
              outlineOffset: '1px',
            }}
            aria-label={`Ir para foto ${i + 1}`}
          >
            <img src={photo.src} alt={photo.alt} className="w-full h-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
};
```

- [ ] **Step 2: Conectar TheaterModal em MemoriasGallery**

No return do componente `MemoriasGallery`, adicionar logo antes do `</section>`:

```tsx
{/* Theater Modal */}
{selectedIndex !== null &&
  createPortal(
    <TheaterModal
      photos={PHOTOS}
      initialIndex={selectedIndex}
      onClose={() => setSelectedIndex(null)}
    />,
    document.body
  )
}
```

- [ ] **Step 3: Verificar theater mode**

```bash
npm run dev
```
Confirmar:
- Clicar em foto abre o theater na foto correta
- Contador "X de 20" no topo centro
- Botão ✕ fecha o modal
- Seta ‹ → foto anterior (circular)
- Seta › → próxima (circular)
- Tecla `←` navega anterior, `→` navega próxima, `Esc` fecha
- Thumbnail ativa tem borda dourada
- Clicar thumbnail navega para aquela foto
- Thumbnail ativa auto-scrolla para ficar visível no strip
- Body scroll bloqueado enquanto modal aberto
- Mobile: swipe left → próxima, swipe right → anterior

- [ ] **Step 4: Commit**

```bash
git add src/components/MemoriasGallery.tsx
git commit -m "feat: implement theater mode lightbox for MemoriasGallery"
```

---

### Task 6: Verificação final

**Files:** todos os modificados

- [ ] **Step 1: Build de produção**

```bash
npm run build
```
Esperado: sem erros, `dist/` gerado com sucesso.

- [ ] **Step 2: Checklist visual completo**

Abrir `http://localhost:8086` e confirmar cada item:

**Navbar:**
- [ ] Link "Memórias" no menu desktop e mobile
- [ ] Clicar "Memórias" rola para a seção
- [ ] Link fica destacado quando seção visível no scroll

**Grid:**
- [ ] Seção "MEMÓRIAS" aparece após Rituais
- [ ] Título uppercase com divider dourado (`#C9A84C`)
- [ ] Masonry 4 colunas desktop / 3 tablet / 2 mobile
- [ ] Fotos com alturas variadas (não um grid uniforme)
- [ ] Hover: scale + overlay azul cobalto
- [ ] Fotos quebradas mostram placeholder cinza (não ícone de imagem quebrada)

**Theater:**
- [ ] Clicar qualquer foto abre theater na foto correta
- [ ] Contador correto ("3 de 20" etc.)
- [ ] Setas navigam circularmente
- [ ] Teclado `←`, `→`, `Esc` funcionam
- [ ] Thumbnail ativa tem borda `#C9A84C`
- [ ] Clicar fora da foto fecha o modal
- [ ] Body scroll travado com modal aberto
- [ ] Mobile: swipe funciona

- [ ] **Step 3: Commit final**

```bash
git add -A
git commit -m "feat: complete Memórias gallery — masonry grid + theater mode"
```
