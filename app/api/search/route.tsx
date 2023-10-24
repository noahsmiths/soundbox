import youtube from '@yimura/scraper';
import { VideoSearchResponse } from '@/app/types/VideoSearchResponse';

export async function GET(request: Request) {
  let { searchParams } = new URL(request.url);

  if (!searchParams.has('video_title')) {
    return Response.json({ error: '"video_title" url parameter must be provided.' }, { status: 400 });
  }

  try {
    const yt = new youtube.Scraper();
    let { videos }: VideoSearchResponse = await yt.search(searchParams.get('video_title') as string, { language: 'en-US', searchType: 'VIDEO' });

    return Response.json({ videos });
  } catch (err) {
    return Response.json({ error: 'Failed to search YouTube for video.' }, { status: 502 });
  }
}