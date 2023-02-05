import Image from 'next/image';
import AmazonLogo from 'public/amazon-logo.png';
import SearchBar from 'components/SearchBar';
import { CSSProperties } from 'react';
import CartIcon from 'public/svg/CartIcon.svg';
import MenuIcon from 'public/svg/MenuIcon.svg';

const LogoStyles: CSSProperties = {
  width: 150,
  height: 40,
  objectFit: 'contain',
};

export default function Header() {
  return (
    <div>
      <div className="flex items-center bg-amazon_blue p-1 flex-grow py-2">
        <div className="mt-2 flex items-center flex-grow sm:flex-grow-0">
          <Image src={AmazonLogo} className="cursor-pointer" alt="Amazon logo" style={LogoStyles} />
        </div>
        <SearchBar />
        <div className="text-white flex items-center text-xs space-x-6 mx-6 whitespace-nowrap">
          <div className="link">
            <p>Hello, Olexandr Lazarenko</p>
            <p className="p-x-bold">Account & Lists</p>
          </div>
          <div className="link">
            <p>Returns</p>
            <p className="p-x-bold">& Orders</p>
          </div>
          <div className="link relative flex items-center">
            <span className="absolute top-0 right-0 md:right-7 h-4 w-4 bg-yellow-400 text-center rounded-full text-black font-bold">
              {0}
            </span>
            <CartIcon className="h-10" />
            <p className="hidden md:inline md:text-sm mt-2 p-x-bold">Cart</p>
          </div>
        </div>
      </div>
      <div className="flex items-center space-x-3 p-2 pl-6 bg-amazon_blue-light text-white text-sm">
        <p className="link flex items-center font-semibold">
          <MenuIcon className="h-6 mr-1" />
          All
        </p>
        <p className="link">Prime Video</p>
        <p className="link">Amazon Business</p>
        <p className="link">Today&apos;s Deals</p>
        <p className="lg-hidden-link">Food & Grocery</p>
        <p className="lg-hidden-link">Prime</p>
        <p className="lg-hidden-link">Buy Again</p>
        <p className="lg-hidden-link">Shopper Toolkit</p>
        <p className="lg-hidden-link">Health & Personal Care</p>
      </div>
    </div>
  );
}
