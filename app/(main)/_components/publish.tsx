"use client";

import {Doc} from "@/convex/_generated/dataModel";
import {useOrigin} from "@/hooks/use-origin";
import {useMutation} from "convex/react";
import {api} from "@/convex/_generated/api";
import React, {useState} from "react";
import {toast} from "sonner";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {Button} from "@/components/ui/button";
import {CheckIcon, CopyIcon, GlobeIcon} from "lucide-react";

interface PublishProps {
    initialData: Doc<"documents">;
}

export const Publish = ({initialData}: PublishProps) => {
    const origin = useOrigin();
    const update = useMutation(api.documents.update);
    const [copied, setCopied] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const url = `${origin}/preview/${initialData._id}`;

    const onPublish = () => {
        setIsSubmitting(true);
        const promise = update({
            id: initialData._id,
            isPublished: true,
        }).finally(() => setIsSubmitting(false));

        toast.promise(promise, {
            loading: "Publishing...",
            success: "Note published.",
            error: "Failed to publish note.",
        })
    }

    const onUnpublish = () => {
        setIsSubmitting(true);
        const promise = update({
            id: initialData._id,
            isPublished: false,
        }).finally(() => setIsSubmitting(false));

        toast.promise(promise, {
            loading: "Unpublishing...",
            success: "Note unpublished.",
            error: "Failed to unpublish note.",
        })
    }

    const onCopy = () => {
        navigator.clipboard.writeText(url);
        setCopied(true);

        setTimeout(() => {
            setCopied(false);
        }, 1000);
    }

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant="ghost"
                    size="sm"
                >
                    Publish
                    {initialData.isPublished && (
                        <GlobeIcon
                            className="text-sky-500 w-4 h-4 ml-2"
                        />
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent
                className="w-72"
                align="end"
                alignOffset={8}
                forceMount
            >
                {initialData.isPublished ? (
                    <div className="space-y-4">
                        <div className="flex items-center gap-x-2">
                            <GlobeIcon className="h-4 w-4 text-sky-500"/>
                            <p className="text-xs font-medium text-sky-500">
                                This note is live on web.
                            </p>
                        </div>
                        <div className="flex items-center">
                            <input
                                className="flex-1 px-2 text-xs border rounded-l-md h-8 bg-muted truncate"
                                value={url}
                                disabled
                            />
                            <Button
                                onClick={onCopy}
                                disabled={copied}
                                className="h-8 rounded-l-none"
                            >
                                {copied ? (
                                    <CheckIcon className="w-4 h-4" />
                                ) : (
                                    <CopyIcon className="w-4 h-4" />
                                )}
                            </Button>
                        </div>
                        <Button
                            disabled={isSubmitting}
                            onClick={onUnpublish}
                            className="w-full text-xs"
                            size="sm"
                        >
                            Unpublish
                        </Button>
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center">
                        <GlobeIcon className="h-8 w-8 text-muted-foreground mb-2"/>
                        <p className="text-sm font-medium mb-2">
                            Publish this note
                        </p>
                        <span className="text-xs text-muted-foreground mb-4">
                            Share your work with others
                        </span>
                        <Button
                            disabled={isSubmitting}
                            onClick={onPublish}
                            className="w-full text-xs"
                            size="sm"
                        >
                            Publish
                        </Button>
                    </div>
                )}
            </PopoverContent>
        </Popover>
    );
}