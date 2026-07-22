import * as UserModel from "./users.model.js";

export async function getProfile(req, res) {
  try {
    const userId = req.headers["user-id"];
    const user = await UserModel.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    const { password: _, ...userData } = user;
    res.json({ user: userData });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function updateProfile(req, res) {
  try {
    const userId = req.headers["user-id"];
    const { fullName, email, phone } = req.body;

    await UserModel.updateById(userId, { fullName, email, phone });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
