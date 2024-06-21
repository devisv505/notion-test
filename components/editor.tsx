"use client"

import "@blocknote/core/fonts/inter.css";
import {BlockNoteEditor, PartialBlock} from "@blocknote/core";
import {useCreateBlockNote} from "@blocknote/react";
import {BlockNoteView} from "@blocknote/mantine";
import {useTheme} from "next-themes";
import "@blocknote/mantine/style.css"
import {useEdgeStore} from "@/lib/edgestore";

interface EditorProps {
    onChange: (value: string) => void;
    initialContent?: string;
    editable?: boolean;
}

export const Editor = ({onChange, initialContent, editable}: EditorProps) => {
    const {resolvedTheme} = useTheme();
    const {edgestore} = useEdgeStore();
    const editor: BlockNoteEditor = useCreateBlockNote({
        initialContent: initialContent ? JSON.parse(initialContent) as PartialBlock[] : undefined,
        uploadFile: (file) => handleUpload(file)
    });

    const handleUpload = async (file: File) => {
        const response = await edgestore.publicFiles.upload({file});
        return response.url;
    }

    return (
        <div>
            <BlockNoteView
                className="z-[9999]"
                editable={editable}
                editor={editor}
                theme={resolvedTheme === "dark" ? "dark" : "light"}
                onChange={() => onChange(JSON.stringify(editor.document))}
            />
        </div>
    );
}
