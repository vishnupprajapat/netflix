import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { Movies } from "@/lib/movieModels";
import { url } from "@/lib/db";
import { headers } from "next/headers";

export async function GET(res, req) {
  const headersList = headers();
  try {
    // Connect to MongoDB
    await mongoose.connect(url);

    // Check if the connection is successful
    if (mongoose.connection.readyState !== 1) {
      throw new Error("Failed to connect to MongoDB");
    }

    // Retrieve movies from the database
    const movies = await Movies.find();

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
