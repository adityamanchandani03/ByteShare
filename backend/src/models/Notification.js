import mongoose, { Schema } from "mongoose";
const NotificationSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    type: {
      type: String,
      enum: ["resource_approved", "resource_rejected", "removed_from_classroom"],
      required: true
    },
    message: { type: String, required: true },
    isRead: { type: Boolean, default: false },
    resourceTitle: { type: String },
    classroomName: { type: String },
    rejectionReason: { type: String }
  },
  { timestamps: true }
);
const Notification = mongoose.model("Notification", NotificationSchema);
export {
  Notification
};
