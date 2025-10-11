'use client'
import React, { useEffect, useState } from 'react'

export interface BotInterface {
    id: string;
    userId: string;
    name: string;
    namespace: string | null;
    filekey: string;
    filename: string;
    fileSource: string | null;
    description: string;
    widget_token: string | null;
    createdAt: Date;
}

const page = () => {
  const [bots, setBots] = useState<BotInterface[]>([])
  const [loading, setLoading ] = useState<boolean>(false)
  const session = useSession()
  useEffect(()=>{
    // fetch all the bots 
    const getAllBots = async () =>{
      console.log('got here')
      try {
        setLoading(true)
        const userBots = await fetchBots()
        if(userBots.length != 0){
          setBots(userBots)
        }
      } catch (error) {
        console.error(error)
        return
      }finally{
        setLoading(false)
      }
      
    }
    getAllBots()
  },[])
  console.log(bots)
  console.log(session.data?.user)
  return (
    <div className='w-screen h-screen container mx-auto'>
      <div className='px-4 py-6 '>
        {/* title bar */}
        <DashboardHeader/>

        {/* my bots section */}
        <div className='grid grid-cols-3'>
          {bots && bots.map((bot, i) => (
            <BotDetailComponent key = {i} botDetail = {bot}/>
          ))}
        </div>
      </div>
    </div>
  )
}

export function DashboardHeader(){
  return (
    <div className='flex justify-between px-4 mb-6 '>
          <div>
            <h1 className='text-3xl text-black font-bold'>My Bots</h1>
            <p>Manage your AI Chatbots</p>
          </div>
          <div>
            <Button asChild><Link href="/create-bot" className='flex items-center'><CirclePlus/>Create New Bot</Link></Button>
          </div>
    </div>
  )
}

function BotDetailComponent({botDetail}: {botDetail: BotInterface}) {
  const router = useRouter()
  const handleDelete = () => {
    // deleteBot function would be called here
    console.log('Deleting bot:', botDetail.id)
  }

  return (
    <div className='px-4 py-2 flex flex-col gap-2' onClick={()=>router.push('/dashboard/'+botDetail.id)}>
      <div className='bg-white rounded-2xl p-6 border-2 border-gray-200 hover:border-blue-400 hover:shadow-xl transition-all duration-300 flex flex-col h-full'>
        {/* Bot Icon */}
        <div className='w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-4 hover:bg-blue-200 transition-colors duration-300'>
          <MessageSquare className='w-7 h-7 text-blue-600'/>
        </div>

        {/* Bot Details */}
        <div className='flex-grow mb-6'>
          <h2 className='text-2xl font-bold mb-3 text-gray-900'>
            {botDetail.name}
          </h2>
          <p className='text-gray-600 leading-relaxed mb-4'>
            {botDetail.description}
          </p>
          
          {/* File Info */}
          <div className='flex items-center gap-2 text-sm text-gray-500 bg-gray-50 px-3 py-2 rounded-lg'>
            <FileText className='w-4 h-4'/>
            <span className='truncate'>{botDetail.filename}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className='flex justify-between items-center gap-3'>
          <a
            href={'/chat?widget_token=' + botDetail.widget_token}
            className='flex-1 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold text-center shadow-md hover:shadow-lg transition-all duration-300 text-sm'
          >
            Chat Playground
          </a>
          <button
            onClick={handleDelete}
            className='px-4 py-3 bg-red-50 hover:bg-red-100 rounded-xl transition-all duration-300 border-2 border-red-200 hover:border-red-300'
          >
            <Trash2 className='w-5 h-5 text-red-600'/>
          </button>
        </div>
      </div>
    </div>
  )
}


export default page

import { Calendar, CirclePlus, FileText, Home, Inbox, LogOutIcon, MessageSquare, Search, Settings, Trash2 } from "lucide-react"

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
import { deleteBot, fetchBots } from './actions'
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

// Menu items.
const items = [
  {
    title: "Home",
    url: "#",
    icon: Home,
  },
  {
    title: "My Bots",
    url: "dashboard",
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
      
                
              {items.map((item, i) => (
                <div className='py-2 text-xl px-3' key={i}>
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

              <div className='mt-3 px-8'>
                <Button onClick={()=>signOut()}>Sign Out <LogOutIcon/></Button>
              </div>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}