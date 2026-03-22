# 📸 Integração de Imagens e Vídeos - Casa da Alquimia

## ✅ Status Atual

A galeria de fotos e vídeos do site é gerida pelo componente `MemoriasGallery.tsx`.

---

## 📂 Arquivos de Mídia Disponíveis

As imagens ficam na pasta `/public/img/`:

```
/public/img/
├── convite.jpeg
├── turmanatrilha.jpeg
├── turmanatrilha1.jpeg
├── velamesa.jpeg
├── serviidodaime.jpeg
├── img20.mp4            ← vídeo
├── fotofinal.jpeg
├── brunapanela.jpeg
├── olhonapanela.jpeg
├── jagubepanela.jpeg
├── jalauabracando.jpeg
├── meditação.jpeg
├── jalausentado.jpeg
├── ferdanirai.jpeg
├── alquimia.jpeg
├── img01.jpeg ... img19.jpeg
├── 01.jpeg, 02.png, 03.png, 04.png
├── 06.jpeg ... 09.jpeg
├── brunananapanela.jpeg
├── web1-img1.jpeg
├── logo.png
└── logog.jpeg
```

---

## 🚀 Como Adicionar Mais Imagens à Galeria

Edite o componente `src/components/MemoriasGallery.tsx` e adicione itens ao array de mídia:

### Adicionar Imagem

```typescript
{
  id: 'unique-id',
  title: 'Título da Imagem',
  thumbnail: '/img/seu-arquivo.jpeg',
  type: 'image',
  url: '/img/seu-arquivo.jpeg',
  date: '2026-03-21',
}
```

### Adicionar Vídeo

```typescript
{
  id: 'video-id',
  title: 'Título do Vídeo',
  thumbnail: '/img/imagem-capa.jpeg',  // imagem de capa
  type: 'video',
  url: '/img/seu-video.mp4',
  date: '2026-03-21',
}
```

---

## 🎬 Formatos Suportados

- **Imagens**: `.jpeg`, `.jpg`, `.png`, `.webp`
- **Vídeos**: `.mp4`, `.webm`, `.mov`

---

## 🔄 Próximas Melhorias Sugeridas

1. **Organizar vídeos** — criar pasta `/public/videos/` para manter separado
2. **Usar mais imagens disponíveis** — ainda há 15+ imagens não utilizadas em `/public/img/`
3. **Otimizar imagens** — converter para WebP (mais leve) e gerar thumbnails
4. **Galeria dinâmica** — conectar ao Supabase via `mediaLibraryService` para gerenciar sem editar código

---

## 💡 Integração Supabase (Galeria Dinâmica)

Para gerenciar a galeria sem editar código, é possível conectar ao Supabase:

```typescript
import { mediaLibraryService } from '@/integrations/supabase/services';

// Buscar mídia
const albums = await mediaLibraryService.getAlbums();

// Fazer upload
const file = new File([...], 'foto.jpg', { type: 'image/jpeg' });
await mediaLibraryService.uploadMedia(file, albumId, 'image');
```

Requer configuração do Supabase (ver `.env.local`).

---

**Última atualização**: 2026-03-21
