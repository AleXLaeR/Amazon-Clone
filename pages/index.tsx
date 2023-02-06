import Head from 'next/head';
import BannerCarousel from 'components/BannerCarousel';
import ProductList from 'components/product/ProductList';
import { GetServerSideProps } from 'next';
import { HomePageProps, Product } from 'typing';
import React from 'react';
import SEO from '../components/SEO';

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

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const products = await fetch('https://fakestoreapi.com/products');
  const data = await products.json();

  return {
    props: { products: data as Product[] },
  };
};
