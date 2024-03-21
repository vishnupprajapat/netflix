import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { url } from "@/lib/db";
import { Movies } from "@/lib/movieModels";
import { User } from "@/lib/model";
import jwt from "jsonwebtoken";

export async function GET(request) {
  try {
    // Connect to MongoDB
    await mongoose.connect(url);

    // Retrieve JWT token from request cookies
    const authToken = request.cookies.get("authToken");

    if (!authToken) {
      return NextResponse.json(
        { success: false, message: "Authentication token missing" },
        { status: 401 }
      );
    }

    // Verify JWT token
    let decoded;
    try {
      decoded = jwt.verify(authToken.value, process.env.JWT_KEY);
    } catch (error) {
      return NextResponse.json(
        { success: false, message: "Invalid authentication token" },
        { status: 401 }
      );
    }

    const userId = decoded._id;

    // Find the user by ID
    const user = await User.findById(userId);

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    // Retrieve favoriteIds from the user
    const { favoriteIds } = user;

    // Find all movies whose IDs are in the favoriteIds array
    const favoriteMovies = await Movies.find({ _id: { $in: favoriteIds } });

    // Return favoriteMovies as JSON response
    return NextResponse.json({ favoriteMovies }, { status: 200 });
  } catch (error) {
    // Handle errors
    console.error("Error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  } finally {
    // Close MongoDB connection
    await mongoose.disconnect();
  }
}
