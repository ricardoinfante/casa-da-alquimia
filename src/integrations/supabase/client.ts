// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://wlyqqzauusxbykxzxtsj.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndseXFxemF1dXN4YnlreHp4dHNqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMyNzA4NzksImV4cCI6MjA1ODg0Njg3OX0.guDflYlDAJfS8fwLIadykmyu2huwz7WRyw1Rz79xTe8";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);