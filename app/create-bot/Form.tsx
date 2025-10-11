"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {z} from "zod"
import axios from "axios";

export interface BotData{
  name : string
  description : string
  filekey : string
  filename : string
}

const formSchema = z.object({
    botName : z.string().min(3,"The name should be 3 letters atleast"),
    botDescription : z.string().min(5, "Description must be atleast 3 words").max(100, "Description must not exceed 100 words"),
    webUrl : z.string().optional(),
    file : z.instanceof(File).refine((file) => file.size < 10 * 1024 * 1024,"File should be under 10Mb")
}) 

const Form: React.FC = () => {
  const router = useRouter();
  const [botName, setBotName] = useState("");
  const [botDescription, setBotDescription] = useState("");
  const [website, setWebsite] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] ?? null;
    setFile(f);
  };

  
  const handleSubmit = async (e : any) => {
    e.preventDefault()
    try {
      
      const response = formSchema.safeParse({
        botName,
        botDescription,
        webUrl : website,
        file
      })
  
      if(!response.success){
        alert(response.error.errors[0].message)
        return
      }
      if(!file) return 
      // handle the file upload 
      

      // Step 1: Get presigned URL
      const url = new URL('/api/presigned', window.location.href);
      url.searchParams.set('fileName', file.name);
      url.searchParams.set('ContentType', file.type);

      const res = await axios.get(url.toString());
      // @ts-ignore
      const { presignedUrl, key } = res.data.data[0];

      // Step 2: Upload file directly
      const s3UploadRes = await axios.put(presignedUrl, file, {
        headers: {
          'Content-Type': file.type,
        },
      });

      if (s3UploadRes.status === 200) {
        console.log('✅ File uploaded successfully to S3');
        console.log('S3 key:', key);

        // save the data in db
        const botData : BotData= {
          name : botName,
          description : botDescription,
          filekey : key,
          filename : file.name
        } 
        console.log(botData)
        const res = await axios.post('/api/embed', {
          botData
        })
        console.log(res)
        // @ts-ignore
        if(res.data.success) router.push('/dashboard')
      } else {
        console.error('❌ Upload failed', s3UploadRes.statusText);
      }

    } catch (error) {
      console.log('error occured')
      console.error(error)
      return
    }
    

  }

   return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-slate-900 text-white overflow-hidden">
      {/* Animated background elements */}
      {/* <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-10 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
      </div> */}

      {/* Navbar */}
      <header className="relative z-10 flex justify-between items-center p-6 max-w-7xl mx-auto w-full backdrop-blur-sm">
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-2xl">💬</span>
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            ChatBotify
          </h1>
        </div>
      </header>

      {/* Form Section */}
      <div className="relative z-10 w-full px-6 py-12">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-5xl font-bold mb-4">
              Create Your{" "}
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                AI Chatbot
              </span>
            </h2>
            <p className="text-xl text-gray-300">
              Fill in the details below to get started with your intelligent chatbot
            </p>
          </div>

          {/* Form Card */}
          <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-white/10 shadow-2xl">
            <div className="flex flex-col gap-6">
              {/* Bot Name */}
              <div className="flex flex-col">
                <label className="font-semibold text-lg mb-2 flex items-center gap-2">
                  <span className="text-2xl">🤖</span>
                  Bot Name *
                </label>
                <input
                  value={botName}
                  onChange={(e) => setBotName(e.target.value)}
                  className="p-4 bg-slate-700/50 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 placeholder-gray-400 text-white"
                  placeholder="e.g. SupportBot Pro"
                  required
                />
                <span className="text-sm text-gray-400 mt-2">
                  Choose a memorable name for your chatbot
                </span>
              </div>

              {/* Description */}
              <div className="flex flex-col">
                <label className="font-semibold text-lg mb-2 flex items-center gap-2">
                  <span className="text-2xl">📝</span>
                  Description
                </label>
                <textarea
                  value={botDescription}
                  onChange={(e) => setBotDescription(e.target.value)}
                  className="p-4 bg-slate-700/50 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 h-32 resize-none placeholder-gray-400 text-white"
                  placeholder="Describe what your bot does and how it helps your customers..."
                />
                <span className="text-sm text-gray-400 mt-2">
                  5-100 characters • Help users understand your bot's purpose
                </span>
              </div>

              {/* Website URL */}
              <div className="flex flex-col">
                <label className="font-semibold text-lg mb-2 flex items-center gap-2">
                  <span className="text-2xl">🌐</span>
                  Website URL
                  <span className="text-sm font-normal text-gray-400">(optional)</span>
                </label>
                <input
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  className="p-4 bg-slate-700/50 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 placeholder-gray-400 text-white"
                  placeholder="https://example.com"
                />
                <span className="text-sm text-gray-400 mt-2">
                  Where will this chatbot be deployed?
                </span>
              </div>

              {/* File Upload */}
              <div className="flex flex-col">
                <label className="font-semibold text-lg mb-2 flex items-center gap-2">
                  <span className="text-2xl">📄</span>
                  Training Data (PDF) *
                </label>
                <div className="relative">
                  <input
                    type="file"
                    accept="text/plain"
                    onChange={onFileChange}
                    className="hidden"
                    id="file-upload"
                    required
                  />
                  <label
                    htmlFor="file-upload"
                    className="flex items-center justify-center p-8 bg-slate-700/30 border-2 border-dashed border-white/20 rounded-xl cursor-pointer hover:border-purple-500 hover:bg-slate-700/50 transition-all duration-300 group"
                  >
                    <div className="text-center">
                      {file ? (
                        <div className="space-y-2">
                          <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto text-3xl">
                            ✓
                          </div>
                          <p className="text-lg font-semibold text-green-400">
                            {file.name}
                          </p>
                          <p className="text-sm text-gray-400">
                            {(file.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                          <p className="text-xs text-purple-400">
                            Click to change file
                          </p>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto text-3xl group-hover:scale-110 transition-transform duration-300">
                            📤
                          </div>
                          <p className="text-lg font-semibold">
                            Drop your PDF here or click to browse
                          </p>
                          <p className="text-sm text-gray-400">
                            Maximum file size: 10MB
                          </p>
                        </div>
                      )}
                    </div>
                  </label>
                </div>
                <span className="text-sm text-gray-400 mt-2">
                  Upload your knowledge base, FAQs, or documentation
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-4 mt-6">
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="w-full sm:flex-1 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl font-semibold text-lg hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg
                        className="animate-spin h-5 w-5"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                          fill="none"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Processing...
                    </span>
                  ) : (
                    "Create Bot →"
                  )}
                </button>
                <button
                  onClick={() => {
                    setBotName("");
                    setBotDescription("");
                    setWebsite("");
                    setFile(null);
                  }}
                  className="w-full sm:w-auto px-8 py-4 bg-white/10 backdrop-blur-sm rounded-xl font-semibold hover:bg-white/20 transition-all duration-300 border border-white/20"
                >
                  Reset Form
                </button>
              </div>

              {/* Help Text */}
              <div className="mt-4 p-4 bg-blue-500/10 border border-blue-400/30 rounded-xl">
                <p className="text-sm text-blue-300">
                  💡 <span className="font-semibold">Pro Tip:</span> The better your
                  training data, the smarter your bot! Include comprehensive FAQs and
                  documentation for best results.
                </p>
              </div>
            </div>
          </div>

         
        </div>
      </div>
    </div>
  );
};

export default Form;
