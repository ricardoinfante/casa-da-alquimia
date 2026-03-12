-- ============ LIBRARY / MEDIA ============

-- Tabela de Álbuns
CREATE TABLE IF NOT EXISTS library_albums (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  cover_image TEXT,
  item_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- Tabela de Mídia (imagens e vídeos)
CREATE TABLE IF NOT EXISTS library_media (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  album_id UUID NOT NULL REFERENCES library_albums(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('image', 'video')),
  url TEXT NOT NULL,
  thumbnail TEXT,
  file_path TEXT NOT NULL,
  date TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- Storage buckets
INSERT INTO storage.buckets (id, name, public) VALUES ('library-media', 'library-media', true) ON CONFLICT DO NOTHING;

-- RLS Policies for library_albums
ALTER TABLE library_albums ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access to library_albums" ON library_albums FOR SELECT USING (TRUE);
CREATE POLICY "Allow authenticated insert to library_albums" ON library_albums FOR INSERT WITH CHECK (AUTH.role() = 'authenticated');
CREATE POLICY "Allow authenticated update to library_albums" ON library_albums FOR UPDATE USING (AUTH.role() = 'authenticated');
CREATE POLICY "Allow authenticated delete to library_albums" ON library_albums FOR DELETE USING (AUTH.role() = 'authenticated');

-- RLS Policies for library_media
ALTER TABLE library_media ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access to library_media" ON library_media FOR SELECT USING (TRUE);
CREATE POLICY "Allow authenticated insert to library_media" ON library_media FOR INSERT WITH CHECK (AUTH.role() = 'authenticated');
CREATE POLICY "Allow authenticated delete to library_media" ON library_media FOR DELETE USING (AUTH.role() = 'authenticated');


-- Indexes for better performance
CREATE INDEX idx_library_media_album_id ON library_media(album_id);

-- Triggers para atualizar updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc'::text, NOW());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_library_albums_updated_at BEFORE UPDATE ON library_albums
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_library_media_updated_at BEFORE UPDATE ON library_media
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
