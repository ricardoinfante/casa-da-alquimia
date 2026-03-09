import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight, Grid, Image as ImageIcon, Play, X } from 'lucide-react';
import { useEffect, useState } from 'react';

interface MediaItem {
  id: string;
  title: string;
  description: string;
  image: string;
  images: string[];
  type: 'image' | 'video';
  category: 'feitio2025' | 'geral' | 'eventos' | 'novoalbum';
  date: string;
  photographer?: string;
}

const LibraryGallery = () => {
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Virada 2025 — dividir em sub-álbuns de 50 imagens
  const viradaFilenames: string[] = [
    '1-IMG_2823.jpg','10-IMG_2807.jpg','100-IMG_2595.jpg','101-IMG_2594.jpg','102-IMG_2593.jpg','103-IMG_2592.jpg','104-IMG_2591.jpg','105-IMG_2590.jpg','106-IMG_2589.jpg','107-IMG_2588.jpg','108-IMG_2587.jpg','109-IMG_2586.jpg','11-IMG_2806.jpg','110-IMG_2581.jpg','111-IMG_2580.jpg','112-IMG_2579.jpg','113-IMG_2578.jpg','114-IMG_2576.jpg','115-IMG_2575.jpg','116-IMG_2573.jpg','117-IMG_2572.jpg','118-IMG_2566.jpg','119-IMG_2565.jpg','12-IMG_2805.jpg','120-IMG_2564.jpg','121-IMG_2563.jpg','122-IMG_2562.jpg','123-IMG_2561.jpg','124-IMG_2560.jpg','125-IMG_2559.jpg','126-IMG_2554.jpg','127-IMG_2553.jpg','128-IMG_2552.jpg','129-IMG_2551.jpg','13-IMG_2804.jpg','130-IMG_2550.jpg','131-IMG_2548.jpg','132-IMG_2546.jpg','133-IMG_2541.jpg','134-IMG_2540.jpg','135-IMG_2537.jpg','136-IMG_2536.jpg','137-IMG_2535.jpg','138-IMG_2534.jpg','139-IMG_2533.jpg','14-IMG_2803.jpg','140-IMG_2532.jpg','141-IMG_2531.jpg','142-IMG_2529.jpg','143-IMG_2528.jpg','144-IMG_2527.jpg','145-IMG_2526.jpg','146-IMG_2525.jpg','147-IMG_2524.jpg','148-IMG_2522.jpg','149-IMG_2521.jpg','15-IMG_2802.jpg','150-IMG_2513.jpg','151-IMG_2503.jpg','152-IMG_2502.jpg','153-IMG_2500.jpg','154-IMG_2498.jpg','155-IMG_2492.jpg','156-IMG_2491.jpg','157-IMG_2490.jpg','158-IMG_2489.jpg','159-IMG_2488.jpg','16-IMG_2801.jpg','160-IMG_2487.jpg','161-IMG_2484.jpg','162-IMG_2483.jpg','163-IMG_2476.jpg','164-IMG_2472.jpg','165-IMG_2470.jpg','166-IMG_2469.jpg','167-IMG_2457.jpg','168-IMG_2450.jpg','169-IMG_2447.jpg','17-IMG_2800.jpg','170-IMG_2444.jpg','171-IMG_2442.jpg','172-IMG_2438.jpg','173-IMG_2437.jpg','174-IMG_2435.jpg','175-IMG_2428.jpg','176-IMG_2427.jpg','177-IMG_2426.jpg','178-IMG_2425.jpg','179-IMG_2421.jpg','18-IMG_2799.jpg','180-IMG_2420.jpg','181-IMG_2419.jpg','182-IMG_2418.jpg','183-IMG_2417.jpg','184-IMG_2416.jpg','185-IMG_2413.jpg','186-IMG_2412.jpg','187-IMG_2411.jpg','188-IMG_2410.jpg','189-IMG_2409.jpg','19-IMG_2798.jpg','190-IMG_2408.jpg','191-IMG_2407.jpg','192-IMG_2406.jpg','193-IMG_2405.jpg','194-IMG_2404.jpg','195-IMG_2403.jpg','196-IMG_2402.jpg','197-IMG_2389.jpg','198-IMG_2386.jpg','199-IMG_2362.jpg','2-IMG_2822.jpg','20-IMG_2797.jpg','200-IMG_2361.jpg','201-IMG_2357.jpg','202-IMG_2356.jpg','203-IMG_2355.jpg','204-IMG_2354.jpg','205-IMG_2351.jpg','206-IMG_2350.jpg','207-IMG_2348.jpg','208-IMG_2346.jpg','209-IMG_2345.jpg','21-IMG_2796.jpg','210-IMG_2344.jpg','211-IMG_2343.jpg','212-IMG_2342.jpg','213-IMG_2341.jpg','214-IMG_2340.jpg','215-IMG_2339.jpg','216-IMG_2338.jpg','217-IMG_2337.jpg','218-IMG_2335.jpg','219-IMG_2334.jpg','22-IMG_2795.jpg','220-IMG_2333.jpg','221-IMG_2332.jpg','222-IMG_2331.jpg','223-IMG_2330.jpg','224-IMG_2325.jpg','225-IMG_2324.jpg','226-IMG_2308.jpg','227-IMG_2307.jpg','228-IMG_2305.jpg','229-IMG_2304.jpg','23-IMG_2794.jpg','230-IMG_2298.jpg','231-IMG_2289.jpg','232-IMG_2288.jpg','233-IMG_2287.jpg','234-IMG_2285.jpg','235-IMG_2282.jpg','236-IMG_2277.jpg','237-IMG_2275.jpg','238-IMG_2266.jpg','239-IMG_2263.jpg','24-IMG_2791.jpg','240-IMG_2255.jpg','241-IMG_2248.jpg','242-IMG_2247.jpg','243-IMG_2246.jpg','244-IMG_2210.jpg','245-IMG_2196.jpg','246-IMG_2195.jpg','247-IMG_2171.jpg','248-IMG_2170.jpg','249-IMG_2148.jpg','25-IMG_2790.jpg','250-IMG_2147.jpg','251-IMG_2146.jpg','252-IMG_2145.jpg','253-IMG_2144.jpg','254-IMG_2141.jpg','255-IMG_2137.jpg','256-IMG_2131.jpg','257-IMG_2130.jpg','258-IMG_2129.jpg','259-IMG_2127.jpg','26-IMG_2788.jpg','260-IMG_2126.jpg','261-IMG_2125.jpg','262-IMG_2124.jpg','263-IMG_2123.jpg','264-IMG_2122.jpg','265-IMG_2117.jpg','266-IMG_2116.jpg','267-IMG_2115.jpg','268-IMG_2112.jpg','269-IMG_2109.jpg','27-IMG_2787.jpg','270-IMG_2108.jpg','271-IMG_2107.jpg','272-IMG_2106.jpg','273-IMG_2104.jpg','274-IMG_2103.jpg','275-IMG_2102.jpg','276-IMG_2100.jpg','277-IMG_2099.jpg','278-IMG_2098.jpg','279-IMG_2097.jpg','28-IMG_2785.jpg','280-IMG_2095.jpg','281-IMG_2090.jpg','282-IMG_2089.jpg','283-IMG_2088.jpg','284-IMG_2086.jpg','285-IMG_2085.jpg','286-IMG_2084.jpg','287-IMG_2083.jpg','288-IMG_2082.jpg','289-IMG_2081.jpg','29-IMG_2780.jpg','290-IMG_2080.jpg','291-IMG_2073.jpg','292-IMG_2072.jpg','293-IMG_2071.jpg','294-IMG_2069.jpg','295-IMG_2068.jpg','296-IMG_2067.jpg','297-IMG_2063.jpg','298-IMG_2061.jpg','299-IMG_2059.jpg','3-IMG_2821.jpg','30-IMG_2779.jpg','300-IMG_2058.jpg','301-IMG_2057.jpg','302-IMG_2056.jpg','303-IMG_2051.jpg','304-IMG_2050.jpg','305-IMG_2048.jpg','306-IMG_2047.jpg','307-IMG_2043.jpg','308-IMG_2021.jpg','309-IMG_2019.jpg','31-IMG_2778.jpg','310-IMG_2018.jpg','311-IMG_2015.jpg','312-IMG_2015.jpg','32-IMG_2777.jpg','33-IMG_2773.jpg','34-IMG_2770.jpg','35-IMG_2769.jpg','36-IMG_2765.jpg','37-IMG_2763.jpg','38-IMG_2761.jpg','39-IMG_2756.jpg','4-IMG_2818.jpg','40-IMG_2755.jpg','41-IMG_2754.jpg','42-IMG_2746.jpg','43-IMG_2745.jpg','44-IMG_2740.jpg','45-IMG_2739.jpg','46-IMG_2738.jpg','47-IMG_2737.jpg','48-IMG_2735.jpg','49-IMG_2734.jpg','5-IMG_2817.jpg','50-IMG_2733.jpg','51-IMG_2728.jpg','52-IMG_2727.jpg','53-IMG_2726.jpg','54-IMG_2725.jpg','55-IMG_2724.jpg','56-IMG_2723.jpg','57-IMG_2722.jpg','58-IMG_2721.jpg','59-IMG_2704.jpg','6-IMG_2816.jpg','60-IMG_2697.jpg','61-IMG_2686.jpg','62-IMG_2685.jpg','63-IMG_2684.jpg','64-IMG_2675.jpg','65-IMG_2674.jpg','66-IMG_2673.jpg','67-IMG_2670.jpg','68-IMG_2669.jpg','69-IMG_2665.jpg','7-IMG_2811.jpg','70-IMG_2664.jpg','71-IMG_2658.jpg','72-IMG_2657.jpg','73-IMG_2651.jpg','74-IMG_2650.jpg','75-IMG_2648.jpg','76-IMG_2647.jpg','77-IMG_2644.jpg','78-IMG_2643.jpg','79-IMG_2642.jpg','8-IMG_2809.jpg','80-IMG_2641.jpg','81-IMG_2630.jpg','82-IMG_2629.jpg','83-IMG_2628.jpg','84-IMG_2626.jpg','85-IMG_2625.jpg','86-IMG_2624.jpg','87-IMG_2623.jpg','88-IMG_2622.jpg','89-IMG_2621.jpg','9-IMG_2808.jpg','90-IMG_2620.jpg','91-IMG_2619.jpg','92-IMG_2618.jpg','93-IMG_2611.jpg','94-IMG_2608.jpg','95-IMG_2607.jpg','96-IMG_2606.jpg','97-IMG_2605.jpg','98-IMG_2603.jpg','99-IMG_2602.jpg'
  ];

  const chunk = (arr: string[], size: number) => {
    const res: string[][] = [];
    for (let i = 0; i < arr.length; i += size) res.push(arr.slice(i, i + size));
    return res;
  };

  const viradaChunks = chunk(viradaFilenames, 50);

  const viradaAlbums: MediaItem[] = viradaChunks.map((files, idx) => ({
    id: `virada-2025-part-${idx + 1}`,
    title: `Virada 2025 — Parte ${idx + 1}`,
    description: `Registros da Virada 2025 — Parte ${idx + 1}`,
    image: `/img/VIRADA 2025/${files[0]}`,
    images: files.map((f) => `/img/VIRADA 2025/${f}`),
    type: 'image',
    category: 'eventos',
    date: '2025',
    photographer: 'Casa da Alquimia',
  }));

  // Novo Álbum — pasta `novoalbum` (adicionada)
  const novoAlbumFilenames: string[] = [
    'WhatsApp Image 2026-01-02 at 13.15.32.jpeg',
    'WhatsApp Image 2026-01-02 at 13.15.43.jpeg',
    'WhatsApp Image 2026-01-02 at 13.15.57.jpeg',
    'WhatsApp Image 2026-01-02 at 13.16.11.jpeg',
    'WhatsApp Image 2026-01-02 at 13.16.27.jpeg',
    'WhatsApp Image 2026-01-02 at 13.16.37.jpeg',
    'WhatsApp Image 2026-01-02 at 13.16.58.jpeg',
    'WhatsApp Image 2026-01-02 at 13.17.13.jpeg',
    'WhatsApp Image 2026-01-02 at 13.17.28.jpeg',
    'WhatsApp Image 2026-01-02 at 13.17.38.jpeg',
    'WhatsApp Image 2026-01-02 at 13.18.39.jpeg',
    'WhatsApp Image 2026-01-02 at 13.22.16.jpeg',
    'WhatsApp Image 2026-01-02 at 13.23.31.jpeg',
    'WhatsApp Image 2026-01-02 at 13.23.54.jpeg',
    'WhatsApp Image 2026-01-02 at 13.24.57.jpeg',
    'WhatsApp Image 2026-01-02 at 13.25.20.jpeg',
    'WhatsApp Image 2026-01-02 at 13.25.40.jpeg',
    'WhatsApp Image 2026-01-02 at 13.40.31.jpeg',
    'WhatsApp Image 2026-01-03 at 03.09.17.jpeg',
    'WhatsApp Image 2026-01-03 at 03.09.19.jpeg',
    'WhatsApp Image 2026-01-03 at 04.20.01.jpeg',
    'WhatsApp Image 2026-01-03 at 04.20.02(1).jpeg',
    'WhatsApp Image 2026-01-03 at 04.20.02(2).jpeg',
    'WhatsApp Image 2026-01-03 at 04.20.02.jpeg',
    'WhatsApp Image 2026-01-03 at 04.20.03(1).jpeg',
    'WhatsApp Image 2026-01-03 at 04.20.03.jpeg',
    'WhatsApp Image 2026-01-03 at 04.20.04(1).jpeg',
    'WhatsApp Image 2026-01-03 at 04.20.04.jpeg',
    'WhatsApp Image 2026-01-03 at 04.20.05(1).jpeg',
    'WhatsApp Image 2026-01-03 at 04.20.05(2).jpeg',
    'WhatsApp Image 2026-01-03 at 04.20.05.jpeg',
    'WhatsApp Image 2026-01-03 at 12.35.49.jpeg',
    'WhatsApp Image 2026-01-03 at 12.51.32.jpeg',
    'WhatsApp Image 2026-01-04 at 21.19.42.jpeg',
    'WhatsApp Image 2026-01-04 at 21.19.43(1).jpeg',
    'WhatsApp Image 2026-01-04 at 21.19.43.jpeg',
    'WhatsApp Image 2026-01-04 at 21.19.44.jpeg',
    'WhatsApp Image 2026-01-04 at 21.19.45(1).jpeg',
    'WhatsApp Image 2026-01-04 at 21.19.45(2).jpeg',
    'WhatsApp Image 2026-01-04 at 21.19.45.jpeg',
    'WhatsApp Image 2026-01-04 at 21.19.46(1).jpeg',
    'WhatsApp Image 2026-01-04 at 21.19.46.jpeg',
    'WhatsApp Image 2026-01-04 at 21.19.47(1).jpeg',
    'WhatsApp Image 2026-01-04 at 21.19.47.jpeg',
    'WhatsApp Image 2026-01-04 at 21.19.48(1).jpeg',
    'WhatsApp Image 2026-01-04 at 21.19.48.jpeg',
    'WhatsApp Image 2026-01-04 at 21.19.49(1).jpeg',
    'WhatsApp Image 2026-01-04 at 21.19.49.jpeg',
    'WhatsApp Image 2026-01-04 at 21.19.50(1).jpeg',
    'WhatsApp Image 2026-01-04 at 21.19.50.jpeg',
    'WhatsApp Image 2026-01-04 at 21.19.51(1).jpeg',
    'WhatsApp Image 2026-01-04 at 21.19.51.jpeg',
    'WhatsApp Image 2026-01-04 at 21.19.52(1).jpeg',
    'WhatsApp Image 2026-01-04 at 21.19.52.jpeg',
    'WhatsApp Image 2026-01-04 at 21.19.53(1).jpeg',
    'WhatsApp Image 2026-01-04 at 21.19.53.jpeg',
    'WhatsApp Image 2026-01-04 at 21.19.54.jpeg',
    'WhatsApp Image 2026-01-04 at 21.19.55(1).jpeg',
    'WhatsApp Image 2026-01-04 at 21.19.55(2).jpeg',
    'WhatsApp Image 2026-01-04 at 21.19.55.jpeg',
    'WhatsApp Image 2026-01-04 at 21.19.56.jpeg',
    'WhatsApp Image 2026-01-04 at 21.19.57(1).jpeg',
    'WhatsApp Image 2026-01-04 at 21.19.57(2).jpeg',
    'WhatsApp Image 2026-01-04 at 21.19.57.jpeg',
    'WhatsApp Image 2026-01-04 at 21.19.58(1).jpeg',
    'WhatsApp Image 2026-01-04 at 21.19.58.jpeg',
    'WhatsApp Image 2026-01-04 at 21.19.59(1).jpeg',
    'WhatsApp Image 2026-01-04 at 21.19.59.jpeg',
    'WhatsApp Image 2026-01-04 at 21.20.00.jpeg',
    'WhatsApp Image 2026-01-04 at 21.40.47(1).jpeg',
    'WhatsApp Image 2026-01-04 at 21.40.47(2).jpeg',
    'WhatsApp Image 2026-01-04 at 21.40.47(3).jpeg',
    'WhatsApp Image 2026-01-04 at 21.40.47.jpeg',
    'WhatsApp Image 2026-01-04 at 21.40.48(1).jpeg',
    'WhatsApp Image 2026-01-04 at 21.40.48(2).jpeg',
    'WhatsApp Image 2026-01-04 at 21.40.48.jpeg',
    'WhatsApp Image 2026-01-04 at 21.40.49(1).jpeg',
    'WhatsApp Image 2026-01-04 at 21.40.49(2).jpeg',
    'WhatsApp Image 2026-01-04 at 21.40.49.jpeg',
    'WhatsApp Image 2026-01-05 at 18.22.54.jpeg',
    'WhatsApp Image 2026-01-06 at 11.40.28.jpeg',
    'WhatsApp Image 2026-01-06 at 22.29.24(1).jpeg',
    'WhatsApp Image 2026-01-06 at 22.29.24.jpeg',
    'WhatsApp Image 2026-01-06 at 22.29.25(1).jpeg',
    'WhatsApp Image 2026-01-06 at 22.29.25(2).jpeg',
    'WhatsApp Image 2026-01-06 at 22.29.25.jpeg',
    'WhatsApp Image 2026-01-06 at 22.29.26(1).jpeg',
    'WhatsApp Image 2026-01-06 at 22.29.26.jpeg',
    'WhatsApp Image 2026-01-07 at 11.34.15.jpeg',
    'WhatsApp Image 2026-01-07 at 14.11.01.jpeg',
    'WhatsApp Image 2026-01-07 at 14.11.02(1).jpeg',
    'WhatsApp Image 2026-01-07 at 14.11.02.jpeg',
    'WhatsApp Image 2026-01-07 at 14.15.20(1).jpeg',
    'WhatsApp Image 2026-01-07 at 14.15.20.jpeg',
    'WhatsApp Image 2026-01-07 at 14.15.26(1).jpeg',
    'WhatsApp Image 2026-01-07 at 14.15.26.jpeg',
    'WhatsApp Image 2026-01-07 at 14.15.27(1).jpeg',
    'WhatsApp Image 2026-01-07 at 14.15.27.jpeg',
    'WhatsApp Image 2026-01-07 at 14.15.28.jpeg',
    'WhatsApp Image 2026-01-07 at 16.40.15.jpeg'
  ];

  const novoAlbum: MediaItem = {
    id: 'novoalbum-1',
    title: 'Novo Álbum',
    description: 'Seleção de imagens do Novo Álbum',
    image: `/img/novoalbum/${novoAlbumFilenames[0]}`,
    images: novoAlbumFilenames.map((f) => `/img/novoalbum/${f}`),
    type: 'image',
    category: 'novoalbum',
    date: '2026',
    photographer: 'Casa da Alquimia',
  };

  // Galeria de mídia com imagens reais
  const mediaItems: MediaItem[] = [
    // Feitio 2026 - Janeiro
    {
      id: 'feitio2026-1',
      title: 'Feitio 2026 - Celebração',
      description: 'Novas memórias do feitio de Janeiro 2026',
      image: '/img/feitio2025/WhatsApp_Image_2026-01-05_at_18.22.56.jpeg',
      images: [
        '/img/feitio2025/WhatsApp_Image_2026-01-05_at_18.22.56.jpeg',
        '/img/feitio2025/WhatsApp_Image_2026-01-05_at_18.22.57.jpeg',
        '/img/feitio2025/WhatsApp_Image_2026-01-05_at_18.22.57(1).jpeg',
        '/img/feitio2025/WhatsApp_Image_2026-01-05_at_18.22.57(2).jpeg',
        '/img/feitio2025/WhatsApp_Image_2026-01-05_at_18.22.58.jpeg',
        '/img/feitio2025/WhatsApp_Image_2026-01-05_at_18.22.58(1).jpeg',
        '/img/feitio2025/WhatsApp_Image_2026-01-05_at_18.22.58(2).jpeg',
        '/img/feitio2025/WhatsApp_Image_2026-01-05_at_18.22.58(3).jpeg',
      ],
      type: 'image',
      category: 'feitio2025',
      date: '05/01/2026',
      photographer: 'Casa da Alquimia',
    },
    {
      id: 'feitio2026-2',
      title: 'Feitio 2026 - União',
      description: 'Momentos de união e trabalho coletivo',
      image: '/img/feitio2025/WhatsApp_Image_2026-01-05_at_18.22.59.jpeg',
      images: [
        '/img/feitio2025/WhatsApp_Image_2026-01-05_at_18.22.59.jpeg',
        '/img/feitio2025/WhatsApp_Image_2026-01-05_at_18.22.59(1).jpeg',
        '/img/feitio2025/WhatsApp_Image_2026-01-05_at_18.23.00.jpeg',
        '/img/feitio2025/WhatsApp_Image_2026-01-05_at_18.23.00(1).jpeg',
        '/img/feitio2025/WhatsApp_Image_2026-01-05_at_18.23.00(2).jpeg',
        '/img/feitio2025/WhatsApp_Image_2026-01-05_at_18.23.00(3).jpeg',
        '/img/feitio2025/WhatsApp_Image_2026-01-05_at_18.23.01.jpeg',
        '/img/feitio2025/WhatsApp_Image_2026-01-05_at_18.23.01(1).jpeg',
        '/img/feitio2025/WhatsApp_Image_2026-01-05_at_18.23.01(2).jpeg',
      ],
      type: 'image',
      category: 'feitio2025',
      date: '05/01/2026',
      photographer: 'Casa da Alquimia',
    },
    {
      id: 'feitio2026-3',
      title: 'Feitio 2026 - Finalização',
      description: 'Últimos momentos do feitio sagrado',
      image: '/img/feitio2025/WhatsApp_Image_2026-01-05_at_18.23.02.jpeg',
      images: [
        '/img/feitio2025/WhatsApp_Image_2026-01-05_at_18.23.02.jpeg',
        '/img/feitio2025/WhatsApp_Image_2026-01-05_at_18.23.02(1).jpeg',
        '/img/feitio2025/WhatsApp_Image_2026-01-05_at_18.32.37.jpeg',
        '/img/feitio2025/WhatsApp_Image_2026-01-05_at_18.32.38.jpeg',
        '/img/feitio2025/WhatsApp_Image_2026-01-05_at_18.33.10.jpeg',
        '/img/feitio2025/WhatsApp_Image_2026-01-05_at_18.33.11.jpeg',
        '/img/feitio2025/WhatsApp_Image_2026-01-05_at_18.33.11(1).jpeg',
        '/img/feitio2025/WhatsApp_Image_2026-01-05_at_18.33.11(2).jpeg',
        '/img/feitio2025/WhatsApp_Image_2026-01-05_at_18.33.12.jpeg',
        '/img/feitio2025/WhatsApp_Image_2026-01-05_at_18.33.12(1).jpeg',
        '/img/feitio2025/WhatsApp_Image_2026-01-05_at_18.33.13.jpeg',
      ],
      type: 'image',
      category: 'feitio2025',
      date: '05/01/2026',
      photographer: 'Casa da Alquimia',
    },
    {
      id: 'feitio2026-video-1',
      title: 'Feitio 2026 - Vídeo 1',
      description: 'Registro em vídeo do processo',
      image: '/img/feitio2025/WhatsApp_Video_2026-01-05_at_18.32.58.mp4',
      images: ['/img/feitio2025/WhatsApp_Video_2026-01-05_at_18.32.58.mp4'],
      type: 'video',
      category: 'feitio2025',
      date: '05/01/2026',
      photographer: 'Casa da Alquimia',
    },
    {
      id: 'feitio2026-video-2',
      title: 'Feitio 2026 - Vídeo 2',
      description: 'Mais momentos em vídeo',
      image: '/img/feitio2025/WhatsApp_Video_2026-01-05_at_18.33.09.mp4',
      images: ['/img/feitio2025/WhatsApp_Video_2026-01-05_at_18.33.09.mp4'],
      type: 'video',
      category: 'feitio2025',
      date: '05/01/2026',
      photographer: 'Casa da Alquimia',
    },
    // Feitio 2025 - Dezembro
    {
      id: 'feitio2025-1',
      title: 'Feitio 2025 - Dezembro',
      description: 'Imagens do feitio de dezembro',
      image: '/img/feitio2025/WhatsApp_Image_2025-12-30_at_16.24.27.jpeg',
      images: [
        '/img/feitio2025/WhatsApp_Image_2025-12-30_at_16.24.27.jpeg',
        '/img/feitio2025/WhatsApp_Image_2025-12-30_at_16.24.28.jpeg',
        '/img/feitio2025/WhatsApp_Image_2025-12-30_at_16.24.28(1).jpeg',
        '/img/feitio2025/WhatsApp_Image_2025-12-30_at_16.24.28(2).jpeg',
        '/img/feitio2025/WhatsApp_Image_2025-12-30_at_16.24.29.jpeg',
        '/img/feitio2025/WhatsApp_Image_2025-12-30_at_16.24.29(1).jpeg',
        '/img/feitio2025/WhatsApp_Image_2025-12-30_at_16.24.30.jpeg',
        '/img/feitio2025/WhatsApp_Image_2025-12-30_at_16.24.30(1).jpeg',
      ],
      type: 'image',
      category: 'feitio2025',
      date: '30/12/2025',
      photographer: 'Casa da Alquimia',
    },
    {
      id: 'feitio2025-2',
      title: 'Feitio 2025 - Preparação Final',
      description: 'Últimas etapas do feitio de dezembro',
      image: '/img/feitio2025/WhatsApp_Image_2025-12-30_at_16.58.17.jpeg',
      images: [
        '/img/feitio2025/WhatsApp_Image_2025-12-30_at_16.58.17.jpeg',
        '/img/feitio2025/WhatsApp_Image_2025-12-30_at_16.58.21.jpeg',
        '/img/feitio2025/WhatsApp_Image_2025-12-30_at_17.28.38.jpeg',
        '/img/feitio2025/WhatsApp_Image_2025-12-30_at_17.28.40.jpeg',
        '/img/feitio2025/WhatsApp_Image_2025-12-30_at_17.28.40(1).jpeg',
        '/img/feitio2025/WhatsApp_Image_2025-12-30_at_17.28.40(2).jpeg',
        '/img/feitio2025/WhatsApp_Image_2025-12-30_at_17.28.41.jpeg',
        '/img/feitio2025/WhatsApp_Image_2025-12-30_at_17.28.41(1).jpeg',
        '/img/feitio2025/WhatsApp_Image_2025-12-30_at_17.28.42.jpeg',
      ],
      type: 'image',
      category: 'feitio2025',
      date: '30/12/2025',
      photographer: 'Casa da Alquimia',
    },
    {
      id: 'feitio2025-3',
      title: 'Feitio 2025 - Início',
      description: 'Primeiros momentos do feitio',
      image: '/img/feitio2025/WhatsApp_Image_2025-12-29_at_08.24.10.jpeg',
      images: [
        '/img/feitio2025/WhatsApp_Image_2025-12-29_at_08.24.10.jpeg',
        '/img/feitio2025/WhatsApp_Image_2025-12-30_at_12.25.03.jpeg',
        '/img/feitio2025/WhatsApp_Image_2025-12-30_at_12.41.30.jpeg',
      ],
      type: 'image',
      category: 'feitio2025',
      date: '29/12/2025',
      photographer: 'Casa da Alquimia',
    },
    {
      id: 'feitio2025-video-1',
      title: 'Feitio 2025 - Vídeo do Processo',
      description: 'Registro em vídeo do feitio',
      image: '/img/feitio2025/WhatsApp_Video_2025-12-30_at_16.24.31.mp4',
      images: ['/img/feitio2025/WhatsApp_Video_2025-12-30_at_16.24.31.mp4'],
      type: 'video',
      category: 'feitio2025',
      date: '30/12/2025',
      photographer: 'Casa da Alquimia',
    },
    // Imagens gerais
    {
      id: 'geral-1',
      title: 'Turma na Trilha',
      description: 'Caminhada espiritual em comunidade',
      image: '/img/turmanatrilha.jpeg',
      images: [
        '/img/turmanatrilha.jpeg',
        '/img/velamesa.jpeg',
        '/img/alquimia.jpeg',
        '/img/meditação.jpeg',
        '/img/serviidodaime.jpeg',
      ],
      type: 'image',
      category: 'geral',
      date: '2025',
      photographer: 'Fotógrafo da Casa',
    },
    {
      id: 'geral-2',
      title: 'Rituais da Casa',
      description: 'Celebrações e rituais sagrados',
      image: '/img/serviidodaime.jpeg',
      images: [
        '/img/serviidodaime.jpeg',
        '/img/meditação.jpeg',
        '/img/convite.jpeg',
        '/img/logo.png',
        '/img/logog.jpeg',
      ],
      type: 'image',
      category: 'geral',
      date: '2025',
      photographer: 'Equipe Ritual',
    },
    {
      id: 'evento-1',
      title: 'Eventos e Celebrações',
      description: 'Momentos especiais da comunidade',
      image: '/img/img1.jpg',
      images: [
        '/img/img1.jpg',
        '/img/img2.jpg',
        '/img/img3.jpg',
        '/img/img4.jpg',
        '/img/img5.jpg',
        '/img/img6.jpg',
      ],
      type: 'image',
      category: 'eventos',
      date: '2025',
      photographer: 'Comunidade',
    },
    {
      id: 'evento-2',
      title: 'Encontros Comunitários',
      description: 'União e fraternidade',
      image: '/img/img7.jpg',
      images: [
        '/img/img7.jpg',
        '/img/img8.jpg',
        '/img/img9.jpg',
        '/img/img10.jpg',
        '/img/img11.jpg',
        '/img/img12.jpg',
      ],
      type: 'image',
      category: 'eventos',
      date: '2025',
      photographer: 'Comunidade',
    },

    ...viradaAlbums,

    novoAlbum,

    {
      id: 'novoalbum-video-1',
      title: 'Novo Álbum - Vídeo 1',
      description: 'Vídeo do Novo Álbum — Parte 1',
      image: '/img/novoalbum/WhatsApp Video 2026-01-02 at 13.22.11.mp4',
      images: ['/img/novoalbum/WhatsApp Video 2026-01-02 at 13.22.11.mp4'],
      type: 'video',
      category: 'novoalbum',
      date: '2026',
      photographer: 'Casa da Alquimia',
    },
    {
      id: 'novoalbum-video-2',
      title: 'Novo Álbum - Vídeo 2',
      description: 'Vídeo do Novo Álbum — Parte 2',
      image: '/img/novoalbum/WhatsApp Video 2026-01-05 at 13.40.53.mp4',
      images: ['/img/novoalbum/WhatsApp Video 2026-01-05 at 13.40.53.mp4'],
      type: 'video',
      category: 'novoalbum',
      date: '2026',
      photographer: 'Casa da Alquimia',
    },
    {
      id: 'novoalbum-video-3',
      title: 'Novo Álbum - Vídeo 3',
      description: 'Vídeo do Novo Álbum — Parte 3',
      image: '/img/novoalbum/WhatsApp Video 2026-01-05 at 13.40.54.mp4',
      images: ['/img/novoalbum/WhatsApp Video 2026-01-05 at 13.40.54.mp4'],
      type: 'video',
      category: 'novoalbum',
      date: '2026',
      photographer: 'Casa da Alquimia',
    },
    {
      id: 'novoalbum-video-4',
      title: 'Novo Álbum - Vídeo 4',
      description: 'Vídeo do Novo Álbum — Parte 4',
      image: '/img/novoalbum/WhatsApp Video 2026-01-07 at 14.12.37.mp4',
      images: ['/img/novoalbum/WhatsApp Video 2026-01-07 at 14.12.37.mp4'],
      type: 'video',
      category: 'novoalbum',
      date: '2026',
      photographer: 'Casa da Alquimia',
    },
    {
      id: 'novoalbum-video-5',
      title: 'Novo Álbum - Vídeo 5',
      description: 'Vídeo do Novo Álbum — Parte 5',
      image: '/img/novoalbum/WhatsApp Video 2026-01-07 at 14.15.25.mp4',
      images: ['/img/novoalbum/WhatsApp Video 2026-01-07 at 14.15.25.mp4'],
      type: 'video',
      category: 'novoalbum',
      date: '2026',
      photographer: 'Casa da Alquimia',
    },

    {
      id: 'video-geral',
      title: 'Vídeo da Casa',
      description: 'Apresentação da Casa da Alquimia',
      image: '/img/img20.mp4',
      images: ['/img/img20.mp4'],
      type: 'video',
      category: 'geral',
      date: '2025',
      photographer: 'Casa da Alquimia',
    },
  ];

  const categories = [
    { id: 'todos', name: 'Todas as Mídias' },
    { id: 'feitio2025', name: 'Feitio 2025' },
    { id: 'geral', name: 'Galeria Geral' },
    { id: 'novoalbum', name: 'Novo Álbum' },
    { id: 'eventos', name: 'Eventos' },
  ];

  const filteredMedia =
    selectedCategory === 'todos'
      ? mediaItems
      : mediaItems.filter((m) => m.category === selectedCategory);

  const handleNext = () => {
    if (selectedMedia && selectedMedia.images.length > 1) {
      setCurrentImageIndex((prev) => 
        prev === selectedMedia.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const handlePrevious = () => {
    if (selectedMedia && selectedMedia.images.length > 1) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? selectedMedia.images.length - 1 : prev - 1
      );
    }
  };

  const openMedia = (media: MediaItem) => {
    console.log('Opening media:', media.title);
    setSelectedMedia(media);
    setCurrentImageIndex(0);
  };

  // Navegação por teclado
  useEffect(() => {
    if (!selectedMedia) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrevious();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        handleNext();
      } else if (e.key === 'Escape') {
        e.preventDefault();
        setSelectedMedia(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedMedia, currentImageIndex]);

  return (
    <section id="biblioteca" className="py-20 bg-gradient-to-b from-sage-50 to-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-sage-600 to-sage-800 bg-clip-text text-transparent">
            Biblioteca de Memórias
          </h2>
          <p className="text-lg text-sage-700 max-w-2xl mx-auto">
            Registros sagrados de nossos rituais, feitios e encontros
          </p>
        </div>

        {/* Filtros */}
        <div className="mb-8 flex justify-center">
          <Tabs defaultValue="todos" className="w-full max-w-2xl">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 gap-2 overflow-x-auto md:overflow-visible py-1">
              {categories.map((cat) => (
                <TabsTrigger
                  key={cat.id}
                  value={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className="text-sm md:text-base"
                >
                  {cat.name}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        {/* Grid de mídia */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredMedia.map((media, index) => (
            <Card
              key={media.id}
              className="group cursor-pointer overflow-hidden hover:shadow-2xl transition-all duration-300 animate-fade-in focus:outline-none focus:ring-4 focus:ring-sage-200"
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => openMedia(media)}
            >
              <div className="relative aspect-[4/3] md:aspect-video overflow-hidden bg-sage-100">
                {media.type === 'video' ? (
                  <div className="relative w-full h-full flex items-center justify-center bg-sage-900">
                    <video
                      src={media.image}
                      className="w-full h-full object-cover"
                      muted
                      playsInline
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition-colors">
                      <Play className="w-16 h-16 text-white" />
                    </div>
                  </div>
                ) : (
                  <div className="relative w-full h-full">
                    <img
                      src={media.image}
                      alt={media.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ring-2 ring-transparent group-hover:ring-sage-600 shadow-sm"
                    />
                    <div className="absolute top-2 right-2 bg-white/90 rounded-full p-2">
                      <ImageIcon className="w-4 h-4 text-sage-600" />
                    </div>
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-2 text-sage-900">
                  {media.title}
                </h3>
                <p className="text-sm text-sage-600 mb-2">
                  {media.description}
                </p>
                <div className="flex items-center justify-between text-xs text-sage-500">
                  <span>{media.date}</span>
                  <span className="flex items-center gap-1">
                    <Grid className="w-3 h-3" />
                    {media.images.length} {media.images.length === 1 ? 'item' : 'itens'}
                  </span>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center animate-fade-in">
          <p className="text-sage-700 mb-4">
            Quer participar de nossos rituais e eventos?
          </p>
          <Button
            size="lg"
            className="bg-gradient-to-r from-sage-600 to-sage-700 hover:from-sage-700 hover:to-sage-800"
            onClick={() => window.open('https://wa.me/5521964697345', '_blank')}
          >
            Entre em Contato
          </Button>
        </div>
      </div>

      {/* Modal Lightbox Customizado */}
      {selectedMedia && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm"
          onClick={() => setSelectedMedia(null)}
        >
          {/* Cabeçalho do Modal */}
          <div className="absolute top-0 left-0 right-0 z-20 p-4 bg-gradient-to-b from-black/80 to-transparent">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
              <div className="text-white">
                <h3 className="text-xl md:text-2xl font-bold mb-1">{selectedMedia.title}</h3>
                <p className="text-sm text-white/80 mb-1">{selectedMedia.description}</p>
                <div className="flex items-center gap-4 text-xs text-white/60">
                  <span>{selectedMedia.date}</span>
                  {selectedMedia.photographer && (
                    <span className="flex items-center gap-1">
                      📷 {selectedMedia.photographer}
                    </span>
                  )}
                  <span>
                    {currentImageIndex + 1} de {selectedMedia.images.length}
                  </span>
                </div>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedMedia(null);
                }}
                className="text-white hover:text-primary transition-colors p-2 hover:bg-white/10 rounded-full"
              >
                <X className="w-8 h-8" />
              </button>
            </div>
          </div>

          {/* Área da Imagem/Vídeo */}
          <div 
            className="absolute inset-0 flex items-center justify-center pt-28 pb-36 px-4 md:px-8"
            style={{ pointerEvents: 'none' }}
          >
            <div className="relative w-full h-full flex items-center justify-center" style={{ pointerEvents: 'auto' }}>
              {selectedMedia.type === 'video' ? (
                <video
                  src={selectedMedia.images[currentImageIndex]}
                  controls
                  autoPlay
                  className="max-w-full max-h-full object-contain rounded-lg shadow-2xl bg-black"
                  style={{ maxHeight: 'calc(100vh - 180px)', zIndex: 5 }}
                  key={`${selectedMedia.id}-${currentImageIndex}`}
                />
              ) : (
                <img
                  src={selectedMedia.images[currentImageIndex]}
                  alt={selectedMedia.title}
                  className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                  style={{ maxHeight: 'calc(100vh - 180px)', zIndex: 5 }}
                  key={`${selectedMedia.id}-${currentImageIndex}`}
                  onError={(e) => {
                    console.error('Erro ao carregar imagem:', selectedMedia.images[currentImageIndex]);
                    e.currentTarget.style.border = '2px solid red';
                  }}
                  onLoad={() => console.log('Imagem carregada:', selectedMedia.images[currentImageIndex])}
                />
              )}

              {/* Botões de Navegação entre imagens do álbum */}
              {selectedMedia.images.length > 1 && (
                <>
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
                </>
              )}
            </div>
          </div>

          {/* Thumbnails na parte inferior */}
          {selectedMedia.images.length > 1 && (
            <div className="absolute bottom-0 left-0 right-0 z-20 p-4 bg-gradient-to-t from-black/90 to-transparent">
              <div className="max-w-7xl mx-auto">
                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
                  {selectedMedia.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrentImageIndex(idx);
                      }}
                      className={cn(
                        "flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden border-2 transition-all hover:scale-105",
                        currentImageIndex === idx
                          ? 'border-primary ring-2 ring-primary/50 scale-105'
                          : 'border-white/20 hover:border-white/50'
                      )}
                    >
                      {selectedMedia.type === 'video' ? (
                        <div className="w-full h-full bg-gray-900 flex items-center justify-center relative">
                          <video
                            src={img}
                            className="w-full h-full object-cover"
                            muted
                          />
                          <Play className="absolute w-6 h-6 text-white" />
                        </div>
                      ) : (
                        <img
                          src={img}
                          alt={`Thumbnail ${idx + 1}`}
                          className="w-full h-full object-cover"
                        />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  );
};

export default LibraryGallery;
