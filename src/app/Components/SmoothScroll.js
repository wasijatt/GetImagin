"use client";
import { useSmoothScroll } from '@/app/hooks/useSmoothScroll';

export const SmoothScroll = ({ children }) => {
  const { contentRef, scrollingContainerRef } = useSmoothScroll();

  return (
    <div 
      ref={scrollingContainerRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        willChange: 'transform',
        backfaceVisibility: 'hidden',
      }}
    >
      <div ref={contentRef}
       style={{
        minHeight: '100vh',
        width: '100%',
      }}>
        {children}
      </div>
    </div>
  );
}; 