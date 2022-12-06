// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyBmzgIeHDcZ8GVMQ72pQFOhjJ5BP3iW25c",
  authDomain: "whatsapp-7e7df.firebaseapp.com",
  projectId: "whatsapp-7e7df",
  storageBucket: "whatsapp-7e7df.appspot.com",
  messagingSenderId: "652157021315",
  appId: "1:652157021315:web:081c240b0ef6640fde3fb6",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
