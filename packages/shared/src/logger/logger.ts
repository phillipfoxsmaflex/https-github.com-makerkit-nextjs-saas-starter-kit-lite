
/**
 * Simple logger implementation
 */
export interface Logger {
  info: (...args: any[]) => void;  
  warn: (...args: any[]) => void;
  error: (...args: any[]) => void;
  debug: (...args: any[]) => void;
}

export const Logger: Logger = {
  info: (...args: any[]) => console.log('[INFO]', ...args),
  warn: (...args: any[]) => console.warn('[WARN]', ...args), 
  error: (...args: any[]) => console.error('[ERROR]', ...args),
  debug: (...args: any[]) => console.debug('[DEBUG]', ...args)
};
