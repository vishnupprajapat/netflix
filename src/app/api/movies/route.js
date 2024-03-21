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

export async function POST() {
  let movie = [];
  try {
    mongoose.connect(url);
    movie = new Movies({
      title: "Elephant's Dream",
      description:
        "Friends Proog and Emo journey inside the folds of a seemingly infinite Machine, exploring the dark and twisted complex of wires, gears, and cogs, until a moment of conflict negates all their assumptions.",
      videoUrl:
        "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
      thumbnailUrl: "https://download.blender.org/ED/cover.jpg",
      genre: "Sci-Fi",
      duration: "15 minutes",
    });
    await movie.save();
  } catch (error) {
    console.log(error);
  }
  return NextResponse.json({ movies: movie }, { status: 201 });
}
