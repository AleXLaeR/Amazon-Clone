import SEO from 'components/SEO';
import CheckoutItem from 'components/checkout/CheckoutItem';

import { useMemo } from 'react';
import { NumericFormat } from 'react-number-format';

import Image from 'next/image';
import { useSession } from 'next-auth/react';

import stripePromise from 'lib/stripe';
import AdBanner from 'public/ad-checkout.png';

import { useAppSelector } from 'redux/hooks';
import { selectProducts, selectSubTotal } from 'redux/slices/cart.slice';
import axios from 'axios';

export default function Checkout() {
  const { data: session } = useSession();

  const products = useAppSelector(selectProducts);
  const totalItemQuantity = useAppSelector(selectSubTotal);

  const totalProductPrice = useMemo(
    () => products.reduce((acc, { price, quantity }) => acc + price * quantity, 0),
    [products],
  );

  const createCheckoutSession = async () => {
    const stripe = await stripePromise;

    const { data } = await axios.post<{ id: string }>('/api/create-checkout-session', {
      email: session?.user?.email ?? 'E-Mail was not provided',
      products,
    });

    const result = await stripe?.redirectToCheckout({
      sessionId: data.id,
    });

    if (result?.error) {
      alert(result?.error.message ?? 'Stripe error occurred!');
    }
  };

  return (
    <div className="bg-gray-100 border-0">
      <SEO title="Amazon Checkout" desc="This is your checkout page" />
      <div className="lg:flex max-w-screen-2xl mx-auto">
        <div className="flex-grow m-5">
          <Image
            src={AdBanner}
            alt="Ad Banner"
            width={1020}
            height={250}
            className="object-contain lg:ml-4"
          />
          <div className="flex flex-col rounded-lg max-w-[1020px] lg:max-w-full lg:ml-4 p-5 space-y-10 bg-white mt-4">
            <h1 className="capitalize text-3xl border-b pb-4">
              {products.length === 0 ? 'Your Cart is empty' : 'Shopping Cart'}
            </h1>
            {products.map((product) => (
              <CheckoutItem key={product.id} item={product} />
            ))}
          </div>
        </div>

        {products.length > 0 && (
          <div className="bg-white my-5 p-10 shadow-md">
            <div className="w-fit sticky top-4">
              <h2 className="font-semibold border-b-2 border-gray-400 whitespace-nowrap">
                Subtotal ({totalItemQuantity} items):{' '}
                <NumericFormat
                  value={totalProductPrice}
                  className="font-bold inline"
                  displayType="text"
                  thousandSeparator
                  prefix="$"
                  fixedDecimalScale
                  decimalScale={2}
                />
              </h2>
              <button
                type="submit"
                disabled={!session}
                onClick={createCheckoutSession}
                className={`btn w-full mt-2 ${
                  !session &&
                  'from-gray-300 to-gray-500 border-gray-200 text-gray-300 disabled:pointer-events-none'
                }`}
              >
                {!session ? 'Sign in to checkout' : 'Proceed to Checkout'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
