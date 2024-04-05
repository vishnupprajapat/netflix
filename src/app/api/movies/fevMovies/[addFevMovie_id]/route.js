import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { User } from "@/lib/model";
import jwt from "jsonwebtoken";
import { url } from "@/lib/db";
import { cookies } from "next/headers";

export async function GET(request, { params }) {
  try {
    // Retrieve authentication token from cookies
    const cookieStore = cookies();
    const authToken = cookieStore.get("authToken")?.value;

    // Verify JWT token
    const decoded = jwt.verify(authToken, process.env.JWT_KEY);
    const userId = decoded._id;

    // Connect to MongoDB
    await mongoose.connect(url);

    // Find the user by ID
    const user = await User.findById(userId);

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    // Extract movie ID to add to favorites
    const movieIdToAdd = params.addFevMovie_id;

    // Validate movieIdToAdd
    if (!mongoose.Types.ObjectId.isValid(movieIdToAdd)) {
      return NextResponse.json(
        { success: false, message: "Invalid movie ID" },
        { status: 400 }
      );
    }

    // Check if the movie is already in favorites
    if (user.favoriteIds.includes(movieIdToAdd)) {
      return NextResponse.json(
        { success: false, message: "Movie already in favorites" },
        { status: 400 }
      );
    }

    // Add movieIdToAdd to favoriteIds
    user.favoriteIds.push(movieIdToAdd);

    // Save the updated user
    await user.save();

    return NextResponse.json(
      { success: true, message: "Movie added to favorites" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error adding movie to favorites:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  } finally {
    // Always disconnect from MongoDB after operation
    await mongoose.disconnect();
  }
}
