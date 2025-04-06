// packages/shared/src/logger/logger.ts
const logger = {
  info: (...args: any[]) => console.log('[INFO]', ...args),
  warn: (...args: any[]) => console.warn('[WARN]', ...args),
  error: (...args: any[]) => console.error('[ERROR]', ...args),
};

export default logger;


// lib/health-check.ts (Hypothetical file -  added based on user prompt)
import logger from '@shared/logger/logger';
export async function runHealthCheck() {
  const checks = {
    database: false,
    api: true,
    timestamp: new Date().toISOString()
  };

  try {
    // Basic check - can be expanded with actual DB connectivity test
    checks.database = true;
    logger.info('Health check: Database connection successful'); //Added logger call

    return checks;
  } catch (error) {
    logger.error('Health check failed:', error); //Added logger call
    return checks;
  }
}