import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCSClHWuUTfH0L87NBjLa1vbqG4p19vQws",
  authDomain: "aether-vedic.firebaseapp.com",
  projectId: "aether-vedic",
  storageBucket: "aether-vedic.firebasestorage.app",
  messagingSenderId: "644235700284",
  appId: "1:644235700284:web:4bfec034cc754c47d43b39"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
