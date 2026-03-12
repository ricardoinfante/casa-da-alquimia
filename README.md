# 🌿 Casa da Alquimia - Website Oficial

Website oficial da **Casa da Alquimia**, um espaço sagrado em Cavalcante-GO dedicado a rituais de ayahuasca, medicina da floresta, meditação e autoconhecimento.

**Status**: ✅ Pronto para Produção | **Branch Ativa**: `build-plesk` | **Ambiente**: http://localhost:8087

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
| **[IMPLEMENTATION_SUMMARY.md](docs/IMPLEMENTATION_SUMMARY.md)** | ✅ Resumo do que foi implementado |
| **[FIRST_STEPS.md](docs/FIRST_STEPS.md)** | 🎯 Primeiros passos para começar |
| **[LIBRARY_SHOP_SETUP.md](docs/LIBRARY_SHOP_SETUP.md)** | 🛠️ Setup técnico de Library & Shop |
| **[LIBRARY_SHOP_QUICK_START.md](docs/LIBRARY_SHOP_QUICK_START.md)** | ⚡ Quick start para Library & Shop |
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
- **Shadcn/UI** - Component Library (50+ componentes)
- **React Router 6.26** - Routing
- **TanStack Query 5.56** - State Management
- **Supabase** - Database & Storage

---

## 📁 Estrutura do Projeto

```
casa-da-alquimia-v2/
├── docs/                      # 📚 Documentação completa
│   ├── CLAUDE.md
│   ├── IMPLEMENTATION_SUMMARY.md
│   ├── LIBRARY_SHOP_SETUP.md
│   └── ... (outros arquivos)
├── public/                    # Arquivos estáticos
│   ├── favicon.ico
│   ├── robots.txt
│   └── sitemap.xml
├── src/
│   ├── components/            # Componentes React
│   │   ├── ui/               # Shadcn UI (50+ componentes)
│   │   ├── social/           # Instagram, YouTube sections
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Navbar.tsx
│   │   ├── Rituals.tsx
│   │   ├── Library.tsx       # Galeria de mídia
│   │   ├── Shop.tsx          # E-commerce
│   │   ├── AdminPanel.tsx    # Painel administrativo
│   │   ├── ContactForm.tsx
│   │   ├── Footer.tsx
│   │   └── ... (outros componentes)
│   ├── pages/
│   │   ├── Index.tsx         # Página principal (landing)
│   │   └── NotFound.tsx      # 404
│   ├── integrations/supabase/
│   │   ├── client.ts         # Supabase client
│   │   ├── services.ts       # API services
│   │   └── types.ts          # TypeScript types
│   ├── hooks/                # Custom hooks
│   ├── utils/                # Utilitários
│   ├── lib/                  # Bibliotecas
│   ├── App.tsx               # Root layout
│   ├── main.tsx              # Entrada Vite
│   └── index.css             # Estilos globais
├── .env.local                # Variáveis de ambiente (não commitar)
├── vite.config.ts            # Configuração Vite
├── tailwind.config.ts        # Configuração Tailwind
├── tsconfig.json             # Configuração TypeScript
└── package.json
```

---

## 🎯 Funcionalidades Principais

### ✅ Implementado

- **Landing Page** - Hero, About, Rituals, Testimonials
- **Biblioteca de Mídia** - Galeria com álbuns temáticos
- **E-commerce** - Catálogo de produtos, carrinho, pedidos
- **Painel Admin** - Criar álbuns e produtos
- **Integração Supabase** - Database, Auth, Storage
- **Dark Mode** - Toggle automático de tema
- **Responsivo** - Mobile, tablet, desktop
- **SEO** - Meta tags, sitemap, robots.txt

### 🔄 Em Progresso / TODO

- **Pagamento** - Integração Stripe/Mercado Pago
- **Autenticação Admin** - Proteção do painel administrativo
- **Testes** - Jest + React Testing Library
- **Analytics** - Google Analytics

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
# Desenvolvimento
npm run dev          # Inicia servidor (porta 8087)

# Produção
npm run build        # Build otimizado
npm run preview      # Preview do build
npm run build:dev    # Build em modo dev

# Qualidade
npm run lint         # ESLint
```

---

## 🔗 Links Importantes

- **Repository**: https://github.com/akillez01/casa-da-alquimia
- **Supabase**: https://supabase.com/
- **Documentação React**: https://react.dev
- **Tailwind CSS**: https://tailwindcss.com
- **Shadcn/UI**: https://ui.shadcn.com

---

## 🎨 Paleta de Cores

```
Primária:    #173D90 (Azul)
Secundária:  #80A94D (Verde)
Accent:      #A68943 (Marrom)
Background:  #F5F5F5 / #0F0F0F (Dark)
```

---

## 👥 Contribuindo

Veja [CONTRIBUTING.md](docs/CONTRIBUTING.md) para guidelines sobre como contribuir.

---

## 📞 Contato

- **Email**: casadaalquimia@gmail.com
- **Instagram**: [@casadaalquimia](https://www.instagram.com/casadaalquimia/)
- **Telefone**: +55 (62) 99653-8902
- **Localização**: Estrada da Usina, Fazenda Miraflores - Cavalcante, GO

---

## 📄 Licença

© 2025 A Casa da Alquimia. Todos os direitos reservados.

---

**Desenvolvido com ❤️ para a expansão da consciência e autoconhecimento**

*Para detalhes completos de desenvolvimento, consulte [CLAUDE.md](docs/CLAUDE.md)*
