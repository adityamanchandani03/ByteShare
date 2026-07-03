import { Router } from "express";
import { TokenTransaction } from "../models/TokenTransaction";
import { requireAuth } from "../middlewares/auth";
const router = Router();
router.get("/tokens/history", requireAuth, async (req, res) => {
  const transactions = await TokenTransaction.find({ userId: req.user._id }).sort({ createdAt: -1 }).limit(100);
  res.json(
    transactions.map((t) => ({
      id: t._id.toString(),
      type: t.type,
      amount: t.amount,
      description: t.description,
      resourceTitle: t.resourceTitle ?? null,
      classroomName: t.classroomName ?? null,
      createdAt: t.createdAt
    }))
  );
});
var stdin_default = router;
export {
  stdin_default as default
};
