"use client"

import "@blocknote/core/fonts/inter.css";
import {
    BlockNoteSchema,
    defaultBlockSpecs,
    filterSuggestionItems,
    insertOrUpdateBlock,
    PartialBlock
} from "@blocknote/core";
import {getDefaultReactSlashMenuItems, SuggestionMenuController, useCreateBlockNote} from "@blocknote/react";
import {BlockNoteView} from "@blocknote/mantine";
import {useTheme} from "next-themes";
import "@blocknote/mantine/style.css"
import {useEdgeStore} from "@/lib/edgestore";
import {Alert} from "@/components/blocks/alerts";
import {AlertCircleIcon} from "lucide-react";

interface EditorProps {
    onChange: (value: string) => void;
    initialContent?: string;
    editable?: boolean;
}

export const Editor = ({onChange, initialContent, editable}: EditorProps) => {
    const {resolvedTheme} = useTheme();
    const {edgestore} = useEdgeStore();

    const schema = BlockNoteSchema.create({
        blockSpecs: {
            // Adds all default blocks.
            ...defaultBlockSpecs,
            // Adds the Alert block.
            alert: Alert,
        },
    });

    const insertAlert = (editor: typeof schema.BlockNoteEditor) => ({
        title: "Alert",
        onItemClick: () => {
            insertOrUpdateBlock(editor, {
                type: "alert",
            });
        },
        aliases: [
            "alert",
            "notification",
            "emphasize",
            "warning",
            "error",
            "info",
            "success",
        ],
        group: "Other",
        icon: <AlertCircleIcon/>,
    });

    const editor = useCreateBlockNote({
        schema: schema,
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
                editable={editable}
                editor={editor}
                theme={resolvedTheme === "dark" ? "dark" : "light"}
                onChange={() => onChange(JSON.stringify(editor.document))}
                slashMenu={false}
            >
                <SuggestionMenuController
                    triggerCharacter={"/"}
                    getItems={async (query) =>
                        // Gets all default slash menu items and `insertAlert` item.
                        filterSuggestionItems(
                            [...getDefaultReactSlashMenuItems(editor), insertAlert(editor)],
                            query
                        )
                    }
                />
            </BlockNoteView>
        </div>
    );
}
