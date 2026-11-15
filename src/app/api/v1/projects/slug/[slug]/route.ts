import { NextResponse } from "next/server";

import { getPublishedProjectBySlug } from "@/features/projects/server/project.service";

interface RouteContext {
  params: Promise<{
    slug: string;
  }>;
}

export async function GET(_request: Request, { params }: RouteContext) {
  try {
    const { slug } = await params;

    const project = await getPublishedProjectBySlug(slug);

    if (!project) {
      return NextResponse.json(
        {
          success: false,
          message: "Project not found.",
        },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      data: project,
    });
  } catch (error) {
    console.error("GET /api/v1/projects/slug/[slug] failed💥:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to retrieve project.",
      },
      { status: 500 },
    );
  }
}
