import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req: Request, res: Response) {
  try {
    const { userId } = auth();
    const { title } = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const course = await db.course.create({
      data: {
        title,
        userId,
      },
    });
    return new NextResponse(JSON.stringify(course), {
      status: 201,
    })
  } catch (err) {
    return new NextResponse("Interneal Server Error", { status: 500 });
  }
}
