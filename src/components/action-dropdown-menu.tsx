"use client";

import { LucideIcon, MoreVertical } from "lucide-react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

interface DropdownMenuProps {
  triggerIcon?: LucideIcon;
  items: {
    label: string;
    icon: LucideIcon;
    onClick: () => void;
    disabled?: boolean;
    isDestructive?: boolean;
  }[];
  className?: string;
}

export const ActionDropdownMenu: React.FC<DropdownMenuProps> = ({
  items,
  triggerIcon: TriggerIcon = MoreVertical,
  className,
}) => {
  return (
    <Popover>
      <PopoverTrigger asChild className={cn(className)}>
        <Button
          size="icon"
          variant="ghost"
          className="focus-visible:ring-0 focus-visible:ring-offset-0 rounded-full"
        >
          <TriggerIcon className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="p-0 py-1 w-fit min-w-[120px]">
        {items.map(
          ({ label, onClick, disabled, icon: Icon, isDestructive }) => (
            <div
              role="button"
              key={label}
              onClick={onClick}
              className={cn(
                "flex items-center gap-3 px-3 py-2 hover:bg-accent text-sm font-medium",
                isDestructive &&
                  "bg-red-500/10 text-red-500 focus:bg-red-500/20 focus:text-red-500 dark:bg-red-500/10 dark:focus:bg-red-900/20",
                disabled && "pointer-events-none"
              )}
            >
              <Icon className="h-4 w-4" />
              {label}
            </div>
          )
        )}
      </PopoverContent>
    </Popover>
  );
};
