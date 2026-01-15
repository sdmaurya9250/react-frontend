
import React from 'react';



export default function Hero() {


  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-zinc-950 text-white">
      {/* Animated Background Pulse */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="h-64 w-64 animate-ping rounded-full bg-cyan-500/20 duration-[3000ms]"></div>
        <div className="absolute h-96 w-96 animate-ping rounded-full bg-blue-500/10 duration-[4000ms]"></div>
      </div>

      <div className="relative z-10 text-center px-4">
        <h1 className="mb-4 text-6xl font-black tracking-tighter md:text-8xl">
          CONNECT <span className="text-cyan-400">RANDOM.</span>
        </h1>
        <p className="mx-auto mb-8 max-w-lg text-lg text-zinc-400">
          Instantly meet people from around the globe. One click away from your next great conversation.
        </p>

        <button 
          className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-cyan-500 px-8 py-4 font-bold text-black transition-all hover:bg-cyan-400 active:scale-95"
          onClick={() => window.location.href = '/login'}
        >
          <span>Start Connecting</span>
          <svg className="h-5 w-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </button>
      </div>

      {/* Floating User Count Badge */}
      <div className="absolute bottom-10 flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/50 px-4 py-2 backdrop-blur-md">
        <span className="relative flex h-3 w-3">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
          <span className="relative inline-flex h-3 w-3 rounded-full bg-green-500"></span>
        </span>
        <span className="text-sm font-medium text-zinc-300">12,402 people online</span>
      </div>
    </div>
  )
}