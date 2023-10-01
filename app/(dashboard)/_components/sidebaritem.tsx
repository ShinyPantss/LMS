"use client";
import { LucideIcon } from "lucide-react";
import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

type SideBarItemProps = {
  icon: LucideIcon;
  label: string;
  href: string;
};
const SideBarItem = (props: SideBarItemProps) => {
  const { icon: Icon } = props;
  const pathname = usePathname();
  const router = useRouter();

  const isActive =
    (pathname === "/" && props.href === "/") ||
    pathname === props.href ||
    pathname?.startsWith(`${props.href}/`);

  const onClick = () => {
    router.push(props.href);
  };

  return (
    <button
      onClick={onClick}
      className={cn(
        "flex flex-row items-center gap-x-2 text-sm font-[500] pl-6 transition-all hover:text-slate-600 hover:bg-slate-300/20 ",
        isActive &&
          "text-sky-700 bg-sky-200/20 hover:bg-sky-200/20 hover:text-sky-700"
      )}
    >
      <div className="flex items-center gap-x-2 py-4 ">
        <Icon
          size={22}
          className={cn("text-slate-500", isActive && "text-sky-700")}
        />
        {props.label}
      </div>
      <div
        className={cn(
          "ml-auto opacity-0 border-2 border-sky-700 h-full transition-all",
          isActive && "opacity-100"
        )}
      ></div>
    </button>
  );
};

export default SideBarItem;
