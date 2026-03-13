import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { mediaLibraryService } from '@/integrations/supabase/services';
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
    image: '',
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
        image: '',
      });
    } catch (error) {
      console.error('Erro ao criar álbum:', error);
      alert('Erro ao criar álbum');
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
            Gerenciar biblioteca de mídia
          </p>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-1">
            <TabsTrigger value="library">📚 Biblioteca</TabsTrigger>
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

        </Tabs>

        {/* Warning */}
        <Card className="mt-8 p-4 bg-amber-500/10 border-amber-500/20">
          <h4 className="font-bold text-amber-600 mb-2">⚠️ Autenticação Necessária</h4>
          <p className="text-sm text-foreground/70">
            Este painel não possui autenticação. Em produção, implemente:
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
