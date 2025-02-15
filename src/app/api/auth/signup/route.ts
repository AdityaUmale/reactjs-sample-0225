import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import User from '@/models/User';
import jwt from 'jsonwebtoken';

export async function POST(request: Request) {
  try {
    await dbConnect();
    
    const body = await request.json();
    const { email, password, name } = body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: 'User already exists' },
        { status: 400 }
      );
    }

    // Create new user
    const user = await User.create({
      email,
      password,
      name,
    });

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET!,
      { expiresIn: '7d' }
    );

    return NextResponse.json({
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
      },
    }, { status: 201 });
    
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: 'Error creating user' },
      { status: 500 }
    );
  }
}