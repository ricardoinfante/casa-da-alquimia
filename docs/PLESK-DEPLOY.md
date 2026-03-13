# 🚀 Guia de Deploy no Plesk - Casa da Alquimia

## 📦 Pasta de Deploy Criada

✅ **Pasta:** `dist/`  
✅ **Tamanho total:** ~1 MB  
✅ **Pronto para upload no Plesk**

---

## 📁 Estrutura da Pasta dist/

```
dist/
├── index.html              (4.28 KB) - Página principal
├── robots.txt              (227 B)   - Instruções para crawlers
├── sitemap.xml             (1.3 KB)  - Mapa do site
├── favicon.ico             (368 KB)  - Ícone do site
├── favicon.png             (368 KB)  - Ícone alternativo
├── favicon.svg             (1.5 KB)  - Ícone vetorial
├── apple-touch-icon.png    (259 B)   - Ícone iOS
├── og-image.png            (228 KB)  - Imagem Open Graph
├── placeholder.svg         (3.2 KB)  - Placeholder
├── assets/                           - CSS e JavaScript
│   ├── index-C6f4b2XP.css  (78.58 KB)
│   ├── browser-DIA4ZIHN.js (0.30 KB)
│   ├── NotFound-B2at_fgT.js (0.62 KB)
│   ├── Index-BYCxfSQ0.js   (163.17 KB)
│   └── index-Dn5Eje8r.js   (306.42 KB)
├── recursos/               - Imagens dos rituais
└── lovable-uploads/        - Uploads e imagens
```

---

## 🔧 Passo a Passo para Upload no Plesk

### **1. Acessar o Plesk**

1. Entre no painel: `https://seu-servidor:8443`
2. Faça login com suas credenciais

### **2. Selecionar o Domínio**

1. Clique em **"Websites & Domains"**
2. Localize: **acasadaalquimia.com.br**

### **3. Acessar File Manager**

1. Clique em **"File Manager"** ou **"Gerenciador de Arquivos"**
2. Navegue até a pasta raiz do site:
   - Geralmente: `/httpdocs/` ou `/public_html/`

### **4. Limpar Pasta Existente** (se houver conteúdo antigo)

1. Selecione todos os arquivos existentes
2. Clique em **"Delete"** ou **"Excluir"**
3. Confirme a exclusão

### **5. Fazer Upload dos Arquivos**

#### **Opção A: Upload via Interface Web (Recomendado para arquivos menores)**

1. Clique em **"Upload Files"** ou **"Enviar Arquivos"**
2. Selecione TODOS os arquivos e pastas da pasta `dist/`:
   - Selecione múltiplos arquivos usando Ctrl+A (Windows) ou Cmd+A (Mac)
3. Aguarde o upload completar

#### **Opção B: Upload via FTP/SFTP (Recomendado para muitos arquivos)**

```bash
# Usando FileZilla ou similar
Host: ftp.acasadaalquimia.com.br
Port: 21 (FTP) ou 22 (SFTP)
Username: seu_usuario_plesk
Password: sua_senha

# Arrastar pasta dist/* para /httpdocs/
```

#### **Opção C: Upload via ZIP (Mais Rápido)**

```bash
# No seu computador, compactar a pasta dist
cd "/home/achilles/Área de trabalho/casadaalquimia/casa-da-alquimia"
zip -r casa-da-alquimia-dist.zip dist/*

# No Plesk:
# 1. Fazer upload do arquivo .zip
# 2. Clicar com botão direito no arquivo
# 3. Selecionar "Extract" ou "Extrair"
# 4. Mover arquivos da pasta dist/ para a raiz /httpdocs/
```

### **6. Verificar Estrutura Final no Plesk**

A estrutura em `/httpdocs/` deve ficar assim:

```
/httpdocs/
├── index.html
├── robots.txt
├── sitemap.xml
├── favicon.ico
├── favicon.png
├── favicon.svg
├── apple-touch-icon.png
├── og-image.png
├── placeholder.svg
├── assets/
│   ├── index-C6f4b2XP.css
│   └── *.js
├── recursos/
└── lovable-uploads/
```

⚠️ **IMPORTANTE:** Os arquivos devem estar DIRETAMENTE em `/httpdocs/`, não dentro de uma subpasta `dist/`.

---

## 🔄 Configurar .htaccess para SPA (Single Page Application)

O React Router precisa de configuração especial. Crie um arquivo `.htaccess` em `/httpdocs/`:

### **No Plesk File Manager:**

1. Clique em **"Create File"** ou **"Criar Arquivo"**
2. Nome: `.htaccess`
3. Adicione o seguinte conteúdo:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /

  # Não reescrever arquivos ou diretórios existentes
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteCond %{REQUEST_FILENAME} !-l

  # Redirecionar todas as requisições para index.html
  RewriteRule ^.*$ /index.html [L,QSA]
</IfModule>

# Habilitar compressão GZIP
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript application/json
</IfModule>

