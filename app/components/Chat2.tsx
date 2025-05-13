'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useOnClickOutside } from "usehooks-ts";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { AnimatePresence, motion } from 'framer-motion';

type View = 'idle' | 'suggestions' | 'chat';

const Chat = () => {
    const [open, setOpen] = useState(false);
    const [viewState, setView] = useState<View>('idle');
    const ref = useRef<HTMLDivElement>(null);

    useOnClickOutside(ref as React.RefObject<HTMLElement>, () => setOpen(false));

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setView('chat');
    };

    const DefaultView = () => (
        <>
            <motion.div
                layoutId='chat-button'
                className="px-4 py-2 bg-white text-primary  hover:bg-gray-50 transition-colors "
                onClick={() => setOpen(true)}
            >
                <button>
                Open Chat
                </button>
            </motion.div>
        </>
    );

    const sampleItems = [
        "JavaScript",
        "TypeScript",
        "React"]

    const SuggestionsView = () => {

        const [query, setQuery] = useState('');
        const [suggestions, setSuggestions] = useState<string[]>([]);
        const [showSuggestions, setShowSuggestions] = useState(false);

        const inputRef = useRef<HTMLInputElement>(null);
        const suggestionsRef = useRef<HTMLDivElement>(null);

        useEffect(() => {
            if (query.trim() === "") {
                setSuggestions([]);
                return;
            }

            const filteredItems= sampleItems.filter((item) => item.toLowerCase().includes(query.toLowerCase()));
            setSuggestions(filteredItems);
        }, [query]);

        const SearchSuggestions = () =>  
        <div className='flex flex-col gap-2'>
            <h2>Suggestions</h2>
            <div className='flex flex-row gap-2 '>
                <div className='p-4 border border-border rounded-md'>Suggestion Items</div>
                <div className='p-4 border border-border rounded-md'>Suggestion Items</div>
                <div className='p-4 border border-border rounded-md'>Suggestion Items</div>
            </div>
        </div>

        const SearchInput = () =>
        <div className='relative'>
            <Input  className='pr-10 h-11'/>
            <motion.div layoutId='chat-button'>
                <Button 
                    size="icon" 
                    variant="ghost" 
                    className="absolute right-1 -translate-y-1/2 top-1/2 text-muted-foreground hover:bg-muted/50" 
                >
                    <Search className="h-4 w-4" />
                </Button>
            </motion.div>
        </div>
        
        
        return <div className='flex flex-col gap-2 p-4 border-b border-border items-left '>

            <SearchSuggestions/>
            <SearchInput/>
       
        {/* <form onSubmit={handleSubmit}> */}
        
        {/* </form> */}
    </div>}
    const ChatView = () => <div>Chat View</div>

    return (<div className='fixed bottom-8 w-full flex justify-center'>
        <div ref={ref}>
            <AnimatePresence>
                {!open ?
                    <motion.div
                        layoutId='chat-wrapper' 
                        className='border border-border rounded-md shadow-sm overflow-hidden  bg-white text-primary'>
                        <DefaultView />
                    </motion.div> :
                    <motion.div 
                        layoutId='chat-wrapper'
                        className='border border-border rounded-md shadow-sm overflow-hidden  bg-white text-primary'>
                        <SuggestionsView />
                    </motion.div>
                }
            </AnimatePresence>
        </div>
    </div>)
}

// input open up suggestions
// input focus > open, 
// suggestions after search leads to chat


export default Chat;