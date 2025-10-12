'use client'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { BotDetailSkeleton, BotInterface, DashboardHeader } from '../page'
import { deleteBot, fetchDetail } from '../actions'
import {Button} from '@/components/ui/button'
import { Code, FileText, MessageSquare, Trash2 } from 'lucide-react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import Link from 'next/link'
import { CodeBlock } from '@/components/CodeBlock'

const page = () => {
    const params = useParams<{botId : string}>()
    const [botData, setBotData] = useState<BotInterface | undefined>()
    const [loading, setLoading] = useState<boolean>(false)
    useEffect(()=>{
        const fetchBotDetail = async () => {
            try {
                setLoading(true)
                const detail = await fetchDetail(params.botId)
                if(detail){
                    setBotData(detail)
                }
            } catch (error) {
                console.error(error)
            }finally{
                setLoading(false)
            }
        }
        fetchBotDetail()
    },[])
    if(!params.botId) return
    return (
        <div className='w-full min-h-screen'>
            <div className='container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6'>
                <DashboardHeader isDashboard={false}/>
                {loading && <DisplayBotSkeleton/>}
                {botData && (
                    <div className='h-full'><DisplayBot botData={botData} /></div>
                )}
            </div>
        </div>
    )
}

export default page

export function flipToCapital(text : string){
    if(text ==="") return ""
    const flippedText = text.charAt(0).toUpperCase() + text.slice(1)
    return flippedText
}

