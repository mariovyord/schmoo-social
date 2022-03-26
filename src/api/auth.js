import { app } from "./firebase";
import { clearUserData, setUserData } from '../utils/userData';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, updateProfile, onAuthStateChanged } from "firebase/auth";
import page from 'page';

const auth = getAuth(app);

export let userState;
onAuthStateChanged(auth, user => { userState = user; console.log(userState) });

export const userLogin = (email, password) => signInWithEmailAndPassword(auth, email, password)
	.then((userCredential) => {
		// Signed in 
		console.log('Successfully logged in!');
		page.redirect('/');
	})
	.catch((error) => {
		throw error;
	});

export const userRegister = (username, email, password) => createUserWithEmailAndPassword(auth, email, password)
	.then((userCredential) => {
		// Signed in 
		updateProfile(auth.currentUser, {
			displayName: username,
		})
		console.log('Successfully registered!');
		page.redirect('/');
	})
	.catch((error) => {
		throw error;
	});

export const userLogout = () => signOut(auth).then(() => {
	clearUserData();
	console.log('Successfully logged out!');
	page.redirect('/');
}).catch((error) => {
	alert(error.message)
});
