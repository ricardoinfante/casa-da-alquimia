import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { mediaLibraryService, shopService } from '@/integrations/supabase/services';
import { Loader2, Plus } from 'lucide-react';
import { useState } from 'react';

// NOTA: Este é um painel básico. Em produção, adicione autenticação!
// Implemente verificação de permissões antes de usar em produção

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('library');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    category: 'rituais',
    image: '',
    details: '',
  });

  const handleCreateAlbum = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await mediaLibraryService.createAlbum({
        name: formData.name,
        description: formData.description,
        coverImage: formData.image || 'https://via.placeholder.com/400x300',
      });
      alert('Álbum criado com sucesso!');
      setFormData({
        name: '',
        description: '',
        price: '',
        stock: '',
        category: 'rituais',
        image: '',
        details: '',
      });
    } catch (error) {
      console.error('Erro ao criar álbum:', error);
      alert('Erro ao criar álbum');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await shopService.createProduct({
        name: formData.name,
        description: formData.description,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock),
        category: formData.category,
        image: formData.image || 'https://via.placeholder.com/400x400',
        details: formData.details,
      });
      alert('Produto criado com sucesso!');
      setFormData({
        name: '',
        description: '',
        price: '',
        stock: '',
        category: 'rituais',
        image: '',
        details: '',
      });
    } catch (error) {
      console.error('Erro ao criar produto:', error);
      alert('Erro ao criar produto');
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({
          ...formData,
          image: reader.result as string,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Painel de Administração</h1>
          <p className="text-foreground/70">
            Gerenciar biblioteca de mídia e loja virtual
          </p>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="library">📚 Biblioteca</TabsTrigger>
            <TabsTrigger value="shop">🛍️ Loja Virtual</TabsTrigger>
          </TabsList>

          {/* BIBLIOTECA */}
          <TabsContent value="library" className="space-y-6">
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-6">Criar Novo Álbum</h2>
              <form onSubmit={handleCreateAlbum} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Nome do Álbum
                  </label>
                  <Input
                    type="text"
                    placeholder="Ex: Eventos Setembro 2025"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Descrição
                  </label>
                  <Input
                    type="text"
                    placeholder="Descrição do álbum"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Imagem de Capa (URL)
                  </label>
                  <Input
                    type="text"
                    placeholder="https://..."
                    value={formData.image}
                    onChange={(e) =>
                      setFormData({ ...formData, image: e.target.value })
                    }
                  />
                  <p className="text-xs text-foreground/50 mt-2">
                    Ou faça upload:
                  </p>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="mt-2 block w-full text-sm"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full gap-2"
                >
                  {loading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Plus className="h-4 w-4" />
                  )}
                  Criar Álbum
                </Button>
              </form>
            </Card>

            {/* Instruções */}
            <Card className="p-6 bg-primary/5 border-primary/20">
              <h3 className="font-bold mb-2">📋 Próximas Etapas</h3>
              <ol className="list-decimal list-inside space-y-2 text-sm text-foreground/70">
                <li>Criar o álbum acima</li>
                <li>Acessar a Biblioteca na página</li>
                <li>Clicar no álbum</li>
                <li>Usar botão "Adicionar Mídia" para enviar fotos/vídeos</li>
              </ol>
            </Card>
          </TabsContent>

          {/* LOJA */}
          <TabsContent value="shop" className="space-y-6">
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-6">Criar Novo Produto</h2>
              <form onSubmit={handleCreateProduct} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Nome do Produto
                    </label>
                    <Input
                      type="text"
                      placeholder="Ex: Kit Ritual de Purificação"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Preço (R$)
                    </label>
                    <Input
                      type="number"
                      step="0.01"
                      placeholder="99.90"
                      value={formData.price}
                      onChange={(e) =>
                        setFormData({ ...formData, price: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Estoque
                    </label>
                    <Input
                      type="number"
                      placeholder="10"
                      value={formData.stock}
                      onChange={(e) =>
                        setFormData({ ...formData, stock: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Categoria
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) =>
                        setFormData({ ...formData, category: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-input rounded-md bg-background"
                    >
                      <option value="rituais">Kits de Rituais</option>
                      <option value="cristais">Cristais</option>
                      <option value="livros">Livros</option>
                      <option value="aromaterapia">Aromaterapia</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Descrição Curta
                  </label>
                  <Input
                    type="text"
                    placeholder="Descrição que aparece na listagem"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Detalhes do Produto
                  </label>
                  <textarea
                    placeholder="Descrição detalhada do produto"
                    value={formData.details}
                    onChange={(e) =>
                      setFormData({ ...formData, details: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-input rounded-md bg-background text-sm"
                    rows={4}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Imagem do Produto (URL)
                  </label>
                  <Input
                    type="text"
                    placeholder="https://..."
                    value={formData.image}
                    onChange={(e) =>
                      setFormData({ ...formData, image: e.target.value })
                    }
                  />
                  <p className="text-xs text-foreground/50 mt-2">
                    Ou faça upload:
                  </p>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="mt-2 block w-full text-sm"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full gap-2"
                >
                  {loading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Plus className="h-4 w-4" />
                  )}
                  Criar Produto
                </Button>
              </form>
            </Card>

            {/* Instruções */}
            <Card className="p-6 bg-primary/5 border-primary/20">
              <h3 className="font-bold mb-2">📋 Dicas</h3>
              <ul className="list-disc list-inside space-y-2 text-sm text-foreground/70">
                <li>
                  Use URLs de images públicas ou faça upload para Supabase Storage
                </li>
                <li>Preço deve ser em reais (R$)</li>
                <li>Estoque controla a disponibilidade do produto</li>
                <li>
                  Produtos com estoque = 0 mostram "Fora de estoque" no carrinho
                </li>
              </ul>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Warning */}
        <Card className="mt-8 p-4 bg-red-500/10 border-red-500/20">
          <h4 className="font-bold text-red-600 mb-2">⚠️ Segurança</h4>
          <p className="text-sm text-foreground/70">
            Este painel não possui autenticação. Em produção, adicione:
            <ul className="list-disc list-inside mt-2 ml-2 text-xs">
              <li>Verificação de usuário autenticado</li>
              <li>Verificação de permissões de admin</li>
              <li>Integração com Auth do Supabase</li>
            </ul>
          </p>
        </Card>
      </div>
    </div>
  );
};

export default AdminPanel;
