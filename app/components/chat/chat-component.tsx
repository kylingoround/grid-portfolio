"use client";

import React, { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { useOnClickOutside } from "usehooks-ts";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Asterisk } from "@phosphor-icons/react";
import { ChatInput } from "./chat-input";

export const ChatComponent = () => {
  const [open, setOpen] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(wrapperRef as React.RefObject<HTMLElement>, () =>
    setOpen(false)
  );

  return (
    <div className="fixed bottom-8 w-full flex justify-center">
      <div
        ref={wrapperRef}
        className="flex flex-col-reverse items-center"
      >
        {/* {open && showSuggestions && <div>Suggestions</div>} */}
        {open && showChat && <div>Chat</div>}
        <div>
          <ChatInput
            open={open}
            setOpen={setOpen}
            showSuggestions={showSuggestions}
            setShowSuggestions={setShowSuggestions}
          />
        </div>
      </div>
    </div>
  );
};
