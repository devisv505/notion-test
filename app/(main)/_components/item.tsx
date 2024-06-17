"use client"

import {
    ChevronDown,
    ChevronRight,
    Copy, ExternalLink,
    LinkIcon,
    LucideIcon,
    MoreHorizontal,
    SquarePen,
    Star,
    Trash
} from "lucide-react";
import {Id} from "@/convex/_generated/dataModel";
import {cn} from "@/lib/utils";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {useUser} from "@clerk/clerk-react";

interface ItemProps {
    id?: Id<"documents">;
    documentIcon?: string;
    active?: boolean;
    expended?: boolean;
    isSearch?: boolean;
    level?: number;
    onExpended?: () => void;

    label: string;
    onClick: () => void;
    icon: LucideIcon;
}

const Item = ({
                  label,
                  onClick,
                  icon: Icon,
                  id,
                  documentIcon,
                  active,
                  expended,
                  isSearch,
                  level = 0,
                  onExpended
              }: ItemProps) => {

    const {user} = useUser();
    const ChevronIcon = expended ? ChevronDown : ChevronRight;

    return (
        <div
            onClick={onClick}
            role="button"
            style={{paddingLeft: level ? `${(level * 12) + 12}px` : "12px"}}
            className={cn(
                "group min-h-[27px] text-sm py-1 pr-3 w-full hover:bg-primary/5 flex items-center text-muted-foreground font-medium",
                active && "bg-primary/5 text-primary"
            )}
        >
            {/*{!!id && (*/}
            {/*    <div*/}
            {/*        role="button"*/}
            {/*        className="h-full rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600 mr-1"*/}
            {/*        onClick={() => {*/}
            {/*        }}*/}
            {/*    >*/}
            {/*        <ChevronIcon className="h-4 w-4 shrink-0 text-muted-foreground/50"/>*/}
            {/*    </div>*/}
            {/*)}*/}

            {documentIcon ? (
                <div className="shrink-0 mr-2 text-[18px]">
                    {documentIcon}
                </div>
            ) : (
                <Icon className="shrink-0 h-[18px] mr-2 text-muted-foreground"/>
            )}
            <span className="truncate">
                {label}
            </span>
            {isSearch && (
                <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none
                    items-center gap-1 rounded bg-muted px-1.5 font-mono text-[10px]
                    font-medium text-muted-foreground opacity-100"
                >
                    <span className="text-xs">⌘</span>K
                </kbd>
            )}

            {!!id && (
                <div className="ml-auto flex items-center gap-x-2">
                    <DropdownMenu>
                        <DropdownMenuTrigger
                            onClick={(e) => e.stopPropagation()}
                            asChild
                        >
                            <div
                                role="button"
                                className="opacity-0 group-hover:opacity-100 h-full ml-auto rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600"
                            >
                                <MoreHorizontal className="h-4 w-4 text-muted-foreground"/>
                            </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                            className="w-60"
                            align="start"
                            side="right"
                            forceMount
                        >
                            <DropdownMenuItem className="flex gap-x-2" onClick={() => {
                            }}>
                                <Star className="h-4 w-4"/>
                                Add to Favorites
                            </DropdownMenuItem>
                            <DropdownMenuSeparator/>
                            <DropdownMenuItem className="flex gap-x-2" onClick={() => {
                            }}>
                                <LinkIcon className="h-4 w-4"/>
                                Copy link
                            </DropdownMenuItem>
                            <DropdownMenuItem className="flex gap-x-2" onClick={() => {
                            }}>
                                <Copy className="h-4 w-4"/>
                                Duplicate
                            </DropdownMenuItem>
                            <DropdownMenuItem className="flex gap-x-2" onClick={() => {
                            }}>
                                <SquarePen className="h-4 w-4"/>
                                Rename
                            </DropdownMenuItem>
                            <DropdownMenuItem className="flex gap-x-2" onClick={() => {
                            }}>
                                <Trash className="h-4 w-4"/>
                                Delete
                            </DropdownMenuItem>
                            <DropdownMenuSeparator/>
                            <DropdownMenuItem className="flex gap-x-2" onClick={() => {
                            }}>
                                <ExternalLink className="h-4 w-4"/>
                                Open in new tab
                            </DropdownMenuItem>
                            <DropdownMenuSeparator/>
                            <div className="text-xs text-muted-foreground p-2">
                                Last edited by {user?.fullName}
                            </div>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            )}
        </div>
    );
}

export default Item;