-- ============================================================
-- Amenidades - tabla administrable desde catálogos
-- ============================================================

-- Tabla catálogo de amenidades
CREATE TABLE IF NOT EXISTS public.house_amenities (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla pivote: inmueble <-> amenidades (muchos a muchos)
CREATE TABLE IF NOT EXISTS public.house_property_amenities (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  property_id UUID NOT NULL REFERENCES public.house_properties(id) ON DELETE CASCADE,
  amenity_id UUID NOT NULL REFERENCES public.house_amenities(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(property_id, amenity_id)
);

-- Índices
CREATE INDEX IF NOT EXISTS idx_house_property_amenities_property ON public.house_property_amenities(property_id);
CREATE INDEX IF NOT EXISTS idx_house_property_amenities_amenity ON public.house_property_amenities(amenity_id);

-- RLS
ALTER TABLE public.house_amenities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.house_property_amenities ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow all on house_amenities" ON public.house_amenities FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all on house_property_amenities" ON public.house_property_amenities FOR ALL USING (true) WITH CHECK (true);

-- Amenidades iniciales (migradas de los campos booleanos anteriores)
INSERT INTO public.house_amenities (name) VALUES
  ('Balcón'),
  ('Ascensor'),
  ('Gimnasio'),
  ('Piscina'),
  ('Seguridad 24h'),
  ('Parqueadero visitantes'),
  ('Zona BBQ'),
  ('Salón comunal'),
  ('Terraza'),
  ('Vigilancia')
ON CONFLICT (name) DO NOTHING;
