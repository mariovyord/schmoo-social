import { getUserData } from "../utils/userData";

export default (ctx, next) => {
	ctx.user = getUserData();
	next();
}