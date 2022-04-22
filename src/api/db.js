import { clearUserData, getUserData, setUserData } from "../utils/userData";
import page from 'page';

const host = 'https://parseapi.back4app.com';

import Parse from 'parse';
//  SDK - used only for updating user profile picture
Parse.serverURL = 'https://parseapi.back4app.com'; // This is your Server URL
// Remember to inform BOTH the Back4App Application ID AND the JavaScript KEY
Parse.initialize(
	'4g95yQ2SffnKO8N3wrNyEoIl2PC0BbizElZRACu9', // This is your Application ID
	'jldroB0HsyWA4JFHcovGzRJ7lWPPudclrU7KnZXS' // This is your Javascript key
);

//  Update user picture
export const setPicture = async (picture) => {
	const User = new Parse.User();
	const query = new Parse.Query(User);
	const userData = getUserData();
	try {
		// Finds the user by its ID
		let user = await query.get(userData.id);
		// Updates the data we want
		user.set('picture', new Parse.File(`${userData.username}.jpg`, { base64: btoa(picture) }));
		try {
			// Saves the user with the updated data
			let response = await user.save();
			console.log('Updated user', response);
		} catch (error) {
			// TODO Error handling
			console.error('Error while updating user', error);
		}
	} catch (error) {
		// TODO Error handling
		console.error('Error while retrieving user', error);
	}
};


async function request(url, options) {
	try {
		const response = await fetch(url, options);
		if (response.ok !== true) {
			if (response.status === 403) {
				sessionStorage.removeItem('userData');
			}
			const error = await response.json();
			throw new Error(error.message);
		}
		return await response.json();
	} catch (err) {
		throw err;
	}
}

function createOptions(method = 'get', data) {
	const options = {
		'method': method,
		'headers': {
			'X-Parse-Application-Id': '4g95yQ2SffnKO8N3wrNyEoIl2PC0BbizElZRACu9',
			'X-Parse-REST-API-Key': 'BO0XeGl7WtRAmE9EwqwMxZVc7noj3VucKebHIThA',
		}
	};
	if (data !== undefined) {
		options.headers['Content-Type'] = 'application/json';
		options.body = JSON.stringify(data);
	}
	const userData = getUserData();
	if (userData !== null) {
		options.headers['X-Parse-Session-Token'] = userData.accessToken;
	}
	return options;
}

export async function get(url) {
	return request(host + url, createOptions());
}

export async function post(url, data) {
	return request(host + url, createOptions('post', data));
}

export async function put(url, data) {
	return request(host + url, createOptions('put', data));
}

export async function del(url) {
	return request(host + url, createOptions('delete'));
}

export async function login(username, password) {
	try {
		const result = await post('/login', { username, password });
		setUserData({
			username: username,
			id: result.objectId,
			accessToken: result.sessionToken,
			pictureUrl: result.picture.url,
			createdAt: result.createdAt,
		});
		return result;
	} catch (err) {
		throw err;
	}
}

export async function register(username, email, password) {
	try {
		const result = await post('/users', { username, email, password });
		setUserData({
			username: username,
			id: result.objectId,
			accessToken: result.sessionToken,
			pictureUrl: result.picture.url,
			createdAt: result.createdAt,
		});
		return result;
	} catch (err) {
		console.log(err.message);
		throw err;
	}
}

export async function logout() {
	post('/logout');
	clearUserData();
	page.redirect('/');
}