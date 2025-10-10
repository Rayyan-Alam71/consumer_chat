'use client'
import React, { useEffect, useState } from 'react'

const page = () => {
  const [bots, setBots] = useState([])

  useEffect(()=>{
    // fetch all the bots 
  },[])
  return (
    <div className='w-screen h-screen container mx-auto'>
      <div className='px-4 py-6'>
        {/* title bar */}
        <div className='flex justify-between px-4'>
          <div>
            <h1 className='text-3xl text-black font-bold'>My Bots</h1>
            <p>Manage your AI Chatbots</p>
          </div>
          <div>
            <Button asChild><Link href="/create-bot" className='flex items-center'><CirclePlus/>Create New Bot</Link></Button>
          </div>
        </div>

        {/* my bots section */}
        <div>
          
        </div>
      </div>
    </div>
  )
}

export default page

import { Calendar, CirclePlus, Home, Inbox, Search, Settings } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Button } from '@/components/ui/button'
import Link from 'next/link'

// Menu items.
const items = [
  {
    title: "Home",
    url: "#",
    icon: Home,
  },
  {
    title: "My Bots",
    url: "my-bots",
    icon: Inbox,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
]

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className='mb-4 text-xl text-gray-700'>RAG Chatbot</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <div className='py-2 text-xl'>
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <a href={item.url}>
                        <item.icon className='w-4 h-4'/>
                        <span className='text-lg'>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  </div>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}