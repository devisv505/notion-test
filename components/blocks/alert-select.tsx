import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {CircleAlertIcon, CircleCheckIcon, CircleXIcon, InfoIcon} from "lucide-react";
import {Button} from "@/components/ui/button";
import React from "react";
import {cn} from "@/lib/utils";
import {useTheme} from "next-themes";
import {AlertType} from "@/components/blocks/alerts";

interface AlertBlockProps {
    onUpdate: (value: AlertType) => void;
    currentType: string,
    children: React.ReactNode;
}

export const alertTypes = [
    {
        title: "Warning",
        value: "warning",
        icon: CircleAlertIcon,
        color: "#e69819",
        backgroundColor: {
            light: "#fff6e6",
            dark: "#805d20",
        },
    },
    {
        title: "Error",
        value: "error",
        icon: CircleXIcon,
        color: "#d80d0d",
        backgroundColor: {
            light: "#ffe6e6",
            dark: "#802020",
        },
    },
    {
        title: "Info",
        value: "info",
        icon: InfoIcon,
        color: "#507aff",
        backgroundColor: {
            light: "#e6ebff",
            dark: "#203380",
        },
    },
    {
        title: "Success",
        value: "success",
        icon: CircleCheckIcon,
        color: "#0bc10b",
        backgroundColor: {
            light: "#e6ffe6",
            dark: "#208020",
        },
    },
] as const;

const AlertSelect = ({onUpdate, currentType, children}: AlertBlockProps) => {
    const {resolvedTheme} = useTheme();
    const alertType = alertTypes.find(
        (a) => a.value === currentType
    )!;

    const bg = resolvedTheme === "dark" ? alertType.backgroundColor.dark : alertType.backgroundColor.light;

    return (
        <div
            className={cn(
                "flex justify-start gap-x-2 items-center flex-grow-[1] border-2 rounded-md p-2",
                `bg-[${alertType.backgroundColor.light}] dark:bg-[${alertType.backgroundColor.dark}]`
            )}
            style={{color: `${alertType.color}`, background: bg}}
        >
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        style={{color: `${alertType.color}`, background: bg}}
                        onClick={() => {
                        }}
                        className="text-muted-foreground text-xs border-none"
                        variant="outline"
                        size="sm"
                    >
                        <alertType.icon/>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                    align="start"
                    alignOffset={11}
                    forceMount
                >
                    {alertTypes.map((type) => {

                            return (
                                <DropdownMenuItem
                                    key={type.value}
                                    className="w-full cursor-pointer text-muted-foreground outline-none"
                                    onClick={(e) => {
                                        onUpdate(type.value)
                                    }}
                                >
                                    {type.title}
                                </DropdownMenuItem>
                            );
                        }
                    )}
                </DropdownMenuContent>
            </DropdownMenu>
            {children}
        </div>
    );
};

export default AlertSelect;