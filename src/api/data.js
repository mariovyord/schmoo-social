import { getUserData } from '../utils/userData';
import * as db from './db';

// BASIC AUTH
export const login = db.login;
// TODO Registration is broken
export const register = db.register;
export const logout = db.logout;

// USERS
export const getUserInfoById = (id) => db.get(`/users/${id}`)

// POSTS
export const getDetails = (id) => db.get(`/classes/Post?where={"objectId":"${id}"}&include=creator`);

export const newPost = (data) => {
	addCreator(data);
	return db.post('/classes/Post', data)
};

export const getAllPosts = (page) => {
	const limit = 10;
	const skip = limit * page;
	return db.get(`/classes/Post?include=creator&order=-createdAt&limit=${limit}&skip=${skip}`);
};

export const getPostsByUserId = (id, page) => {
	const limit = 10;
	const skip = limit * page;

	return db.get(`/classes/Post?where={"creator":{"__type":"Pointer","className":"_User","objectId":"${id}"}}&include=creator&order=-createdAt&limit=${limit}&skip=${skip}`);
}

// COMMENTS
export const getCommentsByPostId = (id) => {
	return db.get(`/classes/Comment?where={"parentPost":{"__type":"Pointer","className":"Post","objectId":"${id}"}}&include=creator&order=-createdAt`);
}

export const getCommentById = (id) => {
	return db.get(`/classes/Comment?where={"objectId":"${id}"}&include=creator`);
}

export const postNewComment = (body, parentPostId) => {
	const data = {
		body,
	}
	addCreator(data);
	data.parentPost = createPointer('Post', parentPostId);
	return db.post(`/classes/Comment`, data)
}

// EDIT PROFILE
export const setProfilePicture = (id, img) => {
	// return db.put(`/users/${id}`, { "picture": { "__type": "File", "name": `${img}` } })
}

// UTIL FUNCTIONS
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