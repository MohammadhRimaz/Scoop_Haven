import { User } from "../../models/User";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    mongoose.connect(process.env.MONGO_URL);
    const { password } = body;

    // Check for password length
    if (!password || password.length < 5) {
      return NextResponse.json(
        { message: "Password must be at least 5 characters long." },
        { status: 400 }
      );
    }

    // Hashed the password field in the DataBase
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    body.password = hashedPassword;

    // Create and save the new user
    const createdUser = await User.create(body);

    // Respond with the created user details
    return NextResponse.json(createdUser, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred during registration." },
      { status: 500 }
    );
  }
}
