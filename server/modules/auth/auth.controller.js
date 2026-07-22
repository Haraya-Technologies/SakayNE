import { getDB } from "../../config/db.js";
import { sendEmail } from "../../config/mail.js";
import { ROLES } from "../../shared/roles.js";
import * as AuthModel from "./auth.model.js";
import * as UserModel from "../users/users.model.js";
import * as OTPModel from "../otp/otp.model.js";

function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function signup(req, res) {
  try {
    const { fullName, email, phone, password, role } = req.body;

    const existing = await AuthModel.findByEmail(email);
    if (existing)
      return res.status(400).json({ error: "Email already registered" });

    const otp = generateOTP();

    await AuthModel.savePending(email, { fullName, email, phone, password, role });
    await OTPModel.saveOTP(email, otp);

    await sendEmail({
      to: email,
      subject: "Verify your SakayNE account",
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
              Verify your email address
            </h2>
            <p style="font-size: 14px; color: #6B7280; margin: 0 0 32px; text-align: center; line-height: 22px;">
              Use the code below to verify your email and complete your account registration.
            </p>

            <div style="background: #F0F7F1; border-radius: 16px; padding: 28px; text-align: center; margin-bottom: 28px;">
              <p style="font-size: 13px; color: #3F8451; font-weight: 600; margin: 0 0 16px; text-transform: uppercase; letter-spacing: 2px;">
                Verification Code
              </p>
              <div style="font-size: 42px; font-weight: 900; color: #0D1F16; letter-spacing: 12px; font-family: 'Courier New', monospace;">
                ${otp}
              </div>
            </div>

            <p style="font-size: 13px; color: #9CA3AF; text-align: center; margin: 0 0 4px;">
              This code expires in <strong style="color: #3F8451;">5 minutes</strong>.
            </p>
            <p style="font-size: 13px; color: #9CA3AF; text-align: center; margin: 0;">
              If you didn't request this, you can safely ignore this email.
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

    res.json({ message: "OTP sent to email", email });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function verifyEmail(req, res) {
  try {
    const { email, otp } = req.body;

    const valid = await getDB().collection("otps").findOne({ email, otp, expiresAt: { $gt: new Date() } });
    if (!valid) return res.status(400).json({ error: "Invalid or expired OTP" });

    const pending = await AuthModel.findPending(email);
    if (!pending) return res.status(400).json({ error: "No pending registration" });

    const { fullName, phone, password, role } = pending.data;
    const validRole = ROLES[role?.toUpperCase()] || ROLES.PASSENGER;

    await AuthModel.createAuth({ email, password, role: validRole });
    await AuthModel.verifyAuth(email);
    await UserModel.createProfile({ fullName, email, phone });

    await AuthModel.deletePending(email);
    await getDB().collection("otps").deleteMany({ email });

    res.json({ message: "Account created successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function login(req, res) {
  try {
    const { identifier, password } = req.body;

    const authRecord = await AuthModel.findByIdentity(identifier, password);
    if (!authRecord) return res.status(401).json({ error: "Invalid credentials" });

    const profile = await UserModel.findByEmail(authRecord.email);

    res.json({
      user: {
        _id: profile?._id,
        email: authRecord.email,
        fullName: profile?.fullName || "",
        phone: profile?.phone || "",
        role: authRecord.role,
      },
      token: `sakay_${Date.now()}_${authRecord._id}`,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
