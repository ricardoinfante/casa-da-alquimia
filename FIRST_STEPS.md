# 🎬 Passo-a-Passo: Seu Primeiro Álbum e Produto

## 🎯 Objetivo Final

Ao final deste guia, você terá:

- ✅ Uma Biblioteca com 1 álbum contendo imagens/vídeos
- ✅ Uma Loja com pelo menos 1 produto disponível

⏱️ **Tempo estimado: 15-20 minutos**

---

## 📋 Pré-requisitos

- ✅ Projeto rodando (`npm run dev`)
- ✅ Conta Supabase criada
- ✅ 2-3 imagens/vídeos salvos no seu computador
- ✅ Acesso ao Supabase Dashboard

---

## PARTE 1: Setup Banco de Dados (5 minutos)

### Passo 1.1: Abrir Supabase Dashboard

```
1. Ir para: https://supabase.com/dashboard
2. Fazer login com sua conta
3. Selecionar seu projeto
4. Ir para "SQL Editor"
```

### Passo 1.2: Criar as Tabelas

```
1. Clicar em "New Query"
2. Copiar TODO o conteúdo de:
   /supabase/migrations/library_and_shop.sql
3. Colar no editor
4. Clicar em "RUN"
5. Esperar a mensagem de sucesso
```

✅ **Pronto! Seu banco de dados está criado!**

---

## PARTE 2: Acessar AdminPanel (2 minutos)

Atualmente, o AdminPanel não está em uma rota especial. Você pode:

**Opção A: Usar o Console do Navegador** (Recomendado para começar)

```javascript
// F12 → Console → Colar:

// Importar serviços
import {
  mediaLibraryService,
  shopService,
} from "./src/integrations/supabase/services.ts";

// Pronto para usar!
```

**Opção B: Criar Rota para AdminPanel** (Futuro)

```typescript
// Em App.tsx, adicionar:
const AdminPanel = lazy(() => import("./components/AdminPanel"));

// E depois:
<Route path="/admin" element={<AdminPanel />} />;
```

---

## PARTE 3: Criar Seu Primeiro Álbum (3 minutos)

### Via Console do Navegador:

```javascript
// Abrir: F12 → Console

// 1. Criar o álbum
const album = await mediaLibraryService.createAlbum({
  name: "Meu Primeiro Álbum",
  description: "Fotos e vídeos especiais",
  coverImage: "https://via.placeholder.com/400x300?text=Meu+Album",
});

console.log("Álbum criado!", album);

// Copiar o ID que apareceu no console
// Exemplo: "12345678-1234-1234-1234-123456789012"
```

### ✅ Sucesso!

Se viu algo como:

```json
{
  "id": "abc123...",
  "name": "Meu Primeiro Álbum",
  "description": "Fotos e vídeos especiais",
  ...
}
```

**Parabéns! Seu álbum foi criado! 🎉**

---

## PARTE 4: Adicionar Imagens ao Álbum (5 minutos)

### 4.1: Preparar Imagens

```
1. Selecionar 2-3 imagens no seu computador
2. Deixar prontas para upload
```

### 4.2: Fazer Upload via Console

```javascript
// F12 → Console

// 1. Preparar arquivo (usar arquivo do seu computador)
// Para teste, vamos usar uma URL pública:

const albumId = "abc123..."; // Copiar do passo anterior

// 2. Criar blob da imagem (simular arquivo)
const imageUrl = "https://via.placeholder.com/600x400?text=Foto+1";
const response = await fetch(imageUrl);
const blob = await response.blob();
const file = new File([blob], "foto-1.jpg", { type: "image/jpeg" });

// 3. Fazer upload
const media = await mediaLibraryService.uploadMedia(file, albumId, "image");

console.log("Imagem enviada!", media);
```

### ✅ Sucesso!

Você verá algo como:

```json
{
  "id": "xyz789...",
  "album_id": "abc123...",
  "title": "foto-1",
  "type": "image",
  "url": "https://storage.supabase.co/..."
}
```

**Imagem adicionada! 📸**

---

## PARTE 5: Visualizar Biblioteca (2 minutos)

### 5.1: Acessar o Site

```
1. Ir para: http://localhost:5173
2. Clicar em "Biblioteca" no menu
3. Você deve ver seu álbum!
4. Clicar no álbum
5. Você verá sua imagem!
6. Clicar na imagem para visualizar em tela cheia
```

### ✅ Sucesso! Biblioteca Funcionando! 📚

---

## PARTE 6: Criar Seu Primeiro Produto (3 minutos)

### Via Console:

