import { getUserData } from '../utils/userData';
import * as db from './db';

export const login = db.login;
export const register = db.register;
export const logout = db.logout;

export const getDetails = (id) => db.get(`/classes/Post?where={"objectId":"${id}"}`);
export const getUserInfoById = (id) => db.get(`/users/${id}`)
export const newPost = (data) => {
	addCreator(data);
	return db.post('/classes/Post', data)
};


export const getAllPosts = (page) => {
	const limit = 2;
	const skip = limit * page - 1;
	return db.get(`/classes/Post?include=creator&order=-createdAt&limit=${limit}&skip=${skip}`);
};

export const getPostsByUserId = (id, page) => {
	const limit = 2;
	const skip = limit * page - 1;

	return db.get(`/classes/Post?where={"creator":{"__type":"Pointer","className":"_User","objectId":"${id}"}}&include=creator&order=-createdAt&limit=${limit}&skip=${skip}`);
}



function createPointer(name, id) {
	return {
		__type: 'Pointer',
		className: name,
		objectId: id,
	};
}

function addCreator(object) {
	const userId = getUserData().id;
	object.creator = createPointer('_User', userId);
}