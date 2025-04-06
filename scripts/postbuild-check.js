
const fs = require('fs');
const path = require('path');

const outPath = path.resolve(__dirname, '../apps/web/.next');

if (!fs.existsSync(outPath)) {
  console.error('❌ Build folder not found. Something failed.');
  process.exit(1);
}

console.log('✅ Build validated. Folder exists.');
process.exit(0);
