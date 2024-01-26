import { X } from "lucide-react";
import { CldUploadButton, CldUploadWidgetResults } from "next-cloudinary";
import Image from "next/image";
import { Button } from "./ui/button";
import { useEffect } from "react";

interface ImageUploadProps {
  value: string;
  onChange: (value: string) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ value, onChange }) => {
  useEffect(() => {
    document.body.style.overflow = "auto";
  }, [value]);

  return (
    <div className="h-[160px] relative flex items-center justify-center w-[160px] mx-auto bg-secondary rounded-lg overflow-hidden">
      {value ? (
        <>
          <Image src={value} alt="photo" fill className="object-cover" />
          <Button
            onClick={() => onChange("")}
            variant="outline"
            className="absolute p-0 h-8 w-8 top-0.5 right-0.5 rounded-full"
            type="button"
          >
            <X className="h-4 w-4 " />
          </Button>
        </>
      ) : (
        <Button asChild>
          <CldUploadButton
            uploadPreset="food-delivery"
            options={{
              buttonCaption: "something",
            }}
            //@ts-ignore
            onUpload={(result) => onChange(result.info.secure_url)}
          />
        </Button>
      )}
    </div>
  );
};

export default ImageUpload;
