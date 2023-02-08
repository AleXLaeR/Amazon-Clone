import { StripeOrder } from 'typing';
import Image from 'next/image';

import moment from 'moment';
import CurrencyFormat from 'components/common/CurrencyFormat';

interface OrderItemProps {
  order: StripeOrder;
}

export default function OrderItem({ order }: OrderItemProps) {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { id, images, amount, amount_shipping, timestamp, products } = order;

  return (
    <div className="relative border rounded-md bg-white">
      <div className="flex items-center space-x-10 p-5 bg-gray-100 text-sm text-gray-600">
        <div>
          <h2 className="font-bold text-xs uppercase">order placed</h2>
          <p>{moment.unix(timestamp).format('DD MMM YYYY, HH:mm')}</p>
        </div>
        <div>
          <h2 className="font-bold text-xs uppercase">total</h2>
          <p className="text-sm sm:text-lg">
            <CurrencyFormat value={amount} />
            <span> + </span>
            <CurrencyFormat value={amount_shipping} />
          </p>
        </div>
        <p className="text-sm whitespace-nowrap sm:text-xl underline underline-offset-2 self-end flex-grow text-right text-blue-500">
          {products.length} items total
        </p>
        <h4 className="absolute top-2 right-2 w-32 truncate lg:w-auto">Order: # {id}</h4>
      </div>
      <div className="p-5 sm:p-8 border-y-2">
        <div className="flex space-x-6 overflow-x-auto pb-4">
          {images
            .flatMap((i) => [i, i, i])
            ?.map((image, idx) => (
              <Image
                src={image}
                alt={`image ${idx + 1}`}
                width={120}
                height={120}
                className="object-contain border-x-2 px-2"
              />
            ))}
        </div>
      </div>
    </div>
  );
}
