import youtube from '@yimura/scraper';

export default async function Search() {
  const yt = new youtube.Scraper();
  let { videos } = await yt.search("Don't let me down");

  return (
    <main>
      {
        videos.map((video, i) => {
          return (
            <div className='border-black' key={i}>
              { video.link }
            </div>
          )
        })
      }
    </main>
  );
}