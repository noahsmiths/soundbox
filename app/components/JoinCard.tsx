import { Card } from "@nextui-org/card";
import Link from "next/link";
import { useQRCode } from 'next-qrcode';

export default function JoinCard({ displayText, url, className='' }: { displayText: string, url: string, className?: string }) {
  const { Image: QRCode } = useQRCode();

  return (
    <Card className={className + ' flex items-center p-4'}>
      <div className='pb-2 text-xl font-bold'>
        Join Room
      </div>
      <div className='max-w-[80%] rounded-xl overflow-hidden'>
        <QRCode
          text={url}
          options={{
            margin: 1,
            width: 1000,
          }}
        />
      </div>
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