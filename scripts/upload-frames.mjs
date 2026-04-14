// scripts/upload-frames.mjs
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import path from "path";

cloudinary.config({
  cloud_name: "dxwoomfzw",
  api_key: "413758148884379",
  api_secret: "l6PPOKldW5XClzLH8vDMpntoF7g", // 👈 paste your actual secret here
});

async function uploadFolder(localFolder, cloudinaryFolder) {
  const files = fs.readdirSync(localFolder).sort();
  console.log(`\nUploading ${files.length} files from ${localFolder}...`);

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const localPath = path.join(localFolder, file);
    const publicId = `${cloudinaryFolder}/${path.parse(file).name}`;

    try {
      await cloudinary.uploader.upload(localPath, {
        public_id: publicId,
        overwrite: false,      // skip if already uploaded
        resource_type: "image",
      });
      console.log(`✓ [${i + 1}/${files.length}] ${file}`);
    } catch (err) {
      console.error(`✗ Failed: ${file}`, err.message);
    }
  }
}

await uploadFolder("public/frames-1", "armorray/frames-1");
await uploadFolder("public/frames-2", "armorray/frames-2");

console.log("\n✅ All done!");