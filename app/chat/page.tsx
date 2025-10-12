import React, { Suspense } from 'react'
import ChatClient from './ChatClient'

const page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ChatClient/>
    </Suspense>
  )
}

export default page