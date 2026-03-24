import * as dotenv from 'dotenv';
import * as path from 'path';

const possiblePaths = [
    path.resolve(process.cwd(), '.env'),
    path.resolve(process.cwd(), '../.env'),
    path.resolve(__dirname, '../../.env'),
    path.resolve(__dirname, '../../../.env'),
];

let loaded = false;
for (const envPath of possiblePaths) {
    const result = dotenv.config({ path: envPath });
    if (!result.error) {
        console.log('[API] Successfully loaded env from:', envPath);
        loaded = true;
        break;
    }
}

if (!loaded) {
    console.error('[API] CRITICAL: Could not find .env file in any suspected location.');
}
console.log('[API] SUPABASE_URL:', process.env.SUPABASE_URL ? 'PRESENT' : 'MISSING');
