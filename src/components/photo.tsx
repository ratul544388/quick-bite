import { cn } from "@/lib/utils";
import Image from "next/image";

interface PhotoProps {
  photo: string;
  className?: string;
  alt?: string;
}

export const Photo = ({
  photo,
  className,
  alt = "Photo",
} : PhotoProps) => {
  return (
    <div
      className={cn(
        "relative aspect-square w-full h-fit overflow-hidden rounded-lg",
        className
      )}
    >
      <Image src={photo} alt={alt} fill className="object-cover" />
    </div>
  );
};