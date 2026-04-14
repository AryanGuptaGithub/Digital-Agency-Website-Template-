// scripts/upload-to-cloudinary.js
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env.local') });

const cloudinary = require('cloudinary').v2;
const fs = require('fs');

// Map Next.js public variables to Cloudinary SDK expected names
const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const apiKey = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;

if (!cloudName || !apiKey || !apiSecret) {
  console.error('❌ Missing Cloudinary credentials. Check your .env.local file.');
  console.error(`CLOUD_NAME: ${cloudName ? '✓' : '✗'}`);
  console.error(`API_KEY: ${apiKey ? '✓' : '✗'}`);
  console.error(`API_SECRET: ${apiSecret ? '✓' : '✗'}`);
  process.exit(1);
}

cloudinary.config({
  cloud_name: cloudName,
  api_key: apiKey,
  api_secret: apiSecret,
});

const imagesDir = path.join(__dirname, '../public/images/projects');
const files = fs.readdirSync(imagesDir).filter(f => /\.(jpg|jpeg|png|webp)$/i.test(f));

async function uploadImages() {
  for (const file of files) {
    const filePath = path.join(imagesDir, file);
    // Remove extension and spaces for a clean public ID
    const publicId = `projects/${path.parse(file).name.replace(/\s+/g, '-').toLowerCase()}`;
    try {
      const result = await cloudinary.uploader.upload(filePath, {
        folder: 'projects',
        public_id: publicId,
        overwrite: true,
      });
      console.log(`✅ Uploaded ${file} → ${result.secure_url}`);
    } catch (error) {
      console.error(`❌ Failed to upload ${file}:`, error.message);
    }
  }
}

uploadImages();