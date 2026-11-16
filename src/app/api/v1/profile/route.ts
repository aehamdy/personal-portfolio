import { getProfile } from "@/features/profile/server/profile.service";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const profile = await getProfile();

    if (!profile) {
      return NextResponse.json(
        {
          success: false,
          message: "Profile not found.",
        },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      data: profile,
    });
  } catch (error) {
    console.error("GET /api/v1/profile failed💥:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to retrieve profile.",
      },
      { status: 500 },
    );
  }
}
