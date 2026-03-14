import nodemailer from "nodemailer";

import { env } from "../config/env.js";

const transporter = nodemailer.createTransport({
  service: env.EMAIL_SERVICE,
  auth: {
    user: env.EMAIL_USER,
    pass: env.EMAIL_PASSWORD
  }
});

export const sendVerificationEmail = async (email, token, frontendUrl = "http://localhost:5173") => {
  const verifyUrl = `${frontendUrl}/verify-email?token=${token}`;
  
  await transporter.sendMail({
    from: env.EMAIL_FROM,
    to: email,
    subject: "Verify Your Account",
    html: `
      <h2>Email Verification</h2>
      <p>Click the link below to verify your email address:</p>
      <a href="${verifyUrl}" style="background-color: #ec4899; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">
        Verify Email
      </a>
      <p>Or copy and paste this link: ${verifyUrl}</p>
      <p>This link expires in 24 hours.</p>
    `
  });
};

export const sendPasswordResetEmail = async (email, token, frontendUrl = "http://localhost:5173") => {
  const resetUrl = `${frontendUrl}/reset-password?token=${token}`;
  
  await transporter.sendMail({
    from: env.EMAIL_FROM,
    to: email,
    subject: "Reset Your Password",
    html: `
      <h2>Password Reset Request</h2>
      <p>Click the link below to reset your password:</p>
      <a href="${resetUrl}" style="background-color: #ec4899; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">
        Reset Password
      </a>
      <p>Or copy and paste this link: ${resetUrl}</p>
      <p>This link expires in 24 hours.</p>
      <p>If you didn't request this, please ignore this email.</p>
    `
  });
};
