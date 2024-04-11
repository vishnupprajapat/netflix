import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { Movies } from "@/lib/movieModels";
import { url } from "@/lib/db";

// delete movie

export async function DELETE(req) {
  try {
    // Connect to MongoDB
    await mongoose.connect(url);

    if (req.method !== "DELETE") {
      throw new Error("Method Not Allowed");
    }
    const { id, Id } = await req.json();
    // Find and delete the movie by ID

    if (id !== undefined && id !== null) {
      // If single ID is provided, delete a single item
      console.log(id);
      const deletedMovie = await Movies.findByIdAndDelete(id);
      if (!deletedMovie) {
        return NextResponse.json(
          { success: false, message: "Movie not found" },
          { status: 404 }
        );
      }
    } else if (Id) {
      console.log(Id);
      // If multiple IDs are provided, delete multiple items
      await Movies.deleteMany({ _id: { $in: Id } });
    } else {
      // If neither single nor multiple IDs are provided, return bad request
      return NextResponse.json(
        { success: false, message: "Invalid request" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Movie deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting movie:", error);

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
