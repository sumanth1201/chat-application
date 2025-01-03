import { Router } from "express";
import {
  signup,
  login,
  logout,
  refreshAccessToken,
  getCurrentUser,
} from "../controllers/auth.controller.js";
import { verify } from "../middleware/auth.middleware.js";

const router = Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/logout", verify, logout);
router.post("/refreshToken", refreshAccessToken);
router.get("/current-user", verify, getCurrentUser);

export default router;
