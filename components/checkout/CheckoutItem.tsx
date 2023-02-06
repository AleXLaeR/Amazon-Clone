import { Product } from 'typing';
import Image from 'next/image';

import { truncate } from 'lib/utils';
import { NumericFormat } from 'react-number-format';

import DefaultProductImg from 'public/default-product.png';
import ProductRating from 'components/product/ProductRating';

import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { addProduct, removeProduct, selectQuantity } from 'redux/slices/cart.slice';

interface CheckoutItemProps {
  item: Product;
}

export default function CheckoutItem({ item }: CheckoutItemProps) {
  const { id, title, price, description, image, rating } = item;
  const cartItemQuantity = useAppSelector((state) => selectQuantity(state, id));

  const dispatch = useAppDispatch();

  const addToCart = () => {
    dispatch(addProduct(item));
  };

  const removeFromCart = () => {
    dispatch(removeProduct(id));
  };

  return (
    <div className="grid grid-cols-5">
      <Image
        src={image ?? DefaultProductImg}
        alt={truncate(title)}
        className="object-contain max-h-[250px]"
        width={200}
        height={200}
      />
      <div className="col-span-3 mx-5">
        <p>{title}</p>
        <ProductRating rating={rating?.rate} />
        <p className="text-xs my-2 line-clamp-3 md:line-clamp-5 lg:line-clamp-none">
          {description}
        </p>
        <div>
          <NumericFormat
            value={price}
            className="text-lg font-semibold inline"
            displayType="text"
            thousandSeparator
            prefix="$"
            fixedDecimalScale
            decimalScale={2}
          />
          <span className="inline ml-2 px-[2px] font-bold border-gray-400 border-2 rounded">
            {`x${cartItemQuantity}`}
          </span>
        </div>
      </div>
      <div className="flex flex-col space-y-2 mt-2 xl:items-end">
        <button type="button" onClick={addToCart} className="btn w-[80px] sm:w-full xl:w-[200px]">
          Add
        </button>
        <button
          type="button"
          onClick={removeFromCart}
          className="btn w-[80px] sm:w-full xl:w-[200px]"
        >
          Remove
        </button>
      </div>
    </div>
  );
}
