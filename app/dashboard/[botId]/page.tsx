'use client'
import { useParams, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { BotInterface, DashboardHeader } from '../page'
import { fetchDetail } from '../actions'

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
    },[])
    if(!params.botId) return
    return (
        <div className='w-screen h-screen conatiner mx-auto'>
            <div className='px-4 py-6'>
            <DashboardHeader/>

            </div>
        </div>
    )
}

export default page
