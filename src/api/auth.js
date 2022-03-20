import { app } from "./firebase";
import { clearUserData } from '../utils/userData';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import page from 'page';

const auth = getAuth(app);
export const user = auth.currentUser;

export const userLogin = (email, password) => signInWithEmailAndPassword(auth, email, password)
	.then((userCredential) => {
		// Signed in 
		const user = userCredential.user;
		console.log('Successfully logged in!');
		localStorage.setItem('userData', JSON.stringify(user))
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
