'use client';

import { Song } from "@/app/types/SongTypes";
import { Button } from "@nextui-org/button";
import { useEffect, useRef, useState } from "react";
import { Socket, io } from "socket.io-client";

export default function Join({ params }: { params: { room: string} }) {
  const socket = useRef<Socket | null>(null);
  const [songQueue, setSongQueue] = useState<Song[]>([]);

  function emit<T>(room: string, event: string, body: T) {
    socket.current?.emit('broadcast', { room, event, body });
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
    <main>
      <Button
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
    </main>
  );
}