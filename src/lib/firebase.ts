import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDkLvLh_AV8YKVr3X7XwqGuf_9MeeIs4wA",
  authDomain: "ruhaloud-31891.firebaseapp.com",
  projectId: "ruhaloud-31891",
  storageBucket: "ruhaloud-31891.firebasestorage.app",
  messagingSenderId: "98866095997",
  appId: "1:98866095997:web:abbdb40f0f0f8e40ca4e14",
  measurementId: "G-9BXDR0J6PR"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
