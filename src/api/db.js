import { clearUserData, getUserData, setUserData } from "../utils/userData";
import page from 'page';

const host = 'https://parseapi.back4app.com';

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