import * as db from './db';

export const getAllPosts = () => db.get('posts.json');
export const getPostsByUserId = (id) => db.get(`posts.json?orderBy="creatorID"&equalTo="${id}"`);
export const getDetails = (id) => db.get('posts/' + id + '.json');
export const newPost = (data) => db.post('posts.json', data);

