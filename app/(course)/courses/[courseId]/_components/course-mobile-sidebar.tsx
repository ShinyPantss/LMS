import React from 'react'
import { Menu } from 'lucide-react'
import { Chapter, Course, UserProgress } from "@prisma/client";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTrigger,
  } from "@/components/ui/sheet";
import CourseSideBar from './side-bar';



type CourseSidebarProps = {
    course: Course & {
      Chapters: (Chapter & {
        userProgress: UserProgress[] | null;
      })[];
    };
    progressCount: number;
  };
const CourseMobileSideBar = ({ course, progressCount }: CourseSidebarProps) => {
  return (
    
    <Sheet>
    <SheetTrigger className="md:hidden pr-4 hover:opactiy-75 transition">
      <Menu />
    </SheetTrigger>
    <SheetContent side={"left"} className="p-0 bg-white w-72">
      <CourseSideBar course={course} progressCount = {progressCount} />
    </SheetContent>
  </Sheet>
  )
}

export default CourseMobileSideBar