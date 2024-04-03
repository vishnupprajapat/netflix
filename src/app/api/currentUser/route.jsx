import mongoose from "mongoose";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { User } from "@/lib/model";
import { url } from "@/lib/db";

export async function GET(request) {
  // Connect to MongoDB
  await mongoose.connect(url);

  try {
    const authToken = request.cookies.get("authToken")?.value;
    if (!authToken) {
      throw { message: "Authentication token not found ", status: 401 };
    }

    const decodedToken = jwt.verify(authToken, process.env.JWT_KEY);
    if (!decodedToken || !decodedToken._id) {
      throw {
        message: "Invalid or expired authentication token ",
        status: 401,
      };
    }

    const user = await User.findById(decodedToken._id).select(
      "-hashedPassword"
    );
    if (!user) {
      throw { message: "User not found", status: 404 };
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error("Error retrieving user information:", error.message);
    return NextResponse.error(error.message, { status: error.status || 500 });
  } finally {
    // Close the MongoDB connection
    await mongoose.disconnect();
  }
}
