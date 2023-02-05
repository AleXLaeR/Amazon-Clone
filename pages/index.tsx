import Head from 'next/head';
import Header from 'components/Header';

export default function Home() {
  return (
    <>
      <Head>
        <title>Amazon Clone</title>
        <meta name="description" content="This is the Amazon-LP clone built using Next.js 12" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
    </>
  );
}