```javascript
// F12 → Console

const product = await shopService.createProduct({
  name: "Meu Primeiro Produto",
  description: "Um produto incrível",
  price: 99.9,
  category: "rituais",
  stock: 10,
  image: "https://via.placeholder.com/400x400?text=Produto",
  details: "Detalhes completos do seu primeiro produto!",
});

console.log("Produto criado!", product);
```

### ✅ Sucesso!

Você verá:

```json
{
  "id": "prod123...",
  "name": "Meu Primeiro Produto",
  "price": 99.90,
  ...
}
```

**Seu primeiro produto foi criado! 🛍️**

---

## PARTE 7: Visualizar Loja (2 minutos)

### 7.1: Acessar Loja Virtual

```
1. Ir para: http://localhost:5173
2. Clicar em "Loja Virtual" no menu
3. Você verá seu produto!
4. Clicar no card do produto
5. Ver detalhes e imagens
6. Clicar "Adicionar ao Carrinho"
7. Ver carrinho aparecer no canto inferior direito
```

### ✅ Sucesso! Loja Funcionando! 🛍️

---

## 🎉 Parabéns!

Você completou todos os passos! Você agora tem:

✅ Biblioteca de Mídia com álbuns  
✅ Imagens/Vídeos upload no Supabase  
✅ Loja Virtual com produtos  
✅ Carrinho de compras funcional

---

## 📊 Próximos Passos

### Curto Prazo (Esta semana)

1. Criar mais 3-4 álbuns
2. Adicionar 10-15 imagens
3. Criar 8-10 produtos
4. Testar tudo no mobile

### Médio Prazo (Este mês)

1. Integrar Stripe/Mercado Pago
2. Testar processo de compra
3. Configurar emails de confirmação
4. Publicar site

### Longo Prazo

1. Coletar avaliações de clientes
2. Adicionar mais produtos
3. Criar campanhas de marketing
4. Expandir biblioteca

---

## 🐛 Troubleshooting Comum

### "Erro ao criar álbum"

```
✓ Verificar se migrations foram executadas
✓ Verificar credenciais do Supabase
✓ Testar no Supabase Dashboard direto
```

### "Imagem não aparece"

```
✓ Usar URL completa (https://...)
✓ Aguardar alguns segundos para carregar
✓ Verificar no Supabase Storage se arquivo foi salvo
```

### "Produto não aparece na loja"

```
✓ Limpar cache do navegador
✓ Atualizar página (F5)
✓ Verificar se stock > 0
```

### "Carrinho não mostra preço"

```
✓ Verificar se produto tem preço
✓ Isso é normal - integração de pagamento vem depois
```

---

## 📱 Teste no Celular

```
1. Abrir seu projeto no VS Code
2. Terminal: npm run dev
3. Copiar URL (ex: http://192.168.1.100:5173)
4. Abrir no celular na mesma rede
5. Testar Biblioteca e Loja
```

---

## 💡 Dicas Extras

### Para Adicionar Muitas Imagens Rápido

```javascript
// Criar loop para adicionar múltiplas
for (let i = 1; i <= 5; i++) {
  const file = new File([...], `foto-${i}.jpg`, { type: "image/jpeg" });
  await mediaLibraryService.uploadMedia(file, albumId, "image");
  console.log(`Foto ${i} adicionada!`);
}
```

### Para Adicionar Múltiplos Produtos

```javascript
const produtos = [
  { name: "Produto 1", price: 49.90, ... },
  { name: "Produto 2", price: 79.90, ... },
  { name: "Produto 3", price: 99.90, ... },
];

for (const prod of produtos) {
  await shopService.createProduct(prod);
}
```

---

## ✅ Checklist Final

- ✅ Migrations executadas
- ✅ Primeiro álbum criado
- ✅ Imagens adicionadas
- ✅ Biblioteca funcionando
- ✅ Primeiro produto criado
- ✅ Loja funcionando
- ✅ Carrinho testado
- ✅ Tudo visualizado no mobile

---

## 🎓 Próximo: Integração de Pagamento

Quando estiver pronto, veja:

- Documentação Stripe: https://stripe.com/docs
- Documentação Mercado Pago: https://www.mercadopago.com.br/developers

---

## 📞 Precisa de Ajuda?

1. Verifique os README.md criados
2. Consulte documentação do Supabase
3. Teste direto no Supabase Dashboard (SQL Editor)
4. Verifique console do navegador (F12)

---

## 🚀 Parabéns de Novo!

Seu site Casa da Alquimia está evoluindo! 🌟

**Divirta-se populando a Biblioteca e Loja! 🎉**
