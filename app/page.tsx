"use client";
import Link from "next/link";
import { motion } from "framer-motion";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-slate-900 text-white overflow-hidden">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-10 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-2000"></div>
      </div>

      {/* Navbar */}
      <motion.header 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 flex justify-between items-center p-6 max-w-7xl mx-auto w-full backdrop-blur-sm"
      >
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-2xl">💬</span>
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">ChatBotify</h1>
        </div>
        <nav className="hidden md:flex space-x-8 items-center">
          <Link href="#features" className="hover:text-blue-400 transition-colors duration-300">Features</Link>
          <Link href="#how-it-works" className="hover:text-purple-400 transition-colors duration-300">How It Works</Link>
          <Link href="/dashboard" className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 font-semibold">
            Get Started
          </Link>
        </nav>
      </motion.header>

      {/* Hero Section */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-6 py-20">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-6"
        >
          <span className="px-4 py-2 bg-blue-500/20 backdrop-blur-sm rounded-full text-sm border border-blue-400/30 inline-block">
            ✨ Next-Gen AI Chatbot Builder
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-6xl md:text-7xl font-extrabold mb-6 leading-tight"
        >
          Build AI Chatbots
          <br />
          <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            In Minutes, Not Days
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xl text-gray-300 max-w-3xl mb-12 leading-relaxed"
        >
          Create intelligent, RAG-powered chatbots trained on your data. 
          Embed anywhere with a single line of code. No technical expertise required.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Link 
            href="/dashboard" 
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full font-semibold hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 transform hover:scale-105 text-lg"
          >
            Start Building Free →
          </Link>
          <Link 
            href="#features" 
            className="px-8 py-4 bg-white/10 backdrop-blur-sm rounded-full font-semibold hover:bg-white/20 transition-all duration-300 border border-white/20 text-lg"
          >
            See How It Works
          </Link>
        </motion.div>

        {/* Floating Bot Preview */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-20 relative"
        >
          <div id="features" className="w-full max-w-4xl mx-auto bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/10 p-8 transform hover:scale-105 transition-transform duration-500">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex-shrink-0"></div>
                <div className="bg-slate-700/50 rounded-2xl rounded-tl-none p-4 max-w-md">
                  <p className="text-sm">Hi! How can I help you today? 👋</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 justify-end">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl rounded-tr-none p-4 max-w-md">
                  <p className="text-sm">Tell me about your features</p>
                </div>
                <div className="w-8 h-8 rounded-full bg-slate-600 flex-shrink-0"></div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex-shrink-0"></div>
                <div className="bg-slate-700/50 rounded-2xl rounded-tl-none p-4 max-w-md">
                  <p className="text-sm">I'm powered by RAG technology, fully customizable, and can be embedded anywhere! ✨</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </main>

      {/* Features Section */}
      <section id="features" className="relative z-10 py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl font-bold mb-6">
              Powerful Features, 
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"> Simple Setup</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Everything you need to create intelligent chatbots that your customers will love
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: "🚀",
                title: "Lightning Fast Setup",
                description: "Go from zero to chatbot in under 5 minutes. Just paste one script tag and you're live.",
                color: "from-blue-500 to-cyan-500"
              },
              {
                icon: "🧠",
                title: "RAG-Powered Intelligence",
                description: "Upload your documents and let AI understand your content. Answers based on your actual data.",
                color: "from-purple-500 to-pink-500"
              },
              {
                icon: "🎨",
                title: "Fully Customizable",
                description: "Match your brand perfectly. Customize colors, messages, behavior, and personality.",
                color: "from-pink-500 to-rose-500"
              },
              {
                icon: "📊",
                title: "Real-time Analytics",
                description: "Track conversations, measure satisfaction, and optimize your bot's performance.",
                color: "from-cyan-500 to-blue-500"
              },
              {
                icon: "🔒",
                title: "Secure & Private",
                description: "Your data stays yours. Enterprise-grade security with full encryption.",
                color: "from-violet-500 to-purple-500"
              },
              {
                icon: "⚡",
                title: "Instant Responses",
                description: "Sub-second response times. Your customers get answers immediately, 24/7.",
                color: "from-orange-500 to-red-500"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group relative bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/20 hover:-translate-y-2"
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 group-hover:bg-clip-text transition-all duration-300">
                  {feature.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="relative z-10 py-32 px-6 bg-gradient-to-b from-transparent to-slate-900/50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl font-bold mb-6">
              Three Steps to 
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"> Your Perfect Bot</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-12 relative">
            {/* Connecting line */}
            <div className="hidden md:block absolute top-24 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-30"></div>
            
            {[
              {
                step: "01",
                title: "Upload Your Data",
                description: "Add your documents, FAQs, or website content. We support PDFs, docs, text files, and more."
              },
              {
                step: "02",
                title: "Customize & Train",
                description: "Set your bot's personality, adjust its appearance, and let AI learn from your content."
              },
              {
                step: "03",
                title: "Embed Anywhere",
                description: "Copy one line of code and paste it on your site. Your bot is live and ready to help!"
              }
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="relative text-center"
              >
                <div className="relative inline-block mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-2xl font-bold shadow-lg shadow-purple-500/50 relative z-10">
                    {step.step}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full blur-xl opacity-50 animate-pulse"></div>
                </div>
                <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
                <p className="text-gray-400 leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-32 px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto bg-gradient-to-br from-blue-600/20 to-purple-600/20 backdrop-blur-xl rounded-3xl p-12 border border-white/20 text-center relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-purple-600/10 animate-pulse"></div>
          <div className="relative z-10">
            <h2 className="text-5xl font-bold mb-6">Ready to Transform Your Customer Support?</h2>
            <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
              Join thousands of businesses using ChatBotify to provide instant, intelligent support
            </p>
            <Link 
              href="/dashboard" 
              className="inline-block px-10 py-5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full font-bold text-lg hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 transform hover:scale-105"
            >
              Start Building Your Bot Now →
            </Link>
            <p className="text-sm text-gray-400 mt-6">No credit card required • Free forever plan available</p>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-6 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-xl">💬</span>
              </div>
              <span className="text-lg font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">ChatBotify</span>
            </div>
            <div className="text-gray-400 text-center md:text-right">
              <p>© {new Date().getFullYear()} ChatBotify. All rights reserved.</p>
              <p className="text-sm mt-2">Built with ❤️ for businesses everywhere</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}