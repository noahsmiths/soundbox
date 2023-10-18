'use client'

import { io, Socket } from 'socket.io-client';
import { useState, useEffect, useRef } from 'react';
import { Card } from '@nextui-org/card';
import { useQRCode } from 'next-qrcode';
import Link from 'next/link';

export default function Room({ params }: { params: { room: string } }) {
  const { Image: QRCode } = useQRCode();
  const socket = useRef<Socket | null>(null);

  useEffect(() => {
    socket.current = io(process.env.NEXT_PUBLIC_SOCKET_SERVER_URL || '');
    socket.current.emit('ping');
    socket.current.on('pong', () => {console.log("ponged")});

    return () => {
      socket.current?.disconnect();
    }
  }, []);

  return (
    <main className='flex justify-center items-center flex-col min-h-screen'>
      <div className='grid grid-cols-4 gap-4 w-2/3'>
        <Card className='col-span-3 p-4'>
          <h1 className='font-bold text-2xl'>Room Queue:</h1>
        </Card>
        <Card className='flex items-center col-span-1 p-4'>
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
    </main>
  );
}