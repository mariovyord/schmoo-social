import { app } from "./firebase";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, updateProfile, onAuthStateChanged } from "firebase/auth";
import page from 'page';
import { clearUserData, setUserData } from "../utils/userData";

export const auth = getAuth(app);

export const getUser = () => {
	return auth.currentUser;
}

export let userState;
onAuthStateChanged(auth, user => {
	userState = user;

});

export const userLogin = (email, password) => signInWithEmailAndPassword(auth, email, password)
	.then((userCredential) => {
		// Signed in 
		console.log('Successfully logged in!');
		setUserData({ accessToken: userCredential.user.accessToken });
		page.redirect('/');
	})
	.catch((error) => {
		throw error;
	});

export const userRegister = (username, email, photoUrl, password) => createUserWithEmailAndPassword(auth, email, password)
	.then((userCredential) => {
		// Signed in 
		updateProfile(auth.currentUser, {
			displayName: username,
			photoURL: photoUrl,
		})
		setUserData({ accessToken: userCredential.user.accessToken });
		console.log('Successfully registered!');
		page.redirect('/');
	})
	.catch((error) => {
		throw error;
	});

export const userLogout = () => signOut(auth).then(() => {
	console.log('Successfully logged out!');
	clearUserData();
	page.redirect('/');
}).catch((error) => {
	alert(error.message)
});
