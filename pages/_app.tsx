import 'styles/globals.css';
import type { AppProps } from 'next/app';

import Header from 'components/layout/Header';
import { SessionProvider } from 'next-auth/react';

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <Header />
      <Component {...pageProps} />;
    </SessionProvider>
  );
}
