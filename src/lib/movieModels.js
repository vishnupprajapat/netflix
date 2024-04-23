import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: false,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: "active",
  },
  year: String,
  videoUrl: String,
  thumbnailUrl: String,
  genre: String,
  duration: String,
});

export const Movies =
  mongoose.models.Movies || mongoose.model("Movies", movieSchema);
