"use client";

import React from "react";
import {useTheme} from "next-themes";
import EmojiPicker, {Theme} from "emoji-picker-react";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";

interface IconPickerProps {
    onChange: (icon: string) => void;
    children: React.ReactNode;
    asChild?: boolean;
}

const IconPicker = ({onChange, children, asChild}: IconPickerProps) => {
    const {resolvedTheme} = useTheme();
    const currentTheme = (resolvedTheme || "light") as keyof typeof themMap;
    const themMap = {
        "dark": Theme.DARK,
        "light": Theme.LIGHT,
    }
    const theme = themMap[currentTheme];

    return (
        <Popover>
            <PopoverTrigger asChild={asChild} className="cursor-pointer">
                {children}
            </PopoverTrigger>
            <PopoverContent className="p-0 w-full">
                test

                <div className="emoji-picker-wrapper rounded-none border-none shadow-none">
                    <EmojiPicker
                        height={350}
                        theme={theme}
                        onEmojiClick={(data) => onChange(data.emoji)}
                        className="rounded-none border-none shadow-none"
                    />
                </div>
            </PopoverContent>
        </Popover>
    );
}

export default IconPicker;
