import * as db from './db';

export const getAllPosts = () => db.get('posts');
export const newPost = (data) => db.post('posts', data);