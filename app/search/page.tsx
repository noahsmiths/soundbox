import youtube from '@yimura/scraper';

export default async function Search() {
  const yt = new youtube.Scraper();
  let { videos } = await yt.search("never gonna give you up");

  return (
    <main>
      {
        videos.map((video, i) => {
          return (
            <div className='border-black' key={i}>
              { video.thumbnail }
              { video.link }
            </div>
          )
        })
      }
    </main>
  );
}