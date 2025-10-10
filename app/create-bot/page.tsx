'use client'
import {  useRouter } from 'next/navigation'
import React, { ChangeEvent, useState } from 'react'
import Form from './Form'

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
        <Form/>   
    </div>
  )
}

export default page
