import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { Movies } from "@/lib/movieModels";
import { url } from "@/lib/db";

// export async function GET() {
//   await mongoose.connect(url);
//   try {
//     // Connect to MongoDB
//     // Retrieve movies from the database
//     const movies = await Movies.find();

//     // Close MongoDB connection
//     await mongoose.disconnect();

//     // Return successful response with movies
//     return NextResponse.json({ movies }, { status: 200 });
//   } catch (error) {
//     // Handle errors
//     console.error("Error fetching movies:", error);

//     // Return error response
//     return NextResponse.json(
//       { success: false, message: "Failed to fetch movies" },
//       { status: 500 }
//     );
//   }
// }

export async function POST(req, res) {
  await mongoose.connect(url);
  let movie = [];
  try {
    // Ensure the request method is POST
    if (req.method !== "POST") {
      throw new Error("Method Not Allowed");
    }
    // Extract All Movie data from the request body
    const { tittle, videoUrl, thumbnailUrl, genre, duration, description } =
      await req.json();
    console.log(tittle, videoUrl, thumbnailUrl, genre, duration, description);
    if (!tittle) {
      throw new Error("Title is required");
    }
    if (!description) {
      throw new Error("Description is required");
    }
    if (!videoUrl) {
      throw new Error("Video URL is required");
    }
    if (!thumbnailUrl) {
      throw new Error("Thumbnail URL is required");
    }
    if (!genre) {
      throw new Error("Genre is required");
    }
    if (!duration) {
      throw new Error("Duration is required");
    }

    movie = new Movies({
      title: tittle,
      description: description,
      videoUrl: videoUrl,
      thumbnailUrl: thumbnailUrl,
      genre: genre,
      duration: duration,
    });
    movie = await movie.save();
    await mongoose.disconnect();
    return NextResponse.json(
      {
        message: "Movie Add successfully",
        success: true,
        movie,
      },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    // Return error response
    return NextResponse.json(
      { message: error.message, success: false },
      { status: 500 }
    );
  }
}
