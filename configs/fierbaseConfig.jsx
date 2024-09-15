// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIERBASE_API_KEY,
  authDomain: "ai-course-generator-v1.firebaseapp.com",
  projectId: "ai-course-generator-v1",
  storageBucket: "ai-course-generator-v1.appspot.com",
  messagingSenderId: "833377130208",
  appId: "1:833377130208:web:49ea009155e0eff44d2285",
  measurementId: "G-V6HLFMC5ME",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)
