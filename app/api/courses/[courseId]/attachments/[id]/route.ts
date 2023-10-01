import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { error } from "console";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: { courseId: string; id: string } }
) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const courseOwner = await db.course.findUnique({
      where: {
        id: params.courseId,
        userId: userId,
      },
    });

    if (!courseOwner) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    //
    const attachment = await db.attachment.delete({
      where: {
        courseId: params.courseId,
        id: params.id,
      },
    });

    return NextResponse.json(attachment);
  } catch (err) {
    console.log("Attachment_ID", error);
    return new NextResponse("Interneal Server Error", { status: 500 });
  }
}
