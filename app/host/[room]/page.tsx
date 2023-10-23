'use client'

import { io, Socket } from 'socket.io-client';
import { useState, useEffect, useRef } from 'react';
import { Card } from '@nextui-org/card';
import SongCard from '@/app/components/SongCard';
import { Song } from '@/app/types/SongTypes';
import JoinCard from '@/app/components/JoinCard';
import ReactPlayer from 'react-player/youtube';
import { Button } from '@nextui-org/button';

export default function Room({ params }: { params: { room: string } }) {
  const socket = useRef<Socket | null>(null);
  const [songQueue, setSongQueue] = useState<Song[]>([]);
  const [isClient, setIsClient] = useState<boolean>(false);
  const [playSong, setPlaySong] = useState<boolean>(true);

  useEffect(() => {
    setIsClient(true);

    socket.current = io(process.env.NEXT_PUBLIC_SOCKET_SERVER_URL || '');

    socket.current.on('add-song', (song: Song) => {
      setSongQueue((oldQueue) => {
        // Adding this fake parameter onto the song URL below forces the player to refresh even if the URL is otherwise the same
        // This makes it play the same video again if it's queued more than once.
        song.url += `&extra_random_param=${Date.now()}`;
        return [...oldQueue, song];
      });
    });

    socket.current.on('connect', () => {
      socket.current?.emit('join', { room: params.room });
    });

    return () => {
      socket.current?.disconnect();
    }
  }, []);

  function playNext() {
    setSongQueue((oldQueue) => {
      return oldQueue.slice(1);
    });
  }

  return (
    <main className='flex justify-center items-center flex-col min-h-screen flex-none'>
      <div className='grid grid-cols-7 gap-4 w-[95%] items-center'>
        <div className='col-span-5'>
          <Card className='p-4'>
            <h1 className='font-bold text-2xl mb-2'>Room Queue:</h1>
            <div className='overflow-y-scroll max-h-[80vh] min-h-[80vh]'>
              {
                songQueue.length > 0 ? (
                  songQueue.map((song, i) => {
                    return (
                      <SongCard
                        name={song.name}
                        image={song.image}
                        artist={song.artist}
                        key={i}
                        className='w-full'
                      />
                    )
                  })
                ) : (
                  <h2 className='text-xl text-gray-400'>Song Queue Empty</h2>
                )
              }
            </div>
          </Card>
        </div>
        <div className='max-h-full col-span-2 h-full flex gap-4 flex-col'>
          {
            isClient && (
              <>
                <Card className='p-4 h-2/5 flex justify-center items-center'>
                  { songQueue.length > 0 ? (
                      <ReactPlayer
                        url={songQueue[0]?.url}
                        playing={playSong}
                        controls={false}
                        width={'100%'}
                        height={'100%'}
                        onEnded={playNext}
                      />
                    ) : (
                      <h2 className='text-xl text-gray-400'>No Video</h2>
                    )
                  }
                </Card>
                <JoinCard
                  url={ `${window.location.origin}/join/${params.room}` }
                  displayText={ params.room }
                  className='h-3/5 -pb-4'
                />
              </>
            )
          }
        </div>
      </div>
    </main>
  );
}