'use client'
import { File } from 'lucide-react'
import React, {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'

const page = () => {
  return (
    <div className='w-full h-full flex justify-center items-center'>
      <MyDropzone/>
    </div>
  )
}

export default page




function MyDropzone() {
    // @ts-ignore
  const onDrop = useCallback(acceptedFiles => {
    // Do something with the files
    console.log(typeof(acceptedFiles))
    console.log(acceptedFiles)
  }, [])
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop,
    accept :{'applicaton/pdf' : ['.pdf']},
    maxFiles : 1
  })

  return (
    <div {...getRootProps({
        className : 'flex w-[100px] h-[100px] bg-gray-200 justify-center items-center rounded-lg '
    })}>
      <input {...getInputProps()} />
      <File className='w-6 h-6'/>
      {
        <h3>Upload PDF files</h3>
      }
    </div>
  )
}