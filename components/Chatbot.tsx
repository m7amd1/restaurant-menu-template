"use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot, User } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { ScrollArea } from "./ui/scroll-area";
import { Avatar, AvatarFallback } from "./ui/avatar";

interface Message {
  id: number;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Welcome to The Gourmet Restaurant! 👋\nHow can I help you today?",
      isBot: true,
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const botResponses = {
    hello: "Hello! Welcome to The Gourmet Restaurant! How can I assist you?",
    hi: "Hi there! How can I help you today?",
    menu: "You can browse our diverse menu at the top of the page. We have beverages, appetizers, main dishes, and delicious desserts!",
    price:
      "Our prices start from ₪15 for beverages and ₪25 for appetizers. You can see the price for each dish in the menu.",
    delivery:
      "Yes, we provide delivery service throughout Tel Aviv within 30-45 minutes. Delivery fee is ₪10.",
    hours:
      "We are open Sunday to Thursday from 10 AM to 12 AM, and Friday-Saturday from 2 PM to 12 AM.",
    location: "We are located at 123 Gourmet Street, Tel Aviv, Israel.",
    reservation:
      "To reserve a table, please call +972-3-123-4567 or you can book through our website.",
    payment:
      "We accept cash, credit cards, Israeli debit cards, Apple Pay, and other digital payment methods.",
    default:
      "Sorry, I didn't understand your question. You can ask about: menu, prices, delivery, hours, location, reservations, or payment methods.",
  };

  const getBotResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();

    for (const [key, response] of Object.entries(botResponses)) {
      if (key !== "default" && message.includes(key)) {
        return response;
      }
    }

    return botResponses.default;
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const sendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      text: inputMessage,
      isBot: false,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);

    // Simulate bot thinking time
    setTimeout(() => {
      const botResponse: Message = {
        id: Date.now() + 1,
        text: getBotResponse(inputMessage),
        isBot: true,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000); // 1-2 seconds delay
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Scroll to bottom when chat opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        scrollToBottom();
      }, 100);
    }
  }, [isOpen]);

  return (
    <>
      {/* Chat Button */}
      <Button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg transition-all duration-200 z-40 hover:scale-110 animate-pulse hover:animate-none cursor-pointer ${
          isOpen ? "scale-0" : "scale-100"
        }`}
        size="icon"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-80 h-96 z-50 shadow-xl animate-in slide-in-from-right-4 fade-in-0 duration-200">
          <Card className="h-full flex flex-col border bg-background">
            <CardHeader className="flex flex-row items-center justify-between pb-3 flex-shrink-0">
              <div className="flex items-center space-x-2">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    <Bot className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-sm">Gourmet Assistant</CardTitle>
                  <p className="text-xs text-muted-foreground">Online now</p>
                </div>
              </div>
              <Button
                variant="destructive"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="h-6 w-6 cursor-pointer hover:scale-110 transition-all duration-200"
              >
                <X className="h-4 w-4" />
              </Button>
            </CardHeader>

            <CardContent className="flex flex-col flex-1 p-0 min-h-0">
              {/* Messages */}
              <div className="flex-1 overflow-hidden">
                <ScrollArea className="h-full px-4 py-2">
                  <div className="space-y-3">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${
                          message.isBot ? "justify-start" : "justify-end"
                        }`}
                      >
                        <div
                          className={`max-w-[85%] rounded-lg px-3 py-2 text-sm ${
                            message.isBot
                              ? "bg-muted text-foreground"
                              : "bg-primary text-primary-foreground"
                          }`}
                        >
                          <div
                            className={`flex items-start space-x-2 ${
                              message.isBot
                                ? ""
                                : "flex-row-reverse space-x-reverse"
                            }`}
                          >
                            {message.isBot && (
                              <Bot className="h-3 w-3 mt-0.5 flex-shrink-0" />
                            )}
                            {!message.isBot && (
                              <User className="h-3 w-3 mt-0.5 flex-shrink-0" />
                            )}
                            <div className="whitespace-pre-wrap">
                              {message.text}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}

                    {/* Typing Indicator */}
                    {isTyping && (
                      <div className="flex justify-start">
                        <div className="bg-muted rounded-lg px-3 py-2 max-w-xs">
                          <div className="flex items-center space-x-2">
                            <Bot className="h-3 w-3" />
                            <div className="flex space-x-1">
                              <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                              <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce delay-100"></div>
                              <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce delay-200"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>
                </ScrollArea>
              </div>

              {/* Input */}
              <div className="border-t p-3 flex-shrink-0">
                <div className="flex space-x-2">
                  <Input
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your message..."
                    className="flex-1"
                    disabled={isTyping}
                  />
                  <Button
                    onClick={sendMessage}
                    size="icon"
                    disabled={!inputMessage.trim() || isTyping}
                    className="h-9 w-9 hover:scale-110 transition-all duration-200"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
}
