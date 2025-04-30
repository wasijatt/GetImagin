// components/PageTransition.jsx
'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import gsap from 'gsap';

const PageTransition = ({ children }) => {
  const pathname = usePathname();
  const pageRef = useRef(null);
  const curtainRef = useRef(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Initial page load animation
  useEffect(() => {
    if (!pageRef.current) return;

    gsap.fromTo(
      pageRef.current,
      {
        y: 50,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power2.out',
      }
    );
  }, []);

  // Handle page transitions
  useEffect(() => {
    if (!curtainRef.current || !pageRef.current) return;
    setIsTransitioning(true);

    const tl = gsap.timeline({
      onComplete: () => setIsTransitioning(false)
    });

    // Page exit and enter sequence
    tl
      // First hide the current page
      .to(pageRef.current, {
        y: -50,
        opacity: 0,
        duration: 0.4,
        ease: 'power2.in',
        immediateRender: false
      })
      // Bring in the curtain
      .to(curtainRef.current, {
        yPercent: 0,
        duration: 0.5,
        ease: 'power3.inOut',
      })
      // Short pause for page content to update
      .addPause(0.1)
      // Hide the curtain
      .to(curtainRef.current, {
        yPercent: -100,
        duration: 0.5,
        ease: 'power3.inOut',
      })
      // Show the new page
      .fromTo(
        pageRef.current,
        {
          y: 50,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.4,
          ease: 'power2.out',
        },
        '>-0.3' // Overlap with curtain animation
      );

  }, [pathname]);

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Transition curtain */}
      <div
        ref={curtainRef}
        className="fixed inset-0 bg-black z-50 transform translate-y-full pointer-events-none"
        aria-hidden="true"
      />
      
      {/* Page content wrapper */}
      <div 
        ref={pageRef} 
        className={`min-h-screen ${isTransitioning ? 'pointer-events-none' : ''}`}
      >
        {children}
      </div>
    </div>
  );
};

export default PageTransition;