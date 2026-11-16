import { NextResponse } from "next/server";

import { getEducation } from "@/features/education/server/education.service";

export async function GET() {
  try {
    const education = await getEducation();

    return NextResponse.json({
      success: true,
      data: education,
    });
  } catch (error) {
    console.error("Failed to fetch education:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch education.",
      },
      { status: 500 },
    );
  }
}
