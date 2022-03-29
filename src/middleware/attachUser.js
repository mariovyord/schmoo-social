import { getUser } from "../api/auth";

export default async (ctx, next) => {
	ctx.user = await getUser();
	next();
}