# 🎨 Guia de Customização - Biblioteca e Loja

## 🎯 Personalize Tudo!

Este guia mostra como customizar cores, layout, textos e mais.

---

## 🌈 Alterar Cores

### Método 1: Tailwind Config

```typescript
// tailwind.config.ts

export default {
  theme: {
    extend: {
      colors: {
        // Cores customizadas
        primary: {
          50: "#f0f9ff",
          500: "#0284c7", // Altere aqui
          900: "#0c2d6b",
        },
        secondary: {
          500: "#8b5cf6", // Roxo
          // etc...
        },
      },
    },
  },
};
```

### Método 2: CSS Variables

```css
/* Em index.css */
:root {
  --primary: #3b82f6; /* Azul */
  --secondary: #8b5cf6; /* Roxo */
  --success: #10b981; /* Verde */
}

@media (prefers-color-scheme: dark) {
  :root {
    --primary: #60a5fa; /* Azul claro */
  }
}
```

---

## ✏️ Alterar Textos

### Na Biblioteca

```typescript
// Library.tsx, linha ~90

const albums: Album[] = [
  {
    id: "eventos-2025",
    name: "Seus Eventos", // ← ALTERE AQUI
    description: "Sua descrição", // ← E AQUI
    coverImage: "https://...",
    // ...
  },
];
```

### Na Loja

```typescript
// Shop.tsx, linha ~70

const categories = [
  { id: "todos", name: "Todos os Produtos" }, // ← ALTERE
  { id: "rituais", name: "Kits de Rituais" }, // ← ALTERE
  { id: "cristais", name: "Cristais" }, // ← ALTERE
  // ...
];
```

---

## 🏷️ Alterar Títulos

### No Navbar

```typescript
// Navbar.tsx, linha ~40

const menuItems = [
  { name: "Biblioteca", href: "#library", id: "library" },
  { name: "Loja Virtual", href: "#shop", id: "shop" },
  // Altere os nomes aqui
];
```

### Na Página

```typescript
// Library.tsx, linha ~160

<h2 className="text-4xl md:text-5xl font-bold mb-6">
  Biblioteca de Mídia {/* ← ALTERE AQUI */}
</h2>
```

---

## 📐 Layout e Grid

### Mudar Número de Colunas

```typescript
// Padrão: grid-cols-1 md:grid-cols-2 lg:grid-cols-3

// Para 4 colunas em desktop:
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
  {/* ... */}
</div>

// Para 2 colunas em desktop:
<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  {/* ... */}
</div>

// Para 1 coluna sempre:
<div className="grid grid-cols-1 gap-6">
  {/* ... */}
</div>
```

### Ajustar Espaçamento

```typescript
// Padrão: gap-6

// Maior espaço:
gap - 8; // Mais afastado
gap - 10; // Ainda mais

// Menor espaço:
gap - 4; // Mais próximo
gap - 2; // Bem próximo
```

---

## 🖼️ Alterar Imagens

### URL de Placeholder

```typescript
// Antes:
coverImage: "https://via.placeholder.com/400x300?text=Eventos";

// Depois (sua imagem):
coverImage: "https://storage.supabase.co/sua-imagem.jpg";
```

### Tamanho de Imagem

```typescript
// Em Library.tsx
<div className="relative overflow-hidden aspect-video bg-foreground/5">
  {/* aspect-video = 16:9 */}
  {/* aspect-square = 1:1 */}
  {/* aspect-auto = natural */}
</div>
```

---

## 🎭 Dark Mode

### Forçar Light Mode

```typescript
// No componente
<div className="light">{/* Sempre claro */}</div>
```

### Forçar Dark Mode

```typescript
// No componente
<div className="dark">{/* Sempre escuro */}</div>
```

---

## 🔤 Fontes

### Alterar Fonte Padrão

```typescript
// tailwind.config.ts
export default {
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"], // Padrão
        serif: ["Playfair Display", "serif"],
        mono: ["Fira Code", "monospace"],
      },
    },
  },
};
```

### No Componente

```typescript
// Padrão: font-sans
// Serif: font-serif
// Mono: font-mono
// Bold: font-bold (700)
// Light: font-light (300)
```

---

## 📏 Tamanhos

### Botões

```typescript
// Padrão: size="md"
// Pequeno: size="sm"
// Grande: size="lg"
// Extra grande: size="xl"

<Button size="lg">Clique aqui</Button>
```

### Texto

```typescript
// Titulos
text-xl    // Pequeno
text-3xl   // Médio
text-5xl   // Grande

// Exemplo:
<h2 className="text-4xl font-bold">Título</h2>
```

---

## 🎯 CTA (Calls-to-Action)

### Alterar Botão

```typescript
// Em Library.tsx
<a href="https://wa.me/5562996538902" className="px-6 py-2.5 bg-primary ...">
  Enviar Fotos {/* ← ALTERE */}
</a>
```

### Alterar Link WhatsApp

```typescript
// Altere o número:
https://wa.me/5562996538902

// Para seu número:
https://wa.me/SEU_NUMERO

// Exemplo:
https://wa.me/5511999999999?text=Olá!%20Gostaria%20de%20...
```

---

## 💰 Preços

### Alterar Preço de Produto

```typescript
// Shop.tsx, linha ~50

{
  id: 'ritual-1',
  name: 'Kit Ritual',
  price: 89.90,  // ← ALTERE AQUI
  // ...
}
```

### Formato de Moeda

```typescript
// Padrão: R$ 89,90
// Para: $89.90

// No componente:
<span className="text-2xl font-bold">${product.price.toFixed(2)}</span>
```

