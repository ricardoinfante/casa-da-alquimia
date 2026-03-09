import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight, Grid, Loader2, Play, Upload, X } from 'lucide-react';
import { useState } from 'react';

interface MediaItem {
  id: string;
  title: string;
  thumbnail: string;
  type: 'image' | 'video';
  url: string;
  date: string;
}

interface Album {
  id: string;
  name: string;
  description: string;
  coverImage: string;
  itemCount: number;
  items: MediaItem[];
}

const Library = () => {
  const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null);
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);
  const [loading, setLoading] = useState(false);

  const albums: Album[] = [
    {
      id: 'eventos-2025',
      name: 'Eventos 2025',
      description: 'Momentos especiais dos eventos realizados',
      coverImage: '/img/convite.jpeg',
      itemCount: 50,
      items: [
        {
          id: '1',
          title: 'Turma na Trilha',
          thumbnail: '/img/turmanatrilha.jpeg',
          type: 'image',
          url: '/img/turmanatrilha.jpeg',
          date: '2025-01-05',
        },
        {
          id: '2',
          title: 'Turma na Trilha 2',
          thumbnail: '/img/turmanatrilha1.jpeg',
          type: 'image',
          url: '/img/turmanatrilha1.jpeg',
          date: '2025-01-03',
        },
        {
          id: '3',
          title: 'Vela na Mesa',
          thumbnail: '/img/velamesa.jpeg',
          type: 'image',
          url: '/img/velamesa.jpeg',
          date: '2024-12-28',
        },
        {
          id: '4',
          title: 'Serviço da Ayahuasca',
          thumbnail: '/img/serviidodaime.jpeg',
          type: 'image',
          url: '/img/serviidodaime.jpeg',
          date: '2024-12-20',
        },
        {
          id: '5',
          title: 'Vídeo do Evento',
          thumbnail: '/img/convite.jpeg',
          type: 'video',
          url: '/img/img20.mp4',
          date: '2025-01-01',
        },
        // Imagens de Feitio 2025
        {
          id: '6',
          title: 'Feitio 2025 - Momento 1',
          thumbnail: '/img/feitio2025/WhatsApp_Image_2025-12-29_at_08.24.10.jpeg',
          type: 'image',
          url: '/img/feitio2025/WhatsApp_Image_2025-12-29_at_08.24.10.jpeg',
          date: '2025-12-29',
        },
        {
          id: '7',
          title: 'Feitio 2025 - Momento 2',
          thumbnail: '/img/feitio2025/WhatsApp_Image_2025-12-30_at_12.25.03.jpeg',
          type: 'image',
          url: '/img/feitio2025/WhatsApp_Image_2025-12-30_at_12.25.03.jpeg',
          date: '2025-12-30',
        },
        {
          id: '8',
          title: 'Feitio 2025 - Momento 3',
          thumbnail: '/img/feitio2025/WhatsApp_Image_2025-12-30_at_12.41.30.jpeg',
          type: 'image',
          url: '/img/feitio2025/WhatsApp_Image_2025-12-30_at_12.41.30.jpeg',
          date: '2025-12-30',
        },
        {
          id: '9',
          title: 'Feitio 2025 - Momento 4',
          thumbnail: '/img/feitio2025/WhatsApp_Image_2025-12-30_at_16.24.27.jpeg',
          type: 'image',
          url: '/img/feitio2025/WhatsApp_Image_2025-12-30_at_16.24.27.jpeg',
          date: '2025-12-30',
        },
        {
          id: '10',
          title: 'Feitio 2025 - Momento 5',
          thumbnail: '/img/feitio2025/WhatsApp_Image_2025-12-30_at_16.24.28.jpeg',
          type: 'image',
          url: '/img/feitio2025/WhatsApp_Image_2025-12-30_at_16.24.28.jpeg',
          date: '2025-12-30',
        },
        {
          id: '11',
          title: 'Feitio 2025 - Vídeo 1',
          thumbnail: '/img/feitio2025/WhatsApp_Image_2025-12-30_at_16.24.27.jpeg',
          type: 'video',
          url: '/img/feitio2025/WhatsApp_Video_2025-12-30_at_16.24.31.mp4',
          date: '2025-12-30',
        },
        {
          id: '12',
          title: 'Feitio 2025 - Momento 6',
          thumbnail: '/img/feitio2025/WhatsApp_Image_2025-12-30_at_16.24.29.jpeg',
          type: 'image',
          url: '/img/feitio2025/WhatsApp_Image_2025-12-30_at_16.24.29.jpeg',
          date: '2025-12-30',
        },
        {
          id: '13',
          title: 'Feitio 2025 - Momento 7',
          thumbnail: '/img/feitio2025/WhatsApp_Image_2025-12-30_at_16.24.30.jpeg',
          type: 'image',
          url: '/img/feitio2025/WhatsApp_Image_2025-12-30_at_16.24.30.jpeg',
          date: '2025-12-30',
        },
        {
          id: '14',
          title: 'Feitio 2025 - Momento 8',
          thumbnail: '/img/feitio2025/WhatsApp_Image_2025-12-30_at_16.58.17.jpeg',
          type: 'image',
          url: '/img/feitio2025/WhatsApp_Image_2025-12-30_at_16.58.17.jpeg',
          date: '2025-12-30',
        },
        {
          id: '15',
          title: 'Feitio 2025 - Momento 9',
          thumbnail: '/img/feitio2025/WhatsApp_Image_2025-12-30_at_16.58.21.jpeg',
          type: 'image',
          url: '/img/feitio2025/WhatsApp_Image_2025-12-30_at_16.58.21.jpeg',
          date: '2025-12-30',
        },
        {
          id: '16',
          title: 'Feitio 2025 - Momento 10',
          thumbnail: '/img/feitio2025/WhatsApp_Image_2025-12-30_at_17.28.38.jpeg',
          type: 'image',
          url: '/img/feitio2025/WhatsApp_Image_2025-12-30_at_17.28.38.jpeg',
          date: '2025-12-30',
        },
        {
          id: '17',
          title: 'Feitio 2025 - Momento 11',
          thumbnail: '/img/feitio2025/WhatsApp_Image_2025-12-30_at_17.28.40.jpeg',
          type: 'image',
          url: '/img/feitio2025/WhatsApp_Image_2025-12-30_at_17.28.40.jpeg',
          date: '2025-12-30',
        },
        {
          id: '18',
          title: 'Feitio 2025 - Momento 12',
          thumbnail: '/img/feitio2025/WhatsApp_Image_2025-12-30_at_17.28.41.jpeg',
          type: 'image',
          url: '/img/feitio2025/WhatsApp_Image_2025-12-30_at_17.28.41.jpeg',
          date: '2025-12-30',
        },
        {
          id: '19',
          title: 'Feitio 2025 - Momento 13',
          thumbnail: '/img/feitio2025/WhatsApp_Image_2025-12-30_at_17.28.42.jpeg',
          type: 'image',
          url: '/img/feitio2025/WhatsApp_Image_2025-12-30_at_17.28.42.jpeg',
          date: '2025-12-30',
        },
        {
          id: '20',
          title: 'Feitio 2025 - Momento 14',
          thumbnail: '/img/feitio2025/WhatsApp_Image_2026-01-05_at_18.22.56.jpeg',
          type: 'image',
          url: '/img/feitio2025/WhatsApp_Image_2026-01-05_at_18.22.56.jpeg',
          date: '2026-01-05',
        },
        {
          id: '21',
          title: 'Feitio 2025 - Momento 15',
          thumbnail: '/img/feitio2025/WhatsApp_Image_2026-01-05_at_18.22.57.jpeg',
          type: 'image',
          url: '/img/feitio2025/WhatsApp_Image_2026-01-05_at_18.22.57.jpeg',
          date: '2026-01-05',
        },
        {
          id: '22',
          title: 'Feitio 2025 - Momento 16',
          thumbnail: '/img/feitio2025/WhatsApp_Image_2026-01-05_at_18.22.58.jpeg',
          type: 'image',
          url: '/img/feitio2025/WhatsApp_Image_2026-01-05_at_18.22.58.jpeg',
          date: '2026-01-05',
        },
        {
          id: '23',
          title: 'Feitio 2025 - Momento 17',
          thumbnail: '/img/feitio2025/WhatsApp_Image_2026-01-05_at_18.22.59.jpeg',
          type: 'image',
          url: '/img/feitio2025/WhatsApp_Image_2026-01-05_at_18.22.59.jpeg',
          date: '2026-01-05',
        },
        {
          id: '24',
          title: 'Feitio 2025 - Momento 18',
          thumbnail: '/img/feitio2025/WhatsApp_Image_2026-01-05_at_18.23.00.jpeg',
          type: 'image',
          url: '/img/feitio2025/WhatsApp_Image_2026-01-05_at_18.23.00.jpeg',
          date: '2026-01-05',
        },
        {
          id: '25',
          title: 'Feitio 2025 - Momento 19',
          thumbnail: '/img/feitio2025/WhatsApp_Image_2026-01-05_at_18.23.01.jpeg',
          type: 'image',
          url: '/img/feitio2025/WhatsApp_Image_2026-01-05_at_18.23.01.jpeg',
          date: '2026-01-05',
        },
        {
          id: '26',
          title: 'Feitio 2025 - Momento 20',
          thumbnail: '/img/feitio2025/WhatsApp_Image_2026-01-05_at_18.23.02.jpeg',
          type: 'image',
          url: '/img/feitio2025/WhatsApp_Image_2026-01-05_at_18.23.02.jpeg',
          date: '2026-01-05',
        },
        {
          id: '27',
          title: 'Feitio 2025 - Momento 21',
          thumbnail: '/img/feitio2025/WhatsApp_Image_2026-01-05_at_18.32.37.jpeg',
          type: 'image',
          url: '/img/feitio2025/WhatsApp_Image_2026-01-05_at_18.32.37.jpeg',
          date: '2026-01-05',
        },
        {
          id: '28',
          title: 'Feitio 2025 - Vídeo 2',
          thumbnail: '/img/feitio2025/WhatsApp_Image_2026-01-05_at_18.32.37.jpeg',
          type: 'video',
          url: '/img/feitio2025/WhatsApp_Video_2026-01-05_at_18.32.58.mp4',
          date: '2026-01-05',
        },
        {
          id: '29',
          title: 'Feitio 2025 - Momento 22',
          thumbnail: '/img/feitio2025/WhatsApp_Image_2026-01-05_at_18.32.38.jpeg',
          type: 'image',
          url: '/img/feitio2025/WhatsApp_Image_2026-01-05_at_18.32.38.jpeg',
          date: '2026-01-05',
        },
        {
          id: '30',
          title: 'Feitio 2025 - Momento 23',
          thumbnail: '/img/feitio2025/WhatsApp_Image_2026-01-05_at_18.33.10.jpeg',
          type: 'image',
          url: '/img/feitio2025/WhatsApp_Image_2026-01-05_at_18.33.10.jpeg',
          date: '2026-01-05',
        },
        {
          id: '31',
          title: 'Feitio 2025 - Momento 24',
          thumbnail: '/img/feitio2025/WhatsApp_Image_2026-01-05_at_18.33.11.jpeg',
          type: 'image',
          url: '/img/feitio2025/WhatsApp_Image_2026-01-05_at_18.33.11.jpeg',
          date: '2026-01-05',
        },
        {
          id: '32',
          title: 'Feitio 2025 - Momento 25',
          thumbnail: '/img/feitio2025/WhatsApp_Image_2026-01-05_at_18.33.12.jpeg',
          type: 'image',
          url: '/img/feitio2025/WhatsApp_Image_2026-01-05_at_18.33.12.jpeg',
          date: '2026-01-05',
        },
        {
          id: '33',
          title: 'Feitio 2025 - Momento 26',
          thumbnail: '/img/feitio2025/WhatsApp_Image_2026-01-05_at_18.33.13.jpeg',
          type: 'image',
          url: '/img/feitio2025/WhatsApp_Image_2026-01-05_at_18.33.13.jpeg',
          date: '2026-01-05',
        },
        {
          id: '34',
          title: 'Feitio 2025 - Vídeo 3',
          thumbnail: '/img/feitio2025/WhatsApp_Image_2026-01-05_at_18.33.10.jpeg',
          type: 'video',
          url: '/img/feitio2025/WhatsApp_Video_2026-01-05_at_18.33.09.mp4',
          date: '2026-01-05',
        },
      ],
    },
    {
      id: 'trabalhos',
      name: 'Trabalhos Realizados',
      description: 'Galeria dos trabalhos e projetos concluídos',
      coverImage: '/img/fotofinal.jpeg',
      itemCount: 18,
      items: [
        {
          id: '1',
          title: 'Bruna na Panela',
          thumbnail: '/img/brunapanela.jpeg',
          type: 'image',
          url: '/img/brunapanela.jpeg',
          date: '2024-12-15',
        },
        {
          id: '2',
          title: 'Olho na Panela',
          thumbnail: '/img/olhonapanela.jpeg',
          type: 'image',
          url: '/img/olhonapanela.jpeg',
          date: '2024-12-14',
        },
        {
          id: '3',
          title: 'Jagube na Panela',
          thumbnail: '/img/jagubepanela.jpeg',
          type: 'image',
          url: '/img/jagubepanela.jpeg',
          date: '2024-12-13',
        },
        {
          id: '4',
          title: 'Jalaua Abraçando',
          thumbnail: '/img/jalauabracando.jpeg',
          type: 'image',
          url: '/img/jalauabracando.jpeg',
          date: '2024-12-12',
        },
      ],
    },
    {
      id: 'passeios',
      name: 'Passeios e Retiros',
      description: 'Momentos de conexão em passeios e retiros espirituais',
      coverImage: '/img/meditação.jpeg',
      itemCount: 15,
      items: [
        {
          id: '1',
          title: 'Meditação',
          thumbnail: '/img/meditação.jpeg',
          type: 'image',
          url: '/img/meditação.jpeg',
          date: '2024-12-10',
        },
        {
          id: '2',
          title: 'Jalaua Sentado',
          thumbnail: '/img/jalausentado.jpeg',
          type: 'image',
          url: '/img/jalausentado.jpeg',
          date: '2024-12-09',
        },
        {
          id: '3',
          title: 'Fé e Dani Rai',
          thumbnail: '/img/ferdanirai.jpeg',
          type: 'image',
          url: '/img/ferdanirai.jpeg',
          date: '2024-12-08',
        },
        {
          id: '4',
          title: 'Alquimia',
          thumbnail: '/img/alquimia.jpeg',
          type: 'image',
          url: '/img/alquimia.jpeg',
          date: '2024-12-07',
        },
      ],
    },
    {
      id: 'galeria',
      name: 'Galeria Complementar',
      description: 'Mais momentos e imagens especiais',
      coverImage: '/img/img01.jpeg',
      itemCount: 20,
      items: [
        {
          id: '1',
          title: 'Imagem 1',
          thumbnail: '/img/img01.jpeg',
          type: 'image',
          url: '/img/img01.jpeg',
          date: '2024-12-06',
        },
        {
          id: '2',
          title: 'Imagem 2',
          thumbnail: '/img/img02.png',
          type: 'image',
          url: '/img/img02.png',
          date: '2024-12-05',
        },
        {
          id: '3',
          title: 'Imagem 3',
          thumbnail: '/img/img03.jpeg',
          type: 'image',
          url: '/img/img03.jpeg',
          date: '2024-12-04',
        },
        {
          id: '4',
          title: 'Imagem 4',
          thumbnail: '/img/img04.jpeg',
          type: 'image',
          url: '/img/img04.jpeg',
          date: '2024-12-03',
        },
      ],
    },
  ];

  const handleUploadMedia = (albumId: string) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  const currentMediaIndex = selectedAlbum
    ? selectedAlbum.items.findIndex(item => item.id === selectedMedia?.id)
    : -1;

  const handlePrevious = () => {
    if (selectedAlbum && currentMediaIndex > 0) {
      setSelectedMedia(selectedAlbum.items[currentMediaIndex - 1]);
    }
  };

  const handleNext = () => {
    if (selectedAlbum && currentMediaIndex < selectedAlbum.items.length - 1) {
      setSelectedMedia(selectedAlbum.items[currentMediaIndex + 1]);
    }
  };

  // View quando um álbum é selecionado
  if (selectedAlbum) {
    return (
      <section id="library" className="py-12 md:py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-noise opacity-5"></div>
        <div className="section-container relative z-10">
          {/* Header com volta */}
          <div className="mb-12 animate-in fade-in slide-in-from-left duration-300">
            <Button
              onClick={() => {
                setSelectedAlbum(null);
                setSelectedMedia(null);
              }}
              variant="outline"
              className="mb-6 hover:scale-105 transition-transform"
            >
              ← Voltar aos Álbuns
            </Button>
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                {selectedAlbum.name}
              </h1>
              <p className="text-foreground/70 text-lg mb-6">
                {selectedAlbum.description}
              </p>
              <div className="flex items-center gap-4 flex-wrap">
                <span className="text-sm font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">
                  📸 {selectedAlbum.items.length} itens
                </span>
                <Button
                  onClick={() => handleUploadMedia(selectedAlbum.id)}
                  disabled={loading}
                  className="gap-2 hover:scale-105 transition-transform"
                >
                  {loading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Upload className="h-4 w-4" />
                  )}
                  Adicionar Mídia
                </Button>
              </div>
            </div>
          </div>

          {/* Grid de Mídia */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {selectedAlbum.items.length > 0 ? (
              selectedAlbum.items.map((item, index) => (
                <div
                  key={item.id}
                  onClick={() => setSelectedMedia(item)}
                  className="group cursor-pointer animate-in fade-in slide-in-from-bottom duration-300"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="relative overflow-hidden rounded-lg aspect-video mb-3 bg-foreground/5 shadow-lg hover:shadow-2xl transition-all duration-300 transform group-hover:-translate-y-2">
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-125 transition-transform duration-500 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {item.type === 'video' && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center shadow-xl transform group-hover:scale-110 transition-transform duration-300 group-hover:bg-primary">
                          <Play className="h-7 w-7 text-black fill-black group-hover:text-white group-hover:fill-white" />
                        </div>
                      </div>
                    )}

                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span
                        className={cn(
                          'inline-block px-2.5 py-1 rounded-full text-xs font-semibold',
                          item.type === 'video'
                            ? 'bg-red-500/90 text-white'
                            : 'bg-blue-500/90 text-white'
                        )}
                      >
                        {item.type === 'video' ? '🎬 Vídeo' : '📷 Foto'}
                      </span>
                    </div>
                  </div>

                  <div className="px-2">
                    <h3 className="font-semibold text-sm md:text-base mb-1 line-clamp-2 group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-foreground/50">
                      {new Date(item.date).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full py-12 text-center animate-in fade-in duration-300">
                <Grid className="h-12 w-12 mx-auto text-foreground/20 mb-4" />
                <p className="text-foreground/50 mb-6">
                  Este álbum ainda não possui mídia
                </p>
                <Button
                  onClick={() => handleUploadMedia(selectedAlbum.id)}
                  disabled={loading}
                >
                  {loading ? (
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  ) : (
                    <Upload className="h-4 w-4 mr-2" />
                  )}
                  Fazer Upload de Imagens/Vídeos
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Modal de Visualização */}
        <Dialog open={!!selectedMedia} onOpenChange={() => setSelectedMedia(null)}>
          <DialogContent className="max-w-5xl h-[90vh] max-h-[90vh] p-0 border-0 bg-black/95">
            {/* Header do Modal */}
            <div className="absolute top-0 left-0 right-0 z-10 p-4 flex items-center justify-between bg-gradient-to-b from-black/80 to-transparent">
              <div className="flex-1">
                <DialogTitle className="text-white text-lg md:text-2xl">
                  {selectedMedia?.title}
                </DialogTitle>
                <DialogDescription className="text-gray-300 text-xs md:text-sm">
                  {selectedMedia?.date &&
                    new Date(selectedMedia.date).toLocaleDateString('pt-BR')}{' '}
                  • {currentMediaIndex + 1} de {selectedAlbum?.items.length}
                </DialogDescription>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSelectedMedia(null)}
                className="text-white hover:bg-white/20"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Conteúdo */}
            <div className="w-full h-full flex flex-col items-center justify-center p-4 pt-16 pb-16 relative overflow-hidden animate-in fade-in duration-300">
              {selectedMedia && selectedMedia.type === 'image' ? (
                <img
                  key={selectedMedia.id}
                  src={selectedMedia.url}
                  alt={selectedMedia.title}
                  className="max-w-full max-h-full object-contain rounded-lg shadow-2xl animate-in zoom-in duration-300"
                />
              ) : selectedMedia && selectedMedia.type === 'video' ? (
                <video
                  key={selectedMedia.id}
                  src={selectedMedia.url}
                  controls
                  autoPlay
                  className="max-w-full max-h-full rounded-lg shadow-2xl animate-in zoom-in duration-300"
                />
              ) : null}

              {/* Setas de Navegação */}
              {selectedAlbum && selectedAlbum.items.length > 1 && (
                <>
                  <button
                    onClick={handlePrevious}
                    disabled={currentMediaIndex === 0}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-2 md:p-3 rounded-full bg-white/20 hover:bg-white/40 text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200 hover:scale-110"
                  >
                    <ChevronLeft className="h-5 w-5 md:h-6 md:w-6" />
                  </button>
                  <button
                    onClick={handleNext}
                    disabled={
                      currentMediaIndex === (selectedAlbum?.items.length ?? 0) - 1
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-2 md:p-3 rounded-full bg-white/20 hover:bg-white/40 text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200 hover:scale-110"
                  >
                    <ChevronRight className="h-5 w-5 md:h-6 md:w-6" />
                  </button>
                </>
              )}

              {/* Miniaturas */}
              {selectedAlbum && (
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                  <div className="flex items-center justify-center gap-2 overflow-x-auto pb-4">
                    {selectedAlbum.items.map((item, idx) => (
                      <button
                        key={item.id}
                        onClick={() => setSelectedMedia(item)}
                        className={cn(
                          'flex-shrink-0 w-12 h-12 md:w-16 md:h-16 rounded-lg overflow-hidden border-2 transition-all duration-200 hover:scale-110',
                          idx === currentMediaIndex
                            ? 'border-primary shadow-lg shadow-primary/50'
                            : 'border-white/30 hover:border-white/60'
                        )}
                      >
                        <img
                          src={item.thumbnail}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                        {item.type === 'video' && (
                          <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                            <Play className="h-4 w-4 text-white fill-white" />
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </section>
    );
  }

  // View principal - Grade de álbuns
  return (
    <section id="library" className="py-12 md:py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-noise opacity-5"></div>
      <div className="section-container relative z-10">
        {/* Header Animado */}
        <div className="text-center max-w-3xl mx-auto mb-16 animate-in fade-in slide-in-from-top duration-500">
          <div className="inline-block mb-4 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold">
            ✨ Explore Nossa Coleção
          </div>
          <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
            Biblioteca de Mídia
          </h2>
          <p className="text-foreground/70 text-lg leading-relaxed">
            Explore nossa coleção de imagens e vídeos de eventos, trabalhos e retiros
            espirituais. Clique em qualquer álbum para ver mais detalhes.
          </p>
        </div>

        {/* Grid de Álbuns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {albums.map((album, index) => (
            <div
              key={album.id}
              className="animate-in fade-in slide-in-from-bottom duration-500"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <Card
                onClick={() => setSelectedAlbum(album)}
                className="group cursor-pointer overflow-hidden hover:shadow-2xl transition-all duration-300 border border-foreground/10 transform hover:-translate-y-2 hover:border-primary/50"
              >
                {/* Imagem de Capa */}
                <div className="relative overflow-hidden aspect-video bg-foreground/5">
                  <img
                    src={album.coverImage}
                    alt={album.name}
                    className="w-full h-full object-cover group-hover:scale-125 transition-transform duration-500 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-100 group-hover:from-black/80 group-hover:via-black/40 transition-all duration-300" />

                  <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-white text-sm font-semibold border border-white/30 group-hover:bg-primary group-hover:border-primary transition-all duration-300">
                    {album.items.length} itens
                  </div>
                </div>

                {/* Conteúdo */}
                <div className="p-6 relative">
                  <h3 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors duration-300">
                    {album.name}
                  </h3>
                  <p className="text-foreground/70 text-sm mb-6 line-clamp-2">
                    {album.description}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-foreground/10 group-hover:border-primary/30 transition-colors">
                    <div className="flex items-center gap-2">
                      <Grid className="h-4 w-4 text-primary opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-2 group-hover:translate-x-0" />
                      <span className="text-sm font-medium text-foreground/70 group-hover:text-primary transition-colors">
                        {album.itemCount} fotos/vídeos
                      </span>
                    </div>
                    <span className="text-sm text-foreground/50 group-hover:text-primary transition-colors opacity-0 group-hover:opacity-100">
                      Explorar →
                    </span>
                  </div>
                </div>

                {/* Efeito de brilho */}
                <div className="absolute top-0 -left-full w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:left-full transition-all duration-700 pointer-events-none" />
              </Card>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-20 p-8 md:p-12 rounded-2xl bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10 border border-primary/20 text-center animate-in fade-in slide-in-from-bottom duration-700 relative overflow-hidden">
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-secondary/20 rounded-full blur-3xl" />

          <div className="relative z-10">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              💝 Quer compartilhar suas fotos?
            </h3>
            <p className="text-foreground/70 mb-8 max-w-xl mx-auto text-lg">
              Se você participou de um evento e gostaria de compartilhar suas fotos ou
              vídeos, entre em contato conosco! Adoraríamos receber suas contribuições
              para enriquecer nossa biblioteca.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/5562996538902?text=Olá!%20Gostaria%20de%20compartilhar%20fotos%20de%20um%20evento"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-3 bg-primary text-primary-foreground rounded-full font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300 hover:bg-secondary"
              >
                📱 Enviar via WhatsApp
              </a>
              <a
                href="mailto:contato@casadaalquimia.com"
                className="inline-flex items-center justify-center px-8 py-3 bg-secondary/20 text-foreground rounded-full font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300 border border-secondary/30 hover:bg-secondary/30"
              >
                📧 Enviar por Email
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Library;
