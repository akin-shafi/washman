import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import User from "@/models/User";
import sequelize from "@/utils/db";
import { generateAndSendTwoFactorToken } from "@/pages/api/twoFactorAuth";

export const authOptions = {
	providers: [
		GitHubProvider({
			clientId: process.env.GITHUB_ID,
			clientSecret: process.env.GITHUB_SECRET,
		}),
		CredentialsProvider({
			id: "credentials",
			name: "Credentials",
			credentials: {
				email: { label: "Email", type: "text" },
				password: { label: "Password", type: "password" },
				rememberMe: { label: "Remember Me", type: "checkbox" },
			},
			async authorize(credentials) {
				try {
					await sequelize.authenticate();
					const user = await User.findOne({
						where: { email: credentials.email },
					});

					if (!user) {
						console.error("No user found with this email");
						throw new Error("No user found with this email");
					}

					const isValidPassword = await bcrypt.compare(
						credentials.password,
						user.password
					);

					if (!isValidPassword) {
						console.error("Incorrect password");
						throw new Error("Incorrect password");
					}
					console.log("twoFactorEnabled Checker:", user.twoFactorEnabled);
					if (user.twoFactorEnabled == true) {
						await generateAndSendTwoFactorToken(user);
						console.log("Two-factor token generated and sent");
						return {
							id: user.id,
							email: user.email,
							name: user.name,
							twoFactorEnabled: true,
							status: "2FA",
						};
					}

					console.log(
						"User authenticated successfully without two-factor authentication"
					);
					return {
						id: user.id,
						email: user.email,
						name: user.name,
						twoFactorEnabled: false,
						status: "authorized",
					};
				} catch (error) {
					console.error("Error in authorize function:", error);
					throw new Error("Authorization failed");
				}
			},
		}),
	],
	session: {
		jwt: true,
	},
	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				token.id = user.id;
				token.email = user.email;
				token.name = user.name;
				token.twoFactorEnabled = user.twoFactorEnabled;
				token.status = user.status;
			}
			return token;
		},
		async session({ session, token }) {
			session.user = {
				id: token.id,
				email: token.email,
				name: token.name,
				twoFactorEnabled: token.twoFactorEnabled,
				status: token.status,
			};
			return session;
		},
	},
	pages: {
		signIn: "/login",
		signOut: "/auth/logout", // Custom signout page
		error: "/auth/error",
	},
};

export default NextAuth(authOptions);

export const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
