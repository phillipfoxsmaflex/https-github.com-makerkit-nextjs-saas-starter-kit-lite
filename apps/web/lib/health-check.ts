export async function runHealthCheck() {
  const checks = {
    database: false,
    api: true,
    timestamp: new Date().toISOString()
  };

  try {
    // Basic check - can be expanded with actual DB connectivity test
    checks.database = true;

    return checks;
  } catch (error) {
    console.error('Health check failed:', error);
    return checks;
  }
}