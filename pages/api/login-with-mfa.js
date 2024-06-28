// api/login-with-mfa.js

import speakeasy from "speakeasy";

export default function handler(req, res) {
	const { token } = req.body;
	const userSecret = ""; // Retrieve user's secret from secure storage

	const verified = speakeasy.totp.verify({
		secret: userSecret,
		encoding: "ascii",
		token,
		window: 2, // Allow a variance of 2 seconds to account for clock drift
	});

	if (verified) {
		res.status(200).json({ message: "MFA token verified successfully" });
	} else {
		res.status(401).json({ message: "Invalid MFA token" });
	}
}
