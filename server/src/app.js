import express from "express";
import cors from "cors";
import { getDB } from "../config/db.js";
import authRoutes from "../modules/auth/auth.routes.js";
import usersRoutes from "../modules/users/users.routes.js";
import healthRoutes from "../modules/health/health.routes.js";
import otpRoutes from "../modules/otp/otp.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", (req, res, next) => {
  if (!getDB() && req.path !== "/health") {
    return res.status(503).json({ error: "Database not available" });
  }
  next();
});

app.use("/api/auth", authRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/health", healthRoutes);
app.use("/api/otp", otpRoutes);

export default app;
