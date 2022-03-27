import { app } from "./firebase";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, updateProfile, onAuthStateChanged } from "firebase/auth";
import page from 'page';

export const auth = getAuth(app);

// export const getUser = auth.currentUser;

export const getUser = async () => {
	const user = await auth.currentUser;
	return user;
}

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

export const userRegister = (username, email, photoUrl, password) => createUserWithEmailAndPassword(auth, email, password)
	.then((userCredential) => {
		// Signed in 
		updateProfile(auth.currentUser, {
			displayName: username,
			photoURL: photoUrl,
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
