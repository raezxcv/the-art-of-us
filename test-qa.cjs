const http = require('http');
const fs = require('fs');

async function testAll() {
  console.log('--- STARTING STUDIO QA AUDIT ---');

  // 1. Verify index.html loads
  const html = await new Promise((resolve, reject) => {
    http.get('http://localhost:4173/', (res) => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });

  console.log('✓ Root HTML loaded successfully (' + html.length + ' bytes)');
  if (!html.includes('The Art of Us')) throw new Error('Missing title in HTML');
  if (!html.includes('id="root"')) throw new Error('Missing #root div in HTML');

  // 2. Verify all images in public/images/memories
  const images = fs.readdirSync('./public/images/memories').filter(f => f.endsWith('.jpg'));
  console.log('✓ Discovered ' + images.length + ' original 35mm film photographs in public/images/memories:');
  for (const img of images) {
    const stats = fs.statSync('./public/images/memories/' + img);
    console.log('   - ' + img + ' (' + Math.round(stats.size / 1024) + ' KB)');
  }

  if (images.length < 12) {
    throw new Error('Expected at least 12 original images, found ' + images.length);
  }

  // 3. Verify dist assets exist
  const distFiles = fs.readdirSync('./dist/assets');
  console.log('✓ Production dist contains ' + distFiles.length + ' compiled chunks: ' + distFiles.join(', '));

  console.log('--- QA AUDIT COMPLETED SUCCESSFULLY: ALL CRITERIA MET ---');
}

testAll().catch(err => {
  console.error('QA FAILED:', err);
  process.exit(1);
});

