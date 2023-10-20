import { Card } from "@nextui-org/card";
import Link from "next/link";
import { useQRCode } from 'next-qrcode';

export default function JoinCard({ displayText, url }: { displayText: string, url: string }) {
  const { Image: QRCode } = useQRCode();

  return (
    <Card className='flex items-center p-4'>
      <div className='pb-2 text-xl font-bold'>
        Join Room
      </div>
      <QRCode text={ url }/>
      <Link
        className='text-gray-400 pt-2 w-11/12 text-sm text-center hover:underline'
        href={url}
        target='_blank'
      >
        { displayText }
      </Link>
    </Card>
  );
}