import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth"
import { getFirestore } from "firebase/firestore";

// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  // apiKey: "AIzaSyARrfjYsoWvreaNdMxuJHOvNTbk4NUkNqw",
  // authDomain: "auth-pedro.firebaseapp.com",
  // projectId: "auth-pedro",
  // storageBucket: "auth-pedro.appspot.com",
  // messagingSenderId: "438741123731",
  // appId: "1:438741123731:web:fcec5f5ed0f16404224366",
  // measurementId: "G-2D2E4Q9QLT"
  apiKey: "AIzaSyDetzH1eNrXNVVe1iy5O24P7BI3mS2OFC0",
  authDomain: "ali-auth.firebaseapp.com",
  projectId: "ali-auth",
  storageBucket: "ali-auth.appspot.com",
  messagingSenderId: "75301234049",
  appId: "1:75301234049:web:58652c188fc1df3c26f480",
  measurementId: "G-BKPZXRKK41"
};

const app = initializeApp(firebaseConfig);

// use the authentication service from firebase intialized app
export const auth = getAuth(app) 

// Initialize google authenticator service
export const GoogleProvider = new GoogleAuthProvider();

export const db = getFirestore(app);

// const analytics = getAnalytics(app);
//? analytics is not important unless you are managing an excessive amount of users

