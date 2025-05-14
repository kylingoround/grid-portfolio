'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Search } from "lucide-react";

interface SuggestionGroup {
    title: string;
    items: string[];
}

// Sample data for testing
const sampleSuggestionGroups: SuggestionGroup[] = [
    {
        title: "Fruits",
        items: [
            "Apple",
            "Banana",
            "Orange",
            "Strawberry",
            "Blueberry",
            "Mango",
            "Pineapple",
            "Watermelon",
            "Grape",
            "Kiwi"
        ]
    },
    {
        title: "Vegetables",
        items: [
            "Carrot",
            "Broccoli",
            "Spinach",
            "Tomato",
            "Cucumber",
            "Bell Pepper",
            "Potato",
            "Onion",
            "Garlic",
            "Lettuce"
        ]
    },
    {
        title: "Projects",
        items: [
            "Portfolio Website",
            "E-commerce Platform",
            "Task Management App",
            "Weather Dashboard",
            "Recipe Finder",
            "Fitness Tracker",
            "Budget Calculator",
            "Social Media Dashboard",
            "Real Estate Listing",
            "Travel Planner"
        ]
    }
];

interface SuggestionsViewProps {
    suggestionGroups?: SuggestionGroup[];
    onSuggestionSelect?: (suggestion: string) => void;
    placeholder?: string;
    className?: string;
    value: string;
    onChange: (value: string) => void;
    showSuggestions: boolean;
    onShowSuggestionsChange: (show: boolean) => void;
}

export const SuggestionsView: React.FC<SuggestionsViewProps> = ({
    suggestionGroups = sampleSuggestionGroups,
    onSuggestionSelect,
    placeholder = "Type to search...",
    className,
    value,
    onChange,
    showSuggestions,
    onShowSuggestionsChange
}) => {
    const [filteredGroups, setFilteredGroups] = useState<SuggestionGroup[]>([]);
    const [selectedIndex, setSelectedIndex] = useState(-1);

    const inputRef = useRef<HTMLInputElement>(null);
    const suggestionsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (value.trim() === "") {
            setFilteredGroups([]);
            return;
        }

        const filtered = suggestionGroups.map(group => ({
            ...group,
            items: group.items.filter(item => 
                item.toLowerCase().includes(value.toLowerCase())
            )
        })).filter(group => group.items.length > 0);

        setFilteredGroups(filtered);
    }, [value, suggestionGroups]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                suggestionsRef.current &&
                !suggestionsRef.current.contains(event.target as Node) &&
                !inputRef.current?.contains(event.target as Node)
            ) {
                onShowSuggestionsChange(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [onShowSuggestionsChange]);

    const handleKeyDown = (e: React.KeyboardEvent) => {
        const totalSuggestions = filteredGroups.reduce((acc, group) => acc + group.items.length, 0);
        
        if (e.key === "ArrowDown") {
            e.preventDefault();
            setSelectedIndex((prevIndex) => 
                (prevIndex < totalSuggestions - 1 ? prevIndex + 1 : prevIndex)
            );
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setSelectedIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : -1));
        } else if (e.key === "Enter" && selectedIndex >= 0) {
            e.preventDefault();
            let currentIndex = 0;
            for (const group of filteredGroups) {
                for (const item of group.items) {
                    if (currentIndex === selectedIndex) {
                        onChange(item);
                        onShowSuggestionsChange(false);
                        setSelectedIndex(-1);
                        onSuggestionSelect?.(item);
                        return;
                    }
                    currentIndex++;
                }
            }
        } else if (e.key === "Escape") {
            onShowSuggestionsChange(false);
            setSelectedIndex(-1);
        }
    };

    const handleSuggestionClick = (suggestion: string) => {
        onChange(suggestion);
        onShowSuggestionsChange(false);
        setSelectedIndex(-1);
        onSuggestionSelect?.(suggestion);
        inputRef.current?.focus();
    };

    return (
        <div>
            <div>
                <input
                    ref={inputRef}
                    type="text"
                    placeholder={placeholder}
                    value={value}
                    onChange={(e) => {
                        onChange(e.target.value);
                        onShowSuggestionsChange(e.target.value.trim().length > 0);
                        setSelectedIndex(-1);
                    }}
                    onFocus={() => onShowSuggestionsChange(value.trim().length > 0)}
                    onKeyDown={handleKeyDown}
                />
                <button>
                    <Search />
                </button>
            </div>

            {showSuggestions && filteredGroups.length > 0 && (
                <div ref={suggestionsRef}>
                    {filteredGroups.map((group, groupIndex) => (
                        <div key={group.title}>
                            <h3>
                                {group.title}
                            </h3>
                            <ul>
                                {group.items.map((item, itemIndex) => {
                                    const globalIndex = filteredGroups
                                        .slice(0, groupIndex)
                                        .reduce((acc, g) => acc + g.items.length, 0) + itemIndex;
                                    
                                    return (
                                        <li
                                            key={item}
                                            onClick={() => handleSuggestionClick(item)}
                                            onMouseEnter={() => setSelectedIndex(globalIndex)}
                                        >
                                            {item}
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}; 