# 🌿 Casa da Alquimia - Website Oficial

Website oficial da Casa da Alquimia, um espaço sagrado em Cavalcante-GO dedicado a rituais de ayahuasca, medicina da floresta, meditação e autoconhecimento.

## 🚀 Tecnologias

- **React 18** - Biblioteca UI
- **TypeScript** - Tipagem estática
- **Vite** - Build tool e dev server
- **Tailwind CSS** - Framework CSS utility-first
- **shadcn/ui** - Componentes UI acessíveis
- **React Router** - Roteamento
- **Tanstack Query** - State management assíncrono
- **Lucide React** - Ícones

## 📦 Instalação

```bash
# Clone o repositório
git clone <YOUR_GIT_URL>

# Entre no diretório
cd casa-da-alquimia

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

## 🛠️ Scripts Disponíveis

```bash
npm run dev          # Inicia servidor de desenvolvimento (porta 8080)
npm run build        # Build de produção
npm run build:dev    # Build em modo desenvolvimento
npm run preview      # Preview do build de produção
npm run lint         # Executa linter
```

## ✨ Melhorias Implementadas (Novembro 2025)

### 🎯 SEO & Performance

- ✅ Meta tags otimizadas (Open Graph, Twitter Cards, Schema.org)
- ✅ URL canônica configurada
- ✅ Sitemap.xml e robots.txt
- ✅ Lazy loading de componentes e rotas
- ✅ Preconnect para recursos externos
- ✅ Code splitting automático

### ♿ Acessibilidade

- ✅ Skip-to-content link para navegação por teclado
- ✅ ARIA labels em elementos interativos
- ✅ Progress bar com atributos ARIA
- ✅ Focus visible otimizado
- ✅ Suporte a prefers-reduced-motion
- ✅ Classes sr-only para screen readers

### 🆕 Novas Funcionalidades

- ✅ Formulário de contato funcional
- ✅ Validação de campos
- ✅ Estados de loading e sucesso
- ✅ Toasts de feedback
- ✅ Layout responsivo

### 🔒 Segurança

- ✅ Vulnerabilidades npm corrigidas
- ✅ rel="noopener noreferrer" em links externos
- ✅ Sanitização de inputs

## 📁 Estrutura do Projeto

```
casa-da-alquimia/
├── public/               # Arquivos estáticos
│   ├── favicon.png
│   ├── robots.txt       # ✨ Novo
│   ├── sitemap.xml      # ✨ Novo
│   └── recursos/        # Imagens dos rituais
├── src/
│   ├── components/      # Componentes React
│   │   ├── About.tsx
│   │   ├── ContactForm.tsx  # ✨ Novo
│   │   ├── Donate.tsx
│   │   ├── DonationModal.tsx
│   │   ├── Footer.tsx
│   │   ├── Hero.tsx
│   │   ├── Navbar.tsx
│   │   ├── Rituals.tsx
│   │   ├── SocialMedia.tsx
│   │   ├── TestimonialCard.tsx
│   │   ├── social/      # Seções de redes sociais
│   │   └── ui/          # Componentes shadcn/ui
│   ├── hooks/           # Custom hooks
│   ├── lib/             # Utilitários
│   ├── pages/           # Páginas
│   │   ├── Index.tsx
│   │   └── NotFound.tsx
│   └── utils/           # Funções auxiliares
│       └── animations.ts
├── index.html           # ✨ Melhorado com Schema.org
└── package.json
```

## 🎨 Paleta de Cores

```css
Azul 1: #8BB6CC  /* Backgrounds claros */
Azul 2: #173D90  /* Primary/CTA */
Azul 3: #1D3F6C  /* Secondary */

Verde 1: #BED19F  /* Acentos suaves */
Verde 2: #9CB96B
Verde 3: #80A94D  /* Tags/badges */
Verde 4: #507030  /* Verde escuro */

Marrom 1: #A68943
Marrom 2: #674321
```

## 🔄 Próximas Implementações Sugeridas

### Alta Prioridade

- [ ] Integração backend para formulário de contato (EmailJS/SendGrid/Supabase)
- [ ] Sistema de pagamento real para doações (Stripe/PagSeguro)
- [ ] Sistema de agendamento de rituais
- [ ] Painel administrativo

### Média Prioridade

- [ ] Blog/Notícias
- [ ] Galeria de fotos própria (substituir Elfsight)
- [ ] Área de membros/comunidade
- [ ] FAQ interativo
- [ ] Página de política de privacidade

### Baixa Prioridade

- [ ] PWA (Progressive Web App)
- [ ] Modo escuro
- [ ] Internacionalização (i18n)
- [ ] Analytics integrado

## 📞 Contato

- **Local**: Estrada da Usina, Fazenda Miraflores - Cavalcante, GO
- **Telefone**: +55 (62) 99653-8902
- **Email**: casadaalquimia@gmail.com
- **Instagram**: [@casadaalquimia](https://www.instagram.com/casadaalquimia/)

## 📄 Licença

© 2025 A Casa da Alquimia. Todos os direitos reservados.

---

Desenvolvido com ❤️ para a expansão da consciência e autoconhecimento
