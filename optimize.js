import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const dir = './public';
const files = fs.readdirSync(dir);

async function optimize() {
  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    const filePath = path.join(dir, file);
    
    // We process png, jpg, jpeg
    if (['.png', '.jpg', '.jpeg'].includes(ext)) {
      try {
        const baseName = path.basename(file, ext);
        const webpPath = path.join(dir, baseName + '.webp');
        
        console.log(`Converting ${file} to WebP (High Quality)...`);
        
        // Metadata
        const metadata = await sharp(filePath).metadata();
        const width = metadata.width > 1600 ? 1600 : null; // Keep it fairly large for "quality"
        
        await sharp(filePath)
          .resize({ width, withoutEnlargement: true })
          .webp({ quality: 85, effort: 6 }) // Quality 85 is very high for WebP
          .toFile(webpPath);
          
        console.log(`Generated ${baseName}.webp`);
        
        // Optionally delete the old file to keep clean (since references are being updated)
        // fs.unlinkSync(filePath);
      } catch (e) {
        console.error(`Error processing ${file}: ${e.message}`);
      }
    }
  }
}
optimize();
