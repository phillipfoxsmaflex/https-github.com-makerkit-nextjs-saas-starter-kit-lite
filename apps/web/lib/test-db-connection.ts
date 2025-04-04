
import { getSupabaseServerClient } from '@kit/supabase/server-client';

export async function testDatabaseConnection() {
  try {
    console.log('Intentando conectar a Supabase...');
    const client = getSupabaseServerClient();
    
    // Probar conexión básica
    const { data: countData, error: countError } = await client.from('accounts').select('count').single();
    
    if (countError) {
      console.error('Error al consultar la tabla accounts:', countError.message);
      console.error('Código de error:', countError.code);
      return false;
    }

    // Probar una consulta simple
    const { data: testData, error: testError } = await client.from('accounts').select('id').limit(1);
    
    if (testError) {
      console.error('Error al hacer consulta de prueba:', testError.message);
      return false;
    }

    console.log('Conexión exitosa a la base de datos');
    console.log('Datos de prueba:', testData);
    return true;
  } catch (error) {
    console.error('Error de conexión:', error);
    return false;
  }
}

// Ejecutar la prueba
testDatabaseConnection();
