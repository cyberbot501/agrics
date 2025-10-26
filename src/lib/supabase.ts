import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  unit: string;
  image_url?: string;
  in_stock: boolean;
  created_at: string;
}

export interface Order {
  id?: string;
  product_id: string;
  customer_name: string;
  customer_phone: string;
  quantity: number;
  total_amount: number;
  payment_status?: string;
  created_at?: string;
}

export interface FarmingCalendar {
  id: string;
  crop_name: string;
  activity: string;
  month: number;
  season: string;
  description: string;
  created_at: string;
}
