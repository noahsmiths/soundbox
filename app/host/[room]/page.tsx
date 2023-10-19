'use client'

import { io, Socket } from 'socket.io-client';
import { useState, useEffect, useRef } from 'react';
import { Card } from '@nextui-org/card';
import { useQRCode } from 'next-qrcode';
import Link from 'next/link';
import SongCard from '@/app/components/SongCard';

export default function Room({ params }: { params: { room: string } }) {
  const { Image: QRCode } = useQRCode();
  const socket = useRef<Socket | null>(null);

  useEffect(() => {
    socket.current = io(process.env.NEXT_PUBLIC_SOCKET_SERVER_URL || '');
    socket.current.emit('join', { room: params.room });
    socket.current.on('pong', (data) => {console.log(data)});

    return () => {
      socket.current?.disconnect();
    }
  }, []);

  const songs = [
    {
      name: "The Beatles - Don't Let Me Down",
      image: "https://i.ytimg.com/vi/NCtzkaL2t_Y/maxresdefault.jpg",
      artist: "The Beatles"
    },
    {
      name: "The Beatles - Don't Let Me Down 2",
      image: "https://i.ytimg.com/vi/NCtzkaL2t_Y/maxresdefault.jpg",
      artist: "The Beatles 2"
    },
    {
      name: "The Beatles - Don't Let Me Down 2",
      image: "https://i.ytimg.com/vi/NCtzkaL2t_Y/maxresdefault.jpg",
      artist: "The Beatles 2"
    },
    {
      name: "The Beatles - Don't Let Me Down 2",
      image: "https://i.ytimg.com/vi/NCtzkaL2t_Y/maxresdefault.jpg",
      artist: "The Beatles 2"
    },
    {
      name: "The Beatles - Don't Let Me Down 2",
      image: "https://i.ytimg.com/vi/NCtzkaL2t_Y/maxresdefault.jpg",
      artist: "The Beatles 2"
    },
    {
      name: "The Beatles - Don't Let Me Down 2",
      image: "https://i.ytimg.com/vi/NCtzkaL2t_Y/maxresdefault.jpg",
      artist: "The Beatles 2"
    },
    {
      name: "The Beatles - Don't Let Me Down 2",
      image: "https://i.ytimg.com/vi/NCtzkaL2t_Y/maxresdefault.jpg",
      artist: "The Beatles 2"
    },
    {
      name: "The Beatles - Don't Let Me Down 2",
      image: "https://i.ytimg.com/vi/NCtzkaL2t_Y/maxresdefault.jpg",
      artist: "The Beatles 2"
    },
  ]

  return (
    <main className='flex justify-center items-center flex-col min-h-screen flex-none'>
      <div className='grid grid-cols-4 gap-4 w-2/3 items-center'>
        <div className='col-span-3'>
          <Card className='p-4'>
            <h1 className='font-bold text-2xl mb-2'>Room Queue:</h1>
            <div className='overflow-y-scroll max-h-[80vh]'>
              {
                songs.map((song, i) => {
                  return (
                    <SongCard
                      name={song.name}
                      image={song.image}
                      artist={song.artist}
                      key={i}
                    />
                  )
                })
              }
            </div>
          </Card>
        </div>
        <div className='max-h-full col-span-1'>
          <Card className='flex items-center p-4'>
            <div className='pb-2 text-xl font-bold'>
              Join Room
            </div>
            <QRCode text={ `${process.env.NEXT_PUBLIC_SOCKET_SITE_URL}/join/${params.room}` }/>
            <Link
              className='text-gray-400 pt-2 w-11/12 text-sm text-center hover:underline'
              href={ `${process.env.NEXT_PUBLIC_SOCKET_SITE_URL}/join/${params.room}` }
              target='_blank'
            >
              { `${params.room}` }
            </Link>
          </Card>
        </div>
      </div>
    </main>
  );
}