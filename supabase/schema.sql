-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create posters table
CREATE TABLE IF NOT EXISTS posters (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  category VARCHAR(100) NOT NULL,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create orders table
CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  items JSONB NOT NULL,
  total DECIMAL(10, 2) NOT NULL,
  status VARCHAR(50) DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on posters category for faster filtering
CREATE INDEX IF NOT EXISTS idx_posters_category ON posters(category);

-- Create index on orders user_id for faster queries
CREATE INDEX IF NOT EXISTS idx_orders_user_id ON orders(user_id);

-- Enable Row Level Security (RLS)
ALTER TABLE posters ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Policies for posters (public read access)
CREATE POLICY "Posters are viewable by everyone" ON posters
  FOR SELECT USING (true);

-- Policies for orders (users can only see their own orders)
CREATE POLICY "Users can view their own orders" ON orders
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own orders" ON orders
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Insert sample data (optional - for testing)
INSERT INTO posters (title, description, price, category, image_url) VALUES
  ('Naruto Uzumaki', 'High-quality poster of Naruto in his signature pose', 24.99, 'Naruto', 'https://via.placeholder.com/600x800/6366f1/ffffff?text=Naruto'),
  ('Monkey D. Luffy', 'Premium poster featuring the future Pirate King', 24.99, 'One Piece', 'https://via.placeholder.com/600x800/8b5cf6/ffffff?text=Luffy'),
  ('Eren Yeager', 'Intense poster from Attack on Titan', 24.99, 'Attack on Titan', 'https://via.placeholder.com/600x800/ec4899/ffffff?text=Eren'),
  ('Goku Super Saiyan', 'Classic Dragon Ball Z poster', 24.99, 'Dragon Ball', 'https://via.placeholder.com/600x800/6366f1/ffffff?text=Goku'),
  ('Tanjiro Kamado', 'Demon Slayer poster with beautiful art', 24.99, 'Demon Slayer', 'https://via.placeholder.com/600x800/8b5cf6/ffffff?text=Tanjiro'),
  ('Izuku Midoriya', 'My Hero Academia poster', 24.99, 'My Hero Academia', 'https://via.placeholder.com/600x800/ec4899/ffffff?text=Deku'),
  ('Yuji Itadori', 'Jujutsu Kaisen action poster', 24.99, 'Jujutsu Kaisen', 'https://via.placeholder.com/600x800/6366f1/ffffff?text=Yuji'),
  ('Sasuke Uchiha', 'Naruto poster featuring Sasuke', 24.99, 'Naruto', 'https://via.placeholder.com/600x800/8b5cf6/ffffff?text=Sasuke'),
  ('Zoro Roronoa', 'One Piece poster of the swordsman', 24.99, 'One Piece', 'https://via.placeholder.com/600x800/ec4899/ffffff?text=Zoro'),
  ('Levi Ackerman', 'Attack on Titan poster', 24.99, 'Attack on Titan', 'https://via.placeholder.com/600x800/6366f1/ffffff?text=Levi')
ON CONFLICT DO NOTHING;


