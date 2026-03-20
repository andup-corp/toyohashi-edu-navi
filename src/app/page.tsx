"use client";

import ChatBot from "@/components/ChatBot";

export default function Home() {
  return (
    <main className="flex flex-col items-center min-h-screen bg-slate-50">
      <div className="w-full max-w-[480px] flex flex-col min-h-screen">
        <ChatBot />
      </div>
    </main>
  );
}
