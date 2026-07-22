import { Router } from "express";
import { getProfile, updateProfile } from "./users.controller.js";

const router = Router();

router.get("/profile", getProfile);
router.put("/profile", updateProfile);

export default router;
