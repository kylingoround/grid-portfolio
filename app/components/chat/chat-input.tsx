"use client";

import React, { useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Asterisk } from "@phosphor-icons/react";

const sampleSuggestions = ["JavaScript", "TypeScript", "React"];

export type ChatInputProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  showSuggestions: boolean;
  setShowSuggestions: (showSuggestions: boolean) => void;
};

type SuggestionsProps = {
  filteredSuggestions: string[];
  setQuery: (query: string) => void;
  setShowSuggestions: (showSuggestions: boolean) => void;
};

const Suggestions = ({
  filteredSuggestions,
  setQuery,
  setShowSuggestions,
}: SuggestionsProps) => {
  return (
    <div className="absolute bottom-full left-0 mb-2 w-full z-10">
      <ul className="bg-[#D4D4D4] rounded shadow p-0 m-0 list-none">
        {filteredSuggestions.map((suggestion) => (
          <li
            key={suggestion}
            className="px-3 py-2 cursor-pointer"
            onClick={() => {
              setQuery(suggestion);
              setShowSuggestions(false);
            }}
          >
            {suggestion}
          </li>
        ))}
      </ul>
    </div>
  );
};

export const ChatInput = ({
  open,
  setOpen,
  showSuggestions,
  setShowSuggestions,
}: ChatInputProps) => {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const filteredSuggestions =
    query.trim() === ""
      ? []
      : sampleSuggestions.filter((item) =>
          item.toLowerCase().includes(query.toLowerCase())
        );

  return (
    <div
      className="flex items-center w-full relative bg-[rgba(107,114,128,.2)] rounded-md box-border"
      style={{
        backdropFilter: "blur(22px)",
        border:
          open || isHovered
            ? "1px solid hsl(220, 50%, 95%, 0.2)"
            : "1px solid hsl(220, 50%, 95%, 0)",
      }}
    >
      <span className="ml-2 text-[rgba(107,114,128,1)]">
        <Asterisk
          size={16}
          weight="bold"
        />
      </span>
      <Input
        ref={inputRef}
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setShowSuggestions(true);
        }}
        placeholder="ask anything"
        onFocus={() => setOpen(true)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className=" border-none outline-none focus:outline-none focus:ring-0 focus:border-none shadow-none focus:shadow-none transition-all duration-300 flex-1 ml-2"
        style={{
          width: open ? "20rem" : "15rem",
          transition: "width 0.3s, color 0.3s, opacity 0.3s, ",
          color:
            open || isHovered ? "rgba(107,114,128,1)" : "rgba(107,114,128,0.5)",
        }}
      />
      {open && showSuggestions && filteredSuggestions.length > 0 && (
        <Suggestions
          filteredSuggestions={filteredSuggestions}
          setQuery={setQuery}
          setShowSuggestions={setShowSuggestions}
        />
      )}
    </div>
  );
};
