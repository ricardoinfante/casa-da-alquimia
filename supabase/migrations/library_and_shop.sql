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
INSERT INTO storage.buckets (id, name, public) VALUES ('shop-images', 'shop-images', true) ON CONFLICT DO NOTHING;

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

-- ============ SHOP / PRODUCTS ============

-- Tabela de Produtos
CREATE TABLE IF NOT EXISTS shop_products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  details TEXT,
  price DECIMAL(10, 2) NOT NULL,
  category TEXT NOT NULL,
  stock INTEGER DEFAULT 0,
  image TEXT NOT NULL,
  rating DECIMAL(3, 1) DEFAULT 5.0,
  reviews INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- Tabela de Imagens dos Produtos
CREATE TABLE IF NOT EXISTS shop_product_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID NOT NULL REFERENCES shop_products(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- Tabela de Pedidos
CREATE TABLE IF NOT EXISTS shop_orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  items JSONB NOT NULL,
  total DECIMAL(10, 2) NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'shipped', 'delivered', 'cancelled')),
  payment_status TEXT DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'failed', 'refunded')),
  stripe_payment_id TEXT,
  shipping_address JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- Tabela de Avaliações dos Produtos
CREATE TABLE IF NOT EXISTS shop_reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID NOT NULL REFERENCES shop_products(id) ON DELETE CASCADE,
  user_email TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- RLS Policies for shop_products
ALTER TABLE shop_products ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access to shop_products" ON shop_products FOR SELECT USING (TRUE);
CREATE POLICY "Allow authenticated insert to shop_products" ON shop_products FOR INSERT WITH CHECK (AUTH.role() = 'authenticated');
CREATE POLICY "Allow authenticated update to shop_products" ON shop_products FOR UPDATE USING (AUTH.role() = 'authenticated');
CREATE POLICY "Allow authenticated delete to shop_products" ON shop_products FOR DELETE USING (AUTH.role() = 'authenticated');

-- RLS Policies for shop_orders
ALTER TABLE shop_orders ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public insert to shop_orders" ON shop_orders FOR INSERT WITH CHECK (TRUE);
CREATE POLICY "Allow users to view their own orders" ON shop_orders FOR SELECT USING (
  user_id = auth.uid() OR customer_email = auth.jwt() ->> 'email'
);
CREATE POLICY "Allow authenticated update to shop_orders" ON shop_orders FOR UPDATE USING (AUTH.role() = 'authenticated');

-- RLS Policies for shop_reviews
ALTER TABLE shop_reviews ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access to shop_reviews" ON shop_reviews FOR SELECT USING (TRUE);
CREATE POLICY "Allow public insert to shop_reviews" ON shop_reviews FOR INSERT WITH CHECK (TRUE);

-- Indexes for better performance
CREATE INDEX idx_library_media_album_id ON library_media(album_id);
CREATE INDEX idx_shop_product_category ON shop_products(category);
CREATE INDEX idx_shop_product_images_product_id ON shop_product_images(product_id);
CREATE INDEX idx_shop_orders_customer_email ON shop_orders(customer_email);
CREATE INDEX idx_shop_orders_status ON shop_orders(status);
CREATE INDEX idx_shop_reviews_product_id ON shop_reviews(product_id);

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

CREATE TRIGGER update_shop_products_updated_at BEFORE UPDATE ON shop_products
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_shop_orders_updated_at BEFORE UPDATE ON shop_orders
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
