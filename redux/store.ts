import { configureStore } from '@reduxjs/toolkit';

import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';

import thunk from 'redux-thunk';
import cartReducer from './slices/cart.slice';

const persistConfig = {
  key: 'root',
  storage,
};

export const store = configureStore({
  reducer: {
    cart: persistReducer(persistConfig, cartReducer),
  },
  devTools: process.env.NODE_ENV !== 'production',
  middleware: [thunk],
});
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
