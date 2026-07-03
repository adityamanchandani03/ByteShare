var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { Router } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/User";
import { requireAuth } from "../middlewares/auth";
import {
  RegisterBody,
  LoginBody
} from "@workspace/api-zod";
const router = Router();
function signToken(userId) {
  const secret = process.env.JWT_SECRET;
  return jwt.sign({ userId }, secret, { expiresIn: "7d" });
}
__name(signToken, "signToken");
function formatUser(user) {
  return {
    id: user._id.toString(),
    name: user.name,
    email: user.email,
    tokenBalance: user.tokenBalance,
    reputation: user.reputation,
    createdAt: user.createdAt
  };
}
__name(formatUser, "formatUser");
router.post("/auth/register", async (req, res) => {
  const parsed = RegisterBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  const { name, email, password } = parsed.data;
  const existing = await User.findOne({ email });
  if (existing) {
    res.status(400).json({ error: "Email already registered" });
    return;
  }
  const user = await User.create({ name, email, password });
  const token = signToken(user._id.toString());
  res.status(201).json({ token, user: formatUser(user) });
});
router.post("/auth/login", async (req, res) => {
  const parsed = LoginBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  const { email, password } = parsed.data;
  const user = await User.findOne({ email });
  if (!user || !await user.comparePassword(password)) {
    res.status(401).json({ error: "Invalid email or password" });
    return;
  }
  const token = signToken(user._id.toString());
  res.json({ token, user: formatUser(user) });
});
router.get("/auth/me", requireAuth, async (req, res) => {
  res.json(formatUser(req.user));
});
var stdin_default = router;
export {
  stdin_default as default
};
