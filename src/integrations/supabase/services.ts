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
