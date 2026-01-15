import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

// const firebaseConfig = {
//   apiKey: "YOUR_API_KEY",
//   authDomain: "YOUR_DOMAIN",
//   projectId: "YOUR_PROJECT_ID",
//   appId: "YOUR_APP_ID",
// };

const firebaseConfig = {
  apiKey: "AIzaSyD8AhxEG0vhPFr3BtnU1JDoDNEYuGyR7UM",
  authDomain: "random-connect-216cc.firebaseapp.com",
  projectId: "random-connect-216cc",
  storageBucket: "random-connect-216cc.firebasestorage.app",
  messagingSenderId: "204884000618",
  appId: "1:204884000618:web:5922a4931f751d6aa0af13",
  measurementId: "G-EDN8FGH28T"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const signInWithGoogle = () => signInWithPopup(auth, googleProvider);

// const app = initializeApp(firebaseConfig);

// export const auth = getAuth(app);
// export const googleProvider = new GoogleAuthProvider();
