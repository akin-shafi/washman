import User from "@/models/User";
import dbConnect from "@/utils/db";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./[...nextauth]";
import { encode } from "next-auth/jwt";

export default async function handler(req, res) {
	if (req.method === "POST") {
		const { email, twoFactorToken } = req.body;
		try {
			await dbConnect();
			const user = await User.findOneAndUpdate(
				{ email, twoFactorToken, twoFactorExpires: { $gt: new Date() } },
				{ $set: { twoFactorToken: null, twoFactorExpires: null } },
				{ returnNewDocument: true }
			);
			if (!user) {
				return res
					.status(400)
					.json({ error: "User not found or invalid 2FA token" });
			}
			const session = await getServerSession(req, res, authOptions);
			if (session) {
				const updatedToken = {
					...session.user,
					status: "authorized",
					twoFactorEnabled: false,
				};
				const encodedToken = await encode({
					token: updatedToken,
					secret: process.env.NEXTAUTH_SECRET,
				});
				res.setHeader(
					"Set-Cookie",
					`next-auth.session-token=${encodedToken}; Path=/; HttpOnly; Secure; SameSite=Strict`
				);
				res.status(200).json({ message: "2FA verification successful" });
			} else {
				res.status(500).json({ error: "Failed to retrieve session" });
			}
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	} else {
		res.status(405).json({ message: "Method Not Allowed" });
	}
}
