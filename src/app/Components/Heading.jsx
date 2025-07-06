
// const Heading = ({mainText,subText}) => {
//   return (
  
//     <h1 className="font-neueMachina font-normal text-4xl mt-4 md:text-[40px] lg:text-[150px] leading-none">
//     {mainText} <br /> <span className="ml-16 fontspring ">{subText}</span>
//   </h1>
//   )
// }

// export default Heading
'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Heading = ({ mainText, subText }) => {
  const headingRef = useRef(null);

  useEffect(() => {
    const letters = headingRef.current.querySelectorAll('.letter');

    gsap.set(letters, { y: 100, opacity: 0 });

    gsap.to(letters, {
      y: 0,
      opacity: 1,
      duration: 1.5,
      ease: 'power3.out',
      stagger: 0.07,
      scrollTrigger: {
        trigger: headingRef.current,
        start: 'top 70%',
        once: true,
      },
    });
  }, []);

  const renderLetters = (text) =>
    [...text].map((char, idx) => (
      <span key={idx} className="inline-block letter whitespace-pre">
        {char}
      </span>
    ));

  return (
    <h1
      ref={headingRef}
      className="font-neueMachina font-normal text-4xl mt-4 md:text-[40px] lg:text-[150px] leading-none"
    >
      {renderLetters(mainText)}
      <br />
      <span className="ml-16 fontspring">{renderLetters(subText)}</span>
    </h1>
  );
};

export default Heading;
