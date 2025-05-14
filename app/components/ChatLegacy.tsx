"use client";

import React, { useRef } from 'react';
import { useOnClickOutside } from "usehooks-ts";
import { Input } from "@/components/ui/input";

interface Message {
    id: string;
    content: string;
    sender: 'user' | 'assistant';
    timestamp: Date;
}

interface ChatProps {
    messages?: Message[];
    onSendMessage?: (message: string) => void;
}

type View = 'default' | 'suggestions' | 'chat';

const mockAIResponse = async (message: string): Promise<string> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Mock responses based on message content
    const lowerMessage = message.toLowerCase();
    if (lowerMessage.includes('project')) {
        return "I've worked on several interesting projects, including a real-time collaboration platform and an AI-powered analytics dashboard. Would you like to know more about any specific project?";
    }
    if (lowerMessage.includes('skill')) {
        return "My key skills include full-stack development, AI/ML integration, and cloud architecture. I'm particularly experienced with React, Node.js, and Python.";
    }
    if (lowerMessage.includes('help')) {
        return "I can help you with project planning, technical consulting, or development work. What specific area are you interested in?";
    }
    return "That's an interesting point. Could you tell me more about what you're looking to achieve?";
};

const Chat: React.FC<ChatProps> = ({ messages: initialMessages = [], onSendMessage }) => {
    const [view, setView] = React.useState<View>('default');
    const [inputMessage, setInputMessage] = React.useState('');
    const [isInputActive, setIsInputActive] = React.useState(false);
    const [messages, setMessages] = React.useState<Message[]>(initialMessages);
    const [isLoading, setIsLoading] = React.useState(false);
    const chatRef = useRef<HTMLDivElement>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    React.useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useOnClickOutside(chatRef as React.RefObject<HTMLElement>, () => {
        if (view !== 'default') {
            setView('default');
            setIsInputActive(false);
        }
    }, 'mousedown');

    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setInputMessage(e.target.value);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey && inputMessage.trim()) {
            e.preventDefault();
            handleSubmit(e as unknown as React.FormEvent);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (inputMessage.trim()) {
            const userMessage: Message = {
                id: Date.now().toString(),
                content: inputMessage,
                sender: 'user',
                timestamp: new Date()
            };

            setMessages(prev => [...prev, userMessage]);
            setInputMessage('');
            setView('chat');
            setIsLoading(true);

            try {
                const aiResponse = await mockAIResponse(inputMessage);
                const assistantMessage: Message = {
                    id: (Date.now() + 1).toString(),
                    content: aiResponse,
                    sender: 'assistant',
                    timestamp: new Date()
                };
                setMessages(prev => [...prev, assistantMessage]);
            } catch (error) {
                console.error('Error getting AI response:', error);
            } finally {
                setIsLoading(false);
            }
        }
    };

    const handleInboxClick = () => {
        setView('suggestions');
        setIsInputActive(true);
    };

    const handleSuggestionClick = (suggestion: string) => {
        setInputMessage(suggestion);
        setIsInputActive(true);
    };

    // Chat Inbox View
    const InboxView = () => (
        <div
            ref={chatRef}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 flex flex-col h-12 w-full max-w-2xl bg-card rounded-lg shadow-lg cursor-pointer hover:bg-card/90 transition-colors"
            onClick={handleInboxClick}
        >
            <div className="flex-1 px-4 flex items-center">
                <div className="text-center w-full">
                    <p className="text-muted-foreground">Type a message or click to see suggestions</p>
                </div>
            </div>
        </div>
    );

    // Suggestions View
    const SuggestionsView = () => (
        <div
            ref={chatRef}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 flex flex-col w-full max-w-2xl bg-card rounded-lg shadow-lg"
        >
            {/* Suggestions Panel */}
            <div className="p-4 border-b border-border">
                <h3 className="text-sm font-medium text-muted-foreground mb-3">Suggestions</h3>
                <div className="grid gap-2">
                    {['Tell me about your projects', 'How can I help you?', 'What are your skills?'].map((suggestion, index) => (
                        <button
                            key={index}
                            onClick={() => handleSuggestionClick(suggestion)}
                            className="p-3 text-left bg-muted hover:bg-muted/80 rounded-lg transition-colors text-sm"
                        >
                            {suggestion}
                        </button>
                    ))}
                </div>
            </div>

            {/* Input Form */}
            <div className="p-4">
                <div className="flex gap-2">
                    <textarea
                        value={inputMessage}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyDown}
                        placeholder="Type a message..."
                        className="flex-1"
                        autoFocus
                    />
                    <button
                        type="button"
                        onClick={handleSubmit}
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
    );

    // Chat Interface View
    const ChatView = () => (
        <div
            ref={chatRef}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 flex flex-col h-[600px] w-full max-w-2xl bg-card rounded-lg shadow-lg"
        >
            {/* Messages Container */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                    <div
                        key={message.id}
                        className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                        <div
                            className={`max-w-[80%] rounded-lg p-3 ${message.sender === 'user'
                                ? 'bg-primary text-primary-foreground'
                                : 'bg-muted text-muted-foreground'
                                }`}
                        >
                            {message.content}
                        </div>
                    </div>
                ))}
                {isLoading && (
                    <div className="flex justify-start">
                        <div className="max-w-[80%] rounded-lg p-3 bg-muted text-muted-foreground">
                            <div className="flex space-x-2">
                                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
                                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce delay-100" />
                                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce delay-200" />
                            </div>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Form */}
            <div className="p-4 border-t border-border">
                <div className="flex gap-2">
                    <textarea
                        value={inputMessage}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyDown}
                        placeholder="Type a message..."
                        className="flex-1"
                    />
                    <button
                        type="button"
                        onClick={handleSubmit}
                        disabled={isLoading}
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
    );

    // Render the appropriate view
    switch (view) {
        case 'suggestions':
            return <SuggestionsView />;
        case 'chat':
            return <ChatView />;
        default:
            return <InboxView />;
    }
};

export default Chat; 