// "use client";
// import { useEffect, useRef } from 'react';

// export const useSmoothScroll = () => {
//   const contentRef = useRef(null);
//   const scrollingContainerRef = useRef(null);
//   const current = useRef(0);
//   const target = useRef(0);
//   const ease = 0.075; // Adjust this value to change smoothness

//   const init = () => {
//     requestAnimationFrame(() => {
//       const contentHeight = contentRef.current.getBoundingClientRect().height;
//       const viewportHeight = window.innerHeight;
//       const finalHeight = Math.max(contentHeight, viewportHeight);
//       document.body.style.height = `${finalHeight - 1}px`;
//     });
//   };

//   const setTransform = (el, transform) => {
//     el.style.transform = transform;
//   };

//   const updateScroll = () => {
//     target.current = window.scrollY;
//     current.current = lerp(current.current, target.current, ease);
//     setTransform(scrollingContainerRef.current, `translate3d(0, ${-current.current}px, 0)`);
//   };

//   const lerp = (start, end, factor) => {
//     return start * (1 - factor) + end * factor;
//   };

//   useEffect(() => {
//     init();

//     let animationFrameId;
//     const animate = () => {
//       updateScroll();
//       animationFrameId = requestAnimationFrame(animate);
//     };
//     animate();

//     // Handle window resize
//     const handleResize = () => {
//       init();
//     };
//     window.addEventListener('resize', handleResize);

//     return () => {
//       cancelAnimationFrame(animationFrameId);
//       window.removeEventListener('resize', handleResize);
//     };
//   }, []);

//   return { contentRef, scrollingContainerRef };
// }; 