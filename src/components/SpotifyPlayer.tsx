import { Maximize2, Minimize2, Music, X } from 'lucide-react';
import React, { useEffect, useState } from 'react';

const MusicTooltip = () => {
  const [visible, setVisible] = useState(false);
  return (
    <span
      className="relative flex items-center"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      onClick={e => e.stopPropagation()}
    >
      <Music className="h-4 w-4" />
      {visible && (
        <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-dark text-white/50 text-xs font-light tracking-wide whitespace-nowrap rounded-sm border border-white/10 pointer-events-none z-50">
          ouça as músicas que guiam nossas seleções.
        </span>
      )}
    </span>
  );
};

interface SpotifyPlayerProps {
  playlistId?: string;
}

const SpotifyPlayer: React.FC<SpotifyPlayerProps> = ({ 
  playlistId = '5gK8vevkgH2nRAw1LuGdCD' 
}) => {
  const [isMinimized, setIsMinimized] = useState(true);
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
        className="fixed bottom-6 right-6 z-50 p-4 bg-secondary text-white rounded-sm transition-colors duration-200 hover:bg-secondary-light group"
        aria-label="Abrir player de música"
      >
        <Music className="h-6 w-6" />
        <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
          ♪
        </span>
      </button>
    );
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40">
      {/* Player do Spotify - Controles centralizados */}
      <div className={`relative flex items-center justify-center bg-dark transition-all duration-300 ${isMinimized ? 'h-0' : 'h-[80px]'} overflow-hidden`}>
        {/* Botão Minimizar - Esquerda */}
        {!isMinimized && (
          <button
            onClick={toggleMinimize}
            className="absolute left-1 sm:left-2 md:left-4 top-1/2 transform -translate-y-1/2 p-1.5 sm:p-2 bg-black/70 hover:bg-black/90 rounded-sm transition-all text-white z-10 border border-white/10"
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
            className="absolute right-1 sm:right-2 md:right-4 top-1/2 transform -translate-y-1/2 p-1.5 sm:p-2 bg-black/70 hover:bg-black/90 rounded-sm transition-all text-white z-10 border border-white/10"
            aria-label="Fechar player"
            title="Fechar"
          >
            <X className="h-3 w-3 sm:h-4 sm:w-4" />
          </button>
        )}
      </div>

      {/* Barra para reabrir quando minimizado */}
      {isMinimized && (
        <div className="bg-dark border-t border-terra-3/20">
          <button
            onClick={toggleMinimize}
            className="w-full py-2 px-4 hover:bg-white/5 transition-all flex items-center justify-center gap-2 text-terra-3 text-sm font-medium"
            aria-label="Expandir player"
          >
            <MusicTooltip />
            <span>Música — clique para expandir</span>
            <Maximize2 className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
};

export default SpotifyPlayer;
