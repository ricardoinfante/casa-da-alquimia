# 🎬 Primeiros Passos — Casa da Alquimia v2

## 🎯 Objetivo

Este guia ajuda qualquer desenvolvedor a rodar o projeto localmente.

---

## 📋 Pré-requisitos

- Node.js 18+ instalado
- npm 9+ instalado
- Git instalado

---

## PARTE 1: Clonar e Instalar (2 minutos)

```bash
# Clonar o repositório
git clone https://github.com/akillez01/casa-da-alquimia.git
cd casa-da-alquimia-v2

# Instalar dependências
npm install
```

---

## PARTE 2: Configurar Variáveis de Ambiente (2 minutos)

Criar um arquivo `.env.local` na raiz do projeto:

```env
# Supabase (opcional para rodar localmente)
VITE_SUPABASE_URL=https://seu-projeto.supabase.co
VITE_SUPABASE_ANON_KEY=sua-anon-key

# Social (opcional)
VITE_INSTAGRAM_TOKEN=opcional
VITE_YOUTUBE_API_KEY=opcional
```

> **Nota**: O site funciona sem Supabase para visualização. O Supabase é usado para a galeria de memórias dinâmica.

---

## PARTE 3: Rodar o Projeto (1 minuto)

```bash
npm run dev
```

Acessar: `http://localhost:8086`

---

## PARTE 4: Build para Produção

```bash
npm run build
```

A pasta `dist/` conterá os arquivos estáticos para deploy.

---

## 📁 Estrutura de Pastas

```
casa-da-alquimia-v2/
├── src/
│   ├── components/     — Componentes React
│   ├── pages/          — Páginas (Index.tsx)
│   ├── hooks/          — Custom hooks
│   ├── utils/          — Utilitários
│   └── integrations/   — Supabase client
├── docs/               — Documentação
├── public/             — Assets estáticos
└── dist/               — Build de produção (gerado)
```

---

## 🎨 Personalizações Comuns

### Alterar textos do site
Editar os componentes em `src/components/`:
- `Hero.tsx` — texto do banner
- `About.tsx` — texto sobre o espaço
- `Rituals.tsx` — rituais apresentados

### Alterar cores
Editar `tailwind.config.ts` e `src/index.css`.
Ver [VISUAL_GUIDE.md](VISUAL_GUIDE.md) para referência da paleta.

### Alterar playlist do Spotify
Em `src/pages/Index.tsx`, alterar o `playlistId`:
```tsx
<SpotifyPlayer playlistId="SEU_PLAYLIST_ID" />
```

---

## 🐛 Troubleshooting

| Problema | Solução |
|----------|---------|
| Porta ocupada | Vite escolhe outra porta automaticamente |
| Erro de TypeScript | Rodar `npm install` para sincronizar tipos |
| Supabase não conecta | Verificar `.env.local` |
| Build falha | Verificar erros no console (`npm run lint`) |

---

## 📚 Próximos Passos

- Leia [CLAUDE.md](CLAUDE.md) para entender a arquitetura completa
- Veja [VISUAL_GUIDE.md](VISUAL_GUIDE.md) para entender o design
- Consulte [DEPLOY.md](DEPLOY.md) para publicar o site

---

**Última atualização**: 2026-03-21
