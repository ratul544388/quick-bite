"use client";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
interface AvatarProps {
  image?: string | null;
  alt?: string;
}

export const UserAvatar = ({ image, alt }: AvatarProps) => {
  const fallback =
    alt && alt.includes(" ")
      ? alt.split(" ").map((word) => word.charAt(0))
      : alt?.charAt(0);

  return (
    <Avatar>
      <AvatarImage
        src={image || "/images/placeholder.jpg"}
        alt={alt}
        className="object-cover"
      />
      {alt && <AvatarFallback>{fallback}</AvatarFallback>}
    </Avatar>
  );
};
