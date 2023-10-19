import { Card } from '@nextui-org/card'
import Image from 'next/image'

interface SongCardProps {
  name: string,
  image: string,
  artist: string
}

export default function SongCard({ name, image, artist }: SongCardProps) {
  return (
    <Card className='grid justify-center mb-3 bg-gray-500 bg-opacity-10 p-3 grid-cols-5'>
      <Image
        src={image}
        alt="No image found"
        height={100}
        width={100}
        className='col-span-1'
      />
      <div className='col-span-4'>
        <h2 className='text-lg'>{ name }</h2>
        <h4 className=' text-gray-400'>{ artist }</h4>
      </div>
    </Card>
  )
}