-- Table: messages
CREATE TABLE IF NOT EXISTS messages (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table: projects
CREATE TABLE IF NOT EXISTS projects (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    image_url TEXT NOT NULL,
    description TEXT,
    location VARCHAR(255),
    year VARCHAR(10),
    area VARCHAR(100),
    -- Gallery Images
    gallery_1_url TEXT,
    gallery_2_url TEXT,
    gallery_3_url TEXT,
    gallery_4_url TEXT,
    gallery_5_url TEXT,
    gallery_6_url TEXT,
    -- Gallery Captions
    gallery_1_caption TEXT,
    gallery_2_caption TEXT,
    gallery_3_caption TEXT,
    gallery_4_caption TEXT,
    gallery_5_caption TEXT,
    gallery_6_caption TEXT
);

-- Seed Data (Initial 6 projects)
INSERT INTO projects (title, category, image_url, description, location, year, area) VALUES
('VILA LUNA', 'Arkitekturë Rezidenciale', 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80', 'Një simfoni e betonit dhe dritës natyrale në lartësitë e Brezovicës.', 'Brezovicë, Kosovë', '2024', '450 m²'),
('INTERIOR NOIR', 'Dizajn Interieri', 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80', 'Minimalizëm dramatik ku teksturar e errëta krijojnë një luks të heshtur.', 'London, UK', '2023', '210 m²'),
('KULLA 2B', 'Planifikim Urban', 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80', 'Një ikonë e re në horizontin e Prishtinës, duke ripërcaktuar densitetin urban.', 'Prishtinë, Kosovë', '2025', '12,500 m²'),
('METRO CENTER', 'Menaxhim Projekti', 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=1200&q=80', 'Kompleksiteti teknik i kthyer në një strukturë të rrjedhshme tregtare.', 'Tiranë, Shqipëri', '2024', '45,000 m²'),
('AXIS STRUCTURE', 'Konstruksion', 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1200&q=80', 'Sfidat inxhinierike të zgjidhura përmes inovacionit dhe forcës strukturore.', 'Shkup, Maqedoni', '2023', '8,200 m²'),
('STRATEGIC HUB', 'Konsulencë', 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1200&q=80', 'Vizioni strategjik për zhvillimin e qëndrueshëm të hapësirave të punës.', 'Prishtinë, Kosovë', '2024', '3,400 m²');
