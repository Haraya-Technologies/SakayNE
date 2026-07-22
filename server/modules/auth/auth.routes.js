import { Router } from "express";
import { signup, login, verifyEmail } from "./auth.controller.js";

const router = Router();

router.post("/signup", signup);
router.post("/verify-email", verifyEmail);
router.post("/login", login);

export default router;
