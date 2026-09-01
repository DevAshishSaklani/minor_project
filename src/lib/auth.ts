import { cookies } from "next/headers";
import { db } from "@/db";
import { sessions, users } from "@/db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import { randomBytes } from "crypto";

const SESSION_COOKIE_NAME = "session_id";
const SESSION_DURATION = 30 * 24 * 60 * 60 * 1000; // 30 days

export interface AuthUser {
  id: string;
  email: string;
  fullName: string;
  userType: "brand" | "creator";
  companyName?: string | null;
  niche?: string | null;
  platform?: string | null;
  verified: boolean;
}

// Generate a random session ID
function generateSessionId(): string {
  return randomBytes(32).toString("hex");
}

// Hash password
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

// Verify password
export async function verifyPassword(
  password: string,
  hash: string
): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

// Create a new session
export async function createSession(userId: string): Promise<string> {
  const sessionId = generateSessionId();
  const expiresAt = new Date(Date.now() + SESSION_DURATION);

  await db.insert(sessions).values({
    id: sessionId,
    userId,
    expiresAt,
  });

  return sessionId;
}

// Set session cookie
export async function setSessionCookie(sessionId: string) {
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, sessionId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: SESSION_DURATION / 1000,
    path: "/",
  });
}

// Get current session
export async function getSession(): Promise<{ user: AuthUser } | null> {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get(SESSION_COOKIE_NAME)?.value;

  if (!sessionId) {
    return null;
  }

  // Get session from database
  const sessionResults = await db
    .select()
    .from(sessions)
    .where(eq(sessions.id, sessionId))
    .limit(1);

  const session = sessionResults[0];

  if (!session) {
    return null;
  }

  // Check if session is expired
  if (session.expiresAt < new Date()) {
    await db.delete(sessions).where(eq(sessions.id, sessionId));
    return null;
  }

  // Get user
  const userResults = await db
    .select()
    .from(users)
    .where(eq(users.id, session.userId))
    .limit(1);

  const user = userResults[0];

  if (!user) {
    return null;
  }

  return {
    user: {
      id: user.id,
      email: user.email,
      fullName: user.fullName,
      userType: user.userType as "brand" | "creator",
      companyName: user.companyName,
      niche: user.niche,
      platform: user.platform,
      verified: user.verified,
    },
  };
}

// Delete session (logout)
export async function deleteSession() {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get(SESSION_COOKIE_NAME)?.value;

  if (sessionId) {
    await db.delete(sessions).where(eq(sessions.id, sessionId));
    cookieStore.delete(SESSION_COOKIE_NAME);
  }
}

// Check if user is authenticated
export async function requireAuth(): Promise<AuthUser> {
  const session = await getSession();
  
  if (!session) {
    throw new Error("Unauthorized");
  }

  return session.user;
}
