import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://hodvcrapusbnmxdutfur.supabase.co'
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhvZHZjcmFwdXNibm14ZHV0ZnVyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE1MDYzMjIsImV4cCI6MjA3NzA4MjMyMn0.E2QwC_6mmPPz3PmHmo1V-yPOolBsYMpJizwuG4FhKTg"

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
