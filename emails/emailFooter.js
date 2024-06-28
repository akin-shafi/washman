// emailFooter.js
const emailFooter = () => `
    <div style="text-align: center; margin-top: 20px; border-top: 1px solid #ddd; padding-top: 10px;">
        <p style="font-size: 12px; color: #777;">&copy; ${new Date().getFullYear()} ${process.env.NEXT_APP_COMPANY}. All rights reserved.</p>
        <p style="font-size: 12px; color: #777;">${process.env.NEXT_APP_ADDRESS}</p>
        <p style="font-size: 12px; color: #777;">If you have any questions, contact us at <a href="mailto:${process.env.NEXT_APP_COMPANY_EMAIL}" style="color: #007BFF; text-decoration: none;">${process.env.NEXT_APP_COMPANY_EMAIL}</a></p>
    </div>
`;

export default emailFooter;
