

'use client'
import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { useSearchParams } from 'next/navigation'

export default function ClientChat({searchParams} : any) {

  const token = searchParams.get("widget_token")
  const chatContainerRef = useRef<HTMLDivElement>(null)
    const [ messages, setMessages ] = useState<{role : string, content :string}[]>([{
        role : "ai",
        content : "How can i help you?"
    }])
    const [ input , setInput] = useState("")
    const [loading, setLoading] = useState(false)

    async function handleSend(){
      setLoading(true)
      try {
        setMessages((prev) => [...prev, {role : "user", content: input}])
        setInput("")
  
        const res = await axios.post("/api/rag", {
            user_query : input,
            // pass the widget token from here, and then decode them in the be to get the namespace
            widget_token : token
        })
        // @ts-ignore
        setMessages((prev) => [...prev, {role : "ai", content : res.data?.data[0].ai_res.ai_res }])
        setLoading(false)
      } catch (error) {
        setMessages((prev)=>[...prev, {role : "ai", content : "sorry i could not recieve your query"}])
        setLoading(false)
      }
    }

    useEffect(()=>{
      if(chatContainerRef.current){
        chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
      }
    }, [messages])
  return (
    <div className="flex flex-col h-screen w-full max-w-md mx-auto border rounded-lg shadow-lg">
      {/* Chat history */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50" ref={chatContainerRef}>
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`p-2 rounded-lg max-w-[80%] ${
              msg.role === "user"
                ? "bg-blue-500 text-white self-end ml-auto"
                : "bg-gray-200 text-black self-start mr-auto"
            }`}
          >
            {msg.content}
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="p-3 flex border-t gap-2 bg-white">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Ask me anything..."
          className="flex-1 border rounded-lg px-3 py-2 focus:outline-none"
        />
        <button
          onClick={handleSend}
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg disabled:opacity-50"
        >
          {loading ? "..." : "Send"}
        </button>
      </div>
    </div>
  )
}

