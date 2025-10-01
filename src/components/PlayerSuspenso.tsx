import { useState } from "react";
import { FaSpotify } from "react-icons/fa";

const SPOTIFY_PLAYLIST_URL = "https://open.spotify.com/playlist/5gK8vevkgH2nRAw1LuGdCD?si=qy1XoKc3SHWxCCb9pO3egw";

const POSICOES = [
  { bottom: '6', left: '1/2', translateX: '-1/2', right: 'auto', top: 'auto' },
  { top: '6', left: '1/2', translateX: '-1/2', bottom: 'auto', right: 'auto' },
  { bottom: '6', right: '6', left: 'auto', translateX: '0', top: 'auto' },
  { top: '6', right: '6', left: 'auto', translateX: '0', bottom: 'auto' },
  { bottom: '6', left: '6', right: 'auto', translateX: '0', top: 'auto' },
  { top: '6', left: '6', right: 'auto', translateX: '0', bottom: 'auto' },
];

const PlayerSuspenso = () => {
  const [pos, setPos] = useState(0);
  const posicao = POSICOES[pos];

  return (
    <div
      className={`fixed z-50 bg-gradient-to-r from-green-500/80 via-green-700/80 to-emerald-800/80 shadow-2xl rounded-2xl flex flex-col md:flex-row items-center px-2 md:px-4 py-2 gap-4 md:gap-3 border border-green-700/40 backdrop-blur-lg animate-fade-in cursor-move`}
      style={{
        bottom: posicao.bottom !== 'auto' ? `${posicao.bottom}rem` : undefined,
        top: posicao.top !== 'auto' ? `${posicao.top}rem` : undefined,
        left: posicao.left !== 'auto' ? (posicao.left === '1/2' ? '50%' : `${posicao.left}rem`) : undefined,
        right: posicao.right !== 'auto' ? `${posicao.right}rem` : undefined,
        transform: posicao.translateX === '-1/2' ? 'translateX(-50%)' : undefined,
      }}
      onClick={() => setPos((p) => (p + 1) % POSICOES.length)}
      title="Clique para mover o player"
    >
      <div className="flex items-center gap-3 mb-2 md:mb-0">
        <FaSpotify className="text-3xl md:text-4xl text-green-400" />
        <span className="font-bold text-lg md:text-xl text-white"></span>
      </div>
      <iframe
        src="https://open.spotify.com/embed/playlist/5gK8vevkgH2nRAw1LuGdCD?utm_source=generator&theme=0"
        width="320"
        height="80"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
        className="rounded-lg border border-green-700/30 shadow-md"
        title="Spotify Playlist"
      ></iframe>
      <span className="hidden md:inline text-white/80 text-sm font-medium ml-4"></span>
    </div>
  );
};

export default PlayerSuspenso;
