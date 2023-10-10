import NavbarRoutes from "@/components/navbar-routes";
import { Chapter, Course, UserProgress } from "@prisma/client";
import React from "react";
import CourseMobileSideBar from "./course-mobile-sidebar";

interface CourseNavbarProps {
  course: Course & {
    Chapters: (Chapter & {
      userProgress: UserProgress[] | null;
    })[];
  };
  progressCount: number;
}
const CourseNavbar = ({ course, progressCount }: CourseNavbarProps) => {
  return (
    <div className="p-4 border-b h-full flex items-center bg-white shadow-sm ">
    <CourseMobileSideBar course={course} progressCount = {progressCount} />
      <NavbarRoutes />
    </div>
  );
};

export default CourseNavbar;
