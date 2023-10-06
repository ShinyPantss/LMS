import { Category, Course } from "@prisma/client";

import { getProgress } from "./get-progress";
import { db } from "@/lib/db";

type CourseWithProgressWithCategory = Course & {
  category: Category | null;
  chapters: { id: string }[];
  progress: number | null;
};

type GetCourses = {
  userId: string;
  title?: string;
  categoryId?: string;
};

export const getCourses = async ({
  userId,
  title,
  categoryId,
}: GetCourses): Promise<CourseWithProgressWithCategory[]> => {
  try {
    const courses = await db.course.findMany({
      where: {
        isPublished: true,
        title: {
          contains: title || "",
        },
        categoryId,
      },
      include: {
        Category: true,
        Chapters: {
          where: {
            isPublished: true,
          },
          select: {
            id: true,
          },
        },
        Purchase: {
          where: {
            userId: userId,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const coursesWithProgress: CourseWithProgressWithCategory[] =
      await Promise.all(
        courses.map(async (course) => {
          if (course.Purchase.length === 0) {
            return {
              ...course,
              category: course.Category,
              chapters: course.Chapters,
              progress: null,
            };
          }
          const progressPercentage = await getProgress(userId, course.id);
          return {
            ...course,
            category: course.Category,
            chapters: course.Chapters,
            progress: progressPercentage,
          };
        })
      );

    return coursesWithProgress;
  } catch (error) {
    console.log("[Get_Courses]]", error);
    return [];
  }
};
