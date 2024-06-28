// resetPasswordEmail.js
import emailHeader from "./emailHeader";
import emailFooter from "./emailFooter";

export default function resetPasswordEmail(user, resetToken) {
    return `
        <div style="font-family: Arial, sans-serif; background-color: #f0f3f7;">
            <div style="max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px; background-color: #fff;">
                ${emailHeader()}
                <div style="padding: 20px;">
                    <h1 style="font-size: 24px; color: #333;">Password Reset Request</h1>
                    <p style="font-size: 16px; color: #333;">Hello ${user.name},</p>
                    <p style="font-size: 16px; color: #333;">
                        We received a request to reset your password. Click the link below to reset your password:
                    </p>
                    <a href="${process.env.NEXT_PUBLIC_BASE_URL}/reset-password?token=${resetToken}" style="display: inline-block; margin: 20px 0; padding: 10px 20px; font-size: 16px; color: #fff; background-color: #007BFF; text-decoration: none; border-radius: 5px;">Reset Password</a>
                    <p style="font-size: 16px; color: #333;">
                        If you did not request this, please ignore this email and your password will remain unchanged.
                    </p>
                    <p style="font-size: 16px; color: #333;">Best regards,</p>
                    <p style="font-size: 16px; color: #333;">The Company Team</p>
                </div>
                ${emailFooter()}
            </div>
        </div>
    `;
}
