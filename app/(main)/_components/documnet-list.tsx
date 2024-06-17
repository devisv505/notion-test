"use client";

import {useQuery} from "convex/react";
import {api} from "@/convex/_generated/api";
import Item from "@/app/(main)/_components/item";
import {FileTextIcon} from "lucide-react";

const DocumentList = () => {
    const documents = useQuery(api.documents.get);

    return (
        <>
            {documents?.map((document) => (
                <Item
                    key={document._id}
                    id={document._id}
                    label={document.title}
                    onClick={() => {
                    }}
                    documentIcon={document.icon}
                    icon={FileTextIcon}
                />
            ))}
        </>
    );
}

export default DocumentList;