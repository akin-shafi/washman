export default function signupEmail(user) {
	return `
    <div style="font-family: Arial, sans-serif;  background-color: #f0f3f7;">
        <div style="max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px; background-color: #fff;">
            ${emailHeader()}
              <div style="padding: 20px;">
                <h1>Welcome to Our App, ${user.name}!</h1>
                <p>Thank you for signing up. We're excited to have you on board!</p>
              </div>
            ${emailFooter()}
        </div>
    </div>
    `;
}
