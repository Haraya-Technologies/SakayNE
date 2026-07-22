import { sendEmail } from "../../config/mail.js";
import * as OTPModel from "./otp.model.js";

function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function sendOTP(req, res) {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: "Email is required" });

    const otp = generateOTP();
    await OTPModel.saveOTP(email, otp);
    await sendEmail({
      to: email,
      subject: "Your SakayNE OTP Code",
      html: `
        <div style="max-width: 520px; margin: 0 auto; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
          <div style="background: #0D1F16; padding: 28px 32px; border-radius: 16px 16px 0 0;">
            <table style="width: 100%;">
              <tr>
                <td style="text-align: center;">
                  <span style="font-size: 24px; font-weight: 900; color: #fff; letter-spacing: 1px;">SAKAY</span>
                  <span style="font-size: 24px; font-weight: 300; color: #5AA06D; letter-spacing: 1px;">NE</span>
                </td>
              </tr>
            </table>
          </div>

          <div style="background: #ffffff; padding: 40px 32px; border: 1px solid #E5E7EB; border-top: none; border-radius: 0 0 16px 16px;">
            <h2 style="font-size: 22px; font-weight: 800; color: #0D1F16; margin: 0 0 8px; text-align: center;">
              Your OTP Code
            </h2>
            <p style="font-size: 14px; color: #6B7280; margin: 0 0 32px; text-align: center; line-height: 22px;">
              Use the code below to complete your verification.
            </p>

            <div style="background: #F0F7F1; border-radius: 16px; padding: 28px; text-align: center; margin-bottom: 28px;">
              <p style="font-size: 13px; color: #3F8451; font-weight: 600; margin: 0 0 16px; text-transform: uppercase; letter-spacing: 2px;">
                One-Time Password
              </p>
              <div style="font-size: 42px; font-weight: 900; color: #0D1F16; letter-spacing: 12px; font-family: 'Courier New', monospace;">
                ${otp}
              </div>
            </div>

            <p style="font-size: 13px; color: #9CA3AF; text-align: center; margin: 0;">
              This code expires in <strong style="color: #3F8451;">5 minutes</strong>.
            </p>
          </div>

          <div style="text-align: center; padding: 24px 32px;">
            <p style="font-size: 11px; color: #9CA3AF; margin: 0;">
              &copy; ${new Date().getFullYear()} SakayNE. All rights reserved.
            </p>
          </div>
        </div>
      `,
    });

    res.json({ message: "OTP sent successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function verifyOTP(req, res) {
  try {
    const { email, otp } = req.body;

    const result = await OTPModel.findOTP(email, otp);
    if (!result) return res.status(400).json({ error: "Invalid or expired OTP" });

    await OTPModel.deleteOTP(email);
    res.json({ message: "OTP verified successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
