import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ChevronLeft, ChevronRight, Play, X } from 'lucide-react';
import { useEffect, useState } from 'react';

interface MediaItem {
  id: string;
  title: string;
  image: string;
  type: 'image' | 'video';
  videoUrl?: string;
}

const MediaGallery = () => {
  const [selectedItem, setSelectedItem] = useState<MediaItem | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const galleryItems: MediaItem[] = [
    { id: '1', title: 'Turma na Trilha', image: '/img/turmanatrilha.jpeg', type: 'image' },
    { id: '2', title: 'Turma na Trilha 2', image: '/img/turmanatrilha1.jpeg', type: 'image' },
    { id: '3', title: 'Vela na Mesa', image: '/img/velamesa.jpeg', type: 'image' },
    { id: '4', title: 'Serviço da Ayahuasca', image: '/img/serviidodaime.jpeg', type: 'image' },
    { id: '5', title: 'Bruna na Panela', image: '/img/brunapanela.jpeg', type: 'image' },
    { id: '6', title: 'Olho na Panela', image: '/img/olhonapanela.jpeg', type: 'image' },
    { id: '7', title: 'Jagube na Panela', image: '/img/jagubepanela.jpeg', type: 'image' },
    { id: '8', title: 'Foto Final', image: '/img/fotofinal.jpeg', type: 'image' },
    
    // Novas imagens 2026
    { id: '9', title: 'Feitio 2026 - 1', image: '/img/feitio2025/WhatsApp_Image_2026-01-05_at_18.22.56.jpeg', type: 'image' },
    { id: '10', title: 'Feitio 2026 - 2', image: '/img/feitio2025/WhatsApp_Image_2026-01-05_at_18.22.57.jpeg', type: 'image' },
    { id: '11', title: 'Feitio 2026 - 3', image: '/img/feitio2025/WhatsApp_Image_2026-01-05_at_18.22.58.jpeg', type: 'image' },
    { id: '12', title: 'Feitio 2026 - 4', image: '/img/feitio2025/WhatsApp_Image_2026-01-05_at_18.22.59.jpeg', type: 'image' },
    { id: '13', title: 'Feitio 2026 - 5', image: '/img/feitio2025/WhatsApp_Image_2026-01-05_at_18.23.00.jpeg', type: 'image' },
    { id: '14', title: 'Feitio 2026 - 6', image: '/img/feitio2025/WhatsApp_Image_2026-01-05_at_18.23.01.jpeg', type: 'image' },
    { id: '15', title: 'Feitio 2026 - 7', image: '/img/feitio2025/WhatsApp_Image_2026-01-05_at_18.23.02.jpeg', type: 'image' },
    { id: '16', title: 'Feitio 2026 - 8', image: '/img/feitio2025/WhatsApp_Image_2026-01-05_at_18.32.37.jpeg', type: 'image' },
    { id: '17', title: 'Feitio 2026 - 9', image: '/img/feitio2025/WhatsApp_Image_2026-01-05_at_18.32.38.jpeg', type: 'image' },
    { id: '18', title: 'Feitio 2026 - 10', image: '/img/feitio2025/WhatsApp_Image_2026-01-05_at_18.33.10.jpeg', type: 'image' },
    { id: '19', title: 'Feitio 2026 - 11', image: '/img/feitio2025/WhatsApp_Image_2026-01-05_at_18.33.11.jpeg', type: 'image' },
    { id: '20', title: 'Feitio 2026 - 12', image: '/img/feitio2025/WhatsApp_Image_2026-01-05_at_18.33.12.jpeg', type: 'image' },
    { id: '21', title: 'Feitio 2026 - 13', image: '/img/feitio2025/WhatsApp_Image_2026-01-05_at_18.33.13.jpeg', type: 'image' },
    
    // Imagens 2025
    { id: '22', title: 'Feitio 2025 - 1', image: '/img/feitio2025/WhatsApp_Image_2025-12-29_at_08.24.10.jpeg', type: 'image' },
    { id: '23', title: 'Feitio 2025 - 2', image: '/img/feitio2025/WhatsApp_Image_2025-12-30_at_12.25.03.jpeg', type: 'image' },
    { id: '24', title: 'Feitio 2025 - 3', image: '/img/feitio2025/WhatsApp_Image_2025-12-30_at_12.41.30.jpeg', type: 'image' },
    { id: '25', title: 'Feitio 2025 - 4', image: '/img/feitio2025/WhatsApp_Image_2025-12-30_at_16.24.27.jpeg', type: 'image' },
    { id: '26', title: 'Feitio 2025 - 5', image: '/img/feitio2025/WhatsApp_Image_2025-12-30_at_16.24.28.jpeg', type: 'image' },
    { id: '27', title: 'Feitio 2025 - 6', image: '/img/feitio2025/WhatsApp_Image_2025-12-30_at_16.24.29.jpeg', type: 'image' },
    { id: '28', title: 'Feitio 2025 - 7', image: '/img/feitio2025/WhatsApp_Image_2025-12-30_at_16.24.30.jpeg', type: 'image' },
    { id: '29', title: 'Feitio 2025 - 8', image: '/img/feitio2025/WhatsApp_Image_2025-12-30_at_16.58.17.jpeg', type: 'image' },
    { id: '30', title: 'Feitio 2025 - 9', image: '/img/feitio2025/WhatsApp_Image_2025-12-30_at_16.58.21.jpeg', type: 'image' },
    { id: '31', title: 'Feitio 2025 - 10', image: '/img/feitio2025/WhatsApp_Image_2025-12-30_at_17.28.38.jpeg', type: 'image' },
    { id: '32', title: 'Feitio 2025 - 11', image: '/img/feitio2025/WhatsApp_Image_2025-12-30_at_17.28.40.jpeg', type: 'image' },
    { id: '33', title: 'Feitio 2025 - 12', image: '/img/feitio2025/WhatsApp_Image_2025-12-30_at_17.28.41.jpeg', type: 'image' },
    { id: '34', title: 'Feitio 2025 - 13', image: '/img/feitio2025/WhatsApp_Image_2025-12-30_at_17.28.42.jpeg', type: 'image' },

    // Álbum: Virada 2025 — adicionadas automaticamente
    // (gerado a partir da pasta public/img/VIRADA 2025)
    // Se quiser limitar a quantidade ou mudar os títulos, me avise.
    // Lista completa de arquivos incluídos:
    // 1-IMG_2823.jpg, 10-IMG_2807.jpg, 100-IMG_2595.jpg, 101-IMG_2594.jpg, 102-IMG_2593.jpg,
    // 103-IMG_2592.jpg, 104-IMG_2591.jpg, 105-IMG_2590.jpg, 106-IMG_2589.jpg, 107-IMG_2588.jpg,
    // 108-IMG_2587.jpg, 109-IMG_2586.jpg, 11-IMG_2806.jpg, 110-IMG_2581.jpg, 111-IMG_2580.jpg,
    // 112-IMG_2579.jpg, 113-IMG_2578.jpg, 114-IMG_2576.jpg, 115-IMG_2575.jpg, 116-IMG_2573.jpg,
    // 117-IMG_2572.jpg, 118-IMG_2566.jpg, 119-IMG_2565.jpg, 12-IMG_2805.jpg, 120-IMG_2564.jpg,
    // 121-IMG_2563.jpg, 122-IMG_2562.jpg, 123-IMG_2561.jpg, 124-IMG_2560.jpg, 125-IMG_2559.jpg,
    // 126-IMG_2554.jpg, 127-IMG_2553.jpg, 128-IMG_2552.jpg, 129-IMG_2551.jpg, 13-IMG_2804.jpg,
    // 130-IMG_2550.jpg, 131-IMG_2548.jpg, 132-IMG_2546.jpg, 133-IMG_2541.jpg, 134-IMG_2540.jpg,
    // 135-IMG_2537.jpg, 136-IMG_2536.jpg, 137-IMG_2535.jpg, 138-IMG_2534.jpg, 139-IMG_2533.jpg,
    // 14-IMG_2803.jpg, 140-IMG_2532.jpg, 141-IMG_2531.jpg, 142-IMG_2529.jpg, 143-IMG_2528.jpg,
    // 144-IMG_2527.jpg, 145-IMG_2526.jpg, 146-IMG_2525.jpg, 147-IMG_2524.jpg, 148-IMG_2522.jpg,
    // 149-IMG_2521.jpg, 15-IMG_2802.jpg, 150-IMG_2513.jpg, 151-IMG_2503.jpg, 152-IMG_2502.jpg,
    // 153-IMG_2500.jpg, 154-IMG_2498.jpg, 155-IMG_2492.jpg, 156-IMG_2491.jpg, 157-IMG_2490.jpg,
    // 158-IMG_2489.jpg, 159-IMG_2488.jpg, 16-IMG_2801.jpg, 160-IMG_2487.jpg, 161-IMG_2484.jpg,
    // 162-IMG_2483.jpg, 163-IMG_2476.jpg, 164-IMG_2472.jpg, 165-IMG_2470.jpg, 166-IMG_2469.jpg,
    // 167-IMG_2457.jpg, 168-IMG_2450.jpg, 169-IMG_2447.jpg, 17-IMG_2800.jpg, 170-IMG_2444.jpg,
    // 171-IMG_2442.jpg, 172-IMG_2438.jpg, 173-IMG_2437.jpg, 174-IMG_2435.jpg, 175-IMG_2428.jpg,
    // 176-IMG_2427.jpg, 177-IMG_2426.jpg, 178-IMG_2425.jpg, 179-IMG_2421.jpg, 18-IMG_2799.jpg,
    // 180-IMG_2420.jpg, 181-IMG_2419.jpg, 182-IMG_2418.jpg, 183-IMG_2417.jpg, 184-IMG_2416.jpg,
    // 185-IMG_2413.jpg, 186-IMG_2412.jpg, 187-IMG_2411.jpg, 188-IMG_2410.jpg, 189-IMG_2409.jpg,
    // 19-IMG_2798.jpg, 190-IMG_2408.jpg, 191-IMG_2407.jpg, 192-IMG_2406.jpg, 193-IMG_2405.jpg,
    // 194-IMG_2404.jpg, 195-IMG_2403.jpg, 196-IMG_2402.jpg, 197-IMG_2389.jpg, 198-IMG_2386.jpg,
    // 199-IMG_2362.jpg, 2-IMG_2822.jpg, 20-IMG_2797.jpg, 200-IMG_2361.jpg, 201-IMG_2357.jpg,
    // 202-IMG_2356.jpg, 203-IMG_2355.jpg, 204-IMG_2354.jpg, 205-IMG_2351.jpg, 206-IMG_2350.jpg,
    // 207-IMG_2348.jpg, 208-IMG_2346.jpg, 209-IMG_2345.jpg, 21-IMG_2796.jpg, 210-IMG_2344.jpg,
    // 211-IMG_2343.jpg, 212-IMG_2342.jpg, 213-IMG_2341.jpg, 214-IMG_2340.jpg, 215-IMG_2339.jpg,
    // 216-IMG_2338.jpg, 217-IMG_2337.jpg, 218-IMG_2335.jpg, 219-IMG_2334.jpg, 22-IMG_2795.jpg,
    // 220-IMG_2333.jpg, 221-IMG_2332.jpg, 222-IMG_2331.jpg, 223-IMG_2330.jpg, 224-IMG_2325.jpg,
    // 225-IMG_2324.jpg, 226-IMG_2308.jpg, 227-IMG_2307.jpg, 228-IMG_2305.jpg, 229-IMG_2304.jpg,
    // 23-IMG_2794.jpg, 230-IMG_2298.jpg, 231-IMG_2289.jpg, 232-IMG_2288.jpg, 233-IMG_2287.jpg,
    // 234-IMG_2285.jpg, 235-IMG_2282.jpg, 236-IMG_2277.jpg, 237-IMG_2275.jpg, 238-IMG_2266.jpg,
    // 239-IMG_2263.jpg, 24-IMG_2791.jpg, 240-IMG_2255.jpg, 241-IMG_2248.jpg, 242-IMG_2247.jpg,
    // 243-IMG_2246.jpg, 244-IMG_2210.jpg, 245-IMG_2196.jpg, 246-IMG_2195.jpg, 247-IMG_2171.jpg,
    // 248-IMG_2170.jpg, 249-IMG_2148.jpg, 25-IMG_2790.jpg, 250-IMG_2147.jpg, 251-IMG_2146.jpg,
    // 252-IMG_2145.jpg, 253-IMG_2144.jpg, 254-IMG_2141.jpg, 255-IMG_2137.jpg, 256-IMG_2131.jpg,
    // 257-IMG_2130.jpg, 258-IMG_2129.jpg, 259-IMG_2127.jpg, 26-IMG_2788.jpg, 260-IMG_2126.jpg,
    // 261-IMG_2125.jpg, 262-IMG_2124.jpg, 263-IMG_2123.jpg, 264-IMG_2122.jpg, 265-IMG_2117.jpg,
    // 266-IMG_2116.jpg, 267-IMG_2115.jpg, 268-IMG_2112.jpg, 269-IMG_2109.jpg, 27-IMG_2787.jpg,
    // 270-IMG_2108.jpg, 271-IMG_2107.jpg, 272-IMG_2106.jpg, 273-IMG_2104.jpg, 274-IMG_2103.jpg,
    // 275-IMG_2102.jpg, 276-IMG_2100.jpg, 277-IMG_2099.jpg, 278-IMG_2098.jpg, 279-IMG_2097.jpg,
    // 28-IMG_2785.jpg, 280-IMG_2095.jpg, 281-IMG_2090.jpg, 282-IMG_2089.jpg, 283-IMG_2088.jpg,
    // 284-IMG_2086.jpg, 285-IMG_2085.jpg, 286-IMG_2084.jpg, 287-IMG_2083.jpg, 288-IMG_2082.jpg,
    // 289-IMG_2081.jpg, 29-IMG_2780.jpg, 290-IMG_2080.jpg, 291-IMG_2073.jpg, 292-IMG_2072.jpg,
    // 293-IMG_2071.jpg, 294-IMG_2069.jpg, 295-IMG_2068.jpg, 296-IMG_2067.jpg, 297-IMG_2063.jpg,
    // 298-IMG_2061.jpg, 299-IMG_2059.jpg, 3-IMG_2821.jpg, 30-IMG_2779.jpg, 300-IMG_2058.jpg,
    // 301-IMG_2057.jpg, 302-IMG_2056.jpg, 303-IMG_2051.jpg, 304-IMG_2050.jpg, 305-IMG_2048.jpg,
    // 306-IMG_2047.jpg, 307-IMG_2043.jpg, 308-IMG_2021.jpg, 309-IMG_2019.jpg, 31-IMG_2778.jpg,
    // 310-IMG_2018.jpg, 311-IMG_2015.jpg, 312-IMG_2015.jpg, 32-IMG_2777.jpg, 33-IMG_2773.jpg,
    // 34-IMG_2770.jpg, 35-IMG_2769.jpg, 36-IMG_2765.jpg, 37-IMG_2763.jpg, 38-IMG_2761.jpg,
    // 39-IMG_2756.jpg, 4-IMG_2818.jpg, 40-IMG_2755.jpg, 41-IMG_2754.jpg, 42-IMG_2746.jpg,
    // 43-IMG_2745.jpg, 44-IMG_2740.jpg, 45-IMG_2739.jpg, 46-IMG_2738.jpg, 47-IMG_2737.jpg,
    // 48-IMG_2735.jpg, 49-IMG_2734.jpg, 5-IMG_2817.jpg, 50-IMG_2733.jpg, 51-IMG_2728.jpg,
    // 52-IMG_2727.jpg, 53-IMG_2726.jpg, 54-IMG_2725.jpg, 55-IMG_2724.jpg, 56-IMG_2723.jpg,
    // 57-IMG_2722.jpg, 58-IMG_2721.jpg, 59-IMG_2704.jpg, 6-IMG_2816.jpg, 60-IMG_2697.jpg,
    // 61-IMG_2686.jpg, 62-IMG_2685.jpg, 63-IMG_2684.jpg, 64-IMG_2675.jpg, 65-IMG_2674.jpg,
    // 66-IMG_2673.jpg, 67-IMG_2670.jpg, 68-IMG_2669.jpg, 69-IMG_2665.jpg, 7-IMG_2811.jpg,
    // 70-IMG_2664.jpg, 71-IMG_2658.jpg, 72-IMG_2657.jpg, 73-IMG_2651.jpg, 74-IMG_2650.jpg,
    // 75-IMG_2648.jpg, 76-IMG_2647.jpg, 77-IMG_2644.jpg, 78-IMG_2643.jpg, 79-IMG_2642.jpg,
    // 8-IMG_2809.jpg, 80-IMG_2641.jpg, 81-IMG_2630.jpg, 82-IMG_2629.jpg, 83-IMG_2628.jpg,
    // 84-IMG_2626.jpg, 85-IMG_2625.jpg, 86-IMG_2624.jpg, 87-IMG_2623.jpg, 88-IMG_2622.jpg,
    // 89-IMG_2621.jpg, 9-IMG_2808.jpg, 90-IMG_2620.jpg, 91-IMG_2619.jpg, 92-IMG_2618.jpg,
    // 93-IMG_2611.jpg, 94-IMG_2608.jpg, 95-IMG_2607.jpg, 96-IMG_2606.jpg, 97-IMG_2605.jpg,
    // 98-IMG_2603.jpg, 99-IMG_2602.jpg,
    // (mais arquivos podem existir)

    // VIRADA 2025 - itens gerados automaticamente
    { id: 'virada-1', title: 'Virada 2025 - 1', image: '/img/VIRADA 2025/1-IMG_2823.jpg', type: 'image' },
    { id: 'virada-2', title: 'Virada 2025 - 2', image: '/img/VIRADA 2025/10-IMG_2807.jpg', type: 'image' },
    { id: 'virada-3', title: 'Virada 2025 - 3', image: '/img/VIRADA 2025/100-IMG_2595.jpg', type: 'image' },
    { id: 'virada-4', title: 'Virada 2025 - 4', image: '/img/VIRADA 2025/101-IMG_2594.jpg', type: 'image' },
    { id: 'virada-5', title: 'Virada 2025 - 5', image: '/img/VIRADA 2025/102-IMG_2593.jpg', type: 'image' },
    { id: 'virada-6', title: 'Virada 2025 - 6', image: '/img/VIRADA 2025/103-IMG_2592.jpg', type: 'image' },
    { id: 'virada-7', title: 'Virada 2025 - 7', image: '/img/VIRADA 2025/104-IMG_2591.jpg', type: 'image' },
    { id: 'virada-8', title: 'Virada 2025 - 8', image: '/img/VIRADA 2025/105-IMG_2590.jpg', type: 'image' },
    { id: 'virada-9', title: 'Virada 2025 - 9', image: '/img/VIRADA 2025/106-IMG_2589.jpg', type: 'image' },
    { id: 'virada-10', title: 'Virada 2025 - 10', image: '/img/VIRADA 2025/107-IMG_2588.jpg', type: 'image' },
    { id: 'virada-11', title: 'Virada 2025 - 11', image: '/img/VIRADA 2025/108-IMG_2587.jpg', type: 'image' },
    { id: 'virada-12', title: 'Virada 2025 - 12', image: '/img/VIRADA 2025/109-IMG_2586.jpg', type: 'image' },
    { id: 'virada-13', title: 'Virada 2025 - 13', image: '/img/VIRADA 2025/11-IMG_2806.jpg', type: 'image' },
    { id: 'virada-14', title: 'Virada 2025 - 14', image: '/img/VIRADA 2025/110-IMG_2581.jpg', type: 'image' },
    { id: 'virada-15', title: 'Virada 2025 - 15', image: '/img/VIRADA 2025/111-IMG_2580.jpg', type: 'image' },
    { id: 'virada-16', title: 'Virada 2025 - 16', image: '/img/VIRADA 2025/112-IMG_2579.jpg', type: 'image' },
    { id: 'virada-17', title: 'Virada 2025 - 17', image: '/img/VIRADA 2025/113-IMG_2578.jpg', type: 'image' },
    { id: 'virada-18', title: 'Virada 2025 - 18', image: '/img/VIRADA 2025/114-IMG_2576.jpg', type: 'image' },
    { id: 'virada-19', title: 'Virada 2025 - 19', image: '/img/VIRADA 2025/115-IMG_2575.jpg', type: 'image' },
    { id: 'virada-20', title: 'Virada 2025 - 20', image: '/img/VIRADA 2025/116-IMG_2573.jpg', type: 'image' },
    { id: 'virada-21', title: 'Virada 2025 - 21', image: '/img/VIRADA 2025/117-IMG_2572.jpg', type: 'image' },
    { id: 'virada-22', title: 'Virada 2025 - 22', image: '/img/VIRADA 2025/118-IMG_2566.jpg', type: 'image' },
    { id: 'virada-23', title: 'Virada 2025 - 23', image: '/img/VIRADA 2025/119-IMG_2565.jpg', type: 'image' },
    { id: 'virada-24', title: 'Virada 2025 - 24', image: '/img/VIRADA 2025/12-IMG_2805.jpg', type: 'image' },
    { id: 'virada-25', title: 'Virada 2025 - 25', image: '/img/VIRADA 2025/120-IMG_2564.jpg', type: 'image' },
    { id: 'virada-26', title: 'Virada 2025 - 26', image: '/img/VIRADA 2025/121-IMG_2563.jpg', type: 'image' },
    { id: 'virada-27', title: 'Virada 2025 - 27', image: '/img/VIRADA 2025/122-IMG_2562.jpg', type: 'image' },
    { id: 'virada-28', title: 'Virada 2025 - 28', image: '/img/VIRADA 2025/123-IMG_2561.jpg', type: 'image' },
    { id: 'virada-29', title: 'Virada 2025 - 29', image: '/img/VIRADA 2025/124-IMG_2560.jpg', type: 'image' },
    { id: 'virada-30', title: 'Virada 2025 - 30', image: '/img/VIRADA 2025/125-IMG_2559.jpg', type: 'image' },
    
    // Vídeos
    { id: 'video-1', title: 'Feitio 2026 - Vídeo 1', image: '/img/feitio2025/WhatsApp_Video_2026-01-05_at_18.32.58.mp4', videoUrl: '/img/feitio2025/WhatsApp_Video_2026-01-05_at_18.32.58.mp4', type: 'video' },
    { id: 'video-2', title: 'Feitio 2026 - Vídeo 2', image: '/img/feitio2025/WhatsApp_Video_2026-01-05_at_18.33.09.mp4', videoUrl: '/img/feitio2025/WhatsApp_Video_2026-01-05_at_18.33.09.mp4', type: 'video' },
    { id: 'video-3', title: 'Feitio 2025 - Vídeo', image: '/img/feitio2025/WhatsApp_Video_2025-12-30_at_16.24.31.mp4', videoUrl: '/img/feitio2025/WhatsApp_Video_2025-12-30_at_16.24.31.mp4', type: 'video' },
  ];

  const handlePrevious = () => {
    const newIndex = currentIndex === 0 ? galleryItems.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
    setSelectedItem(galleryItems[newIndex]);
  };

  const handleNext = () => {
    const newIndex = currentIndex === galleryItems.length - 1 ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
    setSelectedItem(galleryItems[newIndex]);
  };

  const openMedia = (media: MediaItem, index: number) => {
    console.log('Opening media:', media.title, 'at index:', index);
    setSelectedItem(media);
    setCurrentIndex(index);
  };

  // Navegação por teclado
  useEffect(() => {
    if (!selectedItem) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrevious();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        handleNext();
      } else if (e.key === 'Escape') {
        e.preventDefault();
        setSelectedItem(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedItem, currentIndex]);

  return (
    <section id="media-gallery" className="py-12 md:py-20 bg-gradient-to-b from-background to-secondary/5">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16 animate-in fade-in slide-in-from-top duration-500">
          <div className="inline-block mb-4 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold">
            📷 Galeria de Mídia
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
            Nossas Experiências
          </h2>
          <p className="text-foreground/70 text-lg max-w-2xl mx-auto">
            Explore nossa coleção de momentos especiais de eventos, rituais e experiências transformadoras
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-12">
          {galleryItems.map((item, index) => (
            <div
              key={item.id}
              onClick={() => openMedia(item, index)}
              className="group cursor-pointer animate-in fade-in slide-in-from-bottom duration-500"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-0">
                <div className="relative overflow-hidden aspect-square bg-gray-200">
                  {item.type === 'video' ? (
                    <>
                      <video
                        src={item.videoUrl || item.image}
                        className="w-full h-full object-cover"
                        muted
                        playsInline
                      />
                      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                        <Play className="w-16 h-16 text-white drop-shadow-lg" />
                      </div>
                    </>
                  ) : (
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <p className="text-white font-semibold text-sm">{item.title}</p>
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center p-8 rounded-xl bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10 border border-primary/20 animate-in fade-in slide-in-from-bottom duration-700">
          <h3 className="text-2xl font-bold mb-4">💝 Compartilhe suas experiências</h3>
          <p className="text-foreground/70 mb-6 max-w-xl mx-auto">
            Tem fotos ou vídeos de um evento que participou? Adoraríamos recebê-los!
          </p>
          <a
            href="https://wa.me/5562996538902?text=Olá!%20Gostaria%20de%20compartilhar%20fotos%20de%20um%20evento"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-primary-foreground rounded-full font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300"
          >
            📱 Enviar via WhatsApp
          </a>
        </div>
      </div>

      {/* Modal Lightbox Customizado */}
      {selectedItem && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm"
          onClick={() => setSelectedItem(null)}
        >
          {/* Cabeçalho do Modal */}
          <div className="absolute top-0 left-0 right-0 z-20 p-4 bg-gradient-to-b from-black/80 to-transparent">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
              <div className="text-white">
                <h3 className="text-xl md:text-2xl font-bold mb-1">{selectedItem.title}</h3>
                <p className="text-sm text-white/70">
                  {currentIndex + 1} de {galleryItems.length}
                </p>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedItem(null);
                }}
                className="text-white hover:text-primary transition-colors p-2 hover:bg-white/10 rounded-full"
              >
                <X className="w-8 h-8" />
              </button>
            </div>
          </div>

          {/* Área da Imagem/Vídeo */}
          <div 
            className="absolute inset-0 flex items-center justify-center pt-24 pb-32 px-4 md:px-8"
            style={{ pointerEvents: 'none' }}
          >
            <div className="relative w-full h-full flex items-center justify-center" style={{ pointerEvents: 'auto' }}>
              {selectedItem.type === 'video' ? (
                <video
                  src={selectedItem.videoUrl || selectedItem.image}
                  controls
                  autoPlay
                  className="max-w-full max-h-full object-contain rounded-lg shadow-2xl bg-black"
                  style={{ maxHeight: 'calc(100vh - 200px)', zIndex: 5 }}
                  key={selectedItem.id}
                />
              ) : (
                <img
                  src={selectedItem.image}
                  alt={selectedItem.title}
                  className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                  style={{ maxHeight: 'calc(100vh - 200px)', zIndex: 5 }}
                  key={selectedItem.id}
                  onError={(e) => {
                    console.error('Erro ao carregar imagem:', selectedItem.image);
                    e.currentTarget.style.border = '2px solid red';
                  }}
                  onLoad={() => console.log('Imagem carregada:', selectedItem.image)}
                />
              )}

              {/* Botão Anterior */}
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white shadow-xl rounded-full w-12 h-12 md:w-14 md:h-14 z-10"
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrevious();
                }}
              >
                <ChevronLeft className="w-6 h-6 md:w-8 md:h-8 text-black" />
              </Button>

              {/* Botão Próximo */}
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white shadow-xl rounded-full w-12 h-12 md:w-14 md:h-14 z-10"
                onClick={(e) => {
                  e.stopPropagation();
                  handleNext();
                }}
              >
                <ChevronRight className="w-6 h-6 md:w-8 md:h-8 text-black" />
              </Button>
            </div>
          </div>

          {/* Thumbnails na parte inferior */}
          <div className="absolute bottom-0 left-0 right-0 z-20 p-4 bg-gradient-to-t from-black/80 to-transparent">
            <div className="max-w-7xl mx-auto">
              <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
                {galleryItems.map((item, idx) => (
                  <button
                    key={item.id}
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentIndex(idx);
                      setSelectedItem(item);
                    }}
                    className={`flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden border-2 transition-all hover:scale-105 ${
                      currentIndex === idx
                        ? 'border-primary ring-2 ring-primary/50 scale-105'
                        : 'border-white/20 hover:border-white/50'
                    }`}
                  >
                    {item.type === 'video' ? (
                      <div className="w-full h-full bg-gray-900 flex items-center justify-center relative">
                        <video
                          src={item.videoUrl || item.image}
                          className="w-full h-full object-cover"
                          muted
                        />
                        <Play className="absolute w-6 h-6 text-white" />
                      </div>
                    ) : (
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default MediaGallery;
