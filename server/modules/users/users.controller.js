import * as UserModel from "./users.model.js";
import { getDB } from "../../config/db.js";

export async function getProfile(req, res) {
  try {
    const userId = req.headers["user-id"];
    const user = await UserModel.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    res.json({ user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function updateProfile(req, res) {
  try {
    const userId = req.headers["user-id"];
    const { fullName, phone } = req.body;

    const user = await UserModel.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    await UserModel.updateByEmail(user.email, { fullName, phone });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
