# 🎯 Guia Rápido - Biblioteca e Loja Virtual

## ✅ O Que Foi Criado

### 1. **Nova Aba: Biblioteca**

- Local: Entre "Rituais" e "Depoimentos" no menu
- Componente: `src/components/Library.tsx`
- Funcionalidade: Galeria de imagens/vídeos organizados em álbuns

### 2. **Nova Aba: Loja Virtual**

- Local: Entre "Biblioteca" e "Depoimentos" no menu
- Componente: `src/components/Shop.tsx`
- Funcionalidade: E-commerce com carrinho, produtos e pedidos

---

## 🎨 Destaques

### Biblioteca

- ✨ 4 álbuns pré-configurados (Eventos, Trabalhos, Passeios, Meditações)
- 📸 Suporte para imagens e vídeos
- 🖼️ Modal para visualização em tela cheia
- ⬆️ Botão para adicionar nova mídia
- 🎯 CTA para usuários compartilharem suas fotos

### Loja Virtual

- 🛍️ Catálogo com 4 tipos de produtos
- 🔍 Filtro por categoria
- ⭐ Sistema de avaliações (ratings)
- 🛒 Carrinho flutuante no canto inferior direito
- 📦 Detalhes de produto em modal
- 💳 Preparado para integração com Stripe/Mercado Pago

---

## 📊 Dados Preparados

### Álbuns da Biblioteca (Exemplo)

```
✓ Eventos 2025
✓ Trabalhos Realizados
✓ Passeios e Retiros
✓ Meditações
```

### Produtos da Loja (Exemplo)

```
✓ Kits de Rituais (R$ 89,90)
✓ Cristais (R$ 45,00)
✓ Livros (R$ 65,00)
✓ Aromaterapia (R$ 35,90)
```

---

## 🔗 Navegação

### Menu Principal (Navbar.tsx)

Já atualizado com:

- "Biblioteca" → `#library`
- "Loja Virtual" → `#shop`

### Página Principal (Index.tsx)

Ambos componentes já integrados na ordem:

1. Hero
2. About
3. Rituals
4. **Library** ← NOVO
5. **Shop** ← NOVO
6. SocialMedia
7. Testimonials
8. Donate
9. ContactForm

---

## 🗄️ Estrutura de Dados

### Tabelas Supabase Criadas

1. `library_albums` - Álbuns
2. `library_media` - Imagens/Vídeos
3. `shop_products` - Produtos
4. `shop_product_images` - Imagens dos produtos
5. `shop_orders` - Pedidos
6. `shop_reviews` - Avaliações

### Buckets de Storage

1. `library-media` - Para fotos/vídeos da biblioteca
2. `shop-images` - Para imagens dos produtos

---

## 🚀 Como Começar

### 1. Setup Banco de Dados

```bash
# Ir para Supabase Dashboard
# SQL Editor → Cole conteúdo de supabase/migrations/library_and_shop.sql
# Execute
```

### 2. Adicionar Primeiro Álbum (via Console ou Admin)

```typescript
// No console do navegador ou em uma página de admin
const album = await mediaLibraryService.createAlbum({
  name: "Eventos Janeiro 2025",
  description: "Fotos do retiro de janeiro",
  coverImage: "https://sua-imagem.jpg",
});
```

### 3. Upload de Mídia

```typescript
// Selecionar arquivo
const file = new File([dados], "photo.jpg", { type: "image/jpeg" });
// Fazer upload
await mediaLibraryService.uploadMedia(file, albumId, "image");
```

### 4. Adicionar Produtos

```typescript
const product = await shopService.createProduct({
  name: "Novo Produto",
  description: "Descrição",
  price: 99.9,
  category: "rituais",
  stock: 10,
  image: "https://imagem.jpg",
  details: "Detalhes do produto",
});
```

---

## 📱 Responsividade

### Telas Suportadas

- ✅ Mobile (1 coluna)
- ✅ Tablet (2 colunas)
- ✅ Desktop (3-4 colunas)

---

## 🎯 Próximos Passos Recomendados

1. **Banco de Dados**

   - [ ] Executar migrations do Supabase
   - [ ] Criar primeiro álbum
   - [ ] Fazer upload de imagens reais

2. **Customização**

   - [ ] Trocar dados fictícios (via.placeholder.com) por reais
   - [ ] Ajustar preços dos produtos
   - [ ] Adicionar mais álbuns

3. **Pagamento**

   - [ ] Configurar Stripe ou Mercado Pago
   - [ ] Integrar webhook de pagamento
   - [ ] Testar checkout

4. **Admin Panel** (Futuro)
   - [ ] Criar página de admin para gerenciar biblioteca
   - [ ] Criar painel para gerenciar produtos
   - [ ] Criar painel para visualizar pedidos

---

## 🔧 Troubleshooting

### As abas não aparecem?

- Verifique se `Library.tsx` e `Shop.tsx` estão em `src/components/`
- Verifique imports em `Index.tsx`
- Limpe cache do navegador (Ctrl+Shift+Delete)

### Imagens com placeholder?

- É normal! Estamos usando `via.placeholder.com` como exemplo
- Substitua pelas URLs reais do Supabase Storage

### Carrinho não funciona?

- É um preview local
- Integração real com Stripe/Mercado Pago vem depois
- Por enquanto, mostra estrutura e fluxo

---

## 📞 Contato

Para dúvidas:

- Chat do GitHub Copilot
- Documentação em `LIBRARY_SHOP_SETUP.md`

---

## 📚 Arquivos Criados/Modificados

### Criados:

- ✨ `src/components/Library.tsx` - Componente da biblioteca
- ✨ `src/components/Shop.tsx` - Componente da loja
- ✨ `src/integrations/supabase/services.ts` - Serviços de API
- ✨ `supabase/migrations/library_and_shop.sql` - Schema do banco
- ✨ `LIBRARY_SHOP_SETUP.md` - Documentação técnica
- ✨ `LIBRARY_SHOP_QUICK_START.md` - Este arquivo

### Modificados:

- 📝 `src/components/Navbar.tsx` - Adicionados links das abas
- 📝 `src/pages/Index.tsx` - Adicionados componentes novos

---

## ✨ Resultado Final

Você agora tem:

- 📚 Uma biblioteca de mídia totalmente funcional
- 🛍️ Uma loja virtual com carrinho
- 🗄️ Schema de banco de dados preparado
- 📱 Design totalmente responsivo
- 🔐 Segurança com RLS policies
- 📖 Documentação completa

**Tudo pronto para ser populado com seus dados reais! 🎉**
