import { Product } from 'typing';
import Image from 'next/image';

import DefaultProductImg from 'public/default-product.png';
import AmazonPrimeImg from 'public/amazon-prime.png';

import { useEffect, useState } from 'react';

import { addProduct } from 'redux/slices/cart.slice';
import { useAppDispatch } from 'redux/hooks';
import { truncate } from 'lib/utils';

import CurrencyFormat from 'components/common/CurrencyFormat';
import ProductRating from './ProductRating';

interface Props {
  product: Product;
}

export default function ProductItem({ product }: Props) {
  const { title, price, description, category, image, rating } = product;
  const dispatch = useAppDispatch();

  const [isPrime, setIsPrime] = useState(false);
  useEffect(() => setIsPrime(Math.random() < 0.5), []);

  const addToCart = () => {
    dispatch(addProduct(product));
  };

  return (
    <div className="relative flex flex-col m-5 bg-white z-30 p-10 rounded-md shadow-xl">
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
      <ProductRating rating={rating?.rate} />
      <p className="my-2 line-clamp-3 md:line-clamp-5 xl:line-clamp-6">{description}</p>
      <CurrencyFormat value={price} className="text-lg" />
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
      <button onClick={addToCart} type="button" className="mt-auto btn">
        Add to Cart
      </button>
    </div>
  );
}
