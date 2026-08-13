// src/lib/supabase.ts
import { createClient } from '@supabase/supabase-js'

const supabaseUrl =
  import.meta.env.VITE_SUPABASE_URL ||
  import.meta.env.SUPABASE_URL ||
  'https://mojuzlysxlydpjxfvwia.supabase.co'

const supabaseAnonKey =
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  import.meta.env.SUPABASE_ANON_KEY ||
  'sb_publishable_xztXiPxNsxkDwP6vK5Ikog_ebycVbyK'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
