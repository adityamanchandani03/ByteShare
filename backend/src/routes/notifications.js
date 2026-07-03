import { Router } from "express";
import mongoose from "mongoose";
import { Notification } from "../models/Notification";
import { requireAuth } from "../middlewares/auth";
const router = Router();
router.get("/notifications", requireAuth, async (req, res) => {
  const notifications = await Notification.find({ userId: req.user._id }).sort({ createdAt: -1 }).limit(50);
  res.json(
    notifications.map((n) => ({
      id: n._id.toString(),
      type: n.type,
      message: n.message,
      isRead: n.isRead,
      resourceTitle: n.resourceTitle ?? null,
      classroomName: n.classroomName ?? null,
      rejectionReason: n.rejectionReason ?? null,
      createdAt: n.createdAt
    }))
  );
});
router.post("/notifications/read-all", requireAuth, async (req, res) => {
  await Notification.updateMany({ userId: req.user._id, isRead: false }, { isRead: true });
  res.json({ success: true, message: "All notifications marked as read" });
});
router.post("/notifications/:notificationId/read", requireAuth, async (req, res) => {
  const { notificationId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(notificationId)) {
    res.status(404).json({ error: "Notification not found" });
    return;
  }
  const notification = await Notification.findOneAndUpdate(
    { _id: notificationId, userId: req.user._id },
    { isRead: true },
    { new: true }
  );
  if (!notification) {
    res.status(404).json({ error: "Notification not found" });
    return;
  }
  res.json({
    id: notification._id.toString(),
    type: notification.type,
    message: notification.message,
    isRead: notification.isRead,
    resourceTitle: notification.resourceTitle ?? null,
    classroomName: notification.classroomName ?? null,
    rejectionReason: notification.rejectionReason ?? null,
    createdAt: notification.createdAt
  });
});
var stdin_default = router;
export {
  stdin_default as default
};
