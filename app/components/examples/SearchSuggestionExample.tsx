"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

// Sample data for suggestions - in a real application, this would likely come from an API or database
const sampleItems = [
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "CSS",
  "HTML",
  "Tailwind CSS",
  "Redux",
  "GraphQL",
  "REST API",
  "MongoDB",
  "PostgreSQL",
  "Express",
  "Vue.js",
  "Angular",
  "Svelte",
  "Docker",
  "Kubernetes",
  "AWS",
  "Firebase",
  "Vercel",
  "Netlify",
]

export default function SearchBar() {
  // State to store the current search query
  const [query, setQuery] = useState("")

  // State to store the filtered suggestions based on the query
  const [suggestions, setSuggestions] = useState<string[]>([])

  // State to control whether the suggestions dropdown is visible
  const [showSuggestions, setShowSuggestions] = useState(false)

  // State to track which suggestion is currently selected/highlighted (-1 means none)
  const [selectedIndex, setSelectedIndex] = useState(-1)

  // Ref to the search input element for focus management
  const inputRef = useRef<HTMLInputElement>(null)

  // Ref to the suggestions dropdown for detecting clicks outside
  const suggestionsRef = useRef<HTMLDivElement>(null)

  /**
   * Effect that filters the sample items based on the current query
   * Runs whenever the query changes
   */
  useEffect(() => {
    // If the query is empty, clear suggestions and exit
    if (query.trim() === "") {
      setSuggestions([])
      return
    }

    // Filter items that include the query (case-insensitive)
    const filteredItems = sampleItems.filter((item) => item.toLowerCase().includes(query.toLowerCase()))
    setSuggestions(filteredItems)
  }, [query])

  /**
   * Effect that handles clicks outside the search component
   * Closes the suggestions dropdown when user clicks elsewhere
   */
  useEffect(() => {
    // Function to handle clicks outside the component
    const handleClickOutside = (event: MouseEvent) => {
      // Check if the click was outside both the input and suggestions dropdown
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node) &&
        !inputRef.current?.contains(event.target as Node)
      ) {
        setShowSuggestions(false)
      }
    }

    // Add the event listener when the component mounts
    document.addEventListener("mousedown", handleClickOutside)

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  /**
   * Handles keyboard navigation within the suggestions dropdown
   * Supports arrow keys, Enter, and Escape
   * @param e - The keyboard event
   */
  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Arrow Down: Move selection to the next suggestion
    if (e.key === "ArrowDown") {
      e.preventDefault() // Prevent page scrolling
      setSelectedIndex((prevIndex) => (prevIndex < suggestions.length - 1 ? prevIndex + 1 : prevIndex))
    }
    // Arrow Up: Move selection to the previous suggestion
    else if (e.key === "ArrowUp") {
      e.preventDefault() // Prevent page scrolling
      setSelectedIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : -1))
    }
    // Enter: Select the currently highlighted suggestion
    else if (e.key === "Enter" && selectedIndex >= 0) {
      e.preventDefault()
      setQuery(suggestions[selectedIndex])
      setShowSuggestions(false)
      setSelectedIndex(-1)
    }
    // Escape: Close the suggestions dropdown
    else if (e.key === "Escape") {
      setShowSuggestions(false)
      setSelectedIndex(-1)
    }
  }

  /**
   * Handles when a user clicks on a suggestion
   * Sets the query to the selected suggestion and closes the dropdown
   * @param suggestion - The suggestion text that was clicked
   */
  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion)
    setShowSuggestions(false)
    setSelectedIndex(-1)
    inputRef.current?.focus() // Return focus to the input field
  }

  return (
    <div className="w-full max-w-md mx-auto p-4">
      <div className="relative">
        <div className="relative">
          {/* Search input field */}
          <Input
            ref={inputRef}
            type="text"
            placeholder="Search..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              setShowSuggestions(true)
              setSelectedIndex(-1)
            }}
            onFocus={() => setShowSuggestions(true)}
            onKeyDown={handleKeyDown}
            className="pr-10"
          />
          {/* Search icon button */}
          <Button size="icon" variant="ghost" className="absolute right-0 top-0 h-full px-3 py-2 text-muted-foreground">
            <Search className="h-4 w-4" />
          </Button>
        </div>

        {/* Suggestions dropdown - only shown when there are suggestions and showSuggestions is true */}
        {showSuggestions && suggestions.length > 0 && (
          <div ref={suggestionsRef} className="absolute z-10 mt-1 w-full rounded-md border bg-background shadow-lg">
            <ul className="py-1 max-h-60 overflow-auto">
              {suggestions.map((suggestion, index) => (
                <li
                  key={suggestion}
                  className={cn(
                    "px-4 py-2 text-sm cursor-pointer hover:bg-muted",
                    selectedIndex === index && "bg-muted", // Highlight the selected suggestion
                  )}
                  onClick={() => handleSuggestionClick(suggestion)}
                  onMouseEnter={() => setSelectedIndex(index)} // Update selected index on hover
                >
                  {suggestion}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Display the current search query */}
      {query && (
        <div className="mt-4 text-sm text-muted-foreground">
          Searching for: <span className="font-medium">{query}</span>
        </div>
      )}
    </div>
  )
}
