# 📁 Estrutura do Projeto Casa da Alquimia v2

```
casa-da-alquimia-v2/
│
├── 📚 docs/                               # Documentação completa
│   ├── INDEX.md                          # Índice de documentação
│   ├── CLAUDE.md                         # Guia técnico (COMECE POR AQUI)
│   ├── FIRST_STEPS.md                    # Primeiros passos
│   ├── COMO_COMECANDO.md                 # Guia em português
│   ├── IMPLEMENTATION_SUMMARY.md         # O que está implementado
│   ├── VISUAL_GUIDE.md                   # Guia visual e paleta
│   ├── CUSTOMIZATION_GUIDE.md            # Personalização
│   ├── CONTRIBUTING.md                   # Como contribuir
│   ├── DEPLOY.md                         # Deploy geral
│   ├── PLESK-DEPLOY.md                   # Deploy no Plesk
│   ├── DOMAIN.md                         # Configuração de domínio
│   ├── SPOTIFY-PLAYER.md                 # Player Spotify
│   ├── IMAGENS_VIDEOS_INTEGRADAS.md      # Integração de mídias
│   ├── DELIVERABLES.md                   # Entregáveis
│   ├── RESUME.md                         # Resumo executivo
│   └── CONCLUSAO.md                      # Conclusão
│
├── 📦 src/                                # Código-fonte
│   ├── components/                       # Componentes React
│   │   ├── ui/                          # Shadcn UI Components (50+)
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── input.tsx
│   │   │   ├── textarea.tsx
│   │   │   ├── tabs.tsx
│   │   │   ├── accordion.tsx
│   │   │   ├── badge.tsx
│   │   │   ├── form.tsx
│   │   │   └── ... (outros 40+)
│   │   │
│   │   ├── social/                      # Integração de redes sociais
│   │   │   ├── InstagramSection.tsx     # Feed Instagram
│   │   │   ├── YouTubeSection.tsx       # Feed YouTube
│   │   │   └── SocialMediaPost.tsx      # Post genérico
│   │   │
│   │   ├── Hero.tsx                     # Seção hero/landing
│   │   ├── Navbar.tsx                   # Barra de navegação
│   │   ├── About.tsx                    # Seção sobre
│   │   ├── Rituals.tsx                  # Seção rituais
│   │   ├── MemoriasGallery.tsx          # Galeria de fotos/vídeos
│   │   ├── MediaGallery.tsx             # Visualizador fullscreen
│   │   ├── SocialMedia.tsx              # Agregador de redes
│   │   ├── SpotifyPlayer.tsx            # Player Spotify (fixo)
│   │   ├── Donate.tsx                   # Seção doações
│   │   ├── DonationModal.tsx            # Modal de doação
│   │   ├── ContactForm.tsx              # Formulário contato
│   │   └── Footer.tsx                   # Rodapé
│   │
│   ├── pages/                           # Páginas (rotas)
│   │   ├── Index.tsx                    # Página principal/landing
│   │   └── NotFound.tsx                 # Página 404
│   │
│   ├── integrations/                    # Integrações externas
│   │   └── supabase/                    # Supabase integration
│   │       ├── client.ts                # Cliente Supabase
│   │       ├── services.ts              # Serviços API (mediaLibraryService)
│   │       └── types.ts                 # TypeScript types
│   │
│   ├── hooks/                           # Custom React Hooks
│   │   ├── use-toast.ts                 # Toast notifications
│   │   └── use-mobile.tsx               # Mobile detection
│   │
│   ├── utils/                           # Utilitários
│   │   ├── animations.ts                # Animações reutilizáveis
│   │   └── lib/
│   │       └── utils.ts                 # Funções helper (cn(), etc)
│   │
│   ├── App.tsx                          # Root layout com routing
│   ├── App.css                          # Estilos do App
│   ├── main.tsx                         # Entrada do Vite
│   ├── index.css                        # Estilos globais + Tailwind
│   └── vite-env.d.ts                    # Tipos Vite
│
├── 📂 public/                            # Arquivos estáticos
│   ├── favicon.png                      # Ícone do site
│   ├── robots.txt                       # SEO robots
│   ├── sitemap.xml                      # Sitemap
│   └── recursos/                        # Imagens dos rituais
│
├── 🗄️ supabase/                          # Supabase setup
│   ├── config.toml                      # Configuração local
│   ├── functions/                       # Edge functions
│   └── migrations/                      # SQL migrations
│       └── library_and_shop.sql         # Schema do BD (galeria)
│
├── 🛠️ scripts/                           # Scripts utilitários
│   └── optimize-media.sh                # Script otimizar mídia
│
├── 🔧 Arquivos de Configuração
│   ├── vite.config.ts                   # Configuração Vite
│   ├── tailwind.config.ts               # Configuração Tailwind
│   ├── postcss.config.js                # Configuração PostCSS
│   ├── tsconfig.json                    # Configuração TypeScript
│   ├── eslint.config.js                 # Configuração ESLint
│   ├── components.json                  # Config Shadcn/UI
│   ├── .env.example                     # Template variáveis env
│   ├── .gitignore                       # Git ignore rules
│   └── package.json                     # Dependências
│
├── 📋 README.md                          # Readme principal
└── 📄 PROJECT_STRUCTURE.md              # Este arquivo
```

