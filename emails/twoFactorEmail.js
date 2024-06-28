import emailHeader from "./emailHeader";
import emailFooter from "./emailFooter";

export default function generateTwoFactorEmailTemplate(user, token) {
	return `
    <div style="font-family: Arial, sans-serif;  background-color: #f0f3f7;">
        <div style="max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px; background-color: #fff;">
            ${emailHeader()}
            <div style="padding: 20px;">
                <p>Hi ${user.name},</p>
                <p>Your Two-Factor Authentication (2FA) code is:</p>
                <h2 style="text-align: center;">${token}</h2>
                <p>This code will expire in 20 minutes.</p>
            </div>
            ${emailFooter()}
        </div>
    </div>
`;
}
