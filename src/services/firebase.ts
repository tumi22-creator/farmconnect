import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB-8J4v7mZjaAWezJ2yFZrv9s5zhqrKNtw",
  authDomain: "farmconnect-5e99a.firebaseapp.com",
  projectId: "farmconnect-5e99a",
  storageBucket: "farmconnect-5e99a.firebasestorage.app",
  messagingSenderId: "1042482356774",
  appId: "1:1042482356774:web:a2e57f205cc63aa62a7ce7"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);