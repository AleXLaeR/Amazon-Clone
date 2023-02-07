import { GetStaticProps } from 'next';
import { HomePageProps } from 'typing';

import SEO from 'components/SEO';
import BannerCarousel from 'components/BannerCarousel';
import ProductList from 'components/product/ProductList';

export default function Home({ products }: HomePageProps) {
  return (
    <div className="bg-gray-100">
      <SEO title="Amazon Clone" desc="This is the Amazon-LP clone built using Next.js 12" />
      <div className="max-w-screen-2xl mx-auto">
        <BannerCarousel />
        <ProductList products={products} />
      </div>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  // const products = await fetch('https://fakestoreapi.com/products');
  // const data = await products.json();
  const { default: products } = await import('products.json');

  return {
    props: { products },
  };
};
