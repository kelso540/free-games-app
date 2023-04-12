import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import KEYS from './config';

const firebaseConfig = {
  apiKey: KEYS.FIREBASE_API,
  authDomain: KEYS.FIREBASE_AUTH_DOMAIN,
  projectId: KEYS.FIREBASE_PROJECT_ID,
  storageBucket: KEYS.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: KEYS.FIREBASE_MSG_SENDER_ID,
  appId: KEYS.FIREBASE_APPID,
  measurementId: KEYS.FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app); 
export const db = getFirestore(app); 