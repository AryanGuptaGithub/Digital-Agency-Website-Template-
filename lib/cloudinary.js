// lib/cloudinary.js
import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export default cloudinary

// Injects optimization params into any Cloudinary URL
export function optimizeUrl(url, width = 1280) {
  return url.replace('/upload/', `/upload/w_${width},q_auto,f_auto/`)
}