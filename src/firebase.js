import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
const firebaseConfig = {
  apiKey: "AIzaSyCqbihD3M2kphtu-RKkLMgAuMp8U15HOf4",
  authDomain: "wishlingode.firebaseapp.com",
  databaseURL: "https://wishlingode-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "wishlingode",
  storageBucket: "wishlingode.appspot.com",
  messagingSenderId: "710272943387",
  appId: "1:710272943387:web:a0e73ba30f737b18777fbe"
};

const app = initializeApp(firebaseConfig);


export const auth = getAuth(app);