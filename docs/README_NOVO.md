# 📖 Casa da Alquimia v2 — Índice de Documentação

## 🎯 Por Onde Começar

### Para Desenvolvedores
👉 [CLAUDE.md](CLAUDE.md) — Guia técnico completo (arquitetura, stack, convenções)

### Para Entender o Visual
👉 [VISUAL_GUIDE.md](VISUAL_GUIDE.md) — Paleta de cores, tipografia, tokens Tailwind

### Para Deploy
👉 [DEPLOY.md](DEPLOY.md) ou [PLESK-DEPLOY.md](PLESK-DEPLOY.md)

---

## 📚 Documentação Completa

| Arquivo | Para Quem | Conteúdo |
|---------|-----------|---------|
| **CLAUDE.md** | Devs | Arquitetura, stack, convenções de código |
| **VISUAL_GUIDE.md** | Designers/Devs | Paleta, tipografia, componentes |
| **IMPLEMENTATION_SUMMARY.md** | Todos | O que está implementado |
| **RESUME.md** | Gerência | Visão executiva |
| **DEPLOY.md** | Devs/Ops | Como fazer deploy |
| **PLESK-DEPLOY.md** | Devs/Ops | Deploy no Plesk |
| **DOMAIN.md** | Ops | Configuração de domínio |
| **SPOTIFY-PLAYER.md** | Devs | Integração Spotify |
| **CONTRIBUTING.md** | Devs | Como contribuir |

---

## 🗂️ Estrutura do Site

```
src/components/
├── Hero.tsx              — Banner principal
├── About.tsx             — Sobre o espaço
├── Navbar.tsx            — Navegação
├── Rituals.tsx           — Rituais e práticas
├── MemoriasGallery.tsx   — Galeria de fotos/vídeos
├── MediaGallery.tsx      — Visualizador fullscreen
├── SocialMedia.tsx       — Instagram + YouTube
├── SpotifyPlayer.tsx     — Player fixo
├── Donate.tsx            — Doações
├── DonationModal.tsx     — Modal de doação
├── ContactForm.tsx       — Formulário de contato
└── Footer.tsx            — Rodapé
```

---

## 💻 Stack Técnico

```
Frontend:  React + TypeScript + Vite
Estilo:    Tailwind CSS + Shadcn/UI
Ícones:    Lucide React
Backend:   Supabase (PostgreSQL + Storage)
```

---

**Última atualização**: 2026-03-21
**Status**: ✅ Redesign visual sagrado concluído
