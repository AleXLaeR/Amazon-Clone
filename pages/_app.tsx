import 'styles/globals.css';
import type { AppProps } from 'next/app';

import Header from 'components/layout/Header';
import { SessionProvider } from 'next-auth/react';

import { Provider } from 'react-redux';
import { store } from 'redux/store';

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <Provider store={store}>
      <SessionProvider session={session}>
        <Header />
        <Component {...pageProps} />
      </SessionProvider>
    </Provider>
  );
}
