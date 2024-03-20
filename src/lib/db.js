import mongoose from "mongoose";
const { username, password } = process.env;

export const url = `mongodb+srv://${username}:${password}@netflix-clone.c3tdhpr.mongodb.net/netflix?retryWrites=true&w=majority&appName=Netflix-clone`;
