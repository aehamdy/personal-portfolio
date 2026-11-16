import { NextResponse } from "next/server";

import { getSkills } from "@/features/skills/server/skill.service";

export async function GET() {
  try {
    const skills = await getSkills();

    return NextResponse.json({
      success: true,
      data: skills,
    });
  } catch (error) {
    console.error("Failed to fetch skills💥:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch skills.",
      },
      { status: 500 },
    );
  }
}
