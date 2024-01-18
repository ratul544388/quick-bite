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
    <DropdownMenu>
      <DropdownMenuTrigger asChild className={cn(className)}>
        <Button
          size="icon"
          variant="ghost"
          className="focus-visible:ring-0 focus-visible:ring-offset-0 rounded-full"
        >
          <TriggerIcon className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {items.map((item) => (
          <DropdownMenuItem
            key={item.label}
            onClick={item.onClick}
            disabled={item.disabled}
            className={cn(
              item.isDestructive &&
                "bg-red-500/10 text-red-500 focus:bg-red-500/20 focus:text-red-500 dark:bg-red-500/10 dark:focus:bg-red-900/20"
            )}
          >
            <item.icon className="h-4 w-4" />
            {item.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
