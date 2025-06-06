import nodemailer, { Transporter } from "nodemailer";

// Create transporter instance
const transporter: Transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER as string,
    pass: process.env.GMAIL_PASS as string,
  },
});

// Define sendEmail function with proper types
export async function sendEmail(
  to: string,
  subject: string,
  text: string
): Promise<any> {
  const mailOptions = {
    from: `"Your Company Name" <${process.env.GMAIL_USER}>`,
    to,
    subject,
    text,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);
    return info;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
}
