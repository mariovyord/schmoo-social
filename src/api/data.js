import * as db from './db';


export const getAllPosts = () => db.get('posts');
