import Image from "next/image";
import { getPlaiceholder } from "plaiceholder";
import fs from "node:fs/promises";
import { cn } from "@/lib/utils";

export default async function BluredImage({
  image,
  className,
  alt = "Image",
}: {
  image: string;
  className?: string;
  alt?: string;
}) {
  const buffer = await fs.readFile("./public/gym.jpg");
  const { base64 } = await getPlaiceholder(buffer);
  return (
    <div className={cn("w-full max-w-[400px]", className)}>
      <Image
        src={image}
        alt={alt}
        width={600}
        height={600}
        placeholder="blur"
        blurDataURL={base64}
      />
    </div>
  );
}
