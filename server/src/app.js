import express from "express";
import cors from "cors";
import { ObjectId } from "mongodb";
import { getDB } from "../config/db.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", (req, res, next) => {
  if (!getDB()) {
    return res.status(503).json({ error: "Database not available" });
  }
  next();
});

app.post("/api/auth/signup", async (req, res) => {
  try {
    const db = getDB();
    const { fullName, email, phone, password, role } = req.body;

    const existing = await db.collection("users").findOne({ email });
    if (existing)
      return res.status(400).json({ error: "Email already registered" });

    const user = {
      fullName, email, phone, password,
      role: role || "passenger",
      createdAt: new Date().toISOString(),
    };

    const result = await db.collection("users").insertOne(user);
    const { password: _, ...userData } = user;

    res.json({
      user: { ...userData, _id: result.insertedId },
      token: `sakay_${Date.now()}_${result.insertedId}`,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/auth/login", async (req, res) => {
  try {
    const db = getDB();
    const { identifier, password } = req.body;
    const isEmail = /\S+@\S+\.\S+/.test(identifier);
    const filter = isEmail
      ? { email: identifier, password }
      : { phone: identifier, password };

    const user = await db.collection("users").findOne(filter);
    if (!user) return res.status(401).json({ error: "Invalid credentials" });

    const { password: _, ...userData } = user;
    res.json({ user: userData, token: `sakay_${Date.now()}_${user._id}` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/users/profile", async (req, res) => {
  try {
    const db = getDB();
    const userId = req.headers["user-id"];
    const user = await db.collection("users").findOne({ _id: new ObjectId(userId) });
    if (!user) return res.status(404).json({ error: "User not found" });

    const { password: _, ...userData } = user;
    res.json({ user: userData });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put("/api/users/profile", async (req, res) => {
  try {
    const db = getDB();
    const userId = req.headers["user-id"];
    const { fullName, email, phone } = req.body;

    await db.collection("users").updateOne(
      { _id: new ObjectId(userId) },
      { $set: { fullName, email, phone } }
    );

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

export default app;
