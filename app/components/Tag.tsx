"use client";

import React from 'react';

interface TagProps {
  children: React.ReactNode;
  className?: string;
}

const Tag: React.FC<TagProps> = ({ children, className = '' }) => {
  return (
    <div className={`inline-flex items-center px-3 py-1 bg-[#BFBFBF] text-gray-800 text-sm font-mono ${className}`}>
      {children}
    </div>
  );
};

export default Tag;
