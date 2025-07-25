// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://brckpwxamzldtarldffs.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJyY2twd3hhbXpsZHRhcmxkZmZzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIyNTgwNjAsImV4cCI6MjA2NzgzNDA2MH0.Ee8Ei6pPDGQTQoorXA91s_qHGsIOCNN6IYFfRtI-MCc";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  }
});