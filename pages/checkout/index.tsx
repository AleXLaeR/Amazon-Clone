import SEO from 'components/SEO';

import Image from 'next/image';
import AdBanner from 'public/ad-checkout.png';

import { useAppSelector } from 'redux/hooks';
import { selectProducts } from 'redux/slices/cart.slice';
import CheckoutItem from 'components/checkout/CheckoutItem';

export default function Checkout() {
  const products = useAppSelector(selectProducts);

  return (
    <div className="bg-gray-100 border-0">
      <SEO title="Amazon Checkout" desc="This is your checkout page" />
      <div className="lg:flex max-w-screen-2xl mx-auto">
        {/* Left section */}
        <div className="flex-grow m-5">
          <Image
            src={AdBanner}
            alt="Ad Banner"
            width={1020}
            height={250}
            className="object-contain lg:ml-4"
          />
          <div className="flex flex-col p-5 space-y-10 bg-white mt-4">
            <h1 className="capitalize text-3xl border-b pb-4">
              {products.length === 0 ? 'Your Cart is empty' : 'Shopping Cart'}
            </h1>
            {products.map((product) => (
              <CheckoutItem key={product.id} item={product} />
            ))}
          </div>
        </div>
        {/* Right section */}
      </div>
    </div>
  );
}
