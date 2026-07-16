require("dotenv").config();

const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT || 587),
  secure: process.env.SMTP_SECURE === "true",

  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },

  tls: {
    rejectUnauthorized: true,
  },
});

exports.sendMail = async (
  mailto,
  cc,
  bcc,
  subject,
  body,
  attachments = []
) => {
  try {
    const info = await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: mailto,
      cc: cc || undefined,
      bcc: bcc || undefined,
      subject,
      html: body,
      attachments,
    });

    console.log("Email sent:", info.messageId);

    return {
      success: true,
      messageId: info.messageId,
    };
  } catch (error) {
    console.error("Email sending failed:", error);

    return {
      success: false,
      error: error.message,
    };
  }
};