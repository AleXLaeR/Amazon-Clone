import { HomePageProps } from 'typing';
import ProductItem from 'components/product/ProductItem';

import Image from 'next/image';
import AdBanner from 'public/ad-banner.jpg';

export default function ProductList({ products }: Pick<HomePageProps, 'products'>) {
  return (
    <div className="grid grid-flow-row-dense md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:-mt-40">
      {products.slice(0, 4).map((product) => (
        <ProductItem key={product.id} product={product} />
      ))}
      <Image src={AdBanner} alt="Advertisement" className="justify-self-center md:col-span-full" />
      <div className="md:col-span-2">
        <ProductItem product={products.at(4)!} />
      </div>
      {products.slice(5, products.length).map((product) => (
        <ProductItem key={product.id} product={product} />
      ))}
    </div>
  );
}
