import nodemailer from "nodemailer";
import "dotenv/config";

const transporter = nodemailer.createTransport({
    host: "smtp.sendgrid.net",
    port: 587,
    auth: {
        user: "apikey",
        pass: process.env.SENDGRID_API_KEY,
    },
});

export const sendEmail = async ({ to, subject, html }) => {
    try {
        const mailOptions = {
            from: `MyShop <${process.env.EMAIL_FROM}>`,
            to,
            subject,
            html,
        };

        const info = await transporter.sendMail(mailOptions);
        console.log("Email sent: " + info.messageId);
        return info;
    } catch (error) {
        console.error("Email sending failed:", error);
        throw error;
    }
};
