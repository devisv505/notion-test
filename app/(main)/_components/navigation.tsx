"use client";

import {cn} from "@/lib/utils";
import React, {ElementRef, useEffect, useRef, useState} from "react";
import {useParams, usePathname, useRouter} from "next/navigation";
import {useMediaQuery} from "usehooks-ts";
import {ChevronsLeft, HomeIcon, MenuIcon, PlusCircleIcon, SearchIcon, SettingsIcon} from "lucide-react";
import {UserItem} from "@/app/(main)/_components/user-item";
import {api} from "@/convex/_generated/api";
import {useMutation} from "convex/react";
import Item from "@/app/(main)/_components/item";
import {toast} from "sonner";
import DocumentList from "@/app/(main)/_components/documnet-list";
import Navbar from "@/app/(main)/_components/navbar";

export const Navigation = () => {
    const pathname = usePathname();
    const params = useParams();
    const router = useRouter();
    const create = useMutation(api.documents.create)
    const isMobile = useMediaQuery("(max-width: 768px)");

    const isResizingRef = useRef(false);
    const sidebarRef = useRef<ElementRef<"aside">>(null);
    const navbarRef = useRef<ElementRef<"div">>(null);
    const [isResetting, setIsResetting] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(isMobile);

    useEffect(() => {
        if (isMobile) {
            collapse();
        } else {
            resetWith();
        }
    }, [isMobile]);

    useEffect(() => {
        if (isMobile) {
            collapse();
        }
    }, [pathname, isMobile])

    const onRedirectHome = () => {
        router.push(`/documents`)
    }

    const handleMouseMove = (event: MouseEvent) => {
        if (!isResizingRef.current) return;
        let newWith = event.clientX;

        if (newWith < 240) newWith = 240;
        if (newWith > 480) newWith = 480;

        if (sidebarRef.current && navbarRef.current) {
            sidebarRef.current.style.minWidth = `${newWith}px`;
            navbarRef.current.style.setProperty("left", `${newWith}px`);
            navbarRef.current.style.setProperty("width", `calc(100% - ${newWith}px)`);
        }
    }

    const handleMouseUp = (event: MouseEvent) => {
        isResizingRef.current = false;
        document.removeEventListener("mousemove", handleMouseMove)
        document.removeEventListener("mouseup", handleMouseUp)
    }

    const handleMouseDown = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        event.preventDefault();
        event.stopPropagation();

        isResizingRef.current = true;
        document.addEventListener("mousemove", handleMouseMove)
        document.addEventListener("mouseup", handleMouseUp)
    }

    const resetWith = () => {
        if (sidebarRef.current && navbarRef.current) {
            setIsCollapsed(false);
            setIsResetting(true);

            sidebarRef.current.style.minWidth = isMobile ? "100%" : "240px";
            navbarRef.current.style.setProperty("width", isMobile ? "0" : "calc(100% - 240px)");
            navbarRef.current.style.setProperty("left", isMobile ? "100%" : "240px");

            setTimeout(() => setIsResetting(false), 300);
        }
    }

    const collapse = () => {
        if (sidebarRef.current && navbarRef.current) {
            setIsCollapsed(true);
            setIsResetting(true);

            sidebarRef.current.style.minWidth = "0";
            sidebarRef.current.style.maxWidth = "0";
            navbarRef.current.style.setProperty("width", "100%");
            navbarRef.current.style.setProperty("left", "0");

            setTimeout(() => setIsResetting(false), 300);
        }
    }

    const handleCreate = () => {
        const promise = create({title: "Undefined"})
            .then((documentId) => { router.push(`/documents/${documentId}`) });

        toast.promise(promise, {
            loading: "Creating a new note...",
            success: "New note created!",
            error: "Failed to create a new note."
        });
    }

    return (
        <>
            <aside
                ref={sidebarRef}
                className={cn(
                    "group/sidebar h-full bg-secondary overflow-y-auto relative flex w-60 flex-col z-[100]",
                    isResetting && "transition-all ease-in-out duration-300",
                    // isMobile && "min-w-full"
                )}
            >
                <div
                    onClick={collapse}
                    role="button"
                    className={cn(
                        "h-6 w-6 text-muted-foreground rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600 absolute top-2 right-2 opacity-0 group-hover/sidebar:opacity-100 transition",
                        isMobile && "opacity-100"
                    )}
                >
                    <ChevronsLeft className="h-6 w-6"/>
                </div>
                <div>
                    <UserItem/>
                    <Item
                        label="Search"
                        icon={SearchIcon}
                        isSearch
                        onClick={() => {
                        }}
                    />
                    <Item
                        label="Home"
                        icon={HomeIcon}
                        onClick={onRedirectHome}
                    />
                    <Item
                        label="Settigns"
                        icon={SettingsIcon}
                        onClick={() => {
                        }}
                    />
                    <Item
                        onClick={handleCreate}
                        label="New page"
                        icon={PlusCircleIcon}
                    />
                </div>
                <span className="text-sm pt-4 pl-4 text-muted-foreground">Private</span>
                <div className="mt-4">
                    <DocumentList/>
                </div>
                {!isMobile && (
                    <div
                        onMouseDown={handleMouseDown}
                        onClick={resetWith}
                        className="opacity-0 group-hover/sidebar:opacity-100 transition cursor-ew-resize absolute h-full w-1
                        bg-primary/10 right-0 top-0"
                    />
                )}
            </aside>
            <div
                ref={navbarRef}
                className={cn(
                    "absolute top-0 z-[99999]",
                    isResetting && "transition-all ease-in-out duration-300",
                    isMobile && "left-0 w-full",
                    !isMobile && "left-60 w-[calc(100%-240px)]"
                )}
            >
                {!!params.documentId ? (
                    <Navbar
                        isCollapsed={isCollapsed}
                        onResetWidth={resetWith}
                    />
                ) : (
                    <nav className="bg-transparent px-3 py-2 w-full">
                        {isCollapsed &&
                            <MenuIcon onClick={resetWith} role="button" className="h-6 w-6 text-muted-foreground"/>}
                    </nav>
                )}

            </div>
        </>
    );
}
