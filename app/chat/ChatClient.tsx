'use client'
import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { useSearchParams } from 'next/navigation'

export default function ChatClient() {
  const searchParams = useSearchParams()

  const token = searchParams.get("widget_token")
  const chatContainerRef = useRef<HTMLDivElement>(null)
  const [messages, setMessages] = useState<{role: string, content: string}[]>([{
    role: "ai",
    content: "How can i help you?"
  }])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSend(){
    if (!input.trim() || loading) return
    
    setLoading(true)
    const userMessage = input
    try {
      setMessages((prev) => [...prev, {role: "user", content: userMessage}])
      setInput("")

      const res = await axios.post("/api/rag", {
        user_query: userMessage,
        widget_token: token
      })
      // @ts-ignore
      setMessages((prev) => [...prev, {role: "ai", content: res.data?.data[0].ai_res.ai_res}])
    } catch (error) {
      setMessages((prev) => [...prev, {role: "ai", content: "sorry i could not receive your query"}])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
  }, [messages, loading])

  return (
    <div className="flex flex-col h-screen w-full max-w-md mx-auto border rounded-lg shadow-lg">
      <h1 className='border-b-1 border-black bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text px-3 py-2 md:text-lg text-md mx-auto font-bold'>
        Built Using RagWebsite
      </h1>
      
      {/* Chat history */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50 text-sm md:text-lg" ref={chatContainerRef}>
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
        
        {/* Loading indicator */}
        {loading && (
          <div className="bg-gray-200 text-black self-start mr-auto p-2 rounded-lg max-w-[80%]">
            <div className="flex space-x-2">
              <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{animationDelay: '0ms'}}></div>
              <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{animationDelay: '150ms'}}></div>
              <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{animationDelay: '300ms'}}></div>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-3 flex border-t gap-2 bg-white">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
          placeholder="Ask me anything..."
          disabled={loading}
          className="flex-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
        />
        <button
          onClick={handleSend}
          disabled={loading || !input.trim()}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors"
        >
          {loading ? "..." : "Send"}
        </button>
      </div>
    </div>
  )
}