import { ROLES } from "../../shared/roles.js";
import * as AuthModel from "./auth.model.js";

export async function signup(req, res) {
  try {
    const { fullName, email, phone, password, role } = req.body;

    const existing = await AuthModel.findByEmail(email);
    if (existing)
      return res.status(400).json({ error: "Email already registered" });

    const validRole = ROLES[role?.toUpperCase()] || ROLES.PASSENGER;

    const user = {
      fullName,
      email,
      phone,
      password,
      role: validRole,
      createdAt: new Date().toISOString(),
    };

    const created = await AuthModel.createUser(user);
    const { password: _, ...userData } = created;

    res.json({
      user: userData,
      token: `sakay_${Date.now()}_${created._id}`,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function login(req, res) {
  try {
    const { identifier, password } = req.body;

    const user = await AuthModel.findByIdentity(identifier, password);
    if (!user) return res.status(401).json({ error: "Invalid credentials" });

    const { password: _, ...userData } = user;

    res.json({
      user: userData,
      token: `sakay_${Date.now()}_${user._id}`,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
