"use client";
import { useRef, useEffect } from 'react';
import Image from 'next/image';

const CustomCursor = ({ cursorContent }) => {
  const cursorRef = useRef();

  // Function to handle mouse movement
  const handleMouseMove = (event) => {
    if (cursorRef.current) {
      cursorRef.current.style.left = `${event.clientX}px`;
      cursorRef.current.style.top = `${event.clientY}px`;
    }
  };

  useEffect(() => {
    // Add event listener for mouse move
    document.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      // Cleanup the event listener on component unmount
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className={`custom-cursor ${cursorContent ? 'active' : ''}`}
      style={{
        position: 'fixed',
        pointerEvents: 'none',
        mixBlendMode: 'difference',
        transition: ' .8s ease-out', // Reduced transition time for smoother movement
      }}
    >
      {cursorContent && (
        <Image
          src={cursorContent}
          alt="Cursor Image"
          width={300} // Set a suitable width
          height={100} // Set a suitable height
          style={{
            width: '300px',
            height: '300px',
            transform: "translate(-50%, -50%)"
          }}
        />
      )}
    </div>
  );
};

export default CustomCursor;
