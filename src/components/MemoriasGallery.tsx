import { createPortal } from 'react-dom';
import { useEffect, useRef, useState } from 'react';

type Photo = {
  id: number;
  src: string;
  alt: string;
};

const PHOTOS: Photo[] = [
  { id: 1,  src: '/img/memorias/cruzeiro.jpeg',                            alt: 'Cruzeiro sagrado' },
  { id: 2,  src: '/img/memorias/14-IMG_2803.jpg',                          alt: 'Memória da Casa da Alquimia' },
  { id: 3,  src: '/img/memorias/IMG_1833.JPG',                             alt: 'Registro da jornada' },
  { id: 4,  src: '/img/memorias/64-IMG_2675.jpg',                          alt: 'Ritual coletivo' },
  { id: 5,  src: '/img/memorias/familia.jpg',                              alt: 'Família da Alquimia' },
  { id: 6,  src: '/img/memorias/101-IMG_2594.jpg',                         alt: 'Encontro espiritual' },
  { id: 7,  src: '/img/memorias/B31D10A1-E9C7-4071-87D0-F7D51DE7290D.jpg', alt: 'Memória especial' },
  { id: 8,  src: '/img/memorias/131-IMG_2548.jpg',                         alt: 'Alquimia e natureza' },
  { id: 9,  src: '/img/memorias/26-IMG_2788.jpg',                          alt: 'Momento sagrado' },
  { id: 10, src: '/img/memorias/174-IMG_2435.jpg',                         alt: 'Medicina da floresta' },
  { id: 11, src: '/img/memorias/105-IMG_2590.jpg',                         alt: 'Celebração comunitária' },
  { id: 12, src: '/img/memorias/247-IMG_2171.jpg',                         alt: 'Ritual de encerramento' },
  { id: 13, src: '/img/memorias/113-IMG_2578.jpg',                         alt: 'Conexão com a floresta' },
  { id: 14, src: '/img/memorias/201-IMG_2357.jpg',                         alt: 'Círculo de cura' },
  { id: 15, src: '/img/memorias/124-IMG_2560.jpg',                         alt: 'Caminho sagrado' },
  { id: 16, src: '/img/memorias/298-IMG_2061.jpg',                         alt: 'Tarde na Casa da Alquimia' },
  { id: 17, src: '/img/memorias/153-IMG_2500.jpg',                         alt: 'Presença e silêncio' },
  { id: 18, src: '/img/memorias/223-IMG_2330.jpg',                         alt: 'Momento de integração' },
  { id: 19, src: '/img/memorias/230-IMG_2298.jpg',                         alt: 'Vivência coletiva' },
  { id: 20, src: '/img/memorias/310-IMG_2018.jpg',                         alt: 'Entardecer sagrado' },
];

type TheaterModalProps = {
  photos: Photo[];
  initialIndex: number;
  onClose: () => void;
};

