// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "redux-project-565ef.firebaseapp.com",
  projectId: "redux-project-565ef",
  storageBucket: "redux-project-565ef.appspot.com",
  messagingSenderId: "387105326375",
  appId: "1:387105326375:web:79721a1fee7998ddf3d502"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

