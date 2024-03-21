import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { Movies } from "@/lib/movieModels";
import { url } from "@/lib/db";

export async function GET(req, { params }) {
  try {
    // Connect to MongoDB
    await mongoose.connect(url);

    // Find the movie by ID
    const movie = await Movies.findOne({ _id: params.movie_id });

    // Close MongoDB connection
    await mongoose.disconnect();

    if (!movie) {
      return NextResponse.json(
        { success: false, message: "Movie not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ movie }, { status: 200 });
  } catch (error) {
    console.error("Error fetching movie:", error);

    // Ensure MongoDB connection is closed in case of error
    if (mongoose.connection.readyState === 1) {
      await mongoose.disconnect();
    }

    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
