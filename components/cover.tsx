"use client"

import {cn} from "@/lib/utils";
import Image from "next/image";
import {Button} from "@/components/ui/button";
import {ImageIcon, XIcon} from "lucide-react";
import {useCoverImage} from "@/hooks/use-cover-image";
import {useMutation} from "convex/react";
import {api} from "@/convex/_generated/api";
import {useParams} from "next/navigation";
import {Id} from "@/convex/_generated/dataModel";
import {useEdgeStore} from "@/lib/edgestore";
import {Skeleton} from "@/components/ui/skeleton";
import {useMediaQuery} from "usehooks-ts";

interface CoverProps {
    url?: string;
    preview?: boolean;
}

export const Cover = ({url, preview}: CoverProps) => {
    const params = useParams();
    const isMobile = useMediaQuery("(max-width: 768px)");
    const {edgestore} = useEdgeStore()
    const coverImage = useCoverImage()
    const removeCoverImage = useMutation(api.documents.removeCoverImage);

    const onRemove = async () => {
        if (url) {
            await edgestore.publicFiles.delete({
                url: url,
            })
        }

        removeCoverImage({
            id: params.documentId as Id<"documents">,
        });
    }

    return (
        <div className={cn(
            "relative w-full h-[35vh] group",
            !url && "h-[12vh]",
            url && "bg-muted"
        )}>
            {!!url && (
                <Image
                    src={url}
                    fill
                    alt="Cover"
                    className="object-cover"
                />
            )}
            {url && !preview && (
                <div className={cn(
                    "absolute bottom-5 right-5 flex items-center gap-x-2",
                    !isMobile && "opacity-0 group-hover:opacity-100 transition"
                )}>
                    <Button
                        onClick={() => coverImage.onReplace(url)}
                        className="text-muted-foreground text-xs"
                        variant="outline"
                        size="sm"
                    >
                        <ImageIcon className="h-4 w-4"/>
                        Change cover
                    </Button>
                    <Button
                        onClick={onRemove}
                        className="text-muted-foreground text-xs"
                        variant="outline"
                        size="sm"
                    >
                        <XIcon className="h-4 w-4"/>
                        Remove
                    </Button>
                </div>
            )}
        </div>
    );
}

Cover.Skeleton = function CoverSkeleton() {
    return (
        <Skeleton
            className="w-full h-[12vh]"
        />
    );
}