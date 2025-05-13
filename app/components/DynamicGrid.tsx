"use client";

import React from 'react';
import { Plus } from "@phosphor-icons/react";
import Tag from './Tag';
import { cn } from "@/lib/utils";

const svgSize = '16px'

const StaticHeader = () => {
  return (
    <div className="flex justify-between">
      <Plus size={svgSize} weight="bold" />
      <div className='flex-1 flex items-center mx-1'>
        <div className='h-[2px] w-full bg-gray-200' />
      </div>
      <Plus size={svgSize} weight="bold" />
    </div>
  )
}

const DynamicHeader = ({ row = 1 }: { row?: number }) => {
  // Generate additional dividers and icons based on row number
  const renderAdditionalDividers = () => {
    if (row <= 1) return null;

    const elements = [];

    // Add additional dividers and icons for rows > 1
    for (let i = 1; i < row; i++) {
      elements.push(
        <React.Fragment key={`divider-${i}`}>
          <Plus size={svgSize} weight="bold" />
          <div className='flex-1 flex items-center mx-1'>
            <div className='h-[2px] w-full bg-[#d2d2d2]' />
          </div>
        </React.Fragment>
      );
    }

    return elements;
  };

  return (
    <div className="flex justify-between">
      <Plus size={svgSize} weight="bold" />
      <div className='flex-1 flex items-center mx-1'>
        <div className='h-[2px] w-full bg-[#d2d2d2]' />
      </div>
      {renderAdditionalDividers()}
      <Plus size={svgSize} weight="bold" />
    </div>
  );
}

const StaticContent = () => {
  return (
    <div className='flex flex-row w-full'>
      <div className='flex justify-center py-1' style={{ width: svgSize }}>
        <div className='w-[2px] h-full bg-[#d2d2d2]' />
      </div>
      <img className='w-full p-2' src="https://picsum.photos/600/400" alt="Random Image" />
      <div className='flex justify-center py-1' style={{ width: svgSize }}>
        <div className='w-[2px] h-full bg-[#d2d2d2]' />
      </div>
    </div>
  )
}

const DynamicGridCol = ({ className }: { className?: string }) => {
  return (
    <div className={cn("flex justify-center py-1 w-[16px]", className)} style={{ width: svgSize }}>
      <div className='w-[2px] h-full bg-[#d2d2d2]' />
    </div>
  );
}

const DynamicContent = () => {
  return (
    <div className='flex flex-row w-full'>
      <DynamicGridCol />
      <div className='w-full flex flex-row'>
        <img className='w-1/2 p-2' src="https://picsum.photos/600/400" alt="Random Image" />
        <DynamicGridCol />
        <img className='w-1/2 p-2' src="https://picsum.photos/600/400" alt="Random Image" />
      </div>
      <DynamicGridCol />
    </div>
  )
}

const DynamicGridDemo = () => {
  return (
    <div>
      <StaticHeader />
      <DynamicHeader row={3} />
      <StaticContent />
      <DynamicContent />
      <DynamicHeader row={2} />
      <StaticHeader />
    </div>
  )
}

const DynamicGridDemo2 = () => {
  return (
    <>
      <div>
        <DynamicHeader row={2} />
        <DynamicContent />
        <DynamicHeader row={2} />
      </div>
      <div className="mt-6">
        <h4 className="mb-3">One Button Parser</h4>
        <div className="flex gap-2">
          <Tag>CONVENIENCE</Tag>
          <Tag>USABILITY</Tag>
        </div>
      </div>
    </>
  )
}

export { DynamicGridDemo, DynamicGridDemo2, DynamicHeader, DynamicContent, StaticHeader, DynamicGridCol }