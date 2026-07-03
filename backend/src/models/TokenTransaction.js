import mongoose, { Schema } from "mongoose";
const TokenTransactionSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    type: { type: String, enum: ["earned", "spent"], required: true },
    amount: { type: Number, required: true },
    description: { type: String, required: true },
    resourceTitle: { type: String },
    classroomName: { type: String }
  },
  { timestamps: true }
);
const TokenTransaction = mongoose.model(
  "TokenTransaction",
  TokenTransactionSchema
);
export {
  TokenTransaction
};
