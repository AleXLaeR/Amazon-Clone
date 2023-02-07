import CheckMarkIcon from 'public/svg/check-mark.svg';
import SEO from 'components/SEO';
import Link from 'next/link';

export default function Success() {
  return (
    <div className="bg-gray-100 h-screen pt-10">
      <SEO title="Checkout Success" desc="Checkout payment was successful" />
      <div className="max-w-screen-lg mx-auto">
        <div className="flex flex-col p-10 pb-6 bg-white rounded-sm shadow-md">
          <div className="flex items-center space-x-2 mb-5">
            <CheckMarkIcon className="text-green-400 h-10" />
            <h1 className="text-3xl">Your order has been confirmed!</h1>
          </div>
          <p className="font-medium">
            Thank you for shopping with us! If you would like to check the status of your order(s),
            please follow the link below:
          </p>
          <Link href="/orders" className="mx-auto">
            <button type="button" className="btn w-full mx-auto mt-3 md:mt-8 text-lg">
              Go to Orders Page
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
