// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyDJr7Kb7wcetj_QyYPresYjwF6C59IVXt8",
	authDomain: "schmoozer-social.firebaseapp.com",
	projectId: "schmoozer-social",
	storageBucket: "schmoozer-social.appspot.com",
	messagingSenderId: "50960531443",
	appId: "1:50960531443:web:a7025e2afe14055f02dc86",
	measurementId: "G-TF8QR9L2B6",
	databaseURL: "https://schmoozer-social-default-rtdb.europe-west1.firebasedatabase.app/"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
