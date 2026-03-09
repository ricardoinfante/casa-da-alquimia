import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight, Loader2, Minus, Plus, ShoppingCart, Star } from 'lucide-react';
import { useState } from 'react';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  images: string[];
  rating: number;
  reviews: number;
  category: 'rituais' | 'cristais' | 'livros' | 'aromaterapia';
  stock: number;
  details: string;
}

interface CartItem extends Product {
  quantity: number;
}

const Shop = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Checkout / Pagamentos (simulação)
  const [showCheckoutDialog, setShowCheckoutDialog] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'pix' | 'card'>('pix');
  const [processingPayment, setProcessingPayment] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [pixCode, setPixCode] = useState<string | null>(null);
  const [cardForm, setCardForm] = useState({ name: '', number: '', expiry: '', cvc: '' });

  // Produtos com imagens reais
  const products: Product[] = [
    /* {
      id: 'ritual-1',
      name: 'Kit Ritual Completo - Purificação',
      description: 'Conjunto especial para rituais de purificação espiritual',
      price: 89.90,
      image: '/img/serviidodaime.jpeg',
      images: [
        '/img/serviidodaime.jpeg',
        '/img/velamesa.jpeg',
      ],
      rating: 4.8,
      reviews: 24,
      category: 'rituais',
      stock: 15,
      details: 'Inclui vales sagradas e incensos aromáticos para rituais de purificação completos.',
    }, */
    /* {
      id: 'cristal-1',
      name: 'Cristal Sagrado - Energia e Cura',
      description: 'Pedra natural para amor e cura emocional',
      price: 45.00,
      image: '/img/alquimia.jpeg',
      images: [
        '/img/alquimia.jpeg',
        '/img/meditação.jpeg',
      ],
      rating: 4.9,
      reviews: 156,
      category: 'cristais',
      stock: 30,
      details: 'Cristal de alta qualidade, ideal para meditação e cura energética profunda.',
    }, */
    /* {
      id: 'livro-1',
      name: 'Livro: Sabedoria da Alquimia',
      description: 'Guia prático para transformação pessoal e espiritual',
      price: 65.00,
      image: '/img/logo.png',
      images: [
        '/img/logo.png',
        '/img/logog.jpeg',
      ],
      rating: 4.7,
      reviews: 89,
      category: 'livros',
      stock: 20,
      details: 'Um compêndio essencial sobre práticas alquímicas e transformação pessoal completa.',
    }, */
    /* {
      id: 'aroma-1',
      name: 'Óleo Essencial - Lavanda Mística',
      description: 'Essência pura para relaxamento e meditação',
      price: 35.90,
      image: '/img/convite.jpeg',
      images: [
        '/img/convite.jpeg',
        '/img/turmanatrilha.jpeg',
      ],
      rating: 4.6,
      reviews: 112,
      category: 'aromaterapia',
      stock: 50,
      details: 'Óleo essencial 100% puro de lavanda, ideal para aromaterapia completa e relaxamento.',
    }, */
    {
      id: 'loja-colecao-1',
      name: 'Coleção Especial da Casa da Alquimia',
      description: 'Seleção exclusiva de produtos premium de alta qualidade',
      price: 129.90,
      image: '/img/loja-colecao/WhatsApp_Image_2025-12-15_at_21.58.46.jpeg',
      images: [
        '/img/loja-colecao/WhatsApp_Image_2025-12-15_at_21.58.46.jpeg',
        '/img/loja-colecao/WhatsApp_Image_2025-12-15_at_21.59.23.jpeg',
        '/img/loja-colecao/WhatsApp_Image_2025-12-15_at_21.59.24.jpeg',
      ],
      rating: 5.0,
      reviews: 8,
      category: 'rituais',
      stock: 25,
      details: 'Coleção premium com itens selecionados especialmente para experiências transformadoras.',
    },
    {
      id: 'camisa-1',
      name: 'Camiseta Casa da Alquimia - Estampa 1',
      description: 'Camiseta oficial da Casa da Alquimia — estampa 1',
      price: 80.00,
      image: '/img/loja-colecao/camisa1.jpeg',
      images: ['/img/loja-colecao/camisa1.jpeg'],
      rating: 4.5,
      reviews: 12,
      category: 'rituais',
      stock: 20,
      details: 'Camiseta 100% algodão, disponível em vários tamanhos.',
    },
    {
      id: 'camisa-2',
      name: 'Camiseta Casa da Alquimia - Estampa 2',
      description: 'Camiseta oficial da Casa da Alquimia — estampa 2',
      price: 80.00,
      image: '/img/loja-colecao/camisa2.jpeg',
      images: ['/img/loja-colecao/camisa2.jpeg'],
      rating: 4.6,
      reviews: 8,
      category: 'rituais',
      stock: 18,
      details: 'Camiseta 100% algodão, design exclusivo.',
    },
    {
      id: 'camisa-3',
      name: 'Camiseta Casa da Alquimia - Estampa 3',
      description: 'Camiseta oficial da Casa da Alquimia — estampa 3',
      price: 80.00,
      image: '/img/loja-colecao/camisa3.jpeg',
      images: ['/img/loja-colecao/camisa3.jpeg'],
      rating: 4.4,
      reviews: 6,
      category: 'rituais',
      stock: 22,
      details: 'Camiseta confortável e resistente, ideal para uso diário.',
    }, 
  ];

  const categories = [
    { id: 'todos', name: 'Todos os Produtos' },
    { id: 'rituais', name: 'Kits de Rituais' },
    { id: 'cristais', name: 'Cristais' },
    { id: 'livros', name: 'Livros' },
    { id: 'aromaterapia', name: 'Aromaterapia' },
  ];

  const filteredProducts =
    selectedCategory === 'todos'
      ? products
      : products.filter((p) => p.category === selectedCategory);

  const addToCart = (product: Product) => {
    const existingItem = cartItems.find((item) => item.id === product.id);

    if (existingItem) {
      setCartItems(
        cartItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId: string) => {
    setCartItems(cartItems.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      setCartItems(
        cartItems.map((item) =>
          item.id === productId ? { ...item, quantity } : item
        )
      );
    }
  };

  const cartTotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const openCheckout = () => {
    // preparar PIX code (simulado) e abrir modal
    const generated = `PIX:${Math.random().toString(36).slice(2, 10).toUpperCase()}-${Math.floor(
      Math.random() * 100000
    )}`;
    setPixCode(generated);
    setPaymentMethod('pix');
    setPaymentSuccess(false);
    setShowCheckoutDialog(true);
  };

  const simulatePixPayment = async () => {
    setProcessingPayment(true);
    await new Promise((r) => setTimeout(r, 1400));
    setProcessingPayment(false);
    setPaymentSuccess(true);
    // esvaziar carrinho (simulação de conclusão)
    setCartItems([]);
  };

  const simulateCardPayment = async () => {
    if (!cardForm.name || !cardForm.number || !cardForm.expiry || !cardForm.cvc) {
      alert('Preencha os dados do cartão (simulação).');
      return;
    }
    setProcessingPayment(true);
    await new Promise((r) => setTimeout(r, 1600));
    setProcessingPayment(false);
    setPaymentSuccess(true);
    setCartItems([]);
  };

  return (
    <section id="shop" className="py-12 md:py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-noise opacity-5"></div>
      <div className="section-container relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <img src="/img/loja-colecao/logoloja.jpeg" alt="Logo da Loja" className="mx-auto mb-4 w-32 h-auto rounded" />
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Loja Virtual
          </h2>
          <p className="text-foreground/70 text-lg">
            Descubra nossos produtos especiais para sua jornada espiritual
          </p>

          {/* Aviso: Loja em desenvolvimento */}
          <div className="mt-6 inline-flex items-start gap-3 px-4 py-3 bg-yellow-50 border border-yellow-200 text-yellow-800 rounded-lg mx-auto max-w-2xl">
            <span className="text-xl">⚠️</span>
            <div className="text-left">
              <p className="font-semibold">Em desenvolvimento</p>
              <p className="text-sm text-foreground/70">A loja ainda está em desenvolvimento — algumas funcionalidades como checkout e integrações de pagamento podem não estar disponíveis. Obrigado pela paciência!</p>
            </div>
          </div>
        </div>

        {/* Categorias */}
        <div className="mb-12">
          <Tabs
            value={selectedCategory}
            onValueChange={setSelectedCategory}
            className="w-full"
          >
            <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-3 md:grid-cols-5">
              {categories.map((cat) => (
                <TabsTrigger key={cat.id} value={cat.id}>
                  {cat.name}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        {/* Grid de Produtos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredProducts.map((product) => (
            <Card
              key={product.id}
              className="group overflow-hidden hover:shadow-xl transition-all duration-300 border border-foreground/10 flex flex-col"
            >
              {/* Imagem */}
              <div className="relative overflow-hidden aspect-square bg-foreground/5 cursor-pointer">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  onClick={() => setSelectedProduct(product)}
                />
                {product.stock < 5 && (
                  <div className="absolute top-3 right-3 bg-red-500/90 text-white px-3 py-1 rounded-full text-xs font-semibold">
                    Apenas {product.stock} em estoque
                  </div>
                )}
              </div>

              {/* Conteúdo */}
              <div className="p-4 flex flex-col flex-1">
                <h3 className="text-lg font-bold mb-2">{product.name}</h3>
                <p className="text-foreground/70 text-sm mb-4 flex-1">
                  {product.description}
                </p>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={cn(
                          'h-4 w-4',
                          i < Math.floor(product.rating)
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-foreground/20'
                        )}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-foreground/60">
                    {product.rating} ({product.reviews})
                  </span>
                </div>

                {/* Preço e Botão */}
                <div className="flex items-center justify-between pt-4 border-t border-foreground/10">
                  <span className="text-2xl font-bold text-primary">
                    R$ {product.price.toFixed(2)}
                  </span>
                  <Button
                    onClick={() => addToCart(product)}
                    disabled={product.stock === 0}
                    size="sm"
                    className="gap-2"
                  >
                    <ShoppingCart className="h-4 w-4" />
                    Adicionar
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Carrinho Flutuante */}
        {cartItems.length > 0 && (
          <div className="fixed bottom-8 right-8 z-40">
            <Button
              onClick={() => setShowCart(!showCart)}
              className="gap-2 rounded-full h-14 w-14 p-0 flex items-center justify-center shadow-lg hover:shadow-xl"
            >
              <ShoppingCart className="h-6 w-6" />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
              </span>
            </Button>

            {/* Drawer do Carrinho */}
            {showCart && (
              <div className="absolute bottom-20 right-0 w-96 bg-background border border-foreground/20 rounded-lg shadow-2xl p-6 max-h-96 overflow-y-auto">
                <h3 className="text-lg font-bold mb-4">Seu Carrinho</h3>

                {cartItems.length === 0 ? (
                  <p className="text-foreground/50 text-center py-8">
                    Carrinho vazio
                  </p>
                ) : (
                  <>
                    <div className="space-y-4 mb-6">
                      {cartItems.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center gap-3 pb-4 border-b border-foreground/10"
                        >
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-12 h-12 rounded object-cover"
                          />
                          <div className="flex-1">
                            <p className="font-medium text-sm">{item.name}</p>
                            <p className="text-sm text-foreground/60">
                              R$ {item.price.toFixed(2)}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-6 w-6 p-0"
                              onClick={() =>
                                updateQuantity(item.id, item.quantity - 1)
                              }
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="w-6 text-center text-sm">
                              {item.quantity}
                            </span>
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-6 w-6 p-0"
                              onClick={() =>
                                updateQuantity(item.id, item.quantity + 1)
                              }
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Total */}
                    <div className="border-t border-foreground/10 pt-4">
                      <div className="flex items-center justify-between mb-4">
                        <span className="font-bold">Total:</span>
                        <span className="text-2xl font-bold text-primary">
                          R$ {cartTotal.toFixed(2)}
                        </span>
                      </div>
                      <Button
                        onClick={openCheckout}
                        disabled={processingPayment}
                        className="w-full gap-2"
                      >
                        {processingPayment ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <ShoppingCart className="h-4 w-4" />
                        )}
                        Ir para Checkout
                      </Button>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        )}

        {/* Modal de Detalhes */}
        <Dialog 
          open={!!selectedProduct} 
          onOpenChange={() => {
            setSelectedProduct(null);
            setCurrentImageIndex(0);
          }}
        >
          <DialogContent className="max-w-6xl max-h-[95vh] overflow-y-auto">
            {selectedProduct && (
              <>
                <DialogHeader className="border-b pb-4">
                  <DialogTitle className="text-3xl font-bold">{selectedProduct.name}</DialogTitle>
                  <DialogDescription className="text-lg text-foreground/70">
                    {selectedProduct.description}
                  </DialogDescription>
                </DialogHeader>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
                  {/* Galeria de Imagens */}
                  <div className="space-y-4">
                    {/* Imagem Principal */}
                    <div className="relative aspect-square rounded-xl overflow-hidden bg-foreground/5 border-2 border-foreground/10">
                      <img
                        src={selectedProduct.images[currentImageIndex] || selectedProduct.image}
                        alt={selectedProduct.name}
                        className="w-full h-full object-cover"
                      />
                      
                      {/* Navegação de imagens */}
                      {selectedProduct.images.length > 1 && (
                        <>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white shadow-lg"
                            onClick={() => setCurrentImageIndex(prev => 
                              prev === 0 ? selectedProduct.images.length - 1 : prev - 1
                            )}
                          >
                            <ChevronLeft className="w-6 h-6" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white shadow-lg"
                            onClick={() => setCurrentImageIndex(prev => 
                              prev === selectedProduct.images.length - 1 ? 0 : prev + 1
                            )}
                          >
                            <ChevronRight className="w-6 h-6" />
                          </Button>
                          
                          {/* Contador */}
                          <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-full backdrop-blur-sm">
                            <p className="text-sm font-medium">
                              {currentImageIndex + 1} / {selectedProduct.images.length}
                            </p>
                          </div>
                        </>
                      )}
                    </div>
                    
                    {/* Miniaturas */}
                    {selectedProduct.images.length > 1 && (
                      <div className="grid grid-cols-4 gap-2">
                        {selectedProduct.images.map((img, idx) => (
                          <button
                            key={idx}
                            onClick={() => setCurrentImageIndex(idx)}
                            className={cn(
                              "aspect-square rounded-lg overflow-hidden border-2 transition-all hover:scale-105",
                              currentImageIndex === idx
                                ? "border-primary ring-2 ring-primary/40 scale-105"
                                : "border-transparent hover:border-foreground/20"
                            )}
                          >
                            <img
                              src={img}
                              alt={`${selectedProduct.name} ${idx + 1}`}
                              className="w-full h-full object-cover"
                            />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Informações do Produto */}
                  <div className="flex flex-col">
                    {/* Rating */}
                    <div className="flex items-center gap-3 mb-6 pb-6 border-b border-foreground/10">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={cn(
                              'h-5 w-5',
                              i < Math.floor(selectedProduct.rating)
                                ? 'fill-yellow-400 text-yellow-400'
                                : 'text-foreground/20'
                            )}
                          />
                        ))}
                      </div>
                      <span className="text-sm font-medium text-foreground/70">
                        {selectedProduct.rating} ({selectedProduct.reviews} avaliações)
                      </span>
                    </div>

                    {/* Descrição Detalhada */}
                    <div className="mb-6 pb-6 border-b border-foreground/10">
                      <h4 className="font-bold text-lg mb-3">Sobre o produto</h4>
                      <p className="text-foreground/70 leading-relaxed">
                        {selectedProduct.details}
                      </p>
                    </div>

                    {/* Estoque */}
                    <div className="mb-6">
                      <div className={cn(
                        "inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium",
                        selectedProduct.stock > 10 
                          ? "bg-green-100 text-green-700"
                          : selectedProduct.stock > 0
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      )}>
                        {selectedProduct.stock > 0
                          ? `✓ ${selectedProduct.stock} em estoque`
                          : '✗ Fora de estoque'}
                      </div>
                    </div>

                    {/* Preço e CTA */}
                    <div className="mt-auto">
                      <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-xl p-6 mb-4">
                        <p className="text-sm text-foreground/60 mb-2">Preço</p>
                        <div className="text-4xl font-bold text-primary mb-4">
                          R$ {selectedProduct.price.toFixed(2)}
                        </div>
                        
                        <Button
                          onClick={() => {
                            addToCart(selectedProduct);
                            setSelectedProduct(null);
                            setCurrentImageIndex(0);
                          }}
                          disabled={selectedProduct.stock === 0}
                          className="w-full gap-2 h-12 text-lg"
                          size="lg"
                        >
                          <ShoppingCart className="h-5 w-5" />
                          {selectedProduct.stock === 0 ? 'Indisponível' : 'Adicionar ao Carrinho'}
                        </Button>
                      </div>
                      
                      <p className="text-xs text-center text-foreground/50">
                        Entrega em todo o Brasil
                      </p>
                    </div>
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>

        {/* Dialog de Checkout (Simulação) */}
        <Dialog open={showCheckoutDialog} onOpenChange={(open) => { setShowCheckoutDialog(open); if (!open) setPaymentSuccess(false); }}>
          <DialogContent className="max-w-2xl">
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold">Finalizar Compra</h3>
                  <p className="text-sm text-foreground/70">Total: R$ {cartTotal.toFixed(2)}</p>
                </div>
                <div className="text-right text-sm text-foreground/60">
                  {paymentSuccess ? (
                    <span className="text-green-600 font-semibold">Pagamento recebido</span>
                  ) : (
                    <span className="text-foreground/50">Pagamento em simulação</span>
                  )}
                </div>
              </div>

              {/* Escolher método */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setPaymentMethod('pix')}
                  className={cn(
                    'px-4 py-3 rounded-lg border text-left',
                    paymentMethod === 'pix' ? 'bg-primary/10 border-primary' : 'border-foreground/10'
                  )}
                >
                  <div className="font-semibold">Pix</div>
                  <div className="text-xs text-foreground/60 mt-1">Pagamento instantâneo</div>
                </button>

                <button
                  onClick={() => setPaymentMethod('card')}
                  className={cn(
                    'px-4 py-3 rounded-lg border text-left',
                    paymentMethod === 'card' ? 'bg-primary/10 border-primary' : 'border-foreground/10'
                  )}
                >
                  <div className="font-semibold">Cartão de Crédito</div>
                  <div className="text-xs text-foreground/60 mt-1">Pagamento com cartão (simulado)</div>
                </button>
              </div>

              {/* Conteúdo por método */}
              {paymentMethod === 'pix' ? (
                <div className="p-4 bg-surface rounded">
                  <p className="font-medium mb-2">Código PIX</p>
                  <div className="flex items-center gap-3">
                    <code className="bg-foreground/5 p-3 rounded break-words">{pixCode}</code>
                    <button
                      onClick={() => {
                        navigator.clipboard?.writeText(pixCode || '');
                        alert('Código PIX copiado (simulação)');
                      }}
                      className="px-3 py-2 bg-primary text-primary-foreground rounded"
                    >
                      Copiar
                    </button>
                  </div>

                  <p className="text-sm text-foreground/60 mt-3">Após o pagamento, clique em "Simular recebimento" para concluir (simulação).</p>

                  <div className="mt-4 flex gap-2">
                    <Button onClick={simulatePixPayment} disabled={processingPayment || paymentSuccess} className="gap-2">
                      {processingPayment ? 'Processando...' : 'Simular recebimento'}
                    </Button>
                    <Button variant="outline" onClick={() => setShowCheckoutDialog(false)}>Cancelar</Button>
                  </div>
                </div>
              ) : (
                <div className="p-4 bg-surface rounded">
                  <label className="block text-sm font-medium mb-2">Nome no Cartão</label>
                  <input value={cardForm.name} onChange={(e) => setCardForm({ ...cardForm, name: e.target.value })} className="w-full px-3 py-2 border rounded mb-2" />
                  <label className="block text-sm font-medium mb-2">Número do Cartão</label>
                  <input value={cardForm.number} onChange={(e) => setCardForm({ ...cardForm, number: e.target.value })} className="w-full px-3 py-2 border rounded mb-2" />
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-sm font-medium mb-2">Validade</label>
                      <input value={cardForm.expiry} onChange={(e) => setCardForm({ ...cardForm, expiry: e.target.value })} className="w-full px-3 py-2 border rounded" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">CVC</label>
                      <input value={cardForm.cvc} onChange={(e) => setCardForm({ ...cardForm, cvc: e.target.value })} className="w-full px-3 py-2 border rounded" />
                    </div>
                  </div>

                  <div className="mt-4 flex gap-2">
                    <Button onClick={simulateCardPayment} disabled={processingPayment || paymentSuccess} className="gap-2">
                      {processingPayment ? 'Processando...' : 'Pagar (simulação)'}
                    </Button>
                    <Button variant="outline" onClick={() => setShowCheckoutDialog(false)}>Cancelar</Button>
                  </div>
                </div>
              )}

              {/* Sucesso */}
              {paymentSuccess && (
                <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded">
                  <p className="font-semibold text-green-700">Pagamento confirmado (simulação)</p>
                  <p className="text-sm text-foreground/70">Obrigado! Seu pedido foi registrado localmente. Em produção, integraríamos um gateway de pagamentos real.</p>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>

      </div>
    </section>
  );
};

export default Shop;
