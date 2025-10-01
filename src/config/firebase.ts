// Import the functions you need from the SDKs you need

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyB3kvu4UEEr7dDhMZ4Fla2p9e6I9lMuZBc',
  authDomain: 'fir-with-springboot-b7a67.firebaseapp.com',
  projectId: 'fir-with-springboot-b7a67',
  storageBucket: 'fir-with-springboot-b7a67.firebasestorage.app',
  messagingSenderId: '681956099660',
  appId: '1:681956099660:web:8cbbe2e3fc9e5c189656e9',
  measurementId: 'G-4FRM7780J4'
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
