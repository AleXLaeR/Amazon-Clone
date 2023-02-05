import Head from 'next/head';
import BannerCarousel from 'components/BannerCarousel';
import ProductList from 'components/product/ProductList';
import { GetServerSideProps } from 'next';
import { HomePageProps, Product } from 'typing';

export default function Home({ products }: HomePageProps) {
  return (
    <div className="bg-gray-100">
      <Head>
        <title>Amazon Clone</title>
        <meta name="description" content="This is the Amazon-LP clone built using Next.js 12" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="max-w-screen-2xl mx-auto">
        <BannerCarousel />
        <ProductList products={products} />
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const products = await fetch('https://fakestoreapi.com/products', {
    method: 'get',
  });
  const data = await products.json();

  return {
    props: { products: data as Product[] },
  };
};
