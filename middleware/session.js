import { promisifyStore, expressSession } from "next-session";
import connectRedis from "connect-redis";
import Redis from "ioredis";

const RedisStore = connectRedis(expressSession);
const redis = new Redis();

export default function session(req, res, next) {
	return expressSession({
		store: promisifyStore(new RedisStore({ client: redis })),
		secret: "your-secret-key",
		resave: false,
		saveUninitialized: true,
		cookie: {
			secure: process.env.NEXT_APP_ENV === "development",
			maxAge: 24 * 60 * 60 * 1000, // 24 hours
		},
	})(req, res, next);
}
