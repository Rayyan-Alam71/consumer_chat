import { Suspense } from 'react'
import ClientChat from './ClientChat'
 
export default function Page({
  searchParams,
}: {
  searchParams: Promise<{ widget_token?: string }>
}) {
  return (
    <Suspense fallback={<>...</>}>
      <ClientChat searchParams={searchParams} />
    </Suspense>
  )
}

