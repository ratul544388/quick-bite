import { ChevronRight, LucideIcon, UtensilsCrossed } from "lucide-react";
import Link from "next/link";
import { Button, buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils";
import { Fragment } from "react";
import { MaxWidthWrapper } from "./max-width-wrapper";

interface PageHeaderProps {
  navigations: {
    label: string;
    href?: string;
  }[];
  actionLabel?: string;
  actionUrl?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  navigations,
  actionLabel,
  actionUrl,
}) => {
  return (
    <div className="flex flex-wrap gap-5 justify-between">
      <div className="flex items-center gap-2">
        {navigations.map(({ label, href = "/" }, index) => (
          <Fragment key={label}>
            {index + 1 < navigations.length ? (
              <div className="flex items-center gap-2">
                <Link
                  href={href}
                  className="font-semibold text-foreground/80 hover:text-foreground transition-colors"
                >
                  {label}
                </Link>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </div>
            ) : (
              <p className="text-muted-foreground font-semibold line-clamp-1">{label}</p>
            )}
          </Fragment>
        ))}
      </div>
      {actionLabel && actionUrl && (
        <Link href={actionUrl} className={cn(buttonVariants())}>
          {actionLabel}
        </Link>
      )}
    </div>
  );
};

export default PageHeader;
