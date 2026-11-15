import { NextResponse } from "next/server";

import { getPublishedProjects } from "@/features/projects/server/project.service";

export async function GET() {
  try {
    const projects = await getPublishedProjects();

    return NextResponse.json({
      success: true,
      data: projects,
    });
  } catch (error) {
    console.error("GET /api/v1/projects failed💥:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to retrieve projects.",
      },
      { status: 500 },
    );
  }
}