function DisplayBot({ botData }: { botData: BotInterface }) {
    const router = useRouter()
    const [loading, setLoading] = useState<boolean>(false)
  const scriptCode = `<script src="http://192.168.1.12:3000/embed-loader.js" data-widget-token="${botData.widget_token}" defer></script>`
  

  async function handleDelete(data : BotInterface){
    try {
        setLoading(true)
        const res = await deleteBot(data)
        setLoading(false)
        router.push('/dashboard')
    } catch (error) {
      console.error(error)
      setLoading(false)
    }
  }
  return (
    <div className='bg-white rounded-lg md:rounded-2xl lg:rounded-3xl shadow-xl md:shadow-2xl border border-gray-200 md:border-2 overflow-hidden'>
      {/* Header with bot info */}
      <div className='bg-gradient-to-r from-blue-600 to-purple-600 px-4 sm:px-6 md:px-8 lg:px-10 py-4 sm:py-5 md:py-6 lg:py-8'>
        <div className='flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4'>
          <div className='w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-white rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg'>
            <MessageSquare className='w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-blue-600'/>
          </div>
          <div className='flex-1 min-w-0'>
            <h2 className='text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold text-white mb-1 sm:mb-2 truncate'>
              {flipToCapital(botData.name)}
            </h2>
            <p className='text-blue-100 text-xs sm:text-sm'>
              Created on {new Date(botData.createdAt).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: window.innerWidth < 640 ? 'short' : 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>
        </div>
        <p className='text-sm sm:text-base md:text-lg text-white leading-relaxed max-w-3xl'>
          {flipToCapital(botData.description)}
        </p>
      </div>

      {/* Main content */}
      <div className='px-4 sm:px-6 md:px-8 lg:px-10 py-6 sm:py-8 md:py-10 space-y-6 sm:space-y-7 md:space-y-8'>
        {/* Training source section */}
        <div>
          <h3 className='text-xs sm:text-sm font-bold text-gray-600 uppercase tracking-wide mb-3 sm:mb-4'>
            📚 Training Data Source
          </h3>
          <div className='bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 border border-blue-200 md:border-2'>
            <div className='flex items-center gap-3 sm:gap-4'>
              <div className='w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0'>
                <FileText className='w-5 h-5 sm:w-6 sm:h-6 text-blue-600'/>
              </div>
              <div className='flex-1 min-w-0'>
                <p className='text-xs sm:text-sm text-gray-600 font-medium mb-1'>File Name</p>
                <p className='font-semibold text-gray-900 text-sm sm:text-base md:text-lg truncate'>{botData.filename}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Embed code section */}
        <div>
          <div className='flex items-start sm:items-center gap-2 sm:gap-3 mb-3 sm:mb-4'>
            <div className='w-8 h-8 sm:w-10 sm:h-10 bg-purple-100 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0'>
              <Code className='w-4 h-4 sm:w-5 sm:h-5 text-purple-600'/>
            </div>
            <div className='flex-1 min-w-0'>
              <h3 className='text-base sm:text-lg md:text-xl font-bold text-gray-900'>
                Embed Code
              </h3>
              <p className='text-xs sm:text-sm text-gray-600'>
                Copy and paste this into your website's HTML
              </p>
            </div>
          </div>
          <CodeBlock code={scriptCode} language='html'/>
        </div>

        {/* Action buttons */}
        <div className='pt-4 sm:pt-5 md:pt-6 border-t border-gray-200 md:border-t-2'>
          <div className='flex flex-col sm:flex-row gap-3 sm:gap-4'>
            <Button 
              onClick={()=>router.push('/chat?widget_token='+botData.widget_token)}
              className='flex-1 h-12 sm:h-13 md:h-14 text-sm sm:text-base bg-blue-600 hover:bg-blue-700 rounded-full shadow-md sm:shadow-lg shadow-blue-500/30 font-semibold text-white flex items-center justify-center gap-2'
            >
              <MessageSquare className='w-4 h-4 sm:w-5 sm:h-5'/>
              <span className='truncate'>Open Chat Playground</span>
            </Button>

            <Button 
              onClick={()=>handleDelete(botData)}
              className='flex-1 h-12 sm:h-13 md:h-14 text-sm sm:text-base bg-white border border-red-300 md:border-2 text-red-600 hover:bg-red-50 hover:border-red-400 rounded-full font-semibold flex items-center justify-center gap-2'
            >
              <Trash2 className='w-4 h-4 sm:w-5 sm:h-5'/>
              {!loading ? <>Delete Bot</> : <>Deleting...</>}
            </Button>
          </div>
        </div>

        {/* Bot metadata footer */}
        <div className='bg-gray-50 rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 border border-gray-200 md:border-2'>
          <p className='text-xs text-gray-500 uppercase tracking-wide font-semibold mb-2 sm:mb-3'>Bot Information</p>
          <div className='space-y-2 text-xs sm:text-sm'>
            <div className='flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-2 sm:items-center'>
              <span className='text-gray-600 font-medium'>Deployed On:</span>
              <span className='font-mono text-gray-900 text-xs break-all sm:break-normal'>{botData.website!}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function DisplayBotSkeleton() {
  return (
    <div className='bg-white rounded-lg md:rounded-2xl lg:rounded-3xl shadow-xl md:shadow-2xl border border-gray-200 md:border-2 overflow-hidden animate-pulse'>
      {/* Header skeleton */}
      <div className='bg-gradient-to-r from-gray-300 to-gray-400 px-4 sm:px-6 md:px-8 lg:px-10 py-4 sm:py-6 md:py-8 lg:py-10'>
        <div className='flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4'>
          <div className='w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gray-200 rounded-xl sm:rounded-2xl flex-shrink-0' />
          <div className='flex-1 min-w-0'>
            <div className='h-5 sm:h-6 md:h-7 lg:h-8 bg-gray-200 rounded-lg w-40 sm:w-48 md:w-64 mb-1 sm:mb-2' />
            <div className='h-3 sm:h-4 bg-gray-200 rounded w-28 sm:w-32 md:w-40' />
          </div>
        </div>
        <div className='space-y-2'>
          <div className='h-3 sm:h-4 bg-gray-200 rounded w-full max-w-3xl' />
          <div className='h-3 sm:h-4 bg-gray-200 rounded w-4/5 sm:w-3/4 max-w-2xl' />
        </div>
      </div>

      {/* Main content skeleton */}
      <div className='px-4 sm:px-6 md:px-8 lg:px-10 py-6 sm:py-8 md:py-10 space-y-6 sm:space-y-7 md:space-y-8'>
        {/* Training source section skeleton */}
        <div>
          <div className='h-3 sm:h-4 bg-gray-200 rounded w-32 sm:w-40 mb-3 sm:mb-4' />
          <div className='bg-gradient-to-r from-gray-100 to-gray-50 rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 border border-gray-200 md:border-2'>
            <div className='flex items-center gap-3 sm:gap-4'>
              <div className='w-10 h-10 sm:w-12 sm:h-12 bg-gray-200 rounded-lg sm:rounded-xl flex-shrink-0' />
              <div className='flex-1 min-w-0'>
                <div className='h-3 bg-gray-200 rounded w-16 sm:w-20 mb-2' />
                <div className='h-4 sm:h-5 bg-gray-200 rounded w-40 sm:w-48 md:w-64' />
              </div>
            </div>
          </div>
        </div>

        {/* Embed code section skeleton */}
        <div>
          <div className='flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4'>
            <div className='w-8 h-8 sm:w-10 sm:h-10 bg-gray-200 rounded-lg sm:rounded-xl flex-shrink-0' />
            <div className='flex-1 min-w-0'>
              <div className='h-4 sm:h-5 md:h-6 bg-gray-200 rounded w-24 sm:w-32 mb-2' />
              <div className='h-3 bg-gray-200 rounded w-36 sm:w-48 md:w-64' />
            </div>
          </div>
          {/* Code block skeleton */}
          <div className='bg-gray-900 rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 border border-gray-700 md:border-2'>
            <div className='space-y-2'>
              <div className='h-3 sm:h-4 bg-gray-700 rounded w-full' />
              <div className='h-3 sm:h-4 bg-gray-700 rounded w-5/6' />
              <div className='h-3 sm:h-4 bg-gray-700 rounded w-4/6' />
            </div>
          </div>
        </div>

        {/* Action buttons skeleton */}
        <div className='pt-4 sm:pt-5 md:pt-6 border-t border-gray-200 md:border-t-2'>
          <div className='flex flex-col sm:flex-row gap-3 sm:gap-4'>
            <div className='flex-1 h-12 sm:h-13 md:h-14 bg-gray-200 rounded-full' />
            <div className='flex-1 h-12 sm:h-13 md:h-14 bg-gray-200 rounded-full' />
          </div>
        </div>

        {/* Bot metadata footer skeleton */}
        <div className='bg-gray-50 rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 border border-gray-200 md:border-2'>
          <div className='h-3 bg-gray-200 rounded w-28 sm:w-32 mb-2 sm:mb-3' />
          <div className='space-y-2'>
            <div className='flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-2'>
              <div className='h-3 sm:h-4 bg-gray-200 rounded w-20 sm:w-24' />
              <div className='h-3 sm:h-4 bg-gray-200 rounded w-36 sm:w-48 md:w-64' />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}