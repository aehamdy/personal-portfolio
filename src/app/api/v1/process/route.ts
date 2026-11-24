import { getProcessSteps } from "@/features/process/server/process.services";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const processSteps = await getProcessSteps();

    return NextResponse.json({
      success: true,
      data: processSteps,
    });
  } catch (error) {
    console.error("Failed to fetch process steps:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch process steps.",
      },
      { status: 500 },
    );
  }
}
