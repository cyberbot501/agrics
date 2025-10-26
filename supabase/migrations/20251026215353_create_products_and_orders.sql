/*
  # Create Products and Orders Schema

  ## New Tables
  
  ### `products`
  - `id` (uuid, primary key)
  - `name` (text, product name)
  - `category` (text, product category)
  - `description` (text, product description)
  - `price` (numeric, product price in Naira)
  - `unit` (text, pricing unit e.g., 'per kg', 'per crate')
  - `image_url` (text, product image)
  - `in_stock` (boolean, availability status)
  - `created_at` (timestamptz, creation timestamp)
  
  ### `orders`
  - `id` (uuid, primary key)
  - `product_id` (uuid, foreign key to products)
  - `customer_name` (text, customer name)
  - `customer_phone` (text, customer phone)
  - `quantity` (integer, order quantity)
  - `total_amount` (numeric, total order amount)
  - `payment_status` (text, payment confirmation status)
  - `created_at` (timestamptz, order creation timestamp)
  
  ### `farming_calendar`
  - `id` (uuid, primary key)
  - `crop_name` (text, name of crop)
  - `activity` (text, farming activity)
  - `month` (integer, month number 1-12)
  - `season` (text, farming season)
  - `description` (text, activity description)
  - `created_at` (timestamptz, creation timestamp)

  ## Security
  - Enable RLS on all tables
  - Allow public read access to products and farming calendar
  - Restrict orders to authenticated users only
*/

-- Create products table
CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  category text NOT NULL,
  description text NOT NULL,
  price numeric NOT NULL,
  unit text NOT NULL,
  image_url text DEFAULT '',
  in_stock boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- Create orders table
CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id uuid REFERENCES products(id),
  customer_name text NOT NULL,
  customer_phone text NOT NULL,
  quantity integer NOT NULL DEFAULT 1,
  total_amount numeric NOT NULL,
  payment_status text DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);

