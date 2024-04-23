import mongoose from "mongoose";
const user = new mongoose.Schema({
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
  userstatus: {
    type: String,
    required: true,
  },
  favoriteIds: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Movies", // Reference to the Movie model
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const User = mongoose.models.user || mongoose.model("user", user);
