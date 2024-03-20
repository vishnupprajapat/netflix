import { url } from "db";
import mongoose from "mongoose";
export async function connectDb() {
  try {
    await mongoose.connect(url);
    console.log("connected db");
  } catch (error) {
    console.log("conncting error");
  }
}
