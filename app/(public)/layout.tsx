"use client";

import React from "react";

const MainLayout = ({children}: { children: React.ReactNode }) => {
    return (
        <div className="h-full dark:bg-[#1F1F1F]">
            {children}
        </div>
    );

}

export default MainLayout;