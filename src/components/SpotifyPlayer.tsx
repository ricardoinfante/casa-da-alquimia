import { Maximize2, Minimize2, Music, X } from 'lucide-react';
import React, { useEffect, useState } from 'react';

interface SpotifyPlayerProps {
  playlistId?: string;
}

const SpotifyPlayer: React.FC<SpotifyPlayerProps> = ({ 
  playlistId = '5gK8vevkgH2nRAw1LuGdCD' 
}) => {
  const [isMinimized, setIsMinimized] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [showPlayer, setShowPlayer] = useState(false);

  // Mostrar o player após um pequeno delay para não impactar o carregamento inicial
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPlayer(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Salvar preferência do usuário no localStorage
  useEffect(() => {
    const savedMinimized = localStorage.getItem('spotifyPlayerMinimized');
    const savedVisible = localStorage.getItem('spotifyPlayerVisible');
    
    if (savedMinimized !== null) {
      setIsMinimized(savedMinimized === 'true');
    }
    if (savedVisible !== null) {
      setIsVisible(savedVisible === 'true');
    }
  }, []);

  const toggleMinimize = () => {
    const newState = !isMinimized;
    setIsMinimized(newState);
    localStorage.setItem('spotifyPlayerMinimized', String(newState));
  };

  const handleClose = () => {
    setIsVisible(false);
    localStorage.setItem('spotifyPlayerVisible', 'false');
  };

  const handleShow = () => {
    setIsVisible(true);
    localStorage.setItem('spotifyPlayerVisible', 'true');
  };

  if (!showPlayer) return null;

  // Botão flutuante para reabrir o player
  if (!isVisible) {
    return (
      <button
        onClick={handleShow}
        className="fixed bottom-6 right-6 z-50 p-4 bg-gradient-to-r from-[#1DB954] to-[#1ed760] text-white rounded-full shadow-2xl hover:shadow-green-500/50 transition-all duration-300 hover:scale-110 group"
        aria-label="Abrir player de música"
      >
        <Music className="h-6 w-6 animate-pulse" />
        <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
          ♪
        </span>
      </button>
    );
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40">
      {/* Player do Spotify - Controles centralizados */}
      <div className={`relative flex items-center justify-center bg-black transition-all duration-300 ${isMinimized ? 'h-0' : 'h-[80px]'} overflow-hidden`}>
        {/* Botão Minimizar - Esquerda */}
        {!isMinimized && (
          <button
            onClick={toggleMinimize}
            className="absolute left-1 sm:left-2 md:left-4 top-1/2 transform -translate-y-1/2 p-1.5 sm:p-2 bg-black/70 hover:bg-black/90 backdrop-blur-sm rounded-full transition-all text-white z-10 shadow-lg border border-white/20"
            aria-label="Minimizar player"
            title="Minimizar"
          >
            <Minimize2 className="h-3 w-3 sm:h-4 sm:w-4" />
          </button>
        )}
        
        {/* Iframe centralizado com max-width */}
        <div className="w-full max-w-5xl mx-auto px-12 sm:px-16 md:px-20">
          <iframe
            title="Spotify Player - Casa da Alquimia"
            style={{ borderRadius: 12 }}
            src={`https://open.spotify.com/embed/playlist/${playlistId}?utm_source=generator&theme=0`}
            width="100%"
            height="80"
            frameBorder="0"
            allowFullScreen
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
          ></iframe>
        </div>
        
        {/* Botão Fechar - Direita */}
        {!isMinimized && (
          <button
            onClick={handleClose}
            className="absolute right-1 sm:right-2 md:right-4 top-1/2 transform -translate-y-1/2 p-1.5 sm:p-2 bg-black/70 hover:bg-black/90 backdrop-blur-sm rounded-full transition-all text-white z-10 shadow-lg border border-white/20"
            aria-label="Fechar player"
            title="Fechar"
          >
            <X className="h-3 w-3 sm:h-4 sm:w-4" />
          </button>
        )}
      </div>

      {/* Barra para reabrir quando minimizado */}
      {isMinimized && (
        <div className="bg-gradient-to-r from-[#191414] to-[#1DB954]">
          <button
            onClick={toggleMinimize}
            className="w-full py-2 px-4 hover:bg-black/20 transition-all flex items-center justify-center gap-2 text-white text-sm font-medium"
            aria-label="Expandir player"
          >
            <Music className="h-4 w-4 animate-pulse" />
            <span>🎵 Spotify Player - Clique para expandir</span>
            <Maximize2 className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
};

export default SpotifyPlayer;
