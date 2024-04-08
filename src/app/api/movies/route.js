import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { Movies } from "@/lib/movieModels";
import { url } from "@/lib/db";

export async function GET() {
  await mongoose.connect(url);
  try {
    // Connect to MongoDB
    // Retrieve movies from the database
    const movies = await Movies.find();

    // Close MongoDB connection
    await mongoose.disconnect();

    // Return successful response with movies
    return NextResponse.json({ movies }, { status: 200 });
  } catch (error) {
    // Handle errors
    console.error("Error fetching movies:", error);

    // Return error response
    return NextResponse.json(
      { success: false, message: "Failed to fetch movies" },
      { status: 500 }
    );
  }
}
