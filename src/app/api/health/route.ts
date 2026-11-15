import { NextResponse } from "next/server";
import { connectToDatabase } from "@/app/lib/db/connection";

export async function GET() {
  try {
    await connectToDatabase();

    console.error("Database connection established successfully ✅");

    return NextResponse.json({
      status: "success",
      message: "Database connection established successfully.",
    });
  } catch (error) {
    console.error("Database connection failed: 💥", error);

    return NextResponse.json(
      {
        status: "error",
        message: "Database connection failed.",
      },
      { status: 500 },
    );
  }
}
