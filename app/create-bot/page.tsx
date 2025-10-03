'use client'
import {  useRouter } from 'next/navigation'
import React, { ChangeEvent, useState } from 'react'

const page = () => {
  const router = useRouter()
  const [file, setFile] = useState<File | undefined | null>(null)

  function handleFileUpload(e : ChangeEvent<HTMLInputElement>){
    e.preventDefault()
    const fileUploaded : File | undefined | null = e.target.files?.[0]
    setFile(fileUploaded)
    return
  }

  async function handelSubmit(e : any){
    e.preventDefault()
    if(!file || file.type !== "application/pdf"){
      alert("Invalid file selected")
      setFile(null)
      return
    }
    console.log("File Selected")
    // console.log(file);
    
    // create a new FIleReader and read the data
    const reader = new FileReader()

    reader.onload = async (event) => {
      const fileData = event.target?.result
      if(!fileData) return
      // console.log(fileData)
      console.log("file uploaded successfuly")
    }
    reader.readAsArrayBuffer(file)

    // perfrom chunking , create embedding and store in vector db 
    // const res = await fetch("/api/process")
    // const data = await res.json()
    // console.log(data)
    if(true){
      console.log("process completed")
      router.push('/chat')
    }else{
      alert("error occurred while processing the pdf")
    }
  }

  return (
    <div className='max-w-screen max-h-screen'>
        <h1 className='px-8 py-4 text-center text-2xl '> Create a new chatbot </h1>
        <div className='w-1/2 mx-auto py-10 flex flex-col justify-center gap-4'>
            <h2 className='w-full text-center text-xl font-semibold'>Upload PDF</h2>

            <div className='flex justify-around items-center'>
              <input type="file" name='file'  onChange={handleFileUpload}/>
              <button onClick={handelSubmit} className='p-2 border-1 border-black rounded-lg font-sans'>Upload</button>
              {/* assume u have pdf in your local server. Now start working with this pdf */}
            </div>
        </div>
    </div>
  )
}

export default page
