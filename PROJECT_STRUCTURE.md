# 📁 Estrutura do Projeto Casa da Alquimia

```
casa-da-alquimia-v2/
│
├── 📚 docs/                               # Documentação completa
│   ├── INDEX.md                          # Índice de documentação
│   ├── CLAUDE.md                         # Guia técnico (COMECE POR AQUI)
│   ├── FIRST_STEPS.md                    # Primeiros passos
│   ├── COMO_COMECANDO.md                 # Guia em português
│   ├── IMPLEMENTATION_SUMMARY.md          # O que foi implementado
│   ├── LIBRARY_SHOP_SETUP.md             # Setup de library/shop
│   ├── LIBRARY_SHOP_QUICK_START.md       # Quick start
│   ├── CUSTOMIZATION_GUIDE.md            # Personalização
│   ├── CONTRIBUTING.md                   # Como contribuir
│   ├── DEPLOY.md                         # Deploy geral
│   ├── PLESK-DEPLOY.md                   # Deploy no Plesk
│   ├── DOMAIN.md                         # Configuração de domínio
│   ├── VISUAL_GUIDE.md                   # Guia visual
│   ├── SPOTIFY-PLAYER.md                 # Player Spotify
│   ├── IMAGENS_VIDEOS_INTEGRADAS.md      # Integração de mídias
│   ├── DELIVERABLES.md                   # Entregáveis
│   ├── RESUME.md                         # Resumo executivo
│   └── CONCLUSAO.md                      # Conclusão
│
├── 📦 src/                                # Código-fonte
│   ├── components/                       # Componentes React
│   │   ├── ui/                          # Shadcn UI Components (50+)
│   │   │   ├── button.tsx               # Button component
│   │   │   ├── card.tsx                 # Card component
│   │   │   ├── dialog.tsx               # Dialog/Modal
│   │   │   ├── input.tsx                # Input field
│   │   │   ├── textarea.tsx             # Textarea
│   │   │   ├── tabs.tsx                 # Tabs
│   │   │   ├── accordion.tsx            # Accordion
│   │   │   ├── badge.tsx                # Badge
│   │   │   ├── form.tsx                 # Form wrapper
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
│   │   ├── Library.tsx                  # Biblioteca de mídia
│   │   ├── LibraryGallery.tsx          # Grid da galeria
│   │   ├── MediaGallery.tsx            # Modal de mídia
│   │   ├── AdminPanel.tsx               # Painel de admin
│   │   ├── SocialMedia.tsx              # Agregador de redes
│   │   ├── SpotifyPlayer.tsx            # Player Spotify
│   │   ├── Testimonials.tsx             # Depoimentos
│   │   ├── TestimonialCard.tsx          # Card de depoimento
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
│   │       ├── services.ts              # Serviços API
│   │       │   └── mediaLibraryService
│   │       └── types.ts                 # TypeScript types
│   │
│   ├── hooks/                           # Custom React Hooks
│   │   ├── use-toast.ts                 # Toast notifications
│   │   ├── use-mobile.tsx               # Mobile detection
│   │   └── ... (outros hooks)
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
│   ├── favicon.ico                      # Ícone do site
│   ├── robots.txt                       # SEO robots
│   ├── sitemap.xml                      # Sitemap
│   └── recursos/                        # Imagens dos rituais
│
├── 🗄️ supabase/                          # Supabase setup
│   ├── config.toml                      # Configuração local
│   ├── functions/                       # Edge functions (vazio)
│   └── migrations/                      # SQL migrations
│       └── library_and_shop.sql         # Schema do BD
│
├── 🛠️ scripts/                           # Scripts utilitários
│   └── optimize-media.sh                # Script otimizar mídia
│
├── 🔧 Arquivos de Configuração
│   ├── vite.config.ts                   # Configuração Vite
│   ├── tailwind.config.ts               # Configuração Tailwind
│   ├── postcss.config.js                # Configuração PostCSS
│   ├── tsconfig.json                    # Configuração TypeScript
│   ├── tsconfig.app.json                # TS config app
│   ├── tsconfig.node.json               # TS config node
│   ├── eslint.config.js                 # Configuração ESLint
│   ├── components.json                  # Config Shadcn/UI
│   ├── .env.example                     # Template variáveis env
│   ├── .gitignore                       # Git ignore rules
│   ├── .cursorrules                     # Cursor IDE rules
│   ├── package.json                     # Dependências
│   ├── package-lock.json                # Lock file
│   └── bun.lockb                        # Bun package manager lock
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
Services (supabase/services.ts)
  ↓
Supabase API
  ↓
Database (PostgreSQL)
Storage (Images/Videos)
Auth (Opcional)
```

