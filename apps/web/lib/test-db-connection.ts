
import { getSupabaseServerClient } from '@kit/supabase/server-client';

export async function testDatabaseConnection() {
  try {
    const client = getSupabaseServerClient();
    const { data, error } = await client.from('accounts').select('count').single();
    
    if (error) {
      console.error('Error connecting to database:', error.message);
      return false;
    }

    console.log('Successfully connected to database');
    return true;
  } catch (error) {
    console.error('Failed to connect to database:', error);
    return false;
  }
}
