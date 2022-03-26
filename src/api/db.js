import { app } from "./firebase";
import { getUser } from './auth';

const host = (url) => `https://schmoozer-social-default-rtdb.europe-west1.firebasedatabase.app/${url}.json`;

async function request(url, options) {
	const userData = getUser();
	// if (userData !== null) {
	// 	console.log('TOKEN: ' + userData.accessToken);
	// 	url = url + `?access_token=${userData.accessToken}`
	// }

	try {
		const response = await fetch(host(url), options);
		//  TODO Add error handling
		const data = await response.json();
		return data;
	} catch (err) {
		alert(err.message);
	}
}

function createOptions(method = 'get', data) {
	const options = {
		'method': method,
		'headers': {}
	};
	if (data !== undefined) {
		options.headers['Content-Type'] = 'application/json';
		options.body = JSON.stringify(data);
	}
	return options;
}

export async function get(url) {
	return request(url, createOptions());
}

export async function post(url, data) {
	return request(url, createOptions('post', data));
}

export async function put(url, data) {
	return request(url, createOptions('put', data));
}

export async function del(url) {
	return request(url, createOptions('delete'));
}