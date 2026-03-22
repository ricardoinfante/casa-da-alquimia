# 🎨 Guia de Customização - Casa da Alquimia v2

## 🎯 Personalize Tudo!

Este guia mostra como customizar cores, textos, layout e conteúdo do site.

---

## 🌈 Alterar Cores

A paleta de cores está definida em `tailwind.config.ts` e `src/index.css`.

### Tokens Tailwind disponíveis

```typescript
// tailwind.config.ts — cores customizadas do projeto
colors: {
  primary: '#2B4F8C',       // Azul Cobalto
  'primary-dark': '#1A3A6B', // Azul Profundo
  secondary: '#5A7A3A',      // Verde Musgo
  'bg-agua': '#D4E8D8',      // Verde-Água (background)
  'bg-light': '#F0F5EC',     // Branco Esverdeado (background)
  accent: '#C9A84C',         // Dourado Âmbar
  dark: '#2C2C1E',           // Preto Orgânico
  'terra-1': '#934211',      // Terracota
  'terra-2': '#7A4900',      // Âmbar Escuro
}
```

### Alterar via CSS Variables

```css
/* src/index.css */
:root {
  --primary: #2B4F8C;
  --primary-dark: #1A3A6B;
  /* etc. */
}
```

---

## ✏️ Alterar Textos

### Navbar — nome do site e links

```typescript
// src/components/Navbar.tsx, linha ~39
const menuItems = [
  { name: 'Início', href: '#hero', id: 'hero' },
  { name: 'Sobre', href: '#about', id: 'about' },
  { name: 'Rituais', href: '#rituals', id: 'rituals' },
  { name: 'Memórias', href: '#memorias', id: 'memorias' },
  // ...
];
```

### Textos das seções

Cada seção tem seu próprio componente. Para alterar:
- **Hero**: edite `src/components/Hero.tsx`
- **Sobre**: edite `src/components/About.tsx`
- **Rituais**: edite `src/components/Rituals.tsx`
- **Depoimentos**: edite `src/pages/Index.tsx` (seção testimonials inline)
- **Footer**: edite `src/components/Footer.tsx`

---

## 📸 Alterar Galeria de Memórias

Edite `src/components/MemoriasGallery.tsx` para adicionar/remover fotos e vídeos:

```typescript
// Adicionar imagem
{
  id: 'foto-01',
  title: 'Título da Foto',
  thumbnail: '/img/seu-arquivo.jpeg',
  type: 'image',
  url: '/img/seu-arquivo.jpeg',
  date: '2026-03-21',
}

// Adicionar vídeo
{
  id: 'video-01',
  title: 'Título do Vídeo',
  thumbnail: '/img/capa.jpeg',
  type: 'video',
  url: '/img/video.mp4',
  date: '2026-03-21',
}
```

---

## 🏷️ Alterar Seção de Depoimentos

Os depoimentos estão inline em `src/pages/Index.tsx` (buscar pela seção `id="testimonials"`):

```tsx
<p className="font-lato italic text-dark text-xl">
  Seu depoimento aqui...
</p>
<cite className="text-sm font-medium not-italic text-[#2B4F8C]">— Nome da Pessoa</cite>
```

---

## 🎵 Alterar Playlist Spotify

Em `src/pages/Index.tsx`:

```tsx
<SpotifyPlayer playlistId="SEU_PLAYLIST_ID_AQUI" />
```

Para obter o `playlistId`: no Spotify, clique com botão direito na playlist → Compartilhar → Copiar link. O ID é a parte final da URL.

---

## 📐 Alterar Layout

O layout usa Tailwind CSS. Classes principais:

- `bg-bg-agua` / `bg-bg-light` — fundos alternados por seção
- `section-container` — container com padding padrão
- `font-display` — fonte Cinzel (títulos)
- `font-lato` — fonte Lato (corpo)
- `text-terra-1` — cor terracota (labels/eyebrows)

### Ordem das seções

Altere a ordem em `src/pages/Index.tsx`:

```tsx
<Hero />
<div className="bg-bg-agua"><About /></div>
<div className="bg-bg-light"><Rituals /></div>
<div className="bg-bg-agua"><MemoriasGallery /></div>
<div className="bg-bg-light"><SocialMedia /></div>
{/* testimonials inline */}
<div className="bg-bg-light"><Donate /></div>
<div className="bg-bg-agua"><ContactForm /></div>
```

---

## 🔗 Alterar Links

### WhatsApp

Em `src/components/Navbar.tsx`, alterar o número:

```tsx
href="https://wa.me/5562996538902?text=..."
```

### Redes Sociais

Edite `src/components/Footer.tsx` e `src/components/social/InstagramSection.tsx`.

---

## 🖼️ Alterar Logo / Favicon

Substitua `/public/favicon.png` pela nova imagem.

No `Navbar.tsx`, a imagem é referenciada como:
```tsx
<img src="/favicon.png" alt="A Casa da Alquimia Logo" />
```

---

## 📚 Mais Informações

- [VISUAL_GUIDE.md](VISUAL_GUIDE.md) — paleta completa e tipografia
- [IMAGENS_VIDEOS_INTEGRADAS.md](IMAGENS_VIDEOS_INTEGRADAS.md) — como adicionar mídias
- [CLAUDE.md](CLAUDE.md) — arquitetura completa

---

**Última atualização**: 2026-03-21
