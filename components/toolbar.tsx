"use client"

import {Doc} from "@/convex/_generated/dataModel";
import IconPicker from "@/components/icon-picker";
import {Button} from "@/components/ui/button";
import {ImageIcon, SmileIcon, XIcon} from "lucide-react";
import React, {ElementRef, useRef, useState} from "react";
import {useMutation} from "convex/react";
import {api} from "@/convex/_generated/api";
import TextareaAutosize from "react-textarea-autosize";
import {useCoverImage} from "@/hooks/use-cover-image";
import {cn} from "@/lib/utils";
import {useMediaQuery} from "usehooks-ts";

interface Toolbar {
    initialData: Doc<"documents">;
    preview?: boolean;
}

const Toolbar = ({initialData, preview}: Toolbar) => {
    const inputRef = useRef<ElementRef<"textarea">>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [value, setValue] = useState(initialData.title);
    const isMobile = useMediaQuery("(max-width: 768px)");

    const update = useMutation(api.documents.update);
    const removeIcon = useMutation(api.documents.removeIcon);

    const coverImage = useCoverImage();

    const enableInput = () => {
        if (preview) return;

        setIsEditing(true);
        setTimeout(() => {
            setValue(initialData.title);
            inputRef.current?.focus();
        }, 0);
    }

    const disableInput = () => setIsEditing(false);

    const onInput = (value: string) => {
        setValue(value);
        update({
            id: initialData._id,
            title: value || "Untitled"
        });
    }

    const onKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.key === "Enter") {
            event.preventDefault();
            disableInput();
        }
    }

    const onIconSelect = (icon: string) => {
        update({
            id: initialData._id,
            icon: icon
        });
    }

    const onRemoveIcon = () => {
        console.log("RRRR");
        removeIcon({
            id: initialData._id
        })
    }

    return (
        <div className="pl-[54px] group relative">
            {!!initialData.icon && !preview && (
                <div className="flex items-center gap-x-2 group/icon pt-6">
                    <IconPicker
                        onChange={onIconSelect}
                        onDelete={onRemoveIcon}
                        asChild
                    >
                        <p className="text-6xl hover:opacity-65 transition absolute top-[-30px]">
                            {initialData.icon}
                        </p>
                    </IconPicker>
                </div>
            )}
            {!!initialData.icon && preview && (
                <p className="text-6xl pt-6">
                    {initialData.icon}
                </p>
            )}
            <div className={cn(
                "flex items-center gap-x-1 py-4",
                !isMobile && "opacity-0 group-hover:opacity-100"
            )}>
                {!initialData.icon && !preview && (
                    <IconPicker onChange={onIconSelect} onDelete={onRemoveIcon} asChild>
                        <Button
                            className="text-muted-foreground text-xs"
                            variant="outline"
                            size="sm"
                        >
                            <SmileIcon className="h-4 w-4 mr-2"/>
                            Add icon
                        </Button>
                    </IconPicker>
                )}
                {!initialData.coverImage && !preview && (
                    <Button
                        onClick={coverImage.onOpen}
                        className="text-muted-foreground text-xs"
                        variant="outline"
                        size="sm"
                    >
                        <ImageIcon className="h-4 w-4 mr-2"/>
                        Add Cover
                    </Button>
                )}
            </div>
            {isEditing && !preview ?
                (
                    <TextareaAutosize
                        ref={inputRef}
                        onBlur={disableInput}
                        onKeyDown={onKeyDown}
                        value={value}
                        onChange={(e) => onInput(e.target.value)}
                        className="text-5xl bg-transparent font-bold break-words outline-none text-[#3F3F3F] dark:text-[#CFCFCF] resize-none"
                    ></TextareaAutosize>
                ) : (
                    <div
                        onClick={enableInput}
                        className="pb-[11.5px] text-5xl font-bold break-words outline-none text-[#3F3F3F] dark:text-[#CFCFCF]"
                    >
                        {initialData.title}
                    </div>
                )
            }
        </div>
    );
}

export default Toolbar;