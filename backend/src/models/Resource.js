import mongoose, { Schema } from "mongoose";
const TOKEN_REWARDS = {
  notes: 10,
  assignment: 8,
  ppt: 10,
  previous_year_paper: 15,
  lab_file: 12
};
const ResourceSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    type: {
      type: String,
      required: true,
      enum: ["notes", "assignment", "ppt", "previous_year_paper", "lab_file"]
    },
    fileUrl: { type: String, required: true },
    publicId: { type: String, required: true },
    fileName: { type: String, required: true },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending"
    },
    uploaderId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    classroomId: { type: Schema.Types.ObjectId, ref: "Classroom", required: true },
    rejectionReason: { type: String },
    tokenReward: { type: Number, required: true }
  },
  { timestamps: true }
);
const Resource = mongoose.model("Resource", ResourceSchema);
export {
  Resource,
  TOKEN_REWARDS
};
