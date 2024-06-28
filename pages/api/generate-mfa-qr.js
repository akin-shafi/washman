// api/generate-mfa-qr.js

import speakeasy from "speakeasy";

export default function handler(req, res) {
	const secret = speakeasy.generateSecret({ length: 20 });

	const otpauthURL = speakeasy.otpauthURL({
		secret: secret.ascii,
		label: "MyApp",
		issuer: "MyApp",
	});

	res.json({
		qrCodeURL: `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(
			otpauthURL
		)}`,
	});
}
