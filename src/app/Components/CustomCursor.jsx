'use client';
import { useEffect} from 'react';
// import { useState } from 'react';
// import { useCursor } from '../context/CursorContext';


const CustomCursor = ({ cursorContent }) => {
  useEffect(() => {
    let cursor = document.querySelector('.custom-cursor');

    // Create the custom cursor if it doesn't already exist
    if (!cursor) {
      cursor = document.createElement('div');
      cursor.classList.add('custom-cursor');
      document.body.appendChild(cursor);

      const cursorStyle = cursor.style;
      cursorStyle.position = 'fixed';
      cursorStyle.top = '0px';
      cursorStyle.left = '0px';
      cursorStyle.width = '10px';
      cursorStyle.height = '10px';
      cursorStyle.backgroundColor = '#7700ff';
      cursorStyle.borderRadius = '50%';
      cursorStyle.pointerEvents = 'none';
      // cursorStyle.mixBlendMode = 'difference';
      cursorStyle.transition =
        'transform 0.8s ease-out, width 0.8s ease-out, height 0.8s ease-out, background-color 0.3s ease-out';
      cursorStyle.transform = 'translate(-50%, -50%)';
    }

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;

    const updateCursorPosition = (event) => {
      mouseX = event.clientX;
      mouseY = event.clientY;
    };

    // Animate cursor movement with requestAnimationFrame
    const animateCursor = () => {
      // Smoothly interpolate cursor position
      cursorX += (mouseX - cursorX) * 0.1;
      cursorY += (mouseY - cursorY) * 0.1;

      // Apply rotation based on movement speed
      const deltaX = mouseX - cursorX;
      const deltaY = mouseY - cursorY;
      const rotation = (deltaX + deltaY) * 0.05; // Adjust the multiplier for more or less rotation

      cursor.style.transform = `translate(${cursorX}px, ${cursorY}px) rotate(${rotation}deg)`;

      requestAnimationFrame(animateCursor);
    };

    // Initialize cursor animation
    requestAnimationFrame(animateCursor);

    // Adjust cursor style based on content or default
    const updateCursorStyle = () => {
      if (cursorContent) {
        cursor.style.backgroundImage = `url(${cursorContent})`;
        cursor.style.backgroundSize = 'cover';
        cursor.style.width = '250px';
        cursor.style.height = '250px';
        cursor.style.transform = 'translate(-50%, -50%)';
        cursor.style.borderRadius = '10px'; 
        cursor.style.backgroundColor = 'transparent'; 
      } else {
        cursor.style.backgroundImage = 'none';
        cursor.style.width = '10px';
        cursor.style.height = '10px';
        cursor.style.borderRadius = '50%'; // Reapply the circular shape when no image
        cursor.style.backgroundColor = '#24CFA6';
      }
    };

    updateCursorStyle();

    document.addEventListener('mousemove', updateCursorPosition);

    return () => {
      document.removeEventListener('mousemove', updateCursorPosition);
    };
  }, [cursorContent]);

  return null;
};



// const CustomCursor = () => {
//   const { cursorContent } = useCursor()
//   const [position, setpostion] = useState({ x: 0, y: 0 })
//   useEffect(() => {
//     const move = (e) => {
//       setpostion({ x: e.clientX, y: e.clientY })
//     }
//     window.addEventListener('mousemove', move)
//     return () => {
//       window.removeEventListener('mousemove', move)
//     }

//   }, [])
//   return (
//     <div
//       style={{
//         left: position.x,
//         top: position.y,
//         transform: 'translate(-50%, -50%)',
//       }}
//       className='fixed z-[9999] pointer-events-none transition-all duration-200 ease-out'>
//       {cursorContent ? (

//         <div className='w-32 h-32 rounded-full overflow-hidden' > {cursorContent} </div>)
//         : (
//           <div className="w-[10px] h-[10px] bg-main-color rounded-full"></div>
//         )}

//     </div>
//   )



// }

  export default CustomCursor;
