import 'styles/globals.css';
import type { AppProps } from 'next/app';

import Header from 'components/layout/Header';
import { SessionProvider } from 'next-auth/react';

import { persistor, store } from 'redux/store';
import { Provider as ReduxProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <ReduxProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SessionProvider session={session}>
          <Header />
          <Component {...pageProps} />
        </SessionProvider>
      </PersistGate>
    </ReduxProvider>
  );
}
