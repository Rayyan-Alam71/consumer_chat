'use client'

export default function LandingPage() {

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 text-gray-900">
      {/* Navbar */}
      <header className="flex justify-between items-center p-6 max-w-7xl mx-auto w-full">
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center shadow-md">
            <span className="text-2xl">💬</span>
          </div>
          <h1 className="text-2xl font-bold text-blue-600">ChatBotify</h1>
        </div>
        <nav className="hidden md:flex space-x-8 items-center">
          <a href="#features" className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-300">Features</a>
          <a href="#how-it-works" className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-300">How It Works</a>
          <a href="/dashboard" className="px-6 py-2.5 bg-blue-600 text-white rounded-full hover:bg-blue-700 shadow-lg shadow-blue-500/30 transition-all duration-300 font-semibold">
            Get Started
          </a>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-6 py-20">
        <div className="mb-6">
          <span className="px-4 py-2 bg-blue-100 rounded-full text-sm border-2 border-blue-200 inline-block font-medium text-blue-700">
            ✨ Next-Gen AI Chatbot Builder
          </span>
        </div>

        <h2 className="text-6xl md:text-7xl font-extrabold mb-6 leading-tight text-gray-900">
          Build AI Chatbots
          <br />
          <span className="text-blue-600">
            In Minutes, Not Days
          </span>
        </h2>

        <p className="text-xl text-gray-600 max-w-3xl mb-12 leading-relaxed">
          Create intelligent, RAG-powered chatbots trained on your data. 
          Embed anywhere with a single line of code. No technical expertise required.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <a 
            href="/create-bot" 
            className="px-8 py-4 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 shadow-lg shadow-blue-500/30 transition-all duration-300 text-lg"
          >
            Start Building Free →
          </a>
          <a 
            href="#features" 
            className="px-8 py-4 bg-white border-2 border-gray-300 rounded-full font-semibold hover:border-blue-400 hover:bg-blue-50 transition-all duration-300 text-lg"
          >
            See How It Works
          </a>
        </div>

        {/* Bot Preview */}
        <div className="mt-20">
          <div id="features" className="w-full max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl border-2 border-gray-200 p-8">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-3 h-3 rounded-full bg-red-400"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
              <div className="w-3 h-3 rounded-full bg-green-400"></div>
            </div>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 rounded-full bg-blue-600 flex-shrink-0"></div>
                <div className="bg-gray-100 rounded-2xl rounded-tl-none p-4 max-w-md">
                  <p className="text-sm text-gray-800">Hi! How can I help you today? 👋</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 justify-end">
                <div className="bg-blue-600 text-white rounded-2xl rounded-tr-none p-4 max-w-md">
                  <p className="text-sm">Tell me about your features</p>
                </div>
                <div className="w-8 h-8 rounded-full bg-gray-300 flex-shrink-0"></div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 rounded-full bg-blue-600 flex-shrink-0"></div>
                <div className="bg-gray-100 rounded-2xl rounded-tl-none p-4 max-w-md">
                  <p className="text-sm text-gray-800">I'm powered by RAG technology, fully customizable, and can be embedded anywhere! ✨</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Features Section */}
      <section id="features" className="py-32 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold mb-6 text-gray-900">
              Powerful Features, 
              <span className="text-blue-600"> Simple Setup</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to create intelligent chatbots that your customers will love
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: "🚀",
                title: "Lightning Fast Setup",
                description: "Go from zero to chatbot in under 5 minutes. Just paste one script tag and you're live.",
                color: "bg-blue-100"
              },
              {
                icon: "🧠",
                title: "RAG-Powered Intelligence",
                description: "Upload your documents and let AI understand your content. Answers based on your actual data.",
                color: "bg-purple-100"
              },
              {
                icon: "🎨",
                title: "Fully Customizable",
                description: "Match your brand perfectly. Customize colors, messages, behavior, and personality.",
                color: "bg-pink-100"
              },
              {
                icon: "📊",
                title: "Real-time Analytics",
                description: "Track conversations, measure satisfaction, and optimize your bot's performance.",
                color: "bg-cyan-100"
              },
              {
                icon: "🔒",
                title: "Secure & Private",
                description: "Your data stays yours. Enterprise-grade security with full encryption.",
                color: "bg-indigo-100"
              },
              {
                icon: "⚡",
                title: "Instant Responses",
                description: "Sub-second response times. Your customers get answers immediately, 24/7.",
                color: "bg-orange-100"
              }
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-white border-2 border-gray-200 rounded-2xl p-8 hover:border-blue-400 hover:shadow-xl transition-all duration-300"
              >
                <div className={`w-16 h-16 ${feature.color} rounded-2xl flex items-center justify-center text-3xl mb-6`}>
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold mb-6 text-gray-900">
              Three Steps to 
              <span className="text-blue-600"> Your Perfect Bot</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-12 relative">
            {/* Connecting line */}
            <div className="hidden md:block absolute top-24 left-0 right-0 h-1 bg-blue-200"></div>
            
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
              <div
                key={index}
                className="relative text-center"
              >
                <div className="relative inline-block mb-6">
                  <div className="w-20 h-20 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold shadow-lg relative z-10">
                    {step.step}
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6 bg-white">
        <div className="max-w-5xl mx-auto bg-blue-50 rounded-3xl p-12 border-2 border-blue-200 text-center">
          <h2 className="text-5xl font-bold mb-6 text-gray-900">Ready to Transform Your Customer Support?</h2>
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
            Join thousands of businesses using ChatBotify to provide instant, intelligent support
          </p>
          <a 
            href="/create-bot" 
            className="inline-block px-10 py-5 bg-blue-600 text-white rounded-full font-bold text-lg hover:bg-blue-700 shadow-lg shadow-blue-500/30 transition-all duration-300"
          >
            Start Building Your Bot Now →
          </a>
          <p className="text-sm text-gray-500 mt-6">No credit card required • Free forever plan available</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t-2 border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-6 md:mb-0">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-md">
                <span className="text-xl">💬</span>
              </div>
              <span className="text-lg font-bold text-blue-600">ChatBotify</span>
            </div>
            <div className="text-gray-600 text-center md:text-right">
              <p>© {new Date().getFullYear()} ChatBotify. All rights reserved.</p>
              <p className="text-sm mt-2">Built with ❤️ for businesses everywhere</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}