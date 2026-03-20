"use client";

import { ChatMessage } from "@/types";

type Props = {
  message: ChatMessage;
  animationDelay?: number;
};

export default function ChatBubble({ message, animationDelay = 0 }: Props) {
  const isBot = message.type === "bot";
  const isUrgent = message.urgent;

  return (
    <div
      className={`flex items-start gap-2 mb-3 animate-fade-in-up ${
        isBot ? "flex-row" : "flex-row-reverse"
      }`}
      style={{ animationDelay: `${animationDelay}ms` }}
    >
      {/* Avatar */}
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm flex-shrink-0 ${
          isUrgent ? "bg-red-100" : isBot ? "bg-blue-100" : "bg-slate-200"
        }`}
        aria-hidden="true"
      >
        {isUrgent ? "🆘" : isBot ? "🤖" : "👤"}
      </div>

      {/* Bubble */}
      <div
        className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed shadow-sm ${
          isUrgent
            ? "bg-red-50 border border-red-200 text-red-900 rounded-tl-sm font-medium"
            : isBot
            ? "bg-white text-gray-800 rounded-tl-sm"
            : "bg-blue-100 text-gray-800 rounded-tr-sm"
        }`}
      >
        {message.text}
      </div>
    </div>
  );
}

export function TypingIndicator() {
  return (
    <div className="flex items-start gap-2 mb-3">
      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-sm flex-shrink-0">
        🤖
      </div>
      <div className="bg-white px-4 py-3 rounded-2xl rounded-tl-sm shadow-sm">
        <div className="flex gap-1 items-center">
          <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
          <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
          <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
        </div>
      </div>
    </div>
  );
}
