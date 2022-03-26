import { app } from "./firebase";
import { auth } from './auth';

const host = (url) => `https://schmoozer-social-default-rtdb.europe-west1.firebasedatabase.app/${url}.json`;

async function request(url, options) {
	try {
		let connection = host(url);
		const response = await fetch(connection, options);
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