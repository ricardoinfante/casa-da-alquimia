
# Casa da Alquimia - Development Guide

## 📋 Project Overview

**Casa da Alquimia** is a modern web application for a spiritual/holistic space. It is a single-page landing site with sections for rituals, photo/video memories, social media feeds, testimonials, donation, and contact.

- **Primary Branch**: `main` (stable)
- **Development Branch**: `feature/redesign-visual-sagrado` (current active)
- **Repository**: https://github.com/akillez01/casa-da-alquimia.git
- **Live URL**: (deployment pending)
- **Status**: Active development — visual redesign in progress

---

## 🏗️ Architecture & Project Structure

```
src/
├── pages/
│   ├── Index.tsx           # Main landing page (all sections)
│   └── NotFound.tsx        # 404 page
├── components/
│   ├── ui/                 # Shadcn UI components (auto-generated)
│   ├── social/             # Instagram & YouTube sections
│   ├── Hero.tsx            # Main hero section
│   ├── About.tsx           # About section
│   ├── Navbar.tsx          # Navigation bar with menu links
│   ├── Rituals.tsx         # Rituals section
│   ├── MemoriasGallery.tsx # Photo/video gallery (Memórias section)
│   ├── MediaGallery.tsx    # Fullscreen media modal viewer
│   ├── SocialMedia.tsx     # Social feeds aggregator
│   ├── SpotifyPlayer.tsx   # Spotify embed player (fixed position)
│   ├── Donate.tsx          # Donation section
│   ├── DonationModal.tsx   # Donation dialog
│   ├── ContactForm.tsx     # Contact form
│   └── Footer.tsx          # Footer with links
├── integrations/
│   └── supabase/
│       ├── client.ts       # Supabase client initialization
│       ├── services.ts     # API services
│       └── types.ts        # TypeScript types from Supabase schema
├── hooks/
│   ├── use-toast.ts        # Toast notification hook
│   └── use-mobile.tsx      # Mobile breakpoint detection
├── utils/
│   ├── animations.ts       # Reusable animation utilities
│   └── lib/utils.ts        # Helper functions & cn() utility
├── App.tsx                 # Root layout with routing & providers
├── main.tsx                # Vite entry point
├── index.css               # Global styles + Tailwind
└── App.css                 # App-specific styles
```

### Page Structure (Index.tsx)

Order of sections rendered on the main page:
1. Navbar (persistent)
2. Hero (landing banner)
3. About (company info)
4. Rituals (showcase)
5. MemoriasGallery (photo/video gallery — `#memorias`)
6. SocialMedia (Instagram/YouTube feeds — `#instagram`)
7. Testimonials (reviews — inline bento grid in Index.tsx — `#testimonials`)
8. Donate (donation CTA — `#donate`)
9. ContactForm (email contact — `#contact`)
10. Footer
11. SpotifyPlayer (fixed overlay)

---

## 🛠️ Tech Stack

### Frontend
- **React 18.3** - UI framework
- **TypeScript 5.5** - Type safety
- **Vite 5.4** - Build tool & dev server
- **Tailwind CSS 3.4** - Utility-first styling
- **Shadcn/ui** - Component library (50+ pre-built components)
- **React Router 6.26** - Client-side routing

### State & Data
- **TanStack React Query 5.56** - Server state management
- **React Hook Form 7.53** - Form state & validation
- **Zod 3.23** - Schema validation

### UI Components & Icons
- **Radix UI** - Unstyled accessible components (foundation for shadcn/ui)
- **Lucide React** - Icon library (~460 icons)
- **Embla Carousel** - Image carousel/slider
- **Sonner** - Toast notifications

### Backend & Database
- **Supabase** - PostgreSQL database + Auth + Storage
- **@supabase/supabase-js** - JS client library

### Utilities
- **date-fns** - Date manipulation
- **clsx** - Conditional CSS class utility
- **class-variance-authority** - Component variant styling
- **tailwind-merge** - Merge Tailwind classes smartly
- **next-themes** - Dark/light mode support
- **zod** - Runtime type validation

