import { app } from "./firebase";
import { clearUserData, setUserData } from '../utils/userData';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, updateProfile, onAuthStateChanged } from "firebase/auth";
import page from 'page';

const auth = getAuth(app);

export const userChange = () => onAuthStateChanged(auth, user => console.log('Here is it ' + Object.entries(user)));

export const userLogin = (email, password) => signInWithEmailAndPassword(auth, email, password)
	.then((userCredential) => {
		// Signed in 
		const user = userCredential.user;
		console.log('Successfully logged in!');
		setUserData(user);
		page.redirect('/');
	})
	.catch((error) => {
		throw error;
	});

export const userRegister = (email, password) => createUserWithEmailAndPassword(auth, email, password)
	.then((userCredential) => {
		// Signed in 
		const user = userCredential.user;
		console.log('Successfully registered!');
		setUserData(user);
		page.redirect('/');
	})
	.catch((error) => {
		throw error;
	});

export const userLogout = () => signOut(auth).then(() => {
	clearUserData();
	page.redirect('/');
}).catch((error) => {
	alert(error.message)
});
