import { supabase } from './client';

// ============ MEDIA LIBRARY ============

export const mediaLibraryService = {
  // Buscar todos os álbuns
  async getAlbums() {
    const { data, error } = await supabase
      .from('library_albums')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data;
  },

  // Buscar álbum com itens
  async getAlbumWithItems(albumId: string) {
    const { data, error } = await supabase
      .from('library_albums')
      .select(
        `
        *,
        items: library_media(*)
      `
      )
      .eq('id', albumId)
      .single();
    if (error) throw error;
    return data;
  },

  // Criar novo álbum
  async createAlbum(album: {
    name: string;
    description: string;
    coverImage: string;
  }) {
    const { data, error } = await supabase
      .from('library_albums')
      .insert([album])
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  // Upload de mídia
  async uploadMedia(
    file: File,
    albumId: string,
    type: 'image' | 'video'
  ) {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}.${fileExt}`;
    const filePath = `${albumId}/${fileName}`;

    // Upload para storage
    const { error: uploadError } = await supabase.storage
      .from('library-media')
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    // Obter URL pública
    const {
      data: { publicUrl },
    } = supabase.storage.from('library-media').getPublicUrl(filePath);

    // Salvar referência no banco
    const { data, error } = await supabase
      .from('library_media')
      .insert([
        {
          album_id: albumId,
          title: file.name.replace(/\.[^/.]+$/, ''),
          type,
          url: publicUrl,
          thumbnail: publicUrl, // Para imagens, usar a mesma URL
          file_path: filePath,
        },
      ])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Deletar mídia
  async deleteMedia(mediaId: string, filePath: string) {
    // Deletar do storage
    const { error: storageError } = await supabase.storage
      .from('library-media')
      .remove([filePath]);

    if (storageError) throw storageError;

    // Deletar do banco
    const { error } = await supabase
      .from('library_media')
      .delete()
      .eq('id', mediaId);

    if (error) throw error;
  },
};

// ============ SHOP / PRODUCTS ============

export const shopService = {
  // Buscar todos os produtos
  async getProducts(category?: string) {
    let query = supabase.from('shop_products').select('*');

    if (category) {
      query = query.eq('category', category);
    }

    const { data, error } = await query.order('created_at', {
      ascending: false,
    });
    if (error) throw error;
    return data;
  },

  // Buscar produto por ID
  async getProductById(productId: string) {
    const { data, error } = await supabase
      .from('shop_products')
      .select('*')
      .eq('id', productId)
      .single();
    if (error) throw error;
    return data;
  },

  // Criar novo produto
  async createProduct(product: {
    name: string;
    description: string;
    price: number;
    category: string;
    stock: number;
    image: string;
    details: string;
  }) {
    const { data, error } = await supabase
      .from('shop_products')
      .insert([product])
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  // Atualizar produto
  async updateProduct(
    productId: string,
    updates: Partial<{
      name: string;
      description: string;
      price: number;
      stock: number;
      image: string;
    }>
  ) {
    const { data, error } = await supabase
      .from('shop_products')
      .update(updates)
      .eq('id', productId)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  // Upload de imagem do produto
  async uploadProductImage(
    file: File,
    productId: string
  ) {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}.${fileExt}`;
    const filePath = `products/${productId}/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('shop-images')
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    const {
      data: { publicUrl },
    } = supabase.storage.from('shop-images').getPublicUrl(filePath);

    return publicUrl;
  },

  // Deletar produto
  async deleteProduct(productId: string) {
    const { error } = await supabase
      .from('shop_products')
      .delete()
      .eq('id', productId);
    if (error) throw error;
  },
};

// ============ CART / ORDERS ============

export const orderService = {
  // Criar novo pedido
  async createOrder(order: {
    user_id?: string;
    items: Array<{
      product_id: string;
      quantity: number;
      price: number;
    }>;
    total: number;
    status?: string;
    customer_email: string;
    customer_name: string;
  }) {
    const { data, error } = await supabase
      .from('shop_orders')
      .insert([
        {
          ...order,
          status: order.status || 'pending',
        },
      ])
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  // Buscar pedidos do usuário
  async getUserOrders(userEmail: string) {
    const { data, error } = await supabase
      .from('shop_orders')
      .select('*')
      .eq('customer_email', userEmail)
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data;
  },

  // Atualizar status do pedido
  async updateOrderStatus(
    orderId: string,
    status: string
  ) {
    const { data, error } = await supabase
      .from('shop_orders')
      .update({ status })
      .eq('id', orderId)
      .select()
      .single();
    if (error) throw error;
    return data;
  },
};
