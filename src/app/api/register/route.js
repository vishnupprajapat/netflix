import { NextResponse } from "next/server";
import { url } from "@/lib/db";
import { User } from "@/lib/model";
import mongoose from "mongoose";
// import bcrypt from "bcrypt";

export async function POST(req, res) {
  try {
    await mongoose.connect(url);

    if (req.method !== "POST") {
      return NextResponse.error(new Error("Method Not Allowed"), {
        status: 405,
      });
    }
    const { email, username, password } = await req.json();
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ error: "Email taken", status: 422 });
    }
    if (!username) {
      return NextResponse.json({ error: "Name is required", status: 422 });
    }

    // const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = new User({
      email,
      username,
      password,
    });

    await newUser.save();

    // Close the MongoDB connection after saving the user
    await mongoose.connection.close();

    // Return a success response
    return NextResponse.json({ newUser, status: 2001 });
  } catch (error) {
    // Log the error
    console.error("Error saving user:", error);

    // Return an error response
    return NextResponse.json({
      success: false,
      error: "Error saving user",
      status: 500,
    });
  }
}
