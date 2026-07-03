var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { Router } from "express";
import mongoose from "mongoose";
import { Classroom, generateInviteCode } from "../models/Classroom";
import { Resource } from "../models/Resource";
import { User } from "../models/User";
import { Notification } from "../models/Notification";
import { requireAuth } from "../middlewares/auth";
import {
  CreateClassroomBody,
  UpdateClassroomBody,
  JoinClassroomBody
} from "@workspace/api-zod";
const router = Router();
function formatClassroom(classroom, userId) {
  return {
    id: classroom._id.toString(),
    name: classroom.name,
    subject: classroom.subject,
    department: classroom.department,
    semester: classroom.semester,
    description: classroom.description ?? null,
    inviteCode: classroom.inviteCode,
    hostId: classroom.hostId.toString(),
    memberCount: classroom.members.length,
    isHost: classroom.hostId.toString() === userId,
    createdAt: classroom.createdAt
  };
}
__name(formatClassroom, "formatClassroom");
router.get("/classrooms", requireAuth, async (req, res) => {
  const userId = req.user._id.toString();
  const classrooms = await Classroom.find({
    "members.userId": req.user._id
  });
  const hostData = await User.find(
    { _id: { $in: classrooms.map((c) => c.hostId) } },
    { _id: 1, name: 1 }
  );
  const hostMap = Object.fromEntries(hostData.map((u) => [u._id.toString(), u.name]));
  res.json(
    classrooms.map((c) => ({
      ...formatClassroom(c, userId),
      hostName: hostMap[c.hostId.toString()] ?? ""
    }))
  );
});
router.post("/classrooms", requireAuth, async (req, res) => {
  const parsed = CreateClassroomBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  const userId = req.user._id;
  let inviteCode = generateInviteCode();
  while (await Classroom.findOne({ inviteCode })) {
    inviteCode = generateInviteCode();
  }
  const classroom = await Classroom.create({
    name: parsed.data.name,
    subject: parsed.data.subject,
    department: parsed.data.department,
    semester: parsed.data.semester,
    description: parsed.data.description ?? void 0,
    inviteCode,
    hostId: userId,
    members: [{ userId, joinedAt: /* @__PURE__ */ new Date() }]
  });
  res.status(201).json({
    ...formatClassroom(classroom, userId.toString()),
    hostName: req.user.name
  });
});
router.post("/classrooms/join", requireAuth, async (req, res) => {
  const parsed = JoinClassroomBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  const { inviteCode } = parsed.data;
  const classroom = await Classroom.findOne({ inviteCode: inviteCode.toUpperCase() });
  if (!classroom) {
    res.status(404).json({ error: "Invalid invite code" });
    return;
  }
  const userId = req.user._id;
  const alreadyMember = classroom.members.some(
    (m) => m.userId.toString() === userId.toString()
  );
  if (alreadyMember) {
    res.status(400).json({ error: "Already a member of this classroom" });
    return;
  }
  classroom.members.push({ userId, joinedAt: /* @__PURE__ */ new Date() });
  await classroom.save();
  const host = await User.findById(classroom.hostId, { name: 1 });
  res.json({
    ...formatClassroom(classroom, userId.toString()),
    hostName: host?.name ?? ""
  });
});
router.get("/classrooms/:classroomId", requireAuth, async (req, res) => {
  const { classroomId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(classroomId)) {
    res.status(404).json({ error: "Classroom not found" });
    return;
  }
  const classroom = await Classroom.findById(classroomId);
  if (!classroom) {
    res.status(404).json({ error: "Classroom not found" });
    return;
  }
  const userId = req.user._id.toString();
  const isMember = classroom.members.some((m) => m.userId.toString() === userId);
  if (!isMember) {
    res.status(403).json({ error: "Not a member of this classroom" });
    return;
  }
  const host = await User.findById(classroom.hostId, { name: 1 });
  res.json({
    ...formatClassroom(classroom, userId),
    hostName: host?.name ?? ""
  });
});
router.patch("/classrooms/:classroomId", requireAuth, async (req, res) => {
  const { classroomId } = req.params;
  const parsed = UpdateClassroomBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  const classroom = await Classroom.findById(classroomId);
  if (!classroom) {
    res.status(404).json({ error: "Classroom not found" });
    return;
  }
  const userId = req.user._id.toString();
  if (classroom.hostId.toString() !== userId) {
    res.status(403).json({ error: "Only the host can update this classroom" });
    return;
  }
  if (parsed.data.name) classroom.name = parsed.data.name;
  if (parsed.data.description !== void 0) classroom.description = parsed.data.description ?? void 0;
  await classroom.save();
  const host = await User.findById(classroom.hostId, { name: 1 });
  res.json({
    ...formatClassroom(classroom, userId),
    hostName: host?.name ?? ""
  });
});
router.get("/classrooms/:classroomId/members", requireAuth, async (req, res) => {
  const { classroomId } = req.params;
  const classroom = await Classroom.findById(classroomId);
  if (!classroom) {
    res.status(404).json({ error: "Classroom not found" });
    return;
  }
  const userId = req.user._id.toString();
  const isMember = classroom.members.some((m) => m.userId.toString() === userId);
  if (!isMember) {
    res.status(403).json({ error: "Not a member" });
    return;
  }
  const memberIds = classroom.members.map((m) => m.userId);
  const users = await User.find({ _id: { $in: memberIds } }, { name: 1, email: 1, reputation: 1 });
  const userMap = Object.fromEntries(users.map((u) => [u._id.toString(), u]));
  const members = classroom.members.map((m) => {
    const u = userMap[m.userId.toString()];
    return {
      id: m.userId.toString(),
      name: u?.name ?? "",
      email: u?.email ?? "",
      reputation: u?.reputation ?? 0,
      joinedAt: m.joinedAt
    };
  });
  res.json(members);
});
router.delete("/classrooms/:classroomId/members/:memberId", requireAuth, async (req, res) => {
  const { classroomId, memberId } = req.params;
  const classroom = await Classroom.findById(classroomId);
  if (!classroom) {
    res.status(404).json({ error: "Classroom not found" });
    return;
  }
  const userId = req.user._id.toString();
  if (classroom.hostId.toString() !== userId) {
    res.status(403).json({ error: "Only the host can remove members" });
    return;
  }
  if (memberId === classroom.hostId.toString()) {
    res.status(400).json({ error: "Cannot remove the host" });
    return;
  }
  classroom.members = classroom.members.filter(
    (m) => m.userId.toString() !== memberId
  );
  await classroom.save();
  await Notification.create({
    userId: new mongoose.Types.ObjectId(memberId),
    type: "removed_from_classroom",
    message: `You have been removed from classroom "${classroom.name}"`,
    classroomName: classroom.name
  });
  res.json({ success: true, message: "Member removed" });
});
router.get("/classrooms/:classroomId/stats", requireAuth, async (req, res) => {
  const { classroomId } = req.params;
  const classroom = await Classroom.findById(classroomId);
  if (!classroom) {
    res.status(404).json({ error: "Classroom not found" });
    return;
  }
  const userId = req.user._id.toString();
  if (classroom.hostId.toString() !== userId) {
    res.status(403).json({ error: "Only the host can view stats" });
    return;
  }
  const [approved, pending, tokenSum] = await Promise.all([
    Resource.countDocuments({ classroomId, status: "approved" }),
    Resource.countDocuments({ classroomId, status: "pending" }),
    Resource.aggregate([
      { $match: { classroomId: new mongoose.Types.ObjectId(classroomId), status: "approved" } },
      { $group: { _id: null, total: { $sum: "$tokenReward" } } }
    ])
  ]);
  const totalTokensAwarded = tokenSum[0]?.total ?? 0;
  const contributions = await Resource.aggregate([
    { $match: { classroomId: new mongoose.Types.ObjectId(classroomId), status: "approved" } },
    { $group: { _id: "$uploaderId", approvedCount: { $sum: 1 } } },
    { $sort: { approvedCount: -1 } },
    { $limit: 5 }
  ]);
  const contributorIds = contributions.map((c) => c._id);
  const contributorUsers = await User.find({ _id: { $in: contributorIds } }, { name: 1, reputation: 1 });
  const userMap = Object.fromEntries(contributorUsers.map((u) => [u._id.toString(), u]));
  const topContributors = contributions.map((c) => ({
    id: c._id.toString(),
    name: userMap[c._id.toString()]?.name ?? "",
    reputation: userMap[c._id.toString()]?.reputation ?? 0,
    approvedCount: c.approvedCount
  }));
  res.json({
    totalMembers: classroom.members.length,
    totalApproved: approved,
    totalPending: pending,
    totalTokensAwarded,
    topContributors
  });
});
var stdin_default = router;
export {
  stdin_default as default
};
