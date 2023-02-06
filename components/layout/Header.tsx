import { CSSProperties } from 'react';
import SearchBar from 'components/common/SearchBar';

import Image from 'next/image';
import Link from 'next/link';
import { signIn, signOut, useSession } from 'next-auth/react';

import AmazonLogo from 'public/amazon-logo.png';
import CartIcon from 'public/svg/CartIcon.svg';
import MenuIcon from 'public/svg/MenuIcon.svg';

import { useAppSelector } from 'redux/hooks';
import { selectSubTotal } from 'redux/slices/cart.slice';

const LogoStyles: CSSProperties = {
  width: 150,
  height: 40,
  objectFit: 'contain',
};

const productCategories = [
  'Prime Video',
  'Amazon Business',
  "Today's Deals",
  'Food & Grocery',
  'Prime',
  'Buy Again',
  'Shopper Toolkit',
  'Health & Personal Care',
];

export default function Header() {
  const { data: session, status } = useSession();
  const totalCartItemQuantity = useAppSelector(selectSubTotal);

  const onLoginBtnClick = async () => {
    await (status === 'authenticated' ? signOut() : signIn());
  };

  return (
    <div>
      <div className="flex items-center bg-amazon_blue p-1 flex-grow py-2">
        <Link href="/">
          <div className="mt-2 flex items-center flex-grow sm:flex-grow-0">
            <Image
              src={AmazonLogo}
              className="cursor-pointer"
              alt="Amazon logo"
              style={LogoStyles}
            />
          </div>
        </Link>
        <SearchBar />
        <div className="text-white flex items-center text-xs space-x-6 mx-6 whitespace-nowrap">
          <div className="link" onClick={onLoginBtnClick} role="presentation">
            <p>{`Hello, ${session ? `${session.user!.name}` : 'Please Sign In!'}`}</p>
            <p className="p-x-bold">Account & Lists</p>
          </div>
          <div className="link">
            <p>Returns</p>
            <p className="p-x-bold">& Orders</p>
          </div>
          <Link href="/checkout">
            <div className="link relative flex items-center">
              <span className="absolute top-0 right-0 md:right-7 h-4 w-4 bg-yellow-400 text-center rounded-full text-black font-bold">
                {totalCartItemQuantity}
              </span>
              <CartIcon className="h-10" />
              <p className="hidden md:inline md:text-sm mt-2 p-x-bold">Cart</p>
            </div>
          </Link>
        </div>
      </div>
      <div className="flex items-center space-x-3 p-2 pl-6 bg-amazon_blue-light text-white text-sm">
        <p className="link flex items-center font-semibold">
          <MenuIcon className="h-6 mr-1" />
          All
        </p>
        {productCategories.map((category, idx) => (
          <p className={`${idx < 3 ? 'link' : 'lg-hidden-link'}`}>{category}</p>
        ))}
      </div>
    </div>
  );
}
