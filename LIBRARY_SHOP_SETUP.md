# 📚 Biblioteca de Mídia e Loja Virtual - Guia de Configuração

## Novos Recursos

Este documento descreve a implementação das duas novas seções adicionadas ao site:

### 1. **Biblioteca** (`/src/components/Library.tsx`)

Uma galeria organizada em álbuns para imagens e vídeos de:

- Eventos e celebrações
- Trabalhos e projetos realizados
- Passeios e retiros espirituais
- Meditações e práticas contemplativas

### 2. **Loja Virtual** (`/src/components/Shop.tsx`)

Uma loja de e-commerce com:

- Catálogo de produtos (Kits de Rituais, Cristais, Livros, Aromaterapia)
- Carrinho de compras
- Sistema de avaliações (ratings)
- Filtro por categoria

---

## 🔧 Configuração do Supabase

### 1. Executar Migrações

Execute o arquivo SQL para criar as tabelas necessárias:

```bash
# Via Supabase Dashboard:
# 1. Vá para SQL Editor
# 2. Cole o conteúdo de: supabase/migrations/library_and_shop.sql
# 3. Execute

# Ou via CLI:
supabase migration up
```

### 2. Estrutura das Tabelas

#### **library_albums**

```
- id (UUID, PK)
- name (TEXT)
- description (TEXT)
- cover_image (TEXT)
- item_count (INTEGER)
- created_at, updated_at (TIMESTAMPS)
```

#### **library_media**

```
- id (UUID, PK)
- album_id (UUID, FK)
- title (TEXT)
- type (TEXT: 'image' | 'video')
- url (TEXT) - URL pública
- thumbnail (TEXT)
- file_path (TEXT) - Caminho no storage
- date (TIMESTAMP)
- created_at, updated_at (TIMESTAMPS)
```

#### **shop_products**

```
- id (UUID, PK)
- name (TEXT)
- description (TEXT)
- details (TEXT)
- price (DECIMAL)
- category (TEXT: 'rituais' | 'cristais' | 'livros' | 'aromaterapia')
- stock (INTEGER)
- image (TEXT)
- rating (DECIMAL: 0-5)
- reviews (INTEGER)
- created_at, updated_at (TIMESTAMPS)
```

#### **shop_orders**

```
- id (UUID, PK)
- user_id (UUID, FK) - opcional
- customer_name (TEXT)
- customer_email (TEXT)
- items (JSONB)
- total (DECIMAL)
- status (TEXT: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled')
- payment_status (TEXT: 'pending' | 'paid' | 'failed' | 'refunded')
- stripe_payment_id (TEXT)
- shipping_address (JSONB)
- created_at, updated_at (TIMESTAMPS)
```

#### **shop_reviews**

```
- id (UUID, PK)
- product_id (UUID, FK)
- user_email (TEXT)
- rating (INTEGER: 1-5)
- comment (TEXT)
- created_at (TIMESTAMP)
```

---

## 📁 Estrutura de Storage

### Buckets Criados

1. **library-media** (público)

   ```
   library-media/
   ├── album-id-1/
   │   ├── image-1.jpg
   │   ├── video-1.mp4
   │   └── ...
   └── album-id-2/
       └── ...
   ```

2. **shop-images** (público)
   ```
   shop-images/
   └── products/
       ├── product-id-1/
       │   ├── image-1.jpg
       │   ├── image-2.jpg
       │   └── ...
       └── ...
   ```

---

## 🚀 Como Usar

### Biblioteca

#### Adicionar Álbum

```typescript
import { mediaLibraryService } from "@/integrations/supabase/services";

const newAlbum = await mediaLibraryService.createAlbum({
  name: "Retiro de Primavera 2025",
  description: "Fotos e vídeos do retiro de primavera",
  coverImage: "https://...",
});
```

#### Upload de Mídia

```typescript
const file = new File([...], 'photo.jpg', { type: 'image/jpeg' });
const media = await mediaLibraryService.uploadMedia(
  file,
  'album-id',
  'image'
);
```

