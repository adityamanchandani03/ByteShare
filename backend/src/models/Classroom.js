var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import mongoose, { Schema } from "mongoose";
const MembershipSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    joinedAt: { type: Date, default: Date.now }
  },
  { _id: false }
);
const ClassroomSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    subject: { type: String, required: true, trim: true },
    department: { type: String, required: true, trim: true },
    semester: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    inviteCode: { type: String, required: true, unique: true, uppercase: true },
    hostId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    members: { type: [MembershipSchema], default: [] }
  },
  { timestamps: true }
);
function generateInviteCode() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "";
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}
__name(generateInviteCode, "generateInviteCode");
ClassroomSchema.pre("save", function() {
  if (!this.inviteCode) {
    this.inviteCode = generateInviteCode();
  }
});
const Classroom = mongoose.model("Classroom", ClassroomSchema);
export {
  Classroom,
  generateInviteCode
};
