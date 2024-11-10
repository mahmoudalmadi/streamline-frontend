// supabaseClient.js
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL // replace with your project URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY // replace with your anon key
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase