import { getUser } from "../api/auth";
import { getUserData } from "../utils/userData";

export default (ctx, next) => {
	ctx.user = getUserData();
	next();
}