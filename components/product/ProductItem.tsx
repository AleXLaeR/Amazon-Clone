import { Product } from 'typing';
import Image from 'next/image';

import DefaultProductImg from 'public/default-product.png';
import AmazonPrimeImg from 'public/amazon-prime.png';

import { NumericFormat } from 'react-number-format';
import { useEffect, useState } from 'react';
import { Rating } from 'react-simple-star-rating';

const truncate = (str?: string, charAmount = 30): string =>
  str && str.length > charAmount ? `${str.slice(0, charAmount - 3)}...` : str ?? 'product';

interface Props {
  product: Product;
}

export default function ProductItem({ product }: Props) {
  const { title, price, description, category, image, rating } = product;

  const [isPrime, setIsPrime] = useState(false);
  useEffect(() => setIsPrime(Math.random() < 0.5), []);

  return (
    <div className="relative flex flex-col m-5 bg-white z-30 p-10">
      <p
        className={`absolute top-2 right-2 italic text-gray-400 border-2 p-2 rounded-md
          underline underline-offset-4 text-xs hover:cursor-pointer`}
      >
        {category}
      </p>
      <div className="flex justify-center border-b-2">
        <Image
          src={image ?? DefaultProductImg}
          alt={truncate(title)}
          className="object-contain"
          style={{ height: 200 }}
          width={200}
          height={200}
        />
      </div>
      <h4 className="my-3 text-lg hover:underline hover:cursor-pointer xl:line-clamp-3">{title}</h4>
      <Rating
        initialValue={rating?.rate}
        SVGclassName="inline-block"
        fillColor="orange"
        allowFraction
        readonly
        size={26}
      />
      <p className="my-2 line-clamp-3 md:line-clamp-5 xl:line-clamp-6">{description}</p>
      <NumericFormat
        value={price}
        className="text-lg"
        displayType="text"
        thousandSeparator
        prefix="$"
        fixedDecimalScale
        decimalScale={2}
      />
      {isPrime && (
        <div className="flex items-center space-x-2">
          <Image
            src={AmazonPrimeImg}
            alt="Amazon Prime"
            className="object-cover"
            width={50}
            height={50}
          />
          <p className="text-xs text-gray-500">
            <b>FREE</b> Next-Day Delivery
          </p>
        </div>
      )}
      <button type="button" className="mt-auto btn">
        Add to Cart
      </button>
    </div>
  );
}
