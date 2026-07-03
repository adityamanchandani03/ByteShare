import { Router } from "express";
import { Classroom } from "../models/Classroom";
import { Resource } from "../models/Resource";
import { TokenTransaction } from "../models/TokenTransaction";
import { Notification } from "../models/Notification";
import { requireAuth } from "../middlewares/auth";
const router = Router();
router.get("/dashboard/summary", requireAuth, async (req, res) => {
  const userId = req.user._id;
  const [classroomCount, uploadedCount, approvedCount, pendingCount, recentTransactions, unreadCount] = await Promise.all([
    Classroom.countDocuments({ "members.userId": userId }),
    Resource.countDocuments({ uploaderId: userId }),
    Resource.countDocuments({ uploaderId: userId, status: "approved" }),
    Resource.countDocuments({ uploaderId: userId, status: "pending" }),
    TokenTransaction.find({ userId }).sort({ createdAt: -1 }).limit(5),
    Notification.countDocuments({ userId, isRead: false })
  ]);
  res.json({
    tokenBalance: req.user.tokenBalance,
    reputation: req.user.reputation,
    classroomCount,
    uploadedCount,
    approvedCount,
    pendingCount,
    recentTransactions: recentTransactions.map((t) => ({
      id: t._id.toString(),
      type: t.type,
      amount: t.amount,
      description: t.description,
      resourceTitle: t.resourceTitle ?? null,
      classroomName: t.classroomName ?? null,
      createdAt: t.createdAt
    })),
    unreadNotificationCount: unreadCount
  });
});
var stdin_default = router;
export {
  stdin_default as default
};
