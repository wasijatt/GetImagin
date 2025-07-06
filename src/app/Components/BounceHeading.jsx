// components/BounceHeading.jsx
'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const BounceHeading = ({
  text = 'Bounce Heading',
  as = 'h1',
  className = 'text-4xl font-bold text-center text-white',
  triggerClassName = '',
}) => {
  const lettersRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        lettersRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          ease: 'bounce.out',
          duration: 1,
          stagger: 0.05,
          scrollTrigger: {
            trigger: `.${triggerClassName || 'bounce-heading-wrapper'}`,
            start: 'top 80%',
            toggleActions: 'play none none none',
            once: true,
          },
        }
      );
    });

    return () => ctx.revert();
  }, [triggerClassName]);

  const HeadingTag = as;

  return (
    <div className={`${triggerClassName || 'bounce-heading-wrapper'} py-12`}>
      <HeadingTag className={`flex flex-wrap justify-center gap-x-1 ${className}`}>
        {text.split('').map((char, i) => (
          <span
            key={i}
            ref={(el) => (lettersRef.current[i] = el)}
            className="inline-block"
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
      </HeadingTag>
    </div>
  );
};

export default BounceHeading;
