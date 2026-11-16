import { NextResponse } from "next/server";

import { getExperiences } from "@/features/experience/server/experience.service";

export async function GET() {
  try {
    const experiences = await getExperiences();

    return NextResponse.json({
      success: true,
      data: experiences,
    });
  } catch (error) {
    console.error("Failed to fetch experiences💥:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch experiences.",
      },
      { status: 500 },
    );
  }
}
