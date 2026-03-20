"use client";

import { useState, useRef, useEffect } from "react";
import { ChatMessage, ChatState, Option, Question } from "@/types";
import { getQuestionById } from "@/data/questions";
import { processOption } from "@/lib/flowEngine";
import Header from "./Header";
import ChatBubble, { TypingIndicator } from "./ChatBubble";
import OptionButtons from "./OptionButtons";
import ResultView from "./ResultView";

const FIRST_QUESTION_ID = "q1";

function createBotMessage(text: string, urgent = false): ChatMessage {
  return {
    id: `bot-${Date.now()}-${Math.random()}`,
    type: "bot",
    text,
    timestamp: new Date(),
    urgent,
  };
}

function createUserMessage(text: string): ChatMessage {
  return {
    id: `user-${Date.now()}-${Math.random()}`,
    type: "user",
    text,
    timestamp: new Date(),
  };
}

const initialState = (): ChatState => {
  const firstQuestion = getQuestionById(FIRST_QUESTION_ID)!;
  return {
    messages: [
      createBotMessage(
        "こんにちは！豊橋市 教育相談ナビです。\nいくつかの質問にお答えいただくと、お子さんの状況に合った相談先をご案内します。"
      ),
      createBotMessage(firstQuestion.text),
    ],
    currentQuestionId: FIRST_QUESTION_ID,
    answers: [],
    results: [],
    isComplete: false,
  };
};

export default function ChatBot() {
  const [state, setState] = useState<ChatState>(initialState);
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  const currentQuestion = state.currentQuestionId
    ? getQuestionById(state.currentQuestionId)
    : null;

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [state.messages, isTyping]);

  const handleOptionSelect = (option: Option) => {
    if (isTyping || state.isComplete) return;

    const userMsg = createUserMessage(
      option.icon ? `${option.icon} ${option.label}` : option.label
    );

    const newAnswers = [
      ...state.answers,
      {
        questionId: state.currentQuestionId ?? "",
        optionLabel: option.label,
      },
    ];

    // Immediately add user message and disable buttons
    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, userMsg],
      answers: newAnswers,
      currentQuestionId: null, // disable options
    }));

    setIsTyping(true);

    setTimeout(() => {
      const result = processOption(option);
      setIsTyping(false);

      if (result.isComplete) {
        const completionMsg = createBotMessage(
          result.results.length > 0
            ? `${result.results.length}件の相談先が見つかりました。ご状況に合った窓口をご確認ください。`
            : "まずは学校の生活サポート主任にご相談いただくことをお勧めします。"
        );
        setState((prev) => ({
          ...prev,
          messages: [...prev.messages, completionMsg],
          results: result.results,
          isComplete: true,
          currentQuestionId: null,
        }));
      } else if (result.nextQuestion) {
        const nextMsg = createBotMessage(
          result.nextQuestion.text,
          result.nextQuestion.urgent
        );
        setState((prev) => ({
          ...prev,
          messages: [...prev.messages, nextMsg],
          currentQuestionId: result.nextQuestion!.id,
        }));
      }
    }, 800);
  };

  const handleGoBack = () => {
    if (isTyping || state.answers.length === 0) return;

    const newAnswers = state.answers.slice(0, -1);
    const prevQuestionId =
      newAnswers.length === 0
        ? FIRST_QUESTION_ID
        : (() => {
            // find what question was asked at the last answer's position
            // We replay the flow to find the previous question
            const allMessages = state.messages;
            // Remove last user message and last bot message
            const lastUserMsgIndex = [...allMessages]
              .reverse()
              .findIndex((m) => m.type === "user");
            const cutIndex = allMessages.length - lastUserMsgIndex - 1;
            // We need the question before the last answer
            // Trace through the flow from beginning
            let qId = FIRST_QUESTION_ID;
            for (let i = 0; i < newAnswers.length; i++) {
              const q = getQuestionById(qId);
              if (!q) break;
              const selectedOption = q.options.find(
                (o) => o.label === newAnswers[i].optionLabel
              );
              if (selectedOption?.nextQuestionId) {
                qId = selectedOption.nextQuestionId;
              }
            }
            return qId;
          })();

    // Remove last user message and last bot question
    const messages = state.messages.slice();
    // Remove from end: last bot message + last user message
    let removed = 0;
    const trimmed: ChatMessage[] = [];
    for (let i = messages.length - 1; i >= 0; i--) {
      if (removed < 2) {
        removed++;
        continue;
      }
      trimmed.unshift(messages[i]);
    }

    setState({
      messages: trimmed,
      currentQuestionId: prevQuestionId,
      answers: newAnswers,
      results: [],
      isComplete: false,
    });
  };

  const handleReset = () => {
    setState(initialState());
  };

  return (
    <div className="flex flex-col h-screen">
      <Header />

      {/* Chat area */}
      <div className="flex-1 overflow-y-auto px-4 pt-4 pb-2">
        {/* Messages */}
        {state.messages.map((msg) => (
          <ChatBubble key={msg.id} message={msg} />
        ))}

        {/* Typing indicator */}
        {isTyping && <TypingIndicator />}

        {/* Result view */}
        {state.isComplete && (
          <ResultView
            results={state.results}
            answers={state.answers}
            onReset={handleReset}
          />
        )}

        <div ref={bottomRef} />
      </div>

      {/* Options area */}
      {!state.isComplete && currentQuestion && !isTyping && (
        <div className="border-t border-gray-100 bg-slate-50 pt-3 pb-4">
          <OptionButtons
            options={currentQuestion.options}
            onSelect={handleOptionSelect}
            disabled={isTyping}
          />

          {/* Back button */}
          {state.answers.length > 0 && (
            <div className="px-4 mt-1">
              <button
                onClick={handleGoBack}
                className="text-xs text-gray-400 hover:text-gray-600 underline transition-colors"
                aria-label="1つ前の質問に戻る"
              >
                ← 1つ前に戻る
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
