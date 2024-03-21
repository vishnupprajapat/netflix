import mongoose from "mongoose";

const accountSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  username: String,
  email: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Check if the model already exists before defining it
export const Account =
  mongoose.models.Account || mongoose.model("Account", accountSchema);
