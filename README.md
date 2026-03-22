# 🌿 Casa da Alquimia - Website Oficial

Website oficial da **Casa da Alquimia**, um espaço sagrado em Cavalcante-GO dedicado a rituais, meditação e autoconhecimento.

**Status**: ✅ Pronto para Produção | **Branch Ativa**: `feature/redesign-visual-sagrado`

---

## 🚀 Quick Start

```bash
# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev

# Build para produção
npm run build
```

## 📚 Documentação

Toda a documentação está organizada em `/docs`:

| Documento | Descrição |
|-----------|-----------|
| **[CLAUDE.md](docs/CLAUDE.md)** | 📖 Guia completo para desenvolvimento (LEIA ISTO PRIMEIRO) |
| **[IMPLEMENTATION_SUMMARY.md](docs/IMPLEMENTATION_SUMMARY.md)** | ✅ Resumo do que está implementado |
| **[FIRST_STEPS.md](docs/FIRST_STEPS.md)** | 🎯 Primeiros passos para começar |
| **[VISUAL_GUIDE.md](docs/VISUAL_GUIDE.md)** | 🎨 Guia visual e paleta de cores |
| **[DEPLOY.md](docs/DEPLOY.md)** | 🚀 Instruções de deploy |
| **[PLESK-DEPLOY.md](docs/PLESK-DEPLOY.md)** | 🌐 Deploy no Plesk |
| **[CUSTOMIZATION_GUIDE.md](docs/CUSTOMIZATION_GUIDE.md)** | 🎨 Personalização do design |
| **[CONTRIBUTING.md](docs/CONTRIBUTING.md)** | 🤝 Como contribuir |

---

## 💻 Tech Stack

- **React 18.3** - UI Framework
- **TypeScript 5.5** - Type Safety
- **Vite 5.4** - Build Tool
- **Tailwind CSS 3.4** - Styling
- **Shadcn/UI** - Component Library
- **React Router 6.26** - Routing
- **TanStack Query 5.56** - State Management
- **Supabase** - Database & Storage

---

## 📁 Estrutura do Projeto

```
casa-da-alquimia-v2/
├── docs/                      # 📚 Documentação completa
├── public/                    # Arquivos estáticos
│   ├── favicon.png
│   └── recursos/              # Imagens dos rituais
├── src/
│   ├── components/            # Componentes React
│   │   ├── ui/               # Shadcn UI components
│   │   ├── social/           # Instagram, YouTube sections
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Navbar.tsx
│   │   ├── Rituals.tsx
│   │   ├── MemoriasGallery.tsx  # Galeria de fotos/vídeos
│   │   ├── MediaGallery.tsx     # Visualizador fullscreen
│   │   ├── SocialMedia.tsx
│   │   ├── SpotifyPlayer.tsx
│   │   ├── Donate.tsx
│   │   ├── DonationModal.tsx
│   │   ├── ContactForm.tsx
│   │   └── Footer.tsx
│   ├── pages/
│   │   ├── Index.tsx          # Página principal
│   │   └── NotFound.tsx       # 404
│   ├── integrations/supabase/ # Supabase client e services
│   ├── hooks/                 # Custom hooks
│   ├── utils/                 # Utilitários
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── vite.config.ts
├── tailwind.config.ts
└── package.json
```

---

## 🎯 Funcionalidades

- **Landing Page** — Hero, Sobre, Rituais
- **Galeria Memórias** — Fotos e vídeos da comunidade
- **Depoimentos** — Bento grid com depoimentos reais
- **Social** — Instagram + YouTube integrados
- **Spotify** — Player fixo integrado
- **Doações** — Seção + modal de apoio
- **Contato** — Formulário de contato
- **Responsivo** — Mobile, tablet, desktop

---

## ⚙️ Configuração de Ambiente

Criar `.env.local` na raiz do projeto:

```env
# Supabase
VITE_SUPABASE_URL=https://seu-projeto.supabase.co
VITE_SUPABASE_ANON_KEY=sua-chave-anonima

# Opcional - Integrações sociais
VITE_INSTAGRAM_TOKEN=opcional
VITE_YOUTUBE_API_KEY=opcional
```

**Nunca commitar `.env.local` no Git!**

---

## 📦 Scripts Disponíveis

```bash
npm run dev          # Desenvolvimento (porta 8086)
npm run build        # Build para produção
npm run preview      # Preview do build
npm run lint         # ESLint
```

---

## 🔗 Links

- **Repository**: https://github.com/akillez01/casa-da-alquimia
- **Supabase**: https://supabase.com/
- **React**: https://react.dev
- **Tailwind CSS**: https://tailwindcss.com
- **Shadcn/UI**: https://ui.shadcn.com

---

## 📞 Contato

- **Instagram**: [@casadaalquimia](https://www.instagram.com/casadaalquimia/)
- **WhatsApp**: +55 (62) 99653-8902
- **Localização**: Cavalcante, GO

---

© 2026 A Casa da Alquimia. Todos os direitos reservados.

*Para detalhes completos de desenvolvimento, consulte [docs/CLAUDE.md](docs/CLAUDE.md)*
