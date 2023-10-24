'use client';

import { Song } from "@/app/types/SongTypes";
import { VideoSearchResponse } from "@/app/types/VideoSearchResponse";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { Video } from "@yimura/scraper";
import { useEffect, useRef, useState } from "react";
import { Socket, io } from "socket.io-client";

export default function Join({ params }: { params: { room: string} }) {
  const socket = useRef<Socket | null>(null);
  const [songQueue, setSongQueue] = useState<Song[]>([]);
  const [search, setSearch] = useState<string>('');
  const [searchResults, setSearchResults] = useState<Video[]>([]);

  function emit<T>(room: string, event: string, body: T) {
    socket.current?.emit('broadcast', { room, event, body });
  }

  function sendSearch(query: string) {
    fetch(`/api/search?video_title=${encodeURIComponent(query)}`)
      .then((res) => res.json())
      .then(({ videos }: VideoSearchResponse) => { setSearchResults(videos); })
      .catch(() => {});
  }

  useEffect(() => {
    socket.current = io(process.env.NEXT_PUBLIC_SOCKET_SERVER_URL || '');

    socket.current.on('update-songs', (songs: Song[]) => {
      setSongQueue(songs);
    });

    socket.current.emit('join', { room: params.room });

    return () => {
      socket.current?.disconnect();
    }
  }, []);

  return (
    <main className='flex flex-col w-full gap-4 p-4'>
      <div className='flex flex-row'>
        <Input
          placeholder='Search'
          value={search}
          onValueChange={setSearch}
          radius='none'
          className='rounded-l-xl overflow-hidden'
        />
        <Button
          className='rounded-none rounded-r-xl'
          onPress={() => { sendSearch(search); }}
        >
          Search
        </Button>
      </div>
      {
        searchResults.map((video, i) => {
          return (
            <div key={i}>
              { video.title }
              <Button onPress={() => { emit<Song>(params.room, 'add-song', { name: video.title, image: video.thumbnail, artist: video.channel.name, url: video.link }) }}>Play this</Button>
            </div>
          );
        })
      }
      {/* <Button
        onPress={
          () => {
            emit<Song>(params.room, 'add-song', {
              name: "The Beatles - Don't Let Me Down",
              image: "https://i.ytimg.com/vi/NCtzkaL2t_Y/maxresdefault.jpg",
              artist: "The Beatles",
              url: "https://www.youtube.com/watch?v=NCtzkaL2t_Y"
            });
          }
        }
      >
      Click to add song
      </Button>
      <Button
        onPress={
          () => {
            emit<Song>(params.room, 'add-song', {
              name: "Never gonna give you up",
              image: "https://i.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
              artist: "Rick Astley",
              url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
            });
          }
        }
      >
      Click to add song 2
      </Button> */}


    </main>
  );
}