const TheaterModal = ({ photos, initialIndex, onClose }: TheaterModalProps) => {
  const [current, setCurrent] = useState(initialIndex);
  const thumbRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const touchStartX = useRef<number | null>(null);

  const total = photos.length;
  const prev = () => setCurrent((c) => (c - 1 + total) % total);
  const next = () => setCurrent((c) => (c + 1) % total);

  // Scroll lock
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft')  prev();
      if (e.key === 'ArrowRight') next();
      if (e.key === 'Escape')     onClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onClose]);
  // Nota: `prev` e `next` usam functional setState updaters e não capturam estado stale.
  // `onClose` é prop e está listado. Se lint reclamar de `prev`/`next`, ignorar — é seguro.

  // Scroll active thumbnail into view
  useEffect(() => {
    thumbRefs.current[current]?.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'center',
    });
  }, [current]);

  // Touch swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(delta) > 50) delta < 0 ? next() : prev();
    touchStartX.current = null;
  };

  return (
    <div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
      style={{ background: 'rgba(28,28,20,0.96)' }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Click outside to close */}
      <div className="absolute inset-0 -z-10" onClick={onClose} aria-hidden="true" />

      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-5 right-6 text-white/70 hover:text-white text-3xl leading-none bg-transparent border-none cursor-pointer z-10"
        aria-label="Fechar"
      >
        ✕
      </button>

      {/* Counter */}
      <div className="absolute top-5 left-1/2 -translate-x-1/2 text-white/50 text-sm tracking-widest select-none">
        {current + 1} de {total}
      </div>

      {/* Main image area */}
      <div className="flex-1 flex items-center justify-center w-full relative">
        {/* Prev arrow */}
        <button
          onClick={prev}
          className="absolute left-5 top-1/2 -translate-y-1/2 w-12 h-12 rounded-sm flex items-center justify-center text-white text-xl cursor-pointer transition-colors duration-200 border border-white/15 hover:bg-white/[0.18]"
          style={{ background: 'rgba(255,255,255,0.08)' }}
          aria-label="Foto anterior"
        >
          ‹
        </button>

        {/* Photo */}
        <img
          src={photos[current].src}
          alt={photos[current].alt}
          className="rounded-[4px] object-contain"
          style={{
            maxHeight: 'calc(100vh - 180px)',
            maxWidth: 'calc(100vw - 140px)',
          }}
        />

        {/* Next arrow */}
        <button
          onClick={next}
          className="absolute right-5 top-1/2 -translate-y-1/2 w-12 h-12 rounded-sm flex items-center justify-center text-white text-xl cursor-pointer transition-colors duration-200 border border-white/15 hover:bg-white/[0.18]"
          style={{ background: 'rgba(255,255,255,0.08)' }}
          aria-label="Próxima foto"
        >
          ›
        </button>
      </div>

      {/* Thumbnail strip */}
      <div className="flex gap-1.5 px-6 pb-5 overflow-x-auto max-w-full">
        {photos.map((photo, i) => (
          <button
            key={photo.id}
            ref={(el) => { thumbRefs.current[i] = el; }}
            onClick={() => setCurrent(i)}
            className="flex-shrink-0 overflow-hidden rounded-[3px] cursor-pointer bg-transparent border-0 p-0"
            style={{
              width: '52px',
              height: '52px',
              outline: i === current ? '2px solid #C9A84C' : '2px solid transparent',
              outlineOffset: '1px',
            }}
            aria-label={`Ir para foto ${i + 1}`}
          >
            <img src={photo.src} alt={photo.alt} className="w-full h-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
};

const MemoriasGallery = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  return (
    <section id="memorias" className="bg-[#F0F5EC] py-10 md:py-14">
      <div className="text-center mb-10 px-6">
        <h2 className="text-3xl md:text-4xl font-display font-semibold tracking-[0.14em] uppercase text-[#2C2C1E]">
          Memórias
        </h2>
        <div className="w-16 h-0.5 bg-[#C9A84C] mx-auto mt-4" />
      </div>

      {/* Masonry Grid */}
      <div className="px-8 max-w-6xl mx-auto columns-2 sm:columns-3 lg:columns-4 gap-2">
        {PHOTOS.map((photo, index) => (
          <div
            key={photo.id}
            className="break-inside-avoid mb-2 overflow-hidden rounded-[4px] cursor-pointer group relative"
            onClick={() => setSelectedIndex(index)}
          >
            <img
              src={photo.src}
              alt={photo.alt}
              loading="lazy"
              className="block w-full transition-transform duration-[350ms] ease-in-out group-hover:scale-[1.04] group-hover:brightness-[0.85]"
              onError={(e) => {
                const target = e.currentTarget;
                target.style.display = 'none';
                const placeholder = document.createElement('div');
                placeholder.style.cssText = 'width:100%;aspect-ratio:1;background:#e5e7eb;border-radius:4px;';
                target.parentElement?.appendChild(placeholder);
              }}
            />
            <div className="absolute inset-0 bg-[rgba(43,79,140,0)] group-hover:bg-[rgba(43,79,140,0.18)] transition-colors duration-[350ms] rounded-[4px]" />
          </div>
        ))}
      </div>
      {/* Theater Modal */}
      {selectedIndex !== null &&
        createPortal(
          <TheaterModal
            photos={PHOTOS}
            initialIndex={selectedIndex}
            onClose={() => setSelectedIndex(null)}
          />,
          document.body
        )
      }
    </section>
  );
};

export default MemoriasGallery;
