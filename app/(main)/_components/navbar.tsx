import {useParams} from "next/navigation";
import {useQuery} from "convex/react";
import {api} from "@/convex/_generated/api";
import {Id} from "@/convex/_generated/dataModel";
import {MenuIcon} from "lucide-react";
import Title from "@/app/(main)/_components/title";
import {Publish} from "@/app/(main)/_components/publish";

interface NavbarProps {
    isCollapsed: boolean;
    onResetWidth: () => void;
}

const Navbar = ({isCollapsed, onResetWidth}: NavbarProps) => {
    const params = useParams()
    const document = useQuery(api.documents.getById, {
        documentId: params.documentId as Id<"documents">
    })

    if (document === undefined) {
        return <nav
            className="bg-background dark:bg-[#1F1F1F] px-3 py-2 w-full flex items-center"
        >
            <Title.Skeleton/>
        </nav>
    }

    if (document === null) {
        return null;
    }
    const percentage = 70;

    return (
        <>
            <nav
                className="bg-background dark:bg-[#1F1F1F] px-3 py-2 w-full flex items-center gap-x-4"
            >
                {isCollapsed && (
                    <MenuIcon
                        role="button"
                        onClick={onResetWidth}
                        className="h-6 w-6 text-muted-foreground"
                    />
                )}
                <div className="flex items-center justify-between w-full">
                    <Title initialData={document}/>
                    {/*<div className="flex items-center gap-x-2">*/}
                    {/*    <div className="donut-loader w-6 h-6">*/}
                    {/*        <div className="circle-background"></div>*/}
                    {/*        <div className="circle-background2 bg-background dark:bg-[#1F1F1F]"></div>*/}
                    {/*        <div className="circle-progress" style={{'--percentage': percentage}}></div>*/}
                    {/*    </div>*/}

                    {/*    <Publish initialData={document}/>*/}
                    {/*</div>*/}
                </div>
            </nav>
        </>
    );
}

export default Navbar;