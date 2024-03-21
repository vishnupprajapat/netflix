import { url } from "@/lib/db";
import mongoose from "mongoose";
export async function connectDb() {
  try {
    await mongoose.connect(url);
    console.log("connected db");
  } catch (error) {
    console.log("conncting error");
  }
}

// not import any files
// only demo
