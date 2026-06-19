"use server";

import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function registerUser(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!name || !email || !password) {
    return { error: "Missing fields" };
  }

  try {
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return { error: "Email already in use" };
    }

    const passwordHash = await bcrypt.hash(password, 10);
    
    // No referral code needed right now

    const user = await prisma.user.create({
      data: {
        name,
        email,
        passwordHash,
        loyalty: {
          create: { tier: "BRONZE", points: 0 }
        }
      },
    });

    return { success: true, userId: user.id };
  } catch (error) {
    console.error("Signup Error:", error);
    return { error: "Something went wrong. Please try again." };
  }
}
