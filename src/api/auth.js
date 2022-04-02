import { app } from "./firebase";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, updateProfile, onAuthStateChanged } from "firebase/auth";
import page from 'page';
import { clearUserData, setUserData } from "../utils/userData";

export const auth = getAuth(app);

export const getUser = () => {
	return auth.currentUser;
}

export let userState = 'unknown';
onAuthStateChanged(auth, (user) => {
	if (user) {
		console.log('HERE IS');
		userState = user;
	} else {
		console.log('NOT LOGGED');
	}
});

export const userLogin = (email, password) => signInWithEmailAndPassword(auth, email, password)
	.then((userCredential) => {
		// Signed in 
		console.log('Successfully logged in!');
		setUserData({
			displayName: userCredential.user.displayName,
			email: userCredential.user.email,
			uid: userCredential.user.uid,
			createdAt: userCredential.user.metadata.createdAt,
			photoURL: userCredential.user.photoURL,
			accessToken: userCredential.user.accessToken
		});
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
		console.log(userCredential);
		setUserData({
			displayName: userCredential.user.displayName,
			email: userCredential.user.email,
			uid: userCredential.user.uid,
			createdAt: userCredential.user.metadata.createdAt,
			photoURL: userCredential.user.metadata.photoURL,
			accessToken: userCredential.user.accessToken
		});
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
