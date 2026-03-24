import * as dotenv from 'dotenv';
import * as path from 'path';
import { createClient } from '@supabase/supabase-js';

const envPath = path.join(__dirname, '../.env');
console.log('Loading env from:', envPath);
dotenv.config({ path: envPath });

const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_KEY || '';

console.log('SUPABASE_URL:', supabaseUrl ? 'Set' : 'MISSING');
console.log('SUPABASE_KEY:', supabaseKey ? 'Set' : 'MISSING');

try {
    const client = createClient(supabaseUrl, supabaseKey);
    console.log('Client created successfully');
} catch (e) {
    console.error('Failed to create client:', e.message);
}
