// app/ai-chatbot/page.tsx
"use client";

import React, { useState, useRef, useEffect } from "react";
import Breadcrumb from "@/components/document-s3/Breadcrumb";
import PageHeader from "@/components/document-s3/PageHeader";
import ChatContainer from "@/components/chatbot-s6/ChatContainer";
import ChatMessage from "@/components/chatbot-s6/ChatMessage";
import ChatInput from "@/components/chatbot-s6/ChatInput";
import SuggestedQuestions from "@/components/chatbot-s6/SuggestedQuestions";
import QuickStats from "@/components/chatbot-s6/QuickStats";
import NeedHelpCard from "@/components/chatbot-s6/NeedHelpCard";
import ChatbotLayout from "@/components/layouts/ChatbotLayout";

type Message = {
  id: string;
  type: "bot" | "user";
  message: string;
  timestamp: string;
};

const CHAT_API_URL = "/api/demo/chatbot";

const suggestedQuestions = [
  "What are the admission requirements for Computer Science programs in Canada?",
  "Which universities offer the best value for money?",
  "What IELTS score do I need for top universities?",
  "Tell me about scholarship opportunities",
  "What are the job prospects after graduation?",
  "How long does the application process take?",
];

export default function AIChatbotPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "bot",
      message:
        "Hello musaebe! I'm your AI Study Advisor assistant. I can help you with questions about our partnered universities, programs, admission requirements, and more. What would you like to know?",
      timestamp: "1:00 P.M",
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (message: string) => {
    const trimmed = message.trim();
    if (!trimmed) {
      return;
    }

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      message: trimmed,
      timestamp: new Date().toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);

    try {
      const response = await fetch(CHAT_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: trimmed }),
      });

      const data: { answer?: string; error?: string } = await response.json();
      const answer =
        response.ok && data.answer
          ? data.answer
          : data.error || "Sorry, I could not generate a response right now.";

      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: "bot",
        message: answer,
        timestamp: new Date().toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        }),
      };

      setMessages((prev) => [...prev, botResponse]);
    } catch {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: "bot",
        message:
          "Sorry, I could not reach the chat service. Please try again in a moment.",
        timestamp: new Date().toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        }),
      };

      setMessages((prev) => [...prev, botResponse]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSuggestedQuestion = (question: string) => {
    handleSendMessage(question);
  };

  const handleContactCounselor = () => {
    console.log("Contact counselor clicked");
    // Implement navigation or modal
  };

  return (
    <ChatbotLayout>
      <div className="pt-10"></div>
      <div className="p-4 sm:p-6 lg:p-8">
        {/* Breadcrumb */}
        <Breadcrumb
          items={[
            { label: "Dashboard", href: "/dashboard" },
            { label: "AI Chatbot" },
          ]}
        />

        {/* Page Header */}
        <PageHeader
          title="AI Study Advisor Chatbot"
          description="Ask questions about universities, programs, and admission requirements"
        />

        {/* Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Chat Section - Left (2 columns on large screens) */}
          <div className="lg:col-span-2">
            <ChatContainer
              title="Chat with AI Assistant"
              subtitle="Ask any question about our partnered universities and programs"
              badge="Online"
            >
              {/* Messages */}
              <div className="min-h-[400px] max-h-[600px] overflow-y-auto mb-4 space-y-4">
                {messages.map((msg) => (
                  <ChatMessage
                    key={msg.id}
                    type={msg.type}
                    message={msg.message}
                    timestamp={msg.timestamp}
                    showActions={msg.type === "bot"}
                    onLike={() => console.log("Liked:", msg.id)}
                    onDislike={() => console.log("Disliked:", msg.id)}
                  />
                ))}

                {/* Typing Indicator */}
                {isTyping && (
                  <div className="flex gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" />
                        <div
                          className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        />
                        <div
                          className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"
                          style={{ animationDelay: "0.4s" }}
                        />
                      </div>
                    </div>
                  </div>
                )}

                <div ref={chatEndRef} />
              </div>

              {/* Input */}
              <ChatInput
                onSend={handleSendMessage}
                placeholder="Type your question here..."
                disabled={isTyping}
              />
            </ChatContainer>
          </div>

          {/* Sidebar - Right (1 column on large screens) */}
          <div className="space-y-6">
            {/* Suggested Questions */}
            <SuggestedQuestions
              questions={suggestedQuestions}
              onQuestionClick={handleSuggestedQuestion}
            />

            {/* Quick Stats */}
            <QuickStats />

            {/* Need Help */}
            <NeedHelpCard onContactClick={handleContactCounselor} />
          </div>
        </div>
      </div>
    </ChatbotLayout>
  );
}