-- Create farming calendar table
CREATE TABLE IF NOT EXISTS farming_calendar (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  crop_name text NOT NULL,
  activity text NOT NULL,
  month integer NOT NULL CHECK (month >= 1 AND month <= 12),
  season text NOT NULL,
  description text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE farming_calendar ENABLE ROW LEVEL SECURITY;

-- Products policies (public read)
CREATE POLICY "Anyone can view products"
  ON products FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can insert products"
  ON products FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update products"
  ON products FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Orders policies (authenticated users only)
CREATE POLICY "Authenticated users can view all orders"
  ON orders FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Anyone can create orders"
  ON orders FOR INSERT
  WITH CHECK (true);

-- Farming calendar policies (public read)
CREATE POLICY "Anyone can view farming calendar"
  ON farming_calendar FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can manage calendar"
  ON farming_calendar FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update calendar"
  ON farming_calendar FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Insert sample products
INSERT INTO products (name, category, description, price, unit, in_stock) VALUES
  ('Eggs', 'Poultry', 'Sourced directly from healthy layers, our eggs are packed with protein and essential nutrients. Ideal for home and commercial use.', 1800, 'per crate', true),
  ('Chicken', 'Poultry', 'We offer well-bred broiler chickens suitable for meat. Perfectly raised under hygienic and organic feeding systems.', 3500, 'per kg', true),
  ('Turkey', 'Poultry', 'Our turkeys are big, meaty, and perfect for festivities. Raised in a natural environment and fed with nutrient-rich feeds.', 6000, 'per kg', true),
  ('Catfish', 'Aquaculture', 'Available in both live and processed options. Ideal for grilling, smoking, and local soups.', 2000, 'per kg', true),
  ('Cattle', 'Livestock', 'We breed and sell cattle for beef production. Available for events, ceremonies, or butchery use.', 0, 'Contact for pricing', true),
  ('Sheep', 'Livestock', 'Our sheep are grass-fed and suitable for meat or cultural occasions. Healthy and affordable.', 42500, '₦25,000 - ₦60,000', true),
  ('Goat', 'Livestock', 'Raised in clean conditions, our goats are strong, agile, and ideal for meat or ceremonial purposes.', 35000, '₦20,000 - ₦50,000', true),
  ('Feed Milling', 'Feed Services', 'We offer feed milling services tailored to different animal nutritional needs including poultry, fish, and ruminants.', 0, 'Contact for quote', true),
  ('Feed Ingredients', 'Feed Services', 'We supply high-quality feed ingredients such as maize, soya, fishmeal, bone meal, and more.', 0, 'Contact for quote', true),
  ('Aquaculture Feed & Drugs', 'Feed Services', 'Medicated and non-medicated fish feed, as well as water treatment and antibiotics for healthy aquaculture systems.', 0, 'Contact for quote', true),
  ('Green Pepper', 'Vegetables', 'Locally grown and freshly harvested green peppers. Great for cooking and commercial food prep.', 1000, 'per kg', true),
  ('Habanero Pepper', 'Vegetables', 'Add spice and flavor to your meals with our hot habanero peppers. Perfect for stew, sauce, and seasoning.', 1200, 'per kg', true);

-- Insert Nigerian farming calendar data
INSERT INTO farming_calendar (crop_name, activity, month, season, description) VALUES
  ('Maize', 'Land Preparation', 3, 'Early Season', 'Clear and prepare land for planting'),
  ('Maize', 'Planting', 4, 'Early Season', 'Plant maize seeds at the start of rains'),
  ('Maize', 'Weeding', 5, 'Rainy Season', 'First weeding after germination'),
  ('Maize', 'Fertilizer Application', 6, 'Rainy Season', 'Apply NPK fertilizer'),
  ('Maize', 'Harvesting', 7, 'Mid Season', 'Harvest mature maize'),
  ('Rice', 'Land Preparation', 4, 'Early Season', 'Prepare swampy or irrigated land'),
  ('Rice', 'Planting', 5, 'Rainy Season', 'Transplant rice seedlings'),
  ('Rice', 'Weeding', 6, 'Rainy Season', 'Remove weeds from rice field'),
  ('Rice', 'Harvesting', 9, 'Late Season', 'Harvest rice when grains are golden'),
  ('Cassava', 'Land Preparation', 3, 'Early Season', 'Clear and till land'),
  ('Cassava', 'Planting', 4, 'Early Season', 'Plant cassava stems'),
  ('Cassava', 'Weeding', 6, 'Rainy Season', 'Regular weeding for good tuber development'),
  ('Cassava', 'Harvesting', 12, 'Dry Season', 'Harvest mature cassava tubers'),
  ('Yam', 'Land Preparation', 2, 'Dry Season', 'Make yam mounds'),
  ('Yam', 'Planting', 3, 'Early Season', 'Plant yam setts before rains'),
  ('Yam', 'Staking', 5, 'Rainy Season', 'Provide stakes for vine support'),
  ('Yam', 'Harvesting', 12, 'Dry Season', 'Harvest mature yam tubers'),
  ('Cocoa', 'Pruning', 1, 'Dry Season', 'Prune cocoa trees for better yields'),
  ('Cocoa', 'Weeding', 4, 'Early Season', 'Keep cocoa farms weed-free'),
  ('Cocoa', 'Harvesting', 10, 'Late Season', 'Harvest ripe cocoa pods'),
  ('Cashew', 'Pruning', 2, 'Dry Season', 'Prune cashew trees'),
  ('Cashew', 'Flowering', 3, 'Early Season', 'Monitor flowering period'),
  ('Cashew', 'Harvesting', 3, 'Early Season', 'Harvest cashew nuts and apples'),
  ('Vegetables', 'Planting', 3, 'Early Season', 'Plant pepper, tomatoes, vegetables'),
  ('Vegetables', 'Irrigation', 5, 'Rainy Season', 'Provide adequate water'),
  ('Vegetables', 'Harvesting', 6, 'Rainy Season', 'Continuous harvesting of vegetables');