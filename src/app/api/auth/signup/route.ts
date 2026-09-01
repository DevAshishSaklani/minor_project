import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { users } from "@/db/schema";
import { hashPassword, createSession, setSessionCookie } from "@/lib/auth";
import { eq } from "drizzle-orm";
import { randomBytes } from "crypto";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password, fullName, userType, companyName, niche, platform } = body;

    // Validate required fields
    if (!email || !password || !fullName || !userType) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Validate password length
    if (password.length < 6) {
      return NextResponse.json(
        { error: "Password must be at least 6 characters" },
        { status: 400 }
      );
    }

    // Validate user type
    if (userType !== "brand" && userType !== "creator") {
      return NextResponse.json(
        { error: "Invalid user type" },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUsers = await db
      .select()
      .from(users)
      .where(eq(users.email, email.toLowerCase()))
      .limit(1);

    if (existingUsers.length > 0) {
      return NextResponse.json(
        { error: "Email already registered" },
        { status: 400 }
      );
    }

    // Hash password
    const passwordHash = await hashPassword(password);

    // Generate user ID
    const userId = randomBytes(16).toString("hex");

    // Create user
    await db.insert(users).values({
      id: userId,
      email: email.toLowerCase(),
      passwordHash,
      fullName,
      userType,
      companyName: userType === "brand" ? companyName : null,
      niche: userType === "creator" ? niche : null,
      platform: userType === "creator" ? platform : null,
      verified: false,
    });

    // Create session
    const sessionId = await createSession(userId);
    await setSessionCookie(sessionId);

    return NextResponse.json(
      {
        success: true,
        user: {
          id: userId,
          email: email.toLowerCase(),
          fullName,
          userType,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
