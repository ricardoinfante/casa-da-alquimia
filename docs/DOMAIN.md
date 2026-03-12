# 🌐 Configuração do Domínio acasadaalquimia.com.br

## ✅ Arquivos Atualizados

O domínio **https://acasadaalquimia.com.br** foi configurado nos seguintes arquivos:

1. ✅ `index.html` - Meta tags, Open Graph, Schema.org
2. ✅ `public/sitemap.xml` - Todas as URLs
3. ✅ `public/robots.txt` - URL do sitemap
4. ✅ `.env.local` - Variáveis de ambiente
5. ✅ `.env.example` - Template de variáveis

## 🔧 Configuração DNS

### Registrar DNS no Provedor de Hospedagem

Dependendo de onde você vai hospedar, configure os registros DNS:

#### Opção 1: Vercel

```
Type: A
Name: @
Value: 76.76.21.21

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

#### Opção 2: Netlify

```
Type: A
Name: @
Value: 75.2.60.5

Type: CNAME
Name: www
Value: seu-projeto.netlify.app
```

#### Opção 3: Cloudflare Pages

```
Type: A
Name: @
Value: [IPs fornecidos pelo Cloudflare]

Type: CNAME
Name: www
Value: [seu-projeto].pages.dev
```

#### Opção 4: GitHub Pages

```
Type: A
Name: @
Values:
  185.199.108.153
  185.199.109.153
  185.199.110.153
  185.199.111.153

Type: CNAME
Name: www
Value: ricardoinfante.github.io
```

### Tempo de Propagação

- Mudanças DNS podem levar de 1 a 48 horas para propagar
- Use https://dnschecker.org/ para verificar propagação

## 🚀 Deploy com Domínio Personalizado

### Vercel

```bash
# Deploy normal
vercel --prod

# Adicionar domínio no dashboard
# Settings → Domains → Add Domain
# Digite: acasadaalquimia.com.br
# Vercel te dará instruções específicas
```

### Netlify

```bash
# Deploy
netlify deploy --prod

# Adicionar domínio
netlify domains:add acasadaalquimia.com.br

# Configurar DNS seguindo instruções
```

### Cloudflare Pages

```bash
# Conectar repositório GitHub ao Cloudflare Pages
# Settings → Custom Domains → Add Custom Domain
# Digite: acasadaalquimia.com.br
```

## 📋 Checklist Pós-Configuração

Após configurar o domínio, verifique:

- [ ] Site acessível em https://acasadaalquimia.com.br
- [ ] Redirecionamento de www para domínio principal funciona
- [ ] Certificado SSL instalado (HTTPS)
- [ ] Sitemap acessível: https://acasadaalquimia.com.br/sitemap.xml
- [ ] Robots.txt acessível: https://acasadaalquimia.com.br/robots.txt
- [ ] Meta tags com domínio correto (inspecionar código fonte)
- [ ] Testar compartilhamento em redes sociais (Facebook, WhatsApp, Twitter)

## 🔍 Configurar Google Search Console

1. Acesse: https://search.google.com/search-console
2. Adicionar propriedade: **acasadaalquimia.com.br**
3. Verificar propriedade (via DNS ou HTML)
4. Enviar sitemap: `https://acasadaalquimia.com.br/sitemap.xml`
5. Aguardar indexação (pode levar alguns dias)

## 🎯 Testar Domínio

### Teste 1: Acessibilidade

```bash
curl -I https://acasadaalquimia.com.br
# Deve retornar 200 OK
```

### Teste 2: SSL

```bash
curl -vI https://acasadaalquimia.com.br 2>&1 | grep -i ssl
# Deve mostrar certificado válido
```

### Teste 3: Meta Tags

Abra: https://cards-dev.twitter.com/validator
Cole: https://acasadaalquimia.com.br
Verifique preview

### Teste 4: Open Graph

Abra: https://developers.facebook.com/tools/debug/
Cole: https://acasadaalquimia.com.br
Clique em "Buscar novas informações"

## 🔄 Redirecionar Domínio Antigo (Opcional)

Se você tinha um domínio antigo, configure redirecionamento 301:

### Vercel - vercel.json

```json
{
  "redirects": [
    {
      "source": "/:path*",
      "destination": "https://acasadaalquimia.com.br/:path*",
      "permanent": true
    }
  ]
}
```

### Netlify - \_redirects

```
https://old-domain.com/* https://acasadaalquimia.com.br/:splat 301!
```

## 📧 Email Personalizado (Opcional)

Configure emails com seu domínio:

### Opção 1: Google Workspace

- contato@acasadaalquimia.com.br
- agendamento@acasadaalquimia.com.br
- Custo: ~R$ 30/mês por usuário

### Opção 2: Zoho Mail (Gratuito até 5 usuários)

- https://www.zoho.com/mail/
- Configurar registros MX no DNS

### Opção 3: Email Forwarding

- Configure no seu provedor de domínio
- Encaminhe emails para casadaalquimia@gmail.com

## ⚠️ Problemas Comuns

### Domínio não resolve

- Verifique se DNS está propagado
- Aguarde até 48 horas
- Limpe cache DNS: `ipconfig /flushdns` (Windows) ou `sudo dscacheutil -flushcache` (Mac)

### Certificado SSL inválido

- Aguarde alguns minutos após configuração
- Plataformas como Vercel/Netlify instalam automaticamente
- Force renovação no painel da plataforma

### www não funciona

- Adicione CNAME para www no DNS
- Configure redirecionamento na plataforma

### Site mostra conteúdo antigo

- Limpe cache do navegador
- Limpe cache da CDN na plataforma

## 📞 Suporte

Em caso de problemas:

- Vercel: https://vercel.com/support
- Netlify: https://www.netlify.com/support/
- Cloudflare: https://support.cloudflare.com/

---

✅ **Domínio configurado e pronto para uso!**
