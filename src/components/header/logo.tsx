"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

interface LogoProps {
  image?: string;
  className?: string;
}

export const Logo = ({ image, className }: LogoProps) => {
  return (
    <Link
      href={"/"}
      className={cn("flex items-center gap-2 relative w-fit", className)}
    >
      <div className="font-semibold text-foreground flex items-center left-3 text-lg">
        <div className="text-4xl text-primary">Q</div>
        uick<span className="text-primary">Bite</span>
      </div>
    </Link>
  );
};
