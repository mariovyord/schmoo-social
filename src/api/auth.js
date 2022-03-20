import { app } from "./firebase";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import page from 'page';

const auth = getAuth(app);

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
	localStorage.removeItem('userData')
	page.redirect('/');
}).catch((error) => {
	alert(error.message)
});