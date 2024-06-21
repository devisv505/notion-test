"use client";

import React from "react";
import {useTheme} from "next-themes";
import EmojiPicker, {Categories, Theme} from "emoji-picker-react";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {Button} from "@/components/ui/button";
import {XIcon} from "lucide-react";
import {Suggested} from "emoji-picker-react/src/components/body/Suggested";

interface IconPickerProps {
    onChange: (icon: string) => void;
    onDelete: () => void;
    children: React.ReactNode;
    asChild?: boolean;
}

const IconPicker = ({onChange, onDelete, children, asChild}: IconPickerProps) => {
    const {resolvedTheme} = useTheme();
    const currentTheme = (resolvedTheme || "light") as keyof typeof themMap;
    const themMap = {
        "dark": Theme.DARK,
        "light": Theme.LIGHT,
    }
    const theme = themMap[currentTheme];

    return (
        <Popover>
            <PopoverTrigger asChild={asChild}>
                <div className="cursor-pointer">
                    {children}
                </div>
            </PopoverTrigger>
            <PopoverContent className="p-0 w-full">

                <Tabs defaultValue="account" className="w-[400px]">
                    <TabsList className="flex justify-between">
                        <TabsTrigger value="empjis">Emojis</TabsTrigger>
                        <Button
                            variant="ghost"
                            onClick={onDelete}
                        >
                            <XIcon className="w-4 h-4 mr-1" />
                            Remove
                        </Button>
                        {/*<TabsTrigger value="password">Password</TabsTrigger>*/}
                    </TabsList>
                    <TabsContent value="empjis" className="flex items-center justify-center p-0 m-0">
                        <EmojiPicker
                            height={350}
                            theme={theme}
                            onEmojiClick={(data) => onChange(data.emoji)}
                            skinTonesDisabled
                        />
                    </TabsContent>
                    {/*<TabsContent value="password">Change your password here.</TabsContent>*/}
                </Tabs>
            </PopoverContent>
        </Popover>
    );
}

export default IconPicker;
