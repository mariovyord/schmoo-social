import * as db from './db';

export const getAllPosts = (postsQty) => db.get(`posts.json?orderBy="createdAt"&limitToLast=${postsQty}`);
export const getPostsByUserId = (id, postsQty) => db.get(`posts.json?orderBy="creatorID"&equalTo="${id}"&limitToLast=${postsQty}`);
export const getDetails = (id) => db.get('posts/' + id + '.json');
export const newPost = (data) => db.post('posts.json', data);

