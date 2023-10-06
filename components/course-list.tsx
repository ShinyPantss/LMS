import { Category, Course } from "@prisma/client";

type CourseWithProgressWithCategory = Course & {
  category: Category | null;
  chapters: { id: string }[];
  progress: number | null;
};
interface CourseListProps {
  items: CourseWithProgressWithCategory[];
}

export const CoursesList = ({ items }: CourseListProps) => {
  return (
    <div>
      <div>
        {items.map((item) => (
          <div key={item.id}>{item.title}</div>
        ))}
      </div>
      {items.length === 0 && (
        <div className="text-center text-sm text-muted-foreground mt-10">
            No Course found

        </div>
      )}
    </div>
  );
};
