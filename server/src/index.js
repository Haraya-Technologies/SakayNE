import dotenv from "dotenv";
import http from "http";
import { connectDB } from "../config/db.js";
import app from "./app.js";

dotenv.config();

const PORT = process.env.PORT || 3006;

const startServer = async () => {
  try {
    await connectDB();
    console.log("✅ MongoDB connected successfully");
  } catch (error) {
    console.warn("⚠️ MongoDB connection failed:", error.message);
    console.warn("⚠️ Server will start without database");
  }

  const server = http.createServer(app);

  server.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
  });
};

startServer();
