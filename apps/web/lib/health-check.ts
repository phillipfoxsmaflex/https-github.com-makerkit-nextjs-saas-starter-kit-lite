
import { getSupabaseServerClient } from '@kit/supabase/server-client';
import { Logger } from '@kit/shared/logger';

interface HealthCheckResult {
  status: 'success' | 'error';
  message: string;
  details?: any;
}

interface SystemHealth {
  database: HealthCheckResult;
  environment: HealthCheckResult;
  auth: HealthCheckResult;
  api: HealthCheckResult;
}

export async function runHealthCheck(options = { 
  checkDatabase: true,
  checkAuth: true,
  checkEnvironment: true,
  checkAPI: true 
}): Promise<SystemHealth> {
  const health: SystemHealth = {
    database: { status: 'error', message: 'No verificado' },
    environment: { status: 'error', message: 'No verificado' },
    auth: { status: 'error', message: 'No verificado' },
    api: { status: 'error', message: 'No verificado' }
  };

  try {
    // Verificar variables de entorno
    if (options.checkEnvironment) {
      health.environment = await checkEnvironmentVariables();
    }

    // Verificar base de datos
    if (options.checkDatabase) {
      health.database = await checkDatabaseConnection();
    }

    // Verificar autenticación
    if (options.checkAuth) {
      health.auth = await checkAuthService();
    }

    // Verificar API
    if (options.checkAPI) {
      health.api = await checkAPIConnection();
    }

    return health;
  } catch (error) {
    Logger.error('Error ejecutando health check:', error);
    throw error;
  }
}

async function checkEnvironmentVariables(): Promise<HealthCheckResult> {
  const requiredVars = [
    'NEXT_PUBLIC_SUPABASE_URL',
    'NEXT_PUBLIC_SUPABASE_ANON_KEY',
    'SUPABASE_SERVICE_ROLE_KEY',
    'NEXT_PUBLIC_SITE_URL'
  ];

  const missingVars = requiredVars.filter(varName => !process.env[varName]);

  if (missingVars.length > 0) {
    return {
      status: 'error',
      message: 'Faltan variables de entorno requeridas',
      details: { missingVariables: missingVars }
    };
  }

  return {
    status: 'success',
    message: 'Todas las variables de entorno requeridas están configuradas'
  };
}

async function checkDatabaseConnection(): Promise<HealthCheckResult> {
  try {
    const client = getSupabaseServerClient();
    const { data, error } = await client.from('accounts').select('count').single();

    if (error) {
      return {
        status: 'error',
        message: 'Error conectando a la base de datos',
        details: error
      };
    }

    return {
      status: 'success',
      message: 'Conexión a base de datos exitosa',
      details: { data }
    };
  } catch (error) {
    return {
      status: 'error',
      message: 'Error inesperado al conectar a la base de datos',
      details: error
    };
  }
}

async function checkAuthService(): Promise<HealthCheckResult> {
  try {
    const client = getSupabaseServerClient();
    const { data: authSettings, error } = await client.auth.getSession();

    if (error) {
      return {
        status: 'error',
        message: 'Error verificando servicio de autenticación',
        details: error
      };
    }

    return {
      status: 'success',
      message: 'Servicio de autenticación funcionando correctamente',
      details: { session: authSettings }
    };
  } catch (error) {
    return {
      status: 'error',
      message: 'Error inesperado al verificar autenticación',
      details: error
    };
  }
}

async function checkAPIConnection(): Promise<HealthCheckResult> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/health`);
    
    if (!response.ok) {
      return {
        status: 'error',
        message: 'API no responde correctamente',
        details: { status: response.status }
      };
    }

    return {
      status: 'success',
      message: 'API respondiendo correctamente'
    };
  } catch (error) {
    return {
      status: 'error',
      message: 'Error conectando con la API',
      details: error
    };
  }
}
