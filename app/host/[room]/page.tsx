'use client'

import { io, Socket } from 'socket.io-client';
import { useState, useEffect, useRef } from 'react';
import { Card } from '@nextui-org/card';
import SongCard from '@/app/components/SongCard';
import { Song } from '@/app/types/SongTypes';
import JoinCard from '@/app/components/JoinCard';

export default function Room({ params }: { params: { room: string } }) {
  const socket = useRef<Socket | null>(null);
  const [songQueue, setSongQueue] = useState<Song[]>([]);

  useEffect(() => {
    socket.current = io(process.env.NEXT_PUBLIC_SOCKET_SERVER_URL || '');
    socket.current.emit('join', { room: params.room });

    return () => {
      socket.current?.disconnect();
    }
  }, []);

  useEffect(() => {
    socket.current?.off('add-song');
    socket.current?.on('add-song', (song: Song) => {
      setSongQueue([...songQueue, song]);
    });
  }, [songQueue]);

  return (
    <main className='flex justify-center items-center flex-col min-h-screen flex-none'>
      <div className='grid grid-cols-4 gap-4 w-2/3 items-center'>
        <div className='col-span-3'>
          <Card className='p-4'>
            <h1 className='font-bold text-2xl mb-2'>Room Queue:</h1>
            <div className='overflow-y-scroll max-h-[80vh] min-h-[80vh] flex items-center flex-col'>
              {
                songQueue.length > 0
                ?
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
                :
                  <h2 className='text-xl text-gray-400'>Song Queue Empty</h2>
              }
            </div>
          </Card>
        </div>
        <div className='max-h-full col-span-1'>
          <JoinCard
            url={ `${window.location.origin}/join/${params.room}` }
            displayText={ params.room }
          />
        </div>
      </div>
    </main>
  );
}