---

## 🎯 Fluxo de Dados

```
User
  ↓
UI Components (React)
  ↓
Pages (Index.tsx)
  ↓
Services (supabase/services.ts)  ← opcional, para galeria dinâmica
  ↓
Supabase API
  ↓
Database (PostgreSQL)
Storage (Images/Videos)
```

---

## 📊 Principais Diretórios

### `src/components/`
- **Proporção**: ~70% do código
- **Tipo**: Componentes React da interface
- **Importante**: Todos os componentes visuais da landing page

### `src/integrations/supabase/`
- **Tipo**: Lógica de backend (galeria dinâmica)
- **Importante**: Comunicação com Supabase

### `src/pages/`
- **Tipo**: Páginas/rotas
- **Importante**: `Index.tsx` define a ordem das seções

### `docs/`
- **Tipo**: Documentação do projeto
- **Importante**: Guias para desenvolvimento e manutenção

---

## 🔄 Ciclo de Desenvolvimento

```
1. Editar componentes em src/
   ↓
2. Vite recompila automaticamente
   ↓
3. Ver mudanças em http://localhost:8086
   ↓
4. Testar responsividade
   ↓
5. Rodar npm run lint
   ↓
6. Fazer commit e push
```

---

## 📝 Convenções de Naming

| Tipo | Padrão | Exemplo |
|------|--------|---------|
| Componentes | PascalCase | `Hero.tsx`, `MemoriasGallery.tsx` |
| Pastas | kebab-case ou lowercase | `src/components/ui/` |
| Hooks | camelCase com `use` | `useScrollProgress()` |
| Constantes | UPPER_SNAKE_CASE | `MAX_FILE_SIZE` |
| Tipos | PascalCase | `Album`, `Media` |
| Funções | camelCase | `cn()` |

---

## 🚀 Como Adicionar Novas Seções

1. **Criar componente**: `src/components/NewSection.tsx`
2. **Importar em Index.tsx**: `import NewSection from '@/components/NewSection'`
3. **Adicionar à página**: `<NewSection />`
4. **Adicionar ao menu**: Editar `Navbar.tsx`

---

## 🔐 Arquivos Sensíveis

```
⚠️ NUNCA COMMITAR:
├── .env.local              # Variáveis de ambiente
└── Credentials/Keys        # Senhas, tokens API

✅ SEMPRE COMMITAR:
├── .env.example            # Template
├── src/**/*.tsx            # Código-fonte
├── docs/**/*.md            # Documentação
└── package.json            # Dependências
```

---

**Última atualização**: 2026-03-21
**Versão**: 2.0 (Redesign Visual Sagrado)