---

## 📱 Responsividade

### Mostrar/Esconder em Telas

```typescript
// Esconder em mobile, mostrar em desktop:
<div className="hidden lg:block">
  Desktop only
</div>

// Mostrar em mobile, esconder em desktop:
<div className="lg:hidden">
  Mobile only
</div>

// Mostrar em tablet e acima:
<div className="hidden md:block">
  Tablet+
</div>
```

---

## 🎬 Animações

### Adicionar Animação

```typescript
// Hover effect:
className = "hover:scale-110 transition-transform duration-300";

// Fade in:
className = "animate-in";

// Pulse:
className = "animate-pulse";

// Spinner:
className = "animate-spin";
```

### Ajustar Velocidade

```typescript
// Padrão: duration-300 (300ms)
// Rápido: duration-150
// Lento: duration-500
// Muito lento: duration-1000
```

---

## 🗺️ Estrutura da Página

### Ordem dos Componentes

```typescript
// Em pages/Index.tsx

<main>
  <Hero />
  <About />
  <Rituals />
  <Library /> {/* ← Sua posição */}
  <Shop /> {/* ← Sua posição */}
  <SocialMedia />
  <Testimonials />
  <Donate />
  <ContactForm />
</main>
```

### Mover Ordem

```typescript
// Para mostrar Loja antes de Biblioteca:
<Library />
<Shop />    // ← Troque a ordem

// Para:
<Shop />    // ← Aqui
<Library />
```

---

## 🔍 Busca e Filtros

### Adicionar Filtro por Data

```typescript
// Em Library.tsx, após álbuns:
const filteredAlbums = albums.filter((album) => {
  return new Date(album.createdAt) > new Date("2024-01-01");
});
```

### Adicionar Busca por Nome

```typescript
const [searchTerm, setSearchTerm] = useState("");

const filteredProducts = products.filter((p) =>
  p.name.toLowerCase().includes(searchTerm.toLowerCase())
);
```

---

## 📊 Dados Fictícios → Reais

### De Placeholder para Real

```typescript
// Antes:
image: "https://via.placeholder.com/400x400?text=Produto";

// Depois (Supabase):
image: "https://storage.supabase.co/projeto/produtos/produto-1.jpg";

// Ou (URL pública):
image: "https://sua-dominio.com/imagens/produto.jpg";
```

---

## 🔐 Segurança

### Validar Entrada

```typescript
// Antes de enviar para Supabase:
if (!product.name || product.name.trim() === "") {
  alert("Nome é obrigatório");
  return;
}

if (product.price <= 0) {
  alert("Preço deve ser maior que 0");
  return;
}
```

---

## ⚙️ Configurações Avançadas

### Integração de Pagamento

```typescript
// Quando integrar Stripe:
import { loadStripe } from "@stripe/js";

const stripe = await loadStripe("pk_test_...");
```

### Notificações

```typescript
// Usar toast para feedback:
import { useToast } from "@/hooks/use-toast";

const { toast } = useToast();

toast({
  title: "Sucesso!",
  description: "Produto adicionado ao carrinho",
});
```

---

## 🎓 Exemplos Práticos

### Exemplo 1: Alterar Cor de Botão

```typescript
// Antes:
<Button className="gap-2">Adicionar</Button>

// Depois (vermelho):
<Button className="gap-2 bg-red-500 hover:bg-red-600">
  Adicionar
</Button>
```

### Exemplo 2: Aumentar Tamanho de Fonte

```typescript
// Antes:
<h2 className="text-4xl font-bold">Título</h2>

// Depois:
<h2 className="text-6xl font-bold">Título</h2>
```

### Exemplo 3: Mais Espaço entre Itens

```typescript
// Antes:
<div className="grid gap-6">

// Depois:
<div className="grid gap-12">
```

---

## 🚀 Dicas de Customização

### Testando Mudanças

1. Fazer alteração
2. Salvar arquivo (Ctrl+S)
3. Navegador atualiza automaticamente (HMR)
4. Ver resultado em tempo real

### Voltando Atrás

- Ctrl+Z para desfazer
- Git para versionar mudanças
- Backup dos originais

### Cores Úteis

```
Azul:     #3B82F6
Roxo:     #8B5CF6
Verde:    #10B981
Laranja:  #F59E0B
Vermelho: #EF4444
Rosa:     #EC4899
```

---

## 📝 Checklist de Customização

- [ ] Cores ajustadas
- [ ] Textos personalizados
- [ ] Layout otimizado
- [ ] Imagens reais adicionadas
- [ ] Preços atualizados
- [ ] Responsividade testada
- [ ] Dark mode testado
- [ ] Mobile testado
- [ ] Build sem erros
- [ ] Tudo pronto!

---

## 🆘 Problemas Comuns

| Problema            | Solução                           |
| ------------------- | --------------------------------- |
| Mudança não aparece | Limpar cache (Ctrl+Shift+Delete)  |
| Cor estranha        | Verificar nome da classe Tailwind |
| Layout quebrado     | Verificar closing tags            |
| Erro no console     | F12 para ver mensagem             |

---

## 🎉 Próximas Personalizações

1. ✨ Adicionar seu logo
2. 🎨 Mudar palheta de cores
3. 📱 Otimizar para mobile
4. 🔤 Personalizar textos
5. 🖼️ Adicionar suas imagens
6. 💰 Atualizar preços
7. 🚀 Deploy em produção

---

**Divirta-se personalizando! 🎨**
