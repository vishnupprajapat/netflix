import mongoose from "mongoose";
const adminUser = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: false,
  },
  username: {
    type: String,
    required: true,
    index: true,
    unique: true,
    sparse: true,
  },
  hashedPassword: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const AdminUser =
  mongoose.models.AdminUser || mongoose.model("AdminUser", adminUser);
