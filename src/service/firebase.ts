// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyDMfmSbJcD5XL2SgXFFKARs8sENVapqGKI",
  authDomain: "music-realtime-34252.firebaseapp.com",
  projectId: "music-realtime-34252",
  storageBucket: "music-realtime-34252.appspot.com",
  messagingSenderId: "397034851262",
  appId: "1:397034851262:web:5c8e232331182de8da87ef",
  measurementId: "G-3EK0EXTET1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
