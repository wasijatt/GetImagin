"use client"; // Ensure this component runs only on the client side
import { useEffect, useRef, useState } from 'react';

const SmoothScroll = ({ children }) => {
  const scrollContainerRef = useRef(null);
  const targetScrollY = useRef(0);
  const currentScrollY = useRef(0);
  const animationFrameId = useRef(null);
  const [contentHeight, setContentHeight] = useState(0);

  // Lerp function for smooth interpolation
  const lerp = (start, end, ease) => {
    return start * (1 - ease) + end * ease;
  };

  // Smooth scroll animation
  const smoothScroll = () => {
    if (!scrollContainerRef.current) return;

    // Interpolate the scroll position
    currentScrollY.current = lerp(
      currentScrollY.current,
      targetScrollY.current,
      0.1 // Adjust the easing factor (0.1 = smooth, 0.9 = faster)
    );

    // Apply the interpolated scroll position
    scrollContainerRef.current.style.transform = `translateY(-${currentScrollY.current}px)`;

    // Continue the animation
    animationFrameId.current = requestAnimationFrame(smoothScroll);
  };

  // Handle scroll events
  const handleScroll = () => {
    if (!scrollContainerRef.current) return;

    // Update the target scroll position
    targetScrollY.current = window.scrollY || window.pageYOffset;

    // Clamp the scroll position to prevent overscrolling
    targetScrollY.current = Math.max(0, Math.min(targetScrollY.current, contentHeight - window.innerHeight));
  };

  // Calculate the total height of the content
  const calculateContentHeight = () => {
    if (scrollContainerRef.current) {
      const height = scrollContainerRef.current.scrollHeight;
      setContentHeight(height);
    }
  };

  useEffect(() => {
    // Calculate the initial content height
    calculateContentHeight();

    // Recalculate content height on window resize
    window.addEventListener('resize', calculateContentHeight);

    // Start the smooth scroll animation
    animationFrameId.current = requestAnimationFrame(smoothScroll);

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);

    // Cleanup
    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', calculateContentHeight);
    };
  }, [contentHeight]);

  return (
    <div
      ref={scrollContainerRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        willChange: 'transform', // Optimize for performance
      }}
    >
      {children}
    </div>
  );
};

export default SmoothScroll;