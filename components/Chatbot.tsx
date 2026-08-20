"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MessageSquare, Send, Minus, RefreshCcw } from 'lucide-react';
import { chatbotKnowledge, fallbackResponse, Intent } from '@/lib/chatbotKnowledge';

type Message = {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  quickReplies?: string[];
  action?: Intent['action'];
};

type IntakeData = {
  name: string;
  service: string;
  description: string;
  contact: string;
  deadline?: string;
  filesOption?: string;
};

// Formats simple bold **text** and bullet lines in bot messages
function renderFormattedMessage(text: string) {
  const lines = text.split('\n');
  return lines.map((line, lineIdx) => {
    // Split bold syntax **bold**
    const parts = line.split(/(\*\*[^*]+\*\*)/g);
    return (
      <span key={lineIdx} className="block leading-relaxed">
        {parts.map((part, partIdx) => {
          if (part.startsWith('**') && part.endsWith('**')) {
            return (
              <strong key={partIdx} className="font-semibold text-black dark:text-white">
                {part.slice(2, -2)}
              </strong>
            );
          }
          return part;
        })}
      </span>
    );
  });
}

// Stop words to ignore during matching for better AEO question matching accuracy
const STOP_WORDS = new Set([
  'a', 'an', 'and', 'are', 'as', 'at', 'be', 'by', 'for', 'from', 'has', 'he',
  'in', 'is', 'it', 'its', 'of', 'on', 'that', 'the', 'to', 'was', 'were',
  'will', 'with', 'what', 'which', 'who', 'how', 'do', 'does', 'can', 'you',
  'i', 'we', 'they', 'your', 'my', 'our', 'me', 'please', 'tell', 'about'
]);

