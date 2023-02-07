import { initializeApp } from 'firebase/app';
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

const app = initializeApp(firebaseConfig);

// eslint-disable-next-line import/no-mutable-exports
let adminApp: admin.app.App;
if (admin.apps.length === 0) {
  adminApp = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as ServiceAccount),
  });
} else {
  adminApp = admin.app();
}

export { adminApp as default };
