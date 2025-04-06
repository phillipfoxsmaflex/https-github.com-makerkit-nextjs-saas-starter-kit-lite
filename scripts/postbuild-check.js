
const fs = require('fs');
const path = require('path');
const http = require('http');

const outPath = path.resolve(__dirname, '../apps/web/.next');

if (!fs.existsSync(outPath)) {
  console.error('❌ Build folder not found. Something failed.');
  process.exit(1);
}

console.log('✅ Build validated. Folder exists.');

// Validate health endpoint
const healthCheck = () => {
  return new Promise((resolve, reject) => {
    const req = http.get('http://0.0.0.0:3000/api/health', (res) => {
      if (res.statusCode === 200) {
        console.log('✅ Health check passed');
        resolve();
      } else {
        console.error('❌ Health check failed:', res.statusCode);
        reject(new Error(`Health check failed with status ${res.statusCode}`));
      }
    });

    req.on('error', (err) => {
      console.error('❌ Health check error:', err.message);
      reject(err);
    });

    req.end();
  });
};

// Only run health check if explicitly requested
if (process.env.CHECK_HEALTH === 'true') {
  healthCheck().catch(() => process.exit(1));
}
