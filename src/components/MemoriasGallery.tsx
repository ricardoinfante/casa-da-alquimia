import { useState } from 'react';

type Photo = {
  id: number;
  src: string;
  alt: string;
};

// Curar as fotos desejadas aqui — máximo 20
// ATENÇÃO: verificar o nome exato dos arquivos em /public/img/
// /public/img/         → usa espaços:      "WhatsApp Image 2025-12-28 at 10.46.22.jpeg"
// /public/img/feitio2025/ → usa underscores: "WhatsApp_Image_2025-12-30_at_12.25.03.jpeg"
const PHOTOS: Photo[] = [
  { id: 1,  src: '/img/01.jpeg',                                                alt: 'Momento na Casa da Alquimia' },
  { id: 2,  src: '/img/06.jpeg',                                                alt: 'Ritual sagrado' },
  { id: 3,  src: '/img/07.jpeg',                                                alt: 'Memória do feitio' },
  { id: 4,  src: '/img/08.jpeg',                                                alt: 'Celebração coletiva' },
  { id: 5,  src: '/img/09.jpeg',                                                alt: 'Encontro espiritual' },
  { id: 6,  src: '/img/WhatsApp Image 2025-12-27 at 13.10.59.jpeg',             alt: 'Feitio 2025' },
  { id: 7,  src: '/img/WhatsApp Image 2025-12-28 at 10.46.22.jpeg',             alt: 'Preparação do ritual' },
  { id: 8,  src: '/img/WhatsApp Image 2025-12-28 at 14.16.23.jpeg',             alt: 'Momento de cura' },
  { id: 9,  src: '/img/WhatsApp Image 2025-12-28 at 16.52.36.jpeg',             alt: 'Comunidade reunida' },
  { id: 10, src: '/img/WhatsApp Image 2025-12-29 at 01.22.37.jpeg',             alt: 'Noite de feitio' },
  { id: 11, src: '/img/WhatsApp Image 2025-12-30 at 12.41.30.jpeg',             alt: 'Alquimia e natureza' },
  { id: 12, src: '/img/WhatsApp Image 2025-12-30 at 16.24.27.jpeg',             alt: 'Tarde sagrada' },
  { id: 13, src: '/img/WhatsApp Image 2025-12-30 at 16.24.28.jpeg',             alt: 'Conexão espiritual' },
  { id: 14, src: '/img/WhatsApp Image 2025-12-30 at 16.24.29.jpeg',             alt: 'Memória coletiva' },
  { id: 15, src: '/img/WhatsApp Image 2025-12-30 at 16.24.30.jpeg',             alt: 'Ritual de encerramento' },
  { id: 16, src: '/img/feitio2025/WhatsApp_Image_2025-12-30_at_12.25.03.jpeg',  alt: 'Feitio — momento especial' },
  { id: 17, src: '/img/feitio2025/WhatsApp_Image_2025-12-30_at_16.24.27.jpeg',  alt: 'Feitio — tarde' },
  { id: 18, src: '/img/feitio2025/WhatsApp_Image_2025-12-30_at_16.58.17.jpeg',  alt: 'Feitio — entardecer' },
  { id: 19, src: '/img/feitio2025/WhatsApp_Image_2025-12-30_at_17.28.38.jpeg',  alt: 'Feitio — celebração' },
  { id: 20, src: '/img/feitio2025/WhatsApp_Image_2025-12-29_at_08.24.10.jpeg',  alt: 'Feitio — manhã' },
];

const MemoriasGallery = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  return (
    <section id="memorias" className="bg-[#F0F5EC] py-16 md:py-24">
      <div className="text-center mb-10 px-6">
        <h2 className="text-3xl md:text-4xl font-display font-semibold tracking-[0.14em] uppercase text-[#2C2C1E]">
          Memórias
        </h2>
        <div className="w-16 h-0.5 bg-[#C9A84C] mx-auto mt-4" />
      </div>

      {/* Grid — implementado na Task 4 */}
      <div className="px-8 max-w-6xl mx-auto">
        <p className="text-center text-gray-400 text-sm">Galeria em construção…</p>
      </div>
    </section>
  );
};

export default MemoriasGallery;
