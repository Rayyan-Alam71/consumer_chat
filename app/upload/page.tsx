// File: app/page.tsx

'use client';

import { ChangeEvent } from 'react';

export default function Home() {

  const uploadFile = (e: ChangeEvent<HTMLInputElement>) => {
    const file: File | null | undefined = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async (event) => {
      const fileData = event.target?.result;
      if (fileData) {
        console.log(fileData)
        const presignedURL = new URL('/api/presigned', window.location.href);
        presignedURL.searchParams.set('fileName', file.name);
        presignedURL.searchParams.set('ContentType', file.type);
        
        const res = await fetch(presignedURL.toString())
        const data = await res.json()
        console.log(data)
        const s3Url = data.data[0].presignedUrl

        // upload to s3
        const s3UploadRes = await fetch(s3Url, {
          method : 'PUT',
          body : new Blob([fileData], { type : file.type})
        })

        const s3UploadData = await s3UploadRes.json()
        console.log(s3UploadData)
      };
    }
    reader.readAsArrayBuffer(file);
  };
  return <input onChange={uploadFile} type="file" />;
}
