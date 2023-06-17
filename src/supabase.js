
import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database
const supabaseUrl = 'https://bimnilcpwyrckzuzbfwy.supabase.co'; // Replace with your Supabase URL
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJpbW5pbGNwd3lyY2t6dXpiZnd5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODY4MjU5MjgsImV4cCI6MjAwMjQwMTkyOH0.hUaidVWikIdYwAP9_sNpLo_vpJUm6JLsi8gRgEd0jBk';
export const supabase = createClient(supabaseUrl, supabaseKey);

