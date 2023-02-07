import CancelMarkIcon from 'public/svg/cancel-mark.svg';
import SEO from 'components/SEO';
import Link from 'next/link';

export default function Failure() {
  return (
    <div className="bg-gray-100 h-screen pt-10">
      <SEO title="Checkout Success" desc="Checkout payment was successful" />
      <div className="max-w-screen-lg mx-auto">
        <div className="flex flex-col p-10 pb-6 bg-white rounded-sm shadow-md">
          <div className="flex items-center space-x-2 mb-5">
            <CancelMarkIcon className="text-red-500 h-10" />
            <h1 className="text-3xl">Your order has been confirmed!</h1>
          </div>
          <p className="font-medium text-sm md:text-base">
            It seems an error occurred during payment processing! Please try to checkout again, and
            if this will not solve the issue, contact us via this email:{' '}
            <a
              href="mailto: amznshop@help.com"
              className="font-bold hover:underline underline-offset-4"
            >
              amznshop@help.com
            </a>
            .
          </p>
          <Link href="/checkout" className="flex-grow">
            <button type="button" className="btn w-full mx-auto mt-3 md:mt-8 text-lg">
              Go to Checkout Page
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