function findBestMatch(userInput: string): Intent | null {
  const cleanInput = userInput.toLowerCase().trim();
  const tokens = cleanInput
    .replace(/[^\w\s]/g, ' ')
    .split(/\s+/)
    .filter((t) => t.length > 1 && !STOP_WORDS.has(t));

  let bestMatch: Intent | null = null;
  let highestScore = 0;

  for (const item of chatbotKnowledge) {
    let score = 0;

    for (const keyword of item.keywords) {
      const lowerKw = keyword.toLowerCase();

      // Exact phrase match in input gives huge boost
      if (cleanInput === lowerKw) {
        score += 20;
      } else if (cleanInput.includes(lowerKw)) {
        score += 10 + lowerKw.length * 0.5;
      } else {
        // Token level matching
        const kwTokens = lowerKw.replace(/[^\w\s]/g, ' ').split(/\s+/).filter(Boolean);
        for (const token of tokens) {
          if (kwTokens.includes(token)) {
            score += 3;
          } else if (kwTokens.some(kwt => kwt.includes(token) || token.includes(kwt))) {
            score += 1.5;
          }
        }
      }
    }

    if (score > highestScore) {
      highestScore = score;
      bestMatch = item;
    }
  }

  // Require a minimum confidence score
  return highestScore >= 3 ? bestMatch : null;
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Project Intake State
  const [intakeMode, setIntakeMode] = useState(false);
  const [intakeStep, setIntakeStep] = useState(0);
  const [intakeData, setIntakeData] = useState<IntakeData>({
    name: '',
    service: '',
    description: '',
    contact: '',
  });
  const [submitting, setSubmitting] = useState(false);

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Initial greeting when opened
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const greeting = chatbotKnowledge.find((k) => k.intent === 'greeting');
      if (greeting) {
        addBotMessage(greeting.response, greeting.quickReplies, greeting.action);
      }
    }
  }, [isOpen]);

  const addBotMessage = (text: string, quickReplies?: string[], action?: Intent['action']) => {
    setIsTyping(true);
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { id: Date.now().toString(), sender: 'bot', text, quickReplies, action },
      ]);
      setIsTyping(false);
    }, 450);
  };

  const addUserMessage = (text: string) => {
    setMessages((prev) => [
      ...prev,
      { id: Date.now().toString(), sender: 'user', text },
    ]);
  };

  const resetChat = () => {
    setMessages([]);
    setIntakeMode(false);
    setIntakeStep(0);
    setIntakeData({ name: '', service: '', description: '', contact: '' });
    const greeting = chatbotKnowledge.find((k) => k.intent === 'greeting');
    if (greeting) {
      addBotMessage(greeting.response, greeting.quickReplies, greeting.action);
    }
  };

  const handleSend = (text: string) => {
    if (!text.trim()) return;

    addUserMessage(text);
    setInputValue('');

    if (intakeMode) {
      handleIntakeStep(text);
      return;
    }

    // Match Intent with AEO-optimized token matching
    const match = findBestMatch(text);

    if (match) {
      if (match.action === 'project_intake') {
        startProjectIntake();
      } else if (match.action === 'whatsapp') {
        window.open('https://wa.me/923338917021?text=Hi%20Red%20Shadow%20Designs,%20I%20would%20like%20to%20discuss%20a%20project.', '_blank');
        addBotMessage(match.response, match.quickReplies || ["Start a Project", "Contact Us"]);
      } else {
        addBotMessage(match.response, match.quickReplies, match.action);
      }
    } else {
      addBotMessage(fallbackResponse.response, fallbackResponse.quickReplies);
    }
  };

  const startProjectIntake = () => {
    setIntakeMode(true);
    setIntakeStep(1);
    addBotMessage("Let's get started on your project. What is your name?");
  };

  const handleIntakeStep = (text: string) => {
    switch (intakeStep) {
      case 1:
        setIntakeData((prev) => ({ ...prev, name: text }));
        setIntakeStep(2);
        addBotMessage(`Thanks, ${text}. What service are you interested in?`, [
          "CAD / Product Design",
          "DFM & Manufacturing",
          "Medical Device CAD",
          "3D Printing / Prototyping",
          "Photorealistic Rendering",
          "3D Mechanism Animation",
          "Reverse Engineering",
          "Other"
        ]);
        break;
      case 2:
        setIntakeData((prev) => ({ ...prev, service: text }));
        setIntakeStep(3);
        addBotMessage("Tell us briefly about your product concept or requirements.");
        break;
      case 3:
        setIntakeData((prev) => ({ ...prev, description: text }));
        setIntakeStep(4);
        addBotMessage("Do you have reference sketches, 3D CAD files, or technical drawings?", [
          "I will share via Email / WhatsApp",
          "I need designs created from scratch",
          "I have rough sketches / photos"
        ]);
        break;
      case 4:
        setIntakeData((prev) => ({ ...prev, filesOption: text }));
        setIntakeStep(5);
        addBotMessage("What is the best email or phone number to send your quotation and project review?");
        break;
      case 5:
        setIntakeData((prev) => ({ ...prev, contact: text }));
        setIntakeStep(6);
        addBotMessage("Do you have a target completion deadline?", [
          "Urgent (24–48 hours)",
          "1 week",
          "1–2 weeks",
          "2–4 weeks",
          "Flexible"
        ]);
        break;
      case 6:
        setIntakeData((prev) => ({ ...prev, deadline: text }));
        setIntakeStep(7);
        const summary = `**Project Inquiry Review**\n• Name: ${intakeData.name}\n• Service: ${intakeData.service}\n• Description: ${intakeData.description}\n• Files: ${intakeData.filesOption}\n• Contact: ${intakeData.contact}\n• Target Deadline: ${text}`;
        addBotMessage(summary + "\n\nWould you like to submit this project inquiry for a free 24-hour review?", [
          "Submit Inquiry",
          "Edit Details"
        ]);
        break;
      case 7:
        if (text.toLowerCase().includes('submit')) {
          submitInquiry();
        } else if (text.toLowerCase().includes('edit')) {
          setIntakeStep(1);
          addBotMessage("Let's start over. What is your name?");
        } else {
          addBotMessage("Please choose an option to continue:", ["Submit Inquiry", "Edit Details"]);
        }
        break;
      default:
        break;
    }
  };

  const submitInquiry = async () => {
    setSubmitting(true);
    addBotMessage("Submitting your inquiry to our engineering team...");

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: intakeData.name,
          email: intakeData.contact,
          subject: `[Project Inquiry] ${intakeData.service} - ${intakeData.name}`,
          message: `Service: ${intakeData.service}\nName: ${intakeData.name}\nContact: ${intakeData.contact}\nProject Description: ${intakeData.description}\nFiles Option: ${intakeData.filesOption}\nDeadline: ${intakeData.deadline}`,
          from_name: 'Red Shadow Design Studio',
        }),
      });
      const data = await res.json();

      if (data.success) {
        addBotMessage(
          "✓ Your inquiry has been submitted successfully!\n\nOur engineering team will review your requirements and respond within 24 hours. If you have files to attach, feel free to send them directly to hello@redshadowdesigns.com or via WhatsApp.",
          ["WhatsApp Us", "View Portfolio", "Explore Services"]
        );
        setIntakeMode(false);
        setIntakeStep(0);
      } else {
        addBotMessage(
          "We encountered a temporary issue sending your form. You can reach us directly via our Contact page or WhatsApp.",
          ["Contact Us", "WhatsApp Us"]
        );
      }
    } catch {
      addBotMessage(
        "Network error. Please reach out to us directly via WhatsApp or our Contact page.",
        ["Contact Us", "WhatsApp Us"]
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleQuickReply = (reply: string) => {
    if (reply === "Start a Project") {
      addUserMessage(reply);
      startProjectIntake();
    } else if (reply === "View Portfolio") {
      window.location.href = '/portfolio';
    } else if (reply === "Contact Us") {
      window.location.href = '/contact';
    } else if (reply === "Explore Services") {
      window.location.href = '/services';
    } else if (reply === "WhatsApp Us") {
      window.open('https://wa.me/923338917021?text=Hi%20Red%20Shadow%20Designs,%20I%20would%20like%20to%20discuss%20a%20project.', '_blank');
    } else {
      handleSend(reply);
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => { setIsOpen(true); setIsMinimized(false); }}
            aria-label="Open Project Desk"
            className="fixed bottom-6 right-6 z-50 p-4 rounded-full bg-white/90 dark:bg-black/70 backdrop-blur-md border border-black/15 dark:border-white/15 shadow-xl text-black dark:text-white hover:scale-105 transition-all duration-300 group"
          >
            <div className="relative">
              <MessageSquare className="w-6 h-6" />
              <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00d4ff] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#00d4ff]"></span>
              </span>
            </div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
              height: isMinimized ? 'auto' : '520px',
            }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            className={`fixed bottom-6 right-6 z-50 w-[380px] max-w-[calc(100vw-32px)] bg-white/95 dark:bg-[#0b0f19]/95 backdrop-blur-xl border border-black/10 dark:border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden transition-all duration-200 ${
              isMinimized ? 'h-auto' : 'h-[520px] max-h-[calc(100vh-100px)]'
            }`}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-3.5 border-b border-black/10 dark:border-white/10 bg-black/[0.03] dark:bg-white/[0.03]">
              <div className="flex items-center gap-3">
                <div className="relative w-8 h-8 rounded-full bg-black/5 dark:bg-white/10 flex items-center justify-center p-1 border border-black/5 dark:border-white/5">
                  <img src="/assets/logo.webp" alt="Red Shadow Designs" className="w-5 h-5 object-contain" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-black dark:text-white font-medium text-sm leading-tight">Red Shadow Studio Desk</h3>
                    <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" title="Online" />
                  </div>
                  <p className="text-black/50 dark:text-white/50 text-[11px] leading-tight">Engineering & Project Support</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={resetChat}
                  className="p-1.5 rounded-lg hover:bg-black/10 dark:hover:bg-white/10 text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white transition-colors"
                  title="Reset conversation"
                  aria-label="Reset conversation"
                >
                  <RefreshCcw className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="p-1.5 rounded-lg hover:bg-black/10 dark:hover:bg-white/10 text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white transition-colors"
                  title={isMinimized ? "Expand" : "Minimize"}
                  aria-label={isMinimized ? "Expand" : "Minimize"}
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-lg hover:bg-black/10 dark:hover:bg-white/10 text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white transition-colors"
                  title="Close chat"
                  aria-label="Close chat"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Messages Area */}
            {!isMinimized && (
              <>
                <div className="flex-1 overflow-y-auto p-4 space-y-3.5 text-xs sm:text-sm scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                  {messages.map((msg) => (
                    <div key={msg.id} className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                      <div
                        className={`max-w-[88%] rounded-2xl px-3.5 py-2.5 ${
                          msg.sender === 'user'
                            ? 'bg-gradient-to-r from-[#00d4ff] to-[#7c3aed] text-white rounded-br-sm shadow-md font-medium'
                            : 'bg-black/[0.04] dark:bg-white/[0.08] text-black/90 dark:text-white/90 border border-black/5 dark:border-white/5 rounded-bl-sm space-y-1'
                        }`}
                      >
                        {renderFormattedMessage(msg.text)}
                      </div>

                      {/* Quick Replies */}
                      {msg.quickReplies && msg.quickReplies.length > 0 && msg.sender === 'bot' && (
                        <div className="flex flex-wrap gap-1.5 mt-2.5 max-w-full">
                          {msg.quickReplies.map((reply, i) => (
                            <button
                              key={i}
                              onClick={() => handleQuickReply(reply)}
                              className="px-2.5 py-1 text-[11px] font-medium rounded-full bg-black/5 dark:bg-white/10 border border-black/10 dark:border-white/15 text-black/80 dark:text-white/80 hover:bg-black/10 dark:hover:bg-white/20 hover:border-black/30 dark:hover:border-white/30 transition-all hover:scale-[1.02]"
                            >
                              {reply}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}

                  {isTyping && (
                    <div className="flex items-start">
                      <div className="bg-black/5 dark:bg-white/10 border border-black/5 dark:border-white/5 rounded-2xl rounded-bl-sm px-3.5 py-2.5 flex gap-1.5 items-center">
                        <motion.div animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0 }} className="w-1.5 h-1.5 bg-[#00d4ff] rounded-full" />
                        <motion.div animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} className="w-1.5 h-1.5 bg-[#7c3aed] rounded-full" />
                        <motion.div animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} className="w-1.5 h-1.5 bg-black/50 dark:bg-white/50 rounded-full" />
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className="p-3 border-t border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02]">
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleSend(inputValue);
                      }}
                      placeholder="Ask about CAD, DFM, pricing, standards..."
                      className="flex-1 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-full px-3.5 py-2 text-xs sm:text-sm text-black dark:text-white placeholder:text-black/40 dark:placeholder:text-white/40 focus:outline-none focus:border-[#00d4ff] dark:focus:border-[#00d4ff] transition-colors"
                      disabled={submitting}
                    />
                    <button
                      onClick={() => handleSend(inputValue)}
                      disabled={!inputValue.trim() || submitting}
                      aria-label="Send message"
                      className="p-2 rounded-full bg-gradient-to-r from-[#00d4ff] to-[#7c3aed] text-white hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed transition-all hover:scale-105"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
