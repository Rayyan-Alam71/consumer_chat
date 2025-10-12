'use client'
import { useEffect, useState } from 'react'
import { ArrowLeft, Calendar, CirclePlus, FileText, Home, Inbox, LogOutIcon, MessageSquare, Plus, PlusCircle, Search, Settings, Trash2, Menu } from "lucide-react"
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
import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { flipToCapital } from './[botId]/page'

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
    website : string | null
}

const page = () => {
  const [bots, setBots] = useState<BotInterface[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const session = useSession()
  
  useEffect(()=>{
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
    <div className='w-full min-h-screen'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6'>
        {/* title bar */}
        <DashboardHeader isDashboard = {true}/>

        {/* my bots section */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6'>
          {loading && [...Array(12)].map((_, i)=>(
            <BotDetailSkeleton key={i}/>
          ))}
          {bots && bots.map((bot, i) => (
            <BotDetailComponent key = {i} botDetail = {bot}/>
          ))}
        </div>
      </div>
    </div>
  )
}

export function DashboardHeader({isDashboard} : {isDashboard : boolean}){
  return (
    <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center md:gap-4 gap-6 mb-6 sm:mb-8'>
      <div className='flex-1'>
        <h1 className='text-2xl sm:text-3xl lg:text-4xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-bold'>
          My Bots
        </h1>
        <p className='text-sm sm:text-base lg:text-lg bg-gradient-to-r from-black to-blue-600 text-transparent bg-clip-text'>
          Manage your AI Chatbots
        </p>
      </div>
      <div className='w-full sm:w-auto'>
        {!isDashboard && (
          <Button asChild className='bg-blue-600 text-white px-3 py-2 w-full sm:w-auto'>
            <Link href="/dashboard" className='flex items-center justify-center gap-2'>
              <ArrowLeft className='w-4 h-4'/>
              <span>Go Back</span>
            </Link>
          </Button>
        )}
        {isDashboard && (
          <Button asChild className='bg-blue-600 text-white px-3 py-2 w-full sm:w-auto'>
            <Link href="/create-bot" className='flex items-center justify-center gap-2'>
              <PlusCircle className='w-4 h-4'/>
              <span>Create Bot</span>
            </Link>
          </Button>
        )}
      </div>
    </div>
  )
}

function BotDetailComponent({botDetail}: {botDetail: BotInterface}) {
  const router = useRouter()
  const handleDelete = async () => {
    console.log('Deleting bot:', botDetail.id)
    await deleteBot(botDetail)
    router.refresh()
  }

  return (
    <div className='flex flex-col gap-2'>
      <div className='bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 border-2 border-gray-200 hover:border-blue-400 hover:shadow-xl transition-all duration-300 flex flex-col h-full'>
        {/* Bot Icon */}
        <div className='w-12 h-12 sm:w-14 sm:h-14 bg-blue-100 rounded-lg sm:rounded-xl flex items-center justify-center mb-3 sm:mb-4 hover:bg-blue-200 transition-colors duration-300'>
          <MessageSquare className='w-6 h-6 sm:w-7 sm:h-7 text-blue-600'/>
        </div>

        {/* Bot Details */}
        <div className='flex-grow mb-4 sm:mb-6'>
          <h2 className='text-xl sm:text-2xl font-bold mb-2 sm:mb-3 text-gray-900 line-clamp-2'>
            {flipToCapital(botDetail.name)}
          </h2>
          <p className='text-blue-600 text-xs sm:text-sm mb-2'>
            Created on {new Date(botDetail.createdAt).toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'short', 
              day: 'numeric' 
            })}
          </p>
          <p className='text-gray-700 text-sm sm:text-base leading-relaxed mb-3 sm:mb-4 line-clamp-3'>
            {flipToCapital(botDetail.description)}
          </p>
          
          {/* File Info */}
          <div className='flex items-center gap-2 text-xs sm:text-sm text-gray-500 bg-gray-50 px-2 sm:px-3 py-2 rounded-lg'>
            <FileText className='w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0'/>
            <span className='truncate'>{botDetail.filename}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className='flex flex-col sm:flex-row justify-between items-stretch gap-2 sm:gap-3'>
          <a
            href={'/chat?widget_token=' + botDetail.widget_token}
            className='flex-1 px-3 sm:px-4 py-2 sm:py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg sm:rounded-xl font-semibold text-center shadow-md hover:shadow-lg transition-all duration-300 text-xs sm:text-sm'
          >
            Chat Playground
          </a>
          <button
            onClick={()=>router.push('/dashboard/'+botDetail.id)}
            className='flex-1 px-3 sm:px-4 py-2 sm:py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg sm:rounded-xl font-semibold text-center shadow-md hover:shadow-lg transition-all duration-300 text-xs sm:text-sm'
          >
            See details
          </button>
        </div>
      </div>
    </div>
  )
}

export function BotDetailSkeleton() {
  return (
    <div className="flex flex-col gap-2 animate-pulse">
      <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 border-2 border-gray-200 flex flex-col h-full">
        
        {/* Bot Icon Placeholder */}
        <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gray-200 rounded-lg sm:rounded-xl mb-3 sm:mb-4" />

        {/* Bot Details */}
        <div className="flex-grow mb-4 sm:mb-6">
          <div className="h-5 sm:h-6 bg-gray-200 rounded w-3/4 mb-2 sm:mb-3" />
          <div className="h-3 sm:h-4 bg-gray-200 rounded w-1/2 mb-2" />
          <div className="h-3 sm:h-4 bg-gray-200 rounded w-full mb-2" />
          <div className="h-3 sm:h-4 bg-gray-200 rounded w-5/6 mb-3 sm:mb-4" />
          
          {/* File Info */}
          <div className="flex items-center gap-2 bg-gray-100 px-2 sm:px-3 py-2 rounded-lg">
            <div className="w-3 h-3 sm:w-4 sm:h-4 bg-gray-300 rounded" />
            <div className="h-3 w-1/2 bg-gray-300 rounded" />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-between items-stretch gap-2 sm:gap-3">
          <div className="flex-1 h-9 sm:h-10 bg-gray-200 rounded-lg sm:rounded-xl" />
          <div className="flex-1 h-9 sm:h-10 bg-gray-200 rounded-lg sm:rounded-xl" />
        </div>
      </div>
    </div>
  )
}

// Menu items.
const items = [
  {
    title: "Home",
    url: "/",
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
  const router = useRouter()
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className='mb-4 md:text-2xl sm:text-xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mx-auto cursor-pointer px-2' onClick={()=>router.push("/")}>
            BotForge
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item, i) => (
                <div className='py-1.5 sm:py-2 text-base sm:text-lg px-2 sm:px-3' key={i}>
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <a href={item.url} className='flex items-center gap-2'>
                        <item.icon className='w-4 h-4'/>
                        <span className='text-sm sm:text-base lg:text-lg'>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </div>
              ))}

              <div className='mt-3 px-4 sm:px-6 lg:px-8'>
                <Button onClick={()=>signOut()} className='w-full text-sm md:text-md bg-blue-700 text-white'>
                  Sign Out <LogOutIcon className='ml-2 w-4 h-4'/>
                </Button>
              </div>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}

export default page