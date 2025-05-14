'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SearchComponentProps {
    items?: string[];
    onSearch?: (query: string) => void;
    placeholder?: string;
    className?: string;
}

export const SearchComponent: React.FC<SearchComponentProps> = ({
    items = [],
    onSearch,
    placeholder = "Search...",
    className
}) => {
    const [query, setQuery] = useState("");
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(-1);

    const inputRef = useRef<HTMLInputElement>(null);
    const suggestionsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (query.trim() === "") {
            setSuggestions([]);
            return;
        }

        const filteredItems = items.filter((item) => 
            item.toLowerCase().includes(query.toLowerCase())
        );
        setSuggestions(filteredItems);
    }, [query, items]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                suggestionsRef.current &&
                !suggestionsRef.current.contains(event.target as Node) &&
                !inputRef.current?.contains(event.target as Node)
            ) {
                setShowSuggestions(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "ArrowDown") {
            e.preventDefault();
            setSelectedIndex((prevIndex) => 
                (prevIndex < suggestions.length - 1 ? prevIndex + 1 : prevIndex)
            );
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setSelectedIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : -1));
        } else if (e.key === "Enter" && selectedIndex >= 0) {
            e.preventDefault();
            setQuery(suggestions[selectedIndex]);
            setShowSuggestions(false);
            setSelectedIndex(-1);
            onSearch?.(suggestions[selectedIndex]);
        } else if (e.key === "Escape") {
            setShowSuggestions(false);
            setSelectedIndex(-1);
        }
    };

    const handleSuggestionClick = (suggestion: string) => {
        setQuery(suggestion);
        setShowSuggestions(false);
        setSelectedIndex(-1);
        onSearch?.(suggestion);
        inputRef.current?.focus();
    };

    return (
        <div className={cn("relative", className)}>
            <div className="relative">
                <Input
                    ref={inputRef}
                    type="text"
                    placeholder={placeholder}
                    value={query}
                    onChange={(e) => {
                        setQuery(e.target.value);
                        setShowSuggestions(true);
                        setSelectedIndex(-1);
                    }}
                    onFocus={() => setShowSuggestions(true)}
                    onKeyDown={handleKeyDown}
                    className="pr-10"
                />
                <Button 
                    size="icon" 
                    variant="ghost" 
                    className="absolute right-0 top-0 h-full px-3 py-2 text-muted-foreground"
                >
                    <Search className="h-4 w-4" />
                </Button>
            </div>

            {showSuggestions && suggestions.length > 0 && (
                <div 
                    ref={suggestionsRef} 
                    className="absolute z-10 mt-1 w-full rounded-md border bg-background shadow-lg"
                >
                    <ul className="py-1 max-h-60 overflow-auto">
                        {suggestions.map((suggestion, index) => (
                            <li
                                key={suggestion}
                                className={cn(
                                    "px-4 py-2 text-sm cursor-pointer hover:bg-muted",
                                    selectedIndex === index && "bg-muted"
                                )}
                                onClick={() => handleSuggestionClick(suggestion)}
                                onMouseEnter={() => setSelectedIndex(index)}
                            >
                                {suggestion}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}; 