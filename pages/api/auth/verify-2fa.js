// Verify 2fa
import User from "@/models/User";
import dbConnect from "@/utils/db"; // Ensure Mongoose is connected
import { getServerSession } from "next-auth/next";
import { authOptions } from "./[...nextauth]"; // Adjust the path to your nextauth.js file
import { encode } from "next-auth/jwt"; // Ensure next-auth JWT utilities are imported

export default async function handler(req, res) {
	if (req.method === "POST") {
		const { email, twoFactorToken } = req.body;

		try {
			await dbConnect(); // Ensure the database is connected
			const user = await User.findOne({ email });

			if (!user) {
				return res.status(400).json({ error: "User not found" });
			}

			if (
				!user.twoFactorToken ||
				user.twoFactorToken !== twoFactorToken ||
				user.twoFactorExpires < new Date()
			) {
				return res.status(400).json({ error: "Invalid or expired 2FA token" });
			}

			user.twoFactorToken = null;
			user.twoFactorExpires = null;
			await user.save();

			const session = await getServerSession(req, res, authOptions);

			if (session) {
				// Update the session token
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
