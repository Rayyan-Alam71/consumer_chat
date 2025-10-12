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
    const [botData, setBotData] = useState<BotInterface | undefined>({
    id: 'cmgmnemyj0001tafoepxxbgzm',
    userId: 'cmgcmq1cx0000ta4o4ur4tg3v',
    name: 'token testing',
    namespace: 'delete_it_too.txt-rayyan_alam-738d9943-6228-4487-bbf6-0aae4cd52a23',
    filekey: 'delete_it_too.txt-userid-929278d8-2798-4273-b2d6-ad885ffbaedb',
    filename: 'delete_it_too.txt',
    fileSource: 'to-be-checked',
    description: 'this is to test whether it is getting back the widget token',
    widget_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lc3BhY2UiOiJkZWxldGVfaXRfdG9vLnR4dC1yYXl5YW5fYWxhbS03MzhkOTk0My02MjI4LTQ0ODctYmJmNi0wYWFlNGNkNTJhMjMiLCJ1c2VyaWQiOiJjbWdjbXExY3gwMDAwdGE0bzR1cjR0ZzN2IiwiaWF0IjoxNzYwMjA5Njk3fQ.nEiRA9_0PoM08FgWKRUTqE4rrWmCpkY33riiHuvDfUc',
    createdAt: new Date('2025-10-11T19:08:17.456Z')
  })
    const [loading, setLoading] = useState<boolean>(true)
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
        // fetchBotDetail()
    },[])
    if(!params.botId) return
    return (
        <div className='w-screen h-screen conatiner mx-auto'>
            <div className='px-4 py-6'>
                <DashboardHeader/>
                {/* {loading && <BotDetailSkeleton/>} */}
                {botData && (
                    <div className='h-full '><DisplayBot botData={botData} /></div>
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
  const scriptCode = `<script src="http://192.168.1.12:3000/embed-loader.js" data-widget-token="${botData.widget_token}" defer></script>`
  

  async function handleDelete(data : BotInterface){
    const res = await deleteBot(data)
    router.push('/dashboard')
  }
  return (
    <div className='bg-white rounded-3xl shadow-2xl border-2 border-gray-200 overflow-hidden'>
      {/* Header with bot info */}
      <div className='bg-gradient-to-r from-blue-600 to-purple-600 px-10 py-12'>
        <div className='flex items-center gap-4 mb-4'>
          <div className='w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-lg'>
            <MessageSquare className='w-8 h-8 text-blue-600'/>
          </div>
          <div>
            <h2 className='text-2xl font-bold text-white mb-2'>
              {flipToCapital(botData.name)}
            </h2>
            <p className='text-blue-100 text-sm'>
              Created on {new Date(botData.createdAt).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>
        </div>
        <p className='text-md text-white leading-relaxed max-w-3xl'>
          {flipToCapital(botData.description)}
        </p>
      </div>

      {/* Main content */}
      <div className='px-10 py-10 space-y-8'>
        {/* Training source section */}
        <div>
          <h3 className='text-sm font-bold text-gray-600 uppercase tracking-wide mb-4'>
            📚 Training Data Source
          </h3>
          <div className='bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 border-2 border-blue-200'>
            <div className='flex items-center gap-4'>
              <div className='w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center'>
                <FileText className='w-6 h-6 text-blue-600'/>
              </div>
              <div>
                <p className='text-sm text-gray-600 font-medium'>File Name</p>
                <p className='font-semibold text-gray-900 text-lg'>{botData.filename}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Embed code section */}
        <div>
          <div className='flex items-center gap-3 mb-4'>
            <div className='w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center'>
              <Code className='w-5 h-5 text-purple-600'/>
            </div>
            <div>
              <h3 className='text-xl font-bold text-gray-900'>
                Embed Code
              </h3>
              <p className='text-sm text-gray-600'>
                Copy and paste this into your website's HTML
              </p>
            </div>
          </div>
          <CodeBlock code={scriptCode} language='html'/>
        </div>

        {/* Action buttons */}
        <div className='pt-6 border-t-2 border-gray-200'>
          <div className='flex flex-col sm:flex-row gap-4'>
            <Button 
              onClick={()=>router.push('/chat?widget_token='+botData.widget_token)}
              className='flex-1 h-14 text-base bg-blue-600 hover:bg-blue-700 rounded-full shadow-lg shadow-blue-500/30 font-semibold text-white flex items-center justify-center gap-2'
            >
              <MessageSquare className='w-5 h-5'/>
              Open Chat Playground
            </Button>

            <Button 
              onClick={()=>handleDelete(botData)}
              className='flex-1 h-14 text-base bg-white border-2 border-red-300 text-red-600 hover:bg-red-50 hover:border-red-400 rounded-full font-semibold flex items-center justify-center gap-2'
            >
              <Trash2 className='w-5 h-5'/>
              Delete Bot
            </Button>
          </div>
        </div>

        {/* Bot metadata footer */}
        <div className='bg-gray-50 rounded-2xl p-6 border-2 border-gray-200'>
          <p className='text-xs text-gray-500 uppercase tracking-wide font-semibold mb-3'>Bot Information</p>
          <div className='space-y-2 text-sm'>
            <div className='flex justify-between'>
              <span className='text-gray-600'>Bot ID:</span>
              <span className='font-mono text-gray-900 text-xs'>{botData.id}</span>
            </div>
            <div className='flex justify-between'>
              <span className='text-gray-600'>User ID:</span>
              <span className='font-mono text-gray-900 text-xs'>{botData.userId}</span>
            </div>
            <div className='flex justify-between'>
              <span className='text-gray-600'>Namespace:</span>
              <span className='font-mono text-gray-900 text-xs truncate max-w-xs'>{botData.namespace}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}