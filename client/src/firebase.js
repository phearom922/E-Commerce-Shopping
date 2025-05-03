import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCbOrmOCFjxK5ylagvHvi465AGTGZTBzH4",
    authDomain: "cambo-shopping.firebaseapp.com",
    projectId: "cambo-shopping",
    storageBucket: "cambo-shopping.firebasestorage.app",
    messagingSenderId: "575135794112",
    appId: "1:575135794112:web:95cc73291a55fbc87b3e25"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };