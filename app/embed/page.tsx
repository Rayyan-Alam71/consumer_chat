"use client";
import { useState } from "react";

export default function EmbedPage() {
  const params = new URLSearchParams(typeof window !== "undefined" ? window.location.search : "");
  const token = params.get("token") || "";

  const [messages, setMessages] = useState<{from:string,text:string}[]>([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input) return;
    setMessages([...messages, { from: "user", text: input }]);
    const resp = await fetch("/api/rag", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({ question: input })
    });
    const data = await resp.json();
    setMessages(msgs => [...msgs, { from: "bot", text: data.answer }]);
    setInput("");
  };

  return (
    <div style={{ padding: 10 }}>
      <div style={{ height: 400, overflowY: "auto", border: "1px solid #ccc", marginBottom: 10 }}>
        {messages.map((m,i)=><div key={i}><b>{m.from}:</b> {m.text}</div>)}
      </div>
      <input style={{ width: "80%" }} value={input} onChange={e=>setInput(e.target.value)} />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}