---

## 📊 Principais Diretórios

### `src/components/`
- **Proporção**: ~70% do código
- **Tipo**: Componentes React reutilizáveis
- **Tamanho**: 2000+ linhas
- **Importante**: Todos os componentes da UI que aparecem na página

### `src/integrations/supabase/`
- **Proporção**: ~15% do código
- **Tipo**: Lógica de backend
- **Tamanho**: 310+ linhas
- **Importante**: Toda comunicação com Supabase

### `src/pages/`
- **Proporção**: ~5% do código
- **Tipo**: Páginas/rotas
- **Tamanho**: 100+ linhas
- **Importante**: Estrutura das páginas

### `docs/`
- **Proporção**: ~10% do projeto
- **Tipo**: Documentação
- **Tamanho**: 100+ páginas
- **Importante**: Guias para desenvolvimento

---

## 🔄 Ciclo de Desenvolvimento

```
1. Editar componentes em src/
   ↓
2. Vite recompila automaticamente
   ↓
3. Refresh no navegador
   ↓
4. Ver mudanças em http://localhost:8087
   ↓
5. Testar responsividade
   ↓
6. Testar dark mode
   ↓
7. Rodar npm run lint
   ↓
8. Fazer commit e push
```

---

## 📝 Convenções de Naming

| Tipo | Padrão | Exemplo |
|------|--------|---------|
| Componentes | PascalCase | `Hero.tsx`, `Shop.tsx` |
| Pastas | kebab-case ou lowercase | `src/components/ui/` |
| Hooks | camelCase com `use` | `useMediaLibrary()` |
| Constantes | UPPER_SNAKE_CASE | `MAX_FILE_SIZE` |
| Tipos | PascalCase | `Album`, `Product` |
| Funções | camelCase | `formatPrice()` |

---

## 🚀 Como Adicionar Novas Seções

1. **Criar componente**: `src/components/NewSection.tsx`
2. **Importar em Index.tsx**: `import NewSection from '@/components/NewSection'`
3. **Adicionar à página**: `<NewSection />`
4. **Adicionar ao menu**: Editar `Navbar.tsx`
5. **Documentar**: Adicionar comentários ao código

---

## 🔐 Arquivos Sensíveis

```
⚠️ NUNCA COMMITAR:
├── .env.local              # Variáveis de ambiente
├── .env.production         # Variáveis produção
└── Credentials/Keys        # Senhas, tokens API

✅ SEMPRE COMMITAR:
├── .env.example            # Template
├── src/**/*.tsx            # Código-fonte
├── docs/**/*.md            # Documentação
└── package.json            # Dependências
```

---

## 📦 Tamanho do Projeto

```
src/               ~400 KB (código-fonte)
node_modules/      ~800 MB (dependências)
docs/              ~500 KB (documentação)
public/            ~2 MB (assets estáticos)
Total              ~803 MB
```

---

## 🎓 Para Entender o Projeto

### Iniciante
1. Leia `/docs/FIRST_STEPS.md`
2. Explore `/src/pages/Index.tsx`
3. Veja como componentes são importados
4. Rode `npm run dev`

### Intermediário
1. Leia `/docs/CLAUDE.md`
2. Estude `/src/components/` estrutura
3. Entenda Tailwind CSS em `/src/index.css`
4. Explore Supabase em `/src/integrations/supabase/`

### Avançado
1. Modifique `tailwind.config.ts` para temas
2. Estude `vite.config.ts` para build
3. Implemente novos serviços em `services.ts`
4. Adicione testes com Jest

---

**Última atualização**: 2026-03-11
**Versão**: 1.0
