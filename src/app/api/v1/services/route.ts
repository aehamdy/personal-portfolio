import { getServices } from "@/features/services/server/service.service";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const services = await getServices();

    return NextResponse.json({
      success: true,
      data: services,
    });
  } catch (error) {
    console.error("Failed to fetch services:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch services.",
      },
      { status: 500 },
    );
  }
}
