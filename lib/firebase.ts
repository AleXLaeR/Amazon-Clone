/* eslint-disable import/no-mutable-exports */
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { DocumentData, QueryDocumentSnapshot } from '@firebase/firestore-types';

import * as admin from 'firebase-admin';
import { ServiceAccount } from 'firebase-admin';
import serviceAccount from 'fb-permissions.json';

const firebaseConfig = {
  apiKey: 'AIzaSyBpQnNUn1YMbvFzt4hrPBiT3Y9X6586N2A',
  authDomain: 'nextjs-chat-app-e6add.firebaseapp.com',
  projectId: 'nextjs-chat-app-e6add',
  storageBucket: 'nextjs-chat-app-e6add.appspot.com',
  messagingSenderId: '715044423913',
  appId: '1:715044423913:web:78fd9e307a96f55fd84878',
};

let app: firebase.app.App;
if (!firebase?.apps.length) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

let adminApp: admin.app.App;
if (admin.apps.length === 0) {
  adminApp = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as ServiceAccount),
  });
} else {
  adminApp = admin.app();
}

export const convertTo = <T extends object>() => ({
  toFirestore: (doc: T): DocumentData => doc,
  fromFirestore: (snapshot: QueryDocumentSnapshot): T => (snapshot.data() ?? {}) as T,
});

export const db = app.firestore();

export default adminApp;
