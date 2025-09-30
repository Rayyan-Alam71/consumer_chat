'use client'
import Image from "next/image";
import { handleUpload } from "./actions";
import { useState } from "react";

export default function Home() {

  const [fileData, setFileData] = useState("")

  async function handleUploadAPI(formData : FormData){
    console.log(formData)
    const res = await fetch('/api/upload', {
      method : "POST",
      body : formData
    })

    const data = await res.json()
    
    console.log(data)
    setFileData(data.data[0]?.pdf_data)

  }
  return (
    <div className="min-h-screen min-w-screen px-4">
      <h1 className="w-full py-4 text-center"> Upload PDFs</h1>

      <form action={handleUploadAPI}>
        <input type="file" name="file" />
        <button type="submit"> Upload </button>
      </form>

      {fileData != "" ? (
        <div>{fileData}</div>
      ): (
        <div>Not data gotten</div>
      )}

    </div>

  );
}
