"use client"

import {useUser} from "@clerk/clerk-react";
import {Button} from "@/components/ui/button";
import {PlusCircle} from "lucide-react";
import {useMutation} from "convex/react";
import {api} from "@/convex/_generated/api";
import {toast} from "sonner";

const DocumentPage = () => {
    const {user} = useUser();
    const create = useMutation(api.documents.create)

    const onCreate = () => {
        const promise = create({ title: "Undefined" })

        toast.promise(promise, {
            loading: "Creating a new note...",
            success: "New note created!",
            error: "Failed to create a new note."
        });
    }

    return (
        <div className="h-full flex flex-col items-center justify-center space-y-4">
            <h2>Welcome to {user?.firstName}&apos;s Jotion</h2>
            <Button onClick={onCreate}>
                <PlusCircle className="h-4 w-4 mr-2" />
                Create a note
            </Button>
        </div>
    );
}

export default DocumentPage;