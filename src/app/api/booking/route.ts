import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      customerName,
      customerEmail,
      customerPhone,
      serviceName,
      serviceId,
      date,
      time,
      notes,
    } = body;

    if (!customerName || !customerEmail || !serviceName || !date || !time) {
      return NextResponse.json(
        {
          error:
            "Customer name, email, service, date, and time are required",
        },
        { status: 400 }
      );
    }

    const booking = await prisma.booking.create({
      data: {
        customerName,
        customerEmail,
        customerPhone: customerPhone || null,
        serviceId: serviceId || null,
        serviceName,
        date,
        time,
        notes: notes || null,
      },
    });

    return NextResponse.json(booking, { status: 201 });
  } catch (error) {
    console.error("Booking submission error:", error);
    return NextResponse.json(
      { error: "Failed to create booking" },
      { status: 500 }
    );
  }
}
