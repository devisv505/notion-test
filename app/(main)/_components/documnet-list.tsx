"use client";

import {useQuery} from "convex/react";
import {api} from "@/convex/_generated/api";
import Item from "@/app/(main)/_components/item";
import {FileTextIcon} from "lucide-react";
import {Doc, Id} from "@/convex/_generated/dataModel";
import {useParams, useRouter} from "next/navigation";

interface DocumentListProps {
    parentDocumentId?: Id<"documents">;
    level?: number;
    data?: Doc<"documents">[];
}

const DocumentList = ({parentDocumentId, level = 0}: DocumentListProps) => {
    const params = useParams();
    const router = useRouter();

    const documents = useQuery(api.documents.get);
    const onRedirect = (documentId: string) => {
        router.push(`/documents/${documentId}`)
    }

    if (documents === undefined) {
        return (
            <>
                <Item.Skeleton level={level}/>
                {level === 0 && (
                    <>
                        <Item.Skeleton level={level}/>
                        <Item.Skeleton level={level}/>
                    </>
                )}
            </>
        );
    }

    return (
        <>
            {documents?.map((document) => (
                <Item
                    key={document._id}
                    id={document._id}
                    label={document.title}
                    onClick={() => onRedirect(document._id)}
                    documentIcon={document.icon}
                    icon={FileTextIcon}
                />
            ))}
        </>
    );
}

export default DocumentList;