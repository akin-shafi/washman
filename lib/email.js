import nodemailer from "nodemailer";

// Create a transporter using your email service configuration
const transporter = nodemailer.createTransport({
	service: "Gmail", // use your email service
	auth: {
		user: process.env.EMAIL_USER, // your email address
		pass: process.env.EMAIL_PASS, // your email password
	},
});

// Function to send an email
export async function sendEmail(to, subject, html) {
	const mailOptions = {
		from: process.env.EMAIL_USER,
		to,
		subject,
		html,
	};

	try {
		await transporter.sendMail(mailOptions);
		console.log("Email sent successfully");
	} catch (error) {
		console.error("Error sending email:", error);
		console.error("Error sending email:", error);
	}
}
