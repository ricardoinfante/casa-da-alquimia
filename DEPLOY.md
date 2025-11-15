# 🚀 Guia de Deploy - Casa da Alquimia

## Opções de Hospedagem Recomendadas

### 1. Vercel (Recomendado) ⭐

**Vantagens**: Deploy automático, CI/CD, SSL gratuito, CDN global

```bash
# Instalar Vercel CLI
npm i -g vercel

# Fazer login
vercel login

# Deploy
vercel

# Deploy em produção
vercel --prod
```

**Configuração no Vercel Dashboard**:

1. Conecte seu repositório GitHub
2. Configure as variáveis de ambiente (Settings → Environment Variables)
3. Deploy automático a cada push na branch main

### 2. Netlify

**Vantagens**: Fácil de usar, forms nativos, redirects

```bash
# Instalar Netlify CLI
npm i -g netlify-cli

# Fazer login
netlify login

# Deploy
netlify deploy

# Deploy em produção
netlify deploy --prod
```

**Configuração**:

- Build command: `npm run build`
- Publish directory: `dist`

### 3. GitHub Pages

```bash
# Instalar gh-pages
npm install --save-dev gh-pages

# Adicionar ao package.json:
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist"
}

# Deploy
npm run deploy
```

## 📋 Checklist Pré-Deploy

- [ ] Testar build localmente: `npm run build && npm run preview`
- [ ] Configurar variáveis de ambiente
- [ ] Atualizar URLs no index.html (Open Graph, Schema.org)
- [ ] Verificar robots.txt e sitemap.xml
- [ ] Testar formulário de contato
- [ ] Verificar todas as imagens carregam
- [ ] Testar responsividade (mobile/tablet/desktop)
- [ ] Validar acessibilidade com Lighthouse
- [ ] Verificar performance com PageSpeed Insights

## 🔧 Configurações Importantes

### vite.config.ts

Para GitHub Pages ou subdiretórios:

```typescript
export default defineConfig({
  base: "/seu-repositorio/", // Se usar GitHub Pages
  // base: '/', // Para domínio próprio
});
```

### Redirects (Netlify)

Criar `public/_redirects`:

```
/*    /index.html   200
```

### Redirects (Vercel)

Criar `vercel.json`:

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

## 🌐 Configuração de Domínio

### Apontar DNS

Para domínio personalizado, configure os registros DNS:

**Vercel**:

```
Type: A
Name: @
Value: 76.76.21.21

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

**Netlify**:

```
Type: A
Name: @
Value: 75.2.60.5

Type: CNAME
Name: www
Value: seu-site.netlify.app
```

## 📊 Monitoramento Pós-Deploy

### Google Search Console

1. Adicionar propriedade
2. Verificar propriedade do site
3. Enviar sitemap: `https://acasadaalquimia.site/sitemap.xml`

### Google Analytics (Opcional)

```html
<!-- Adicionar no index.html antes de </head> -->
<script
  async
  src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag() {
    dataLayer.push(arguments);
  }
  gtag("js", new Date());
  gtag("config", "GA_MEASUREMENT_ID");
</script>
```

## 🐛 Troubleshooting

### Erro 404 em rotas

- Verificar configuração de redirects/rewrites
- Confirmar que SPA fallback está configurado

### Imagens não carregam

- Verificar caminhos das imagens (usar caminhos absolutos a partir de `/`)
- Confirmar que imagens estão na pasta `public/`

### Variáveis de ambiente não funcionam

- Prefixar com `VITE_` para serem expostas ao cliente
- Recriar build após alterar .env

### Build falha

```bash
# Limpar cache e reinstalar
rm -rf node_modules package-lock.json
npm install
npm run build
```

## 🔒 Segurança

### Headers de Segurança (Netlify)

Criar `public/_headers`:

```
/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  X-XSS-Protection: 1; mode=block
  Referrer-Policy: strict-origin-when-cross-origin
```

### Headers de Segurança (Vercel)

Em `vercel.json`:

```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        }
      ]
    }
  ]
}
```

## 📈 Performance

### Otimizações Automáticas

- ✅ Code splitting (implementado)
- ✅ Lazy loading (implementado)
- ✅ Tree shaking (Vite)
- ✅ Minificação (Vite)

### Otimizações Adicionais

- Comprimir imagens antes de fazer upload
- Usar formatos modernos (WebP)
- Configurar cache headers
- Habilitar Brotli compression

## 📞 Suporte

Em caso de problemas durante o deploy, consulte:

- [Documentação Vite](https://vitejs.dev/guide/static-deploy.html)
- [Documentação Vercel](https://vercel.com/docs)
- [Documentação Netlify](https://docs.netlify.com/)
