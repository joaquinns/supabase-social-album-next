import { createClient } from '@supabase/supabase-js'

const SUPABSE_URL = process.env.SUPABASE_URL
const SUPABSE_ANON_KEY = process.env.SUPABASE_ANON_KEY

export const supabase = createClient(SUPABSE_URL, SUPABSE_ANON_KEY)
