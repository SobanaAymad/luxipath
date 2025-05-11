import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  RecaptchaVerifier,
  signInWithPhoneNumber,
  signOut,
  onAuthStateChanged
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDcog6EpEX8sAxaVnK4aCCo9_pDYII7B0g",
  authDomain: "luxipath.firebaseapp.com",
  projectId: "luxipath",
  storageBucket: "luxipath.firebasestorage.app",
  messagingSenderId: "903126835701",
  appId: "1:903126835701:web:3782fa8961fe2e088d8bbc",
  measurementId: "G-RW3M9E1VWL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Export auth and methods
export { 
  auth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  signOut,
  onAuthStateChanged
};