### Development Tools
- **ESLint 9.9** - Code linting
- **Autoprefixer 10.4** - CSS vendor prefixes
- **PostCSS 8.4** - CSS transformation

---

## 🎯 Key Features by Component

### 1. **Navbar** (`Navbar.tsx`)
- Sticky navigation with logo
- Links to all page sections: Início → Sobre → Rituais → Memórias → Depoimentos → Conecte-se → Contato
- Mobile responsive (slide-out menu on small screens)
- "Apoiar" (donate) button and WhatsApp CTA button
- Links use hash routing (#about, #memorias, #testimonials, etc.)

### 2. **MemoriasGallery** (`MemoriasGallery.tsx` + `MediaGallery.tsx`)
- Photo/video gallery for the "Memórias" section (`id="memorias"`)
- Grid layout responsive (mobile → desktop)
- Click image/video to open fullscreen modal via MediaGallery
- Fully responsive

### 3. **SocialMedia** (`SocialMedia.tsx`)
- Instagram feed integration (`InstagramSection.tsx`)
- YouTube channel integration (`YouTubeSection.tsx`)
- Requires API keys for real data (or mock data in dev)

### 4. **Additional Features**
- Spotify player embed (fixed position, bottom of screen)
- Customer testimonials (inline bento-grid in Index.tsx)
- Donation section with modal
- Contact form with email submission
- Comprehensive footer

---

## 🗄️ Database Schema (Supabase)

### Tables

#### `library_albums`
```sql
- id (UUID, PK)
- name (text)
- description (text)
- cover_image (text) -- URL
- item_count (integer)
- created_at (timestamp)
- updated_at (timestamp)
```

#### `library_media`
```sql
- id (UUID, PK)
- album_id (UUID, FK → library_albums)
- title (text)
- type (enum: 'image' | 'video')
- url (text) -- Full media URL
- thumbnail (text) -- URL for preview
- file_path (text) -- Storage path
- date (date)
- created_at (timestamp)
- updated_at (timestamp)
```

### Storage Buckets

- **library-media/** (public)
  - Structure: `{album-id}/{media-file}`
  - Supports: images, videos

### Row Level Security (RLS)

- **Public read**: Everyone can view albums and media
- **Authenticated write**: Only logged-in users can create/edit (TODO: add auth checks)

---

## 🔗 Supabase Integration

### Services (`src/integrations/supabase/services.ts`)

#### `mediaLibraryService`
```typescript
- getAlbums() → Promise<Album[]>
- getAlbumWithItems(albumId) → Promise<Album>
- createAlbum(album) → Promise<Album>
- uploadMedia(file, albumId, type) → Promise<Media>
- deleteMedia(mediaId, filePath) → Promise<void>
```

### Client Setup (`client.ts`)

```typescript
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);
```

**Environment Variables Required**:
- `VITE_SUPABASE_URL` - Supabase project URL
- `VITE_SUPABASE_ANON_KEY` - Public anon key

---

## 💻 Development Guidelines

### Code Style & Conventions

#### Component Structure
```typescript
// 1. Imports (React, libraries, utils, components)
import { FC } from 'react';
import { Button } from '@/components/ui/button';

// 2. Type definitions
interface ComponentProps {
  title: string;
  onSubmit?: (data: any) => void;
}

// 3. Component definition (named export)
const MyComponent: FC<ComponentProps> = ({ title, onSubmit }) => {
  // 4. Hooks
  const [state, setState] = useState();

  // 5. Event handlers
  const handleClick = () => {};

  // 6. JSX return
  return <div>{title}</div>;
};

export default MyComponent;
```

#### Naming Conventions
- **Components**: PascalCase (`Hero.tsx`, `MemoriasGallery.tsx`)
- **Hooks**: camelCase with `use` prefix (`useScrollProgress()`)
- **Utilities**: camelCase (`cn()`)
- **Constants**: UPPER_SNAKE_CASE (`MAX_FILE_SIZE`)
- **Types**: PascalCase (`Album`, `Media`)

#### Styling
- Use **Tailwind CSS classes** for styling
- Use **`cn()`** utility (from `src/lib/utils.ts`) to merge class strings
- Prefer composition over custom CSS when possible
- Breakpoints: `sm:` (640px), `md:` (768px), `lg:` (1024px), `xl:` (1280px)

Example:
```typescript
<div className={cn(
  "p-4 bg-white rounded-lg",
  "md:p-6 lg:p-8"
)}>
  Content
</div>
```

#### TypeScript
- Always define prop types with interfaces
- Use `FC<Props>` for functional components
- Avoid `any` type - use proper generics instead
- Use Zod for runtime validation of external data

#### Comments
- Add comments only for non-obvious logic
- Prefer clear naming over comments

### Component Guidelines

#### UI Components (Shadcn)
All UI components are pre-built in `src/components/ui/`. Import and use directly:

```typescript
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
```

#### Creating New Components
1. Create file in `src/components/` with PascalCase name
2. Define TypeScript interface for props
3. Use Tailwind for styling
4. Export as default
5. Use `cn()` for conditional classes

#### Adding Sections to Homepage
1. Create component in `src/components/`
2. Import in `src/pages/Index.tsx`
3. Add to page in correct order
4. Add corresponding Navbar link (if needed)
5. Use hash ID for scroll navigation: `<section id="sectionname">`

---

## 🎨 Styling & Theme

### Tailwind CSS Configuration
- Custom theme colors in `tailwind.config.ts`
- CSS variables for colors in `src/index.css`

### Color Palette

**Primárias & Secundárias**
- Azul Cobalto `#2B4F8C` — Primário (`text-primary`, `bg-primary`)
- Azul Profundo `#1A3A6B` — Primário Dark (`bg-primary-dark`)
- Verde Musgo `#5A7A3A` — Secundário
- Verde Oliva `#8FA85C` — Secundário Light
- Verde-Água `#D4E8D8` — Background (`bg-bg-agua`)
- Branco Esverdeado `#F0F5EC` — Background Light (`bg-bg-light`)
- Dourado Âmbar `#C9A84C` — Acento
- Preto Orgânico `#2C2C1E` — Dark (`text-dark`)

**Tons Terrosos**
- Terracota `#934211` — Terroso 1 (`text-terra-1`, used in labels/eyebrows)
- Âmbar Escuro `#7A4900` — Terroso 2 (`text-terra-2`)
- Ocre Dourado `#B5771C` — Terroso 3

**Typography**
- **Cinzel** (Google Fonts) — títulos, headings, display (`font-display`)
- **Lato** (Google Fonts) — corpo, parágrafos e UI (`font-lato`)

---

## 🚀 Common Development Tasks

### Running the Project
```bash
# Install dependencies
npm install

# Start dev server (http://localhost:8086)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

### Adding Forms
Use React Hook Form + Zod for validation:

```typescript
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const schema = z.object({
  email: z.string().email('Invalid email'),
  name: z.string().min(2)
});

type FormData = z.infer<typeof schema>;

export const MyForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema)
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('name')} />
      {errors.name && <span>{errors.name.message}</span>}
    </form>
  );
};
```

### Using Toast Notifications
```typescript
import { useToast } from '@/hooks/use-toast';

const { toast } = useToast();

const handleAction = () => {
  toast({
    title: 'Success',
    description: 'Action completed',
    variant: 'default' // or 'destructive'
  });
};
```

---

## 🔐 Security & Performance

### Security Considerations

1. **Environment Variables**
   - Never commit `.env.local`
   - Use `VITE_` prefix for client-side variables
   - Keep Supabase keys private

2. **API Requests**
   - Always validate incoming data with Zod
   - Use Supabase RLS policies

### Performance Optimization

1. **Lazy Loading**
   - Images use native lazy loading: `loading="lazy"`
   - Media gallery uses modal for fullscreen

2. **Caching**
   - React Query handles server state caching

3. **Bundle Size**
   - Tree-shake unused components
   - Monitor with `npm run build` output

---

## 📁 Routing & Navigation

### Client-Side Routing
- Uses React Router in `src/App.tsx`
- Currently: Single-page app with hash-based navigation
- Add routes in App.tsx before `<Route path="*" />`

### Hash Navigation
For scrolling to sections, use hash links:
```typescript
// In Navbar
<a href="#memorias">Memórias</a>

// In component
<section id="memorias">Gallery content</section>
```

### Adding New Pages
1. Create page component in `src/pages/NewPage.tsx`
2. Lazy import in `App.tsx`: `const NewPage = lazy(() => import('./pages/NewPage'))`
3. Add route: `<Route path="/newpage" element={<NewPage />} />`

---

## 🧪 Testing & Quality

### Current Testing Setup
- No test suite configured yet
- **Recommendation**: Add Jest + React Testing Library

### Code Quality
```bash
# Check for linting issues
npm run lint
```

### Manual Testing Checklist
- [ ] All sections render correctly
- [ ] Responsive design on mobile/tablet/desktop
- [ ] Forms validate correctly
- [ ] Navigation links scroll to sections
- [ ] Images load without errors

---

## 📝 Git & Branching

### Branch Strategy
- **`main`**: Stable production-ready code
- **`feature/redesign-visual-sagrado`**: Current active development
- Feature branches: `feature/feature-name`
- Bug fixes: `fix/bug-name`

### Commit Messages
- Use conventional commits: `feat:`, `fix:`, `docs:`, `style:`, `refactor:`
- Example: `feat: add new gallery section`
- Keep messages descriptive and concise

### Before Committing
1. Run `npm run lint` and fix issues
2. Test manually on browser
3. Verify no breaking changes

---

## 🌐 Environment Variables

Create `.env.local` in project root:

```env
# Supabase
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key

# Optional - Social integrations
VITE_INSTAGRAM_TOKEN=optional
VITE_YOUTUBE_API_KEY=optional
```

**Never commit `.env.local` to git!**

---

## 📚 Documentation Files

- **CLAUDE.md** - This file (development guidelines)
- **VISUAL_GUIDE.md** - Visual design system reference
- **DEPLOY.md** - Deployment instructions
- **PLESK-DEPLOY.md** - Plesk-specific deployment

---

## 🚢 Deployment

Build output goes to `dist/` folder. Entry point: `dist/index.html`.

### Build & Deploy
```bash
npm run build
# Upload dist/ folder to Plesk public_html
```

---

## 📞 Quick Reference

### Key Files to Know
- **Layout**: `src/pages/Index.tsx` (main page structure)
- **Navigation**: `src/components/Navbar.tsx` (menu items)
- **Styling**: `src/index.css` + `tailwind.config.ts`
- **Routing**: `src/App.tsx`

### Common Imports
```typescript
// UI Components
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';

// Utilities
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

// Icons
import { Heart, Image, Play } from 'lucide-react';

// Forms
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
```

### Useful Commands
```bash
# Start development
npm run dev

# Build production
npm run build

# Run linter
npm run lint
```

---

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| Port already in use | Vite will auto-select next available port |
| Supabase connection fails | Check env vars in `.env.local` |
| Images not loading | Use public URLs from Supabase Storage |
| TypeScript errors | Run `npm install` to sync types |
| Build fails | Check for console errors, ensure all imports are correct |

---

## ✅ Development Checklist Before Pushing

- [ ] Code follows naming conventions
- [ ] No `console.log()` statements left in production code
- [ ] TypeScript has no errors
- [ ] `npm run lint` passes
- [ ] Responsive design tested on multiple screen sizes
- [ ] No breaking changes to existing features
- [ ] Git commit messages are descriptive

---

**Last Updated**: 2026-03-21
**Project Status**: Active development — visual redesign branch
