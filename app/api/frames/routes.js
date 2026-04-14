// app/api/frames/route.js
import cloudinary from '@/lib/cloudinary'
import { optimizeUrl } from '@/lib/cloudinary'

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const folder = searchParams.get('folder') // 'frames-1' or 'frames-2'

  if (!folder) {
    return Response.json({ error: 'folder param required' }, { status: 400 })
  }

  const result = await cloudinary.search
    .expression(`folder:armorray/${folder}`)
    .sort_by('public_id', 'asc')
    .max_results(400)
    .execute()

  const urls = result.resources.map((r) => optimizeUrl(r.secure_url))

  return Response.json({ urls })
}