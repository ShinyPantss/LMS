import Image from "next/image";
import Link from "next/link";
import React from "react";
import { IconBadge } from "./icon-badge";
import { Book, BookOpen } from "lucide-react";
import { formatPrice } from "@/lib/format";
import { CourseProgress } from "./course-progress";

type CourseCardProps = {
  id: string;
  title: string;
  imageUrl: string;
  chaptersLenght: number;
  progress: number | null;
  price: number;
  category: string | null;
};

const CourseCard = ({
  id,
  title,
  imageUrl,
  chaptersLenght,
  progress,
  price,
  category,
}: CourseCardProps) => {
  return (
    <Link href={`/courses/${id}`}>
      <div className="group hover:shadow-sm transition overflow-hidden border rounded-lg p-3 h-full">
        <div className="relative w-full aspect-video  rounded-md overflow-hidden ">
          <Image
            src={imageUrl}
            alt={title}
            fill={true}
            className="object-cover"
          />
        </div>
        <div className="flex flex-col pt-2">
          <div className="text-lg font-medium md:text-base group-hover:text-sky-700 transition line-clamp-2">
            {title}
          </div>
          <p className="text-xs text-muted-foreground">{category}</p>
          <div className="my-3 flex items-center gap-x-2 text-sm md:text-xs">
            <div className="flex items-center gap-x-1 text-slate-500">
              <IconBadge icon={BookOpen} size="sm" />
              <span>
                {chaptersLenght} {chaptersLenght === 1 ? "chapter" : "chapters"}
              </span>
            </div>
          </div>

          {progress !== null ? (
            <div>
                <CourseProgress variant={progress === 100 ? "success" : "default"} size="sm" value={progress} />
            </div>
          ) : (
            <p className="text-md md:text-sm font-medium text-slate-700">
                {formatPrice(price)}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;