# Cache para recursos estáticos
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/jpg "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/svg+xml "access plus 1 year"
  ExpiresByType image/webp "access plus 1 year"
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
  ExpiresByType application/json "access plus 1 week"
  ExpiresByType text/html "access plus 1 hour"
</IfModule>

# Headers de segurança
<IfModule mod_headers.c>
  Header set X-Frame-Options "SAMEORIGIN"
  Header set X-Content-Type-Options "nosniff"
  Header set X-XSS-Protection "1; mode=block"
  Header set Referrer-Policy "strict-origin-when-cross-origin"
</IfModule>

# Forçar HTTPS
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteCond %{HTTPS} off
  RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
</IfModule>
```

---

## 🔒 Configurar SSL/HTTPS no Plesk

### **Opção 1: Let's Encrypt (Gratuito) - Recomendado**

1. No Plesk, vá em **"SSL/TLS Certificates"**
2. Clique em **"Install a free basic certificate"** ou **"Let's Encrypt"**
3. Marque: **"Include a 'www' subdomain..."**
4. Clique em **"Get it free"** ou **"Install"**
5. Aguarde a instalação (1-2 minutos)

### **Opção 2: Certificado Próprio**

1. Upload do certificado .crt
2. Upload da chave privada .key
3. Upload da cadeia de certificados (se houver)

### **Após instalar SSL:**

1. Vá em **"Hosting Settings"**
2. Marque: ✅ **"Permanent SEO-safe 301 redirect from HTTP to HTTPS"**
3. Salve as alterações

---

## ✅ Checklist Pós-Deploy

Execute estes testes após o upload:

- [ ] Site carrega: https://acasadaalquimia.com.br
- [ ] HTTPS funciona (cadeado verde no navegador)
- [ ] Redirecionamento HTTP → HTTPS funciona
- [ ] www redireciona para domínio principal
- [ ] Todas as seções funcionam (navegação interna)
- [ ] Imagens carregam corretamente
- [ ] Formulário de contato funciona
- [ ] Robots.txt acessível: https://acasadaalquimia.com.br/robots.txt
- [ ] Sitemap acessível: https://acasadaalquimia.com.br/sitemap.xml
- [ ] Testar em mobile
- [ ] Testar em diferentes navegadores

---

## 🔧 Comandos Úteis

### Criar arquivo ZIP da pasta dist (se necessário)

```bash
cd "/home/achilles/Área de trabalho/casadaalquimia/casa-da-alquimia"
zip -r casa-da-alquimia-dist.zip dist/*
```

### Recriar build (se fizer alterações)

```bash
cd "/home/achilles/Área de trabalho/casadaalquimia/casa-da-alquimia"
npm run build
```

### Verificar tamanho da pasta dist

```bash
du -sh dist/
```

---

## 🐛 Troubleshooting

### Problema: Página em branco

**Solução:**

- Verificar se `.htaccess` está configurado
- Verificar console do navegador (F12) para erros
- Confirmar que arquivos estão em `/httpdocs/` e não em `/httpdocs/dist/`

### Problema: 404 ao navegar

**Solução:**

- Confirmar que `.htaccess` existe e mod_rewrite está ativo
- Verificar permissões dos arquivos (644 para arquivos, 755 para pastas)

### Problema: Imagens não carregam

**Solução:**

- Verificar se pastas `recursos/` e `lovable-uploads/` foram enviadas
- Confirmar caminhos no código (devem ser absolutos: `/recursos/...`)

### Problema: CSS/JS não carrega

**Solução:**

- Verificar pasta `assets/` foi enviada completamente
- Limpar cache do navegador (Ctrl+Shift+R)
- Verificar console do navegador para erros 404

### Problema: SSL não funciona

**Solução:**

- Reinstalar Let's Encrypt no Plesk
- Aguardar propagação DNS (até 48h)
- Verificar se domínio aponta para o servidor correto

---

## 📊 Monitoramento

### Google Search Console

1. Adicionar propriedade: https://acasadaalquimia.com.br
2. Verificar via DNS ou HTML
3. Enviar sitemap: https://acasadaalquimia.com.br/sitemap.xml

### Google Analytics (Opcional)

Adicionar código de tracking no Plesk:

1. **"Websites & Domains"** → **"Web Statistics"**
2. Ou adicionar manualmente no `index.html` (requer rebuild)

---

## 🔄 Atualizações Futuras

Quando fizer alterações no código:

```bash
# 1. Fazer alterações no código
# 2. Testar localmente
npm run dev

# 3. Criar novo build
npm run build

# 4. Fazer upload da pasta dist/ novamente no Plesk
# (sobrescrever arquivos existentes)
```

---

## 📞 Suporte Plesk

- Documentação: https://docs.plesk.com/
- Suporte do seu provedor de hospedagem
- Email: casadaalquimia@gmail.com

---

✅ **Sua pasta dist/ está pronta para upload no Plesk!**

**Próximo passo:** Fazer upload dos arquivos seguindo as instruções acima.
