import { app } from "./firebase";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, updateProfile, onAuthStateChanged } from "firebase/auth";
import page from 'page';

const auth = getAuth(app);

export const getUser = () => auth.currentUser;

export let userState;
onAuthStateChanged(auth, user => { userState = user });

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
	console.log('Successfully logged out!');
	page.redirect('/');
}).catch((error) => {
	alert(error.message)
});
