"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MessageSquare, Send, Minus, RefreshCcw } from 'lucide-react';
import { chatbotKnowledge, fallbackResponse } from '@/lib/chatbotKnowledge';

type Message = {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  quickReplies?: string[];
};

type IntakeData = {
  name: string;
  service: string;
  description: string;
  contact: string;
  deadline?: string;
  filesOption?: string;
};

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
        addBotMessage(greeting.response, greeting.quickReplies);
      }
    }
  }, [isOpen]);

  const addBotMessage = (text: string, quickReplies?: string[]) => {
    setIsTyping(true);
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { id: Date.now().toString(), sender: 'bot', text, quickReplies },
      ]);
      setIsTyping(false);
    }, 600); // simulated typing delay
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
      addBotMessage(greeting.response, greeting.quickReplies);
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

    // Match Intent
    const lowerText = text.toLowerCase();
    let bestMatch = null;
    let maxMatches = 0;

    for (const item of chatbotKnowledge) {
      let matches = 0;
      for (const keyword of item.keywords) {
        // Simple word boundary or exact match
        if (lowerText.includes(keyword.toLowerCase())) {
          matches++;
        }
      }
      if (matches > maxMatches) {
        maxMatches = matches;
        bestMatch = item;
      }
    }

    if (bestMatch && maxMatches > 0) {
      if (bestMatch.action === 'project_intake') {
        startProjectIntake();
      } else if (bestMatch.action === 'portfolio') {
        addBotMessage(bestMatch.response, ['View Portfolio']);
      } else if (bestMatch.action === 'contact') {
        addBotMessage(bestMatch.response, ['Contact Us']);
      } else if (bestMatch.action === 'whatsapp') {
        window.open('https://wa.me/923338917021?text=Hi%20Red%20Shadow%20Designs,%20I%20would%20like%20to%20discuss%20a%20project.', '_blank');
        addBotMessage("I've opened WhatsApp for you!");
      } else {
        addBotMessage(bestMatch.response, bestMatch.quickReplies);
      }
    } else {
      addBotMessage(fallbackResponse.response, fallbackResponse.quickReplies);
    }
  };

  const startProjectIntake = () => {
    setIntakeMode(true);
    setIntakeStep(1);
    addBotMessage("Let's get started. What is your name?");
  };

  const handleIntakeStep = (text: string) => {
    switch (intakeStep) {
      case 1:
        setIntakeData((prev) => ({ ...prev, name: text }));
        setIntakeStep(2);
        addBotMessage(`Thanks, ${text}. What service are you interested in?`, [
          "CAD / Product Design", "Mechanical Engineering", "DFM", 
          "3D Printing", "Prototyping", "Rendering", "Animation", "Other"
        ]);
        break;
      case 2:
        setIntakeData((prev) => ({ ...prev, service: text }));
        setIntakeStep(3);
        addBotMessage("Tell us briefly about your project and what you need.");
        break;
      case 3:
        setIntakeData((prev) => ({ ...prev, description: text }));
        setIntakeStep(4);
        addBotMessage("Do you have a sketch, CAD file, image, PDF or other project files?", [
          "I'll upload them later via Email/WhatsApp", "I don't have files yet"
        ]);
        break;
      case 4:
        setIntakeData((prev) => ({ ...prev, filesOption: text }));
        setIntakeStep(5);
        addBotMessage("What is the best way to contact you? (Email or Phone)");
        break;
      case 5:
        setIntakeData((prev) => ({ ...prev, contact: text }));
        setIntakeStep(6);
        addBotMessage("Do you have a target deadline?", [
          "ASAP", "1 week", "1–2 weeks", "2–4 weeks", "Flexible", "Not sure"
        ]);
        break;
      case 6:
        setIntakeData((prev) => ({ ...prev, deadline: text }));
        setIntakeStep(7);
        const summary = `**Project Summary**\nName: ${intakeData.name}\nService: ${intakeData.service}\nProject: ${intakeData.description}\nFiles: ${intakeData.filesOption}\nContact: ${intakeData.contact}\nDeadline: ${text}`;
        addBotMessage(summary + "\n\nPlease check your information before submitting.", ["Submit Inquiry", "Edit"]);
        break;
      case 7:
        if (text.toLowerCase() === 'submit inquiry') {
          submitInquiry();
        } else if (text.toLowerCase() === 'edit') {
          setIntakeStep(1);
          addBotMessage("Let's start over. What is your name?");
        } else {
          addBotMessage("Please choose an option.", ["Submit Inquiry", "Edit"]);
        }
        break;
      default:
        break;
    }
  };

  const submitInquiry = async () => {
    setSubmitting(true);
    addBotMessage("Submitting your inquiry...");

    const payload = {
      access_key: "96bf085a-5410-4a8f-9048-3533423c4735",
      name: intakeData.name,
      email: intakeData.contact, // Using contact field as email/identifier
      subject: `[Chatbot Project Inquiry] ${intakeData.service}`,
      message: `Service: ${intakeData.service}\nProject Description: ${intakeData.description}\nFiles Option: ${intakeData.filesOption}\nDeadline: ${intakeData.deadline}`,
      from_name: "Red Shadow Chatbot"
    };

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      
      if (data.success) {
        addBotMessage("Your inquiry has been submitted successfully! Our team will contact you soon. If you have files to share, please email them to hello@redshadowdesigns.com or use WhatsApp.");
        setIntakeMode(false);
        setIntakeStep(0);
      } else {
        addBotMessage("There was an issue submitting your inquiry. Please try contacting us directly via our Contact page.", ["Contact Us"]);
      }
    } catch (error) {
      addBotMessage("An error occurred. Please try contacting us directly.", ["Contact Us"]);
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
            className="fixed bottom-6 right-6 z-50 p-4 rounded-full bg-white/80 dark:bg-black/40 backdrop-blur-md border border-black/10 dark:border-white/10 shadow-lg dark:shadow-[0_0_20px_rgba(255,255,255,0.1)] text-black dark:text-white hover:bg-white dark:hover:bg-black/60 transition-all duration-300 group"
          >
            <MessageSquare className="w-6 h-6 group-hover:scale-110 transition-transform" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ 
              opacity: 1, 
              y: 0, 
              scale: 1,
              height: isMinimized ? 'auto' : '500px',
            }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className={`fixed bottom-6 right-6 z-50 w-[350px] max-w-[calc(100vw-32px)] bg-white/90 dark:bg-black/60 backdrop-blur-xl border border-black/10 dark:border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden transition-all duration-300 ${isMinimized ? 'h-auto' : 'h-[500px] max-h-[calc(100vh-100px)]'}`}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-black/10 dark:bg-white/10 flex items-center justify-center">
                  <img src="/assets/logo.webp" alt="RSD" className="w-5 h-5 object-contain" />
                </div>
                <div>
                  <h3 className="text-black dark:text-white font-medium text-sm">Red Shadow Assistant</h3>
                  <p className="text-black/50 dark:text-white/50 text-xs">Project & Design Support</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={resetChat} className="p-1.5 rounded-md hover:bg-black/10 dark:hover:bg-white/10 text-black/70 dark:text-white/70 hover:text-black dark:hover:text-white transition-colors" title="Reset Chat">
                  <RefreshCcw className="w-4 h-4" />
                </button>
                <button onClick={() => setIsMinimized(!isMinimized)} className="p-1.5 rounded-md hover:bg-black/10 dark:hover:bg-white/10 text-black/70 dark:text-white/70 hover:text-black dark:hover:text-white transition-colors" title="Minimize">
                  <Minus className="w-4 h-4" />
                </button>
                <button onClick={() => setIsOpen(false)} className="p-1.5 rounded-md hover:bg-black/10 dark:hover:bg-white/10 text-black/70 dark:text-white/70 hover:text-black dark:hover:text-white transition-colors" title="Close">
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Messages Area */}
            {!isMinimized && (
              <>
                <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                  {messages.map((msg) => (
                    <div key={msg.id} className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                      <div 
                        className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm whitespace-pre-wrap ${
                          msg.sender === 'user' 
                            ? 'bg-primary text-primary-foreground rounded-br-sm shadow-sm' 
                            : 'bg-black/5 dark:bg-white/10 text-black/90 dark:text-white/90 border border-black/5 dark:border-white/5 rounded-bl-sm'
                        }`}
                      >
                        {msg.text}
                      </div>
                      
                      {/* Quick Replies */}
                      {msg.quickReplies && msg.quickReplies.length > 0 && msg.sender === 'bot' && (
                        <div className="flex flex-wrap gap-2 mt-3 w-full">
                          {msg.quickReplies.map((reply, i) => (
                            <button
                              key={i}
                              onClick={() => handleQuickReply(reply)}
                              className="px-3 py-1.5 text-xs rounded-full bg-transparent border border-black/20 dark:border-white/20 text-black/80 dark:text-white/80 hover:bg-black/10 dark:hover:bg-white/10 hover:border-black/40 dark:hover:border-white/40 transition-colors"
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
                      <div className="bg-black/5 dark:bg-white/10 border border-black/5 dark:border-white/5 rounded-2xl rounded-bl-sm px-4 py-3 flex gap-1.5">
                        <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0 }} className="w-1.5 h-1.5 bg-black/50 dark:bg-white/50 rounded-full" />
                        <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} className="w-1.5 h-1.5 bg-black/50 dark:bg-white/50 rounded-full" />
                        <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} className="w-1.5 h-1.5 bg-black/50 dark:bg-white/50 rounded-full" />
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className="p-3 border-t border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5">
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleSend(inputValue);
                      }}
                      placeholder="Type your message..."
                      className="flex-1 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-full px-4 py-2 text-sm text-black dark:text-white placeholder:text-black/40 dark:placeholder:text-white/40 focus:outline-none focus:border-black/30 dark:focus:border-white/30 transition-colors"
                      disabled={submitting}
                    />
                    <button
                      onClick={() => handleSend(inputValue)}
                      disabled={!inputValue.trim() || submitting}
                      className="p-2 rounded-full bg-primary text-primary-foreground hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
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
