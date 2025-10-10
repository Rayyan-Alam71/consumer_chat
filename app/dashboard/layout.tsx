import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import React from "react";
import { AppSidebar } from "./page";

export default function Layout({children} : {children : React.ReactNode}){
    return(
        <SidebarProvider>
            <AppSidebar/>
            <SidebarTrigger/>
            {children}
        </SidebarProvider>
    )
}