import { ChevronDown, Music2, X } from 'lucide-react';
import React, { useEffect, useState } from 'react';

interface SpotifyPlayerProps {
  playlistId?: string;
}

const SpotifyPlayer: React.FC<SpotifyPlayerProps> = ({
  playlistId = '5gK8vevkgH2nRAw1LuGdCD',
}) => {
  const [showPlayer, setShowPlayer] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false); // nasce aberto
  const [isVisible, setIsVisible] = useState(true);
  const [animate, setAnimate] = useState(false);

  // Restaurar preferência salva
  useEffect(() => {
    const savedMin = localStorage.getItem('spotifyPlayerMinimized');
    const savedVis = localStorage.getItem('spotifyPlayerVisible');
    if (savedMin !== null) setIsMinimized(savedMin === 'true');
    if (savedVis !== null) setIsVisible(savedVis === 'true');
  }, []);

  // Aparece na primeira rolagem
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 150 && !showPlayer) {
        setShowPlayer(true);
        setTimeout(() => setAnimate(true), 50);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [showPlayer]);

  const toggleMinimize = () => {
    const next = !isMinimized;
    setIsMinimized(next);
    localStorage.setItem('spotifyPlayerMinimized', String(next));
  };

  const handleClose = () => {
    setIsVisible(false);
    localStorage.setItem('spotifyPlayerVisible', 'false');
  };

  const handleShow = () => {
    setIsVisible(true);
    setIsMinimized(false);
    localStorage.setItem('spotifyPlayerVisible', 'true');
    localStorage.setItem('spotifyPlayerMinimized', 'false');
  };

  if (!showPlayer) return null;

  // Botão flutuante para reabrir
  if (!isVisible) {
    return (
      <button
        onClick={handleShow}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 bg-dark border border-terra-3/30 text-terra-3 shadow-xl hover:border-terra-3/60 hover:bg-dark/90 transition-all duration-200"
        aria-label="Abrir player de música"
      >
        <Music2 className="h-4 w-4" />
        <span className="font-body text-[10px] font-bold uppercase tracking-[0.2em]">
          Trilha da Alquimia
        </span>
      </button>
    );
  }

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 w-[320px] sm:w-[360px] bg-dark border border-terra-3/20 shadow-2xl transition-all duration-500 ease-out ${
        animate ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/8">
        <div className="flex items-center gap-3">
          <div className="relative flex-shrink-0">
            <Music2 className="h-4 w-4 text-terra-3 relative z-10" />
            {!isMinimized && (
              <span className="absolute inset-0 rounded-full animate-ping bg-terra-3/25 pointer-events-none" />
            )}
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-terra-1 font-body leading-none mb-0.5">
              Trilha da Alquimia
            </p>
            <p className="text-[11px] text-white/40 font-body leading-none">
              Casa da Alquimia
            </p>
          </div>
        </div>

        <div className="flex items-center gap-0.5">
          <button
            onClick={toggleMinimize}
            className="p-2 text-white/40 hover:text-terra-3 transition-colors hover:bg-white/5"
            aria-label={isMinimized ? 'Expandir player' : 'Minimizar player'}
            title={isMinimized ? 'Expandir' : 'Minimizar'}
          >
            <ChevronDown
              className={`h-4 w-4 transition-transform duration-300 ${
                isMinimized ? 'rotate-180' : ''
              }`}
            />
          </button>
          <button
            onClick={handleClose}
            className="p-2 text-white/30 hover:text-white/70 transition-colors hover:bg-white/5"
            aria-label="Fechar player"
            title="Fechar"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Embed Spotify — playlist completa */}
      <div
        className="overflow-hidden transition-all duration-500 ease-in-out"
        style={{ maxHeight: isMinimized ? 0 : 352 }}
      >
        <iframe
          title="Spotify Player - Casa da Alquimia"
          style={{ borderRadius: 0, display: 'block' }}
          src={`https://open.spotify.com/embed/playlist/${playlistId}?utm_source=generator&theme=0`}
          width="100%"
          height="352"
          frameBorder="0"
          allowFullScreen
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
        />
      </div>
    </div>
  );
};

export default SpotifyPlayer;
