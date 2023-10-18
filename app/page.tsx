import { Button } from '@nextui-org/button';
import Link from 'next/link';
import { v4 as uuid } from 'uuid';

export default function Home() {
  return (
    <main className='flex justify-center items-center flex-col min-h-screen'>
      <h1 className='text-3xl font-bold mb-2'>🔊 Welcome to Soundbox 🔊</h1>
      <p className='text-gray-400 text-xl'>
        <Link href={`/host/${uuid()}`}>
          <Button className='px-2 text-xl'>
            Click here
          </Button>
        </Link>
        &nbsp;to host a room
      </p>
    </main>
  )
}