#### Buscar Álbum com Itens

```typescript
const album = await mediaLibraryService.getAlbumWithItems("album-id");
```

### Loja Virtual

#### Criar Produto

```typescript
import { shopService } from "@/integrations/supabase/services";

const product = await shopService.createProduct({
  name: "Kit Ritual Purificação",
  description: "Conjunto especial para rituais",
  price: 89.9,
  category: "rituais",
  stock: 20,
  image: "https://...",
  details: "Inclui velas, ervas sagradas...",
});
```

#### Buscar Produtos

```typescript
// Todos os produtos
const products = await shopService.getProducts();

// Por categoria
const ritualsOnly = await shopService.getProducts("rituais");
```

#### Criar Pedido

```typescript
import { orderService } from "@/integrations/supabase/services";

const order = await orderService.createOrder({
  items: [{ product_id: "prod-1", quantity: 2, price: 89.9 }],
  total: 179.8,
  customer_name: "João Silva",
  customer_email: "joao@example.com",
});
```

---

## 💳 Integração com Pagamento (Stripe/Mercado Pago)

Os campos `stripe_payment_id` na tabela `shop_orders` estão preparados para integração.

### Próximos Passos:

1. Configurar variáveis de ambiente (Stripe/Mercado Pago keys)
2. Criar webhook para atualizar status dos pedidos
3. Implementar checkout com redirecionamento para gateway de pagamento
4. Atualizar `Shop.tsx` com integração real

---

## 🔐 Segurança (RLS - Row Level Security)

Todas as tabelas possuem políticas RLS configuradas:

- **Leitura pública**: Qualquer um pode visualizar álbuns, mídia e produtos
- **Inserção/Edição/Deleção**: Apenas usuários autenticados
- **Pedidos**: Usuários podem ver apenas seus próprios pedidos

---

## 📦 Importações Necessárias

Os componentes já importam tudo que precisam:

```typescript
// Library.tsx
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
// ... mais imports

// Shop.tsx
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// ... mais imports
```

---

## 🎨 Personalizações

### Alterar Produtos Padrão

Edite os arrays em `Library.tsx` (linha ~20) e `Shop.tsx` (linha ~30).

### Adicionar Categorias

1. Atualize o enum em `shop_products.category`
2. Adicione nova categoria no array `categories` em `Shop.tsx`
3. Atualize os dados de exemplo

### Modificar Layout

- Biblioteca: Grid responsivo (1/2/3 colunas)
- Loja: Grid 1/2/3 colunas com card moderno
- Ambos possuem dark mode automático via Tailwind

---

## 📱 Responsividade

Ambos componentes são totalmente responsivos:

- **Mobile**: 1 coluna
- **Tablet (md)**: 2 colunas
- **Desktop (lg)**: 3-4 colunas

---

## 🧪 Testes Locais

Para testar sem dados reais, os componentes vêm com dados fictícios usando `via.placeholder.com`.

Substitua por seus dados quando integrar com Supabase:

```typescript
// Antes (placeholder)
coverImage: "https://via.placeholder.com/400x300?text=Eventos+2025";

// Depois (URL real)
coverImage: "https://storage.supabase.co/...";
```

---

## 📝 Próximas Melhorias

- [ ] Upload por drag-and-drop
- [ ] Editor de imagens (crop, filtros)
- [ ] Slider de imagens na galeria
- [ ] Sistema de comentários na biblioteca
- [ ] Recomendações de produtos
- [ ] Wishlist
- [ ] Avaliações e reviews
- [ ] Integração com redes sociais (compartilhar álbum)

---

## 📞 Suporte

Para dúvidas sobre configuração do Supabase:

- [Docs Supabase](https://supabase.com/docs)
- [Supabase Storage](https://supabase.com/docs/guides/storage)
- [RLS Policies](https://supabase.com/docs/guides/auth/row-level-security)
