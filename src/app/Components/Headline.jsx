"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";

const Headline = () => {
  const marqueeContainerRef = useRef(null);

  useEffect(() => {
    const container = marqueeContainerRef.current;
    const text = container.querySelector(".marquee-text");
    const textWidth = text.offsetWidth;

    // Clone the text enough times to fill the screen
    const containerWidth = container.offsetWidth;
    const numberOfDuplicates = Math.ceil(containerWidth / textWidth) + 4; // Extra clones for seamlessness

    for (let i = 0; i < numberOfDuplicates; i++) {
      const clone = text.cloneNode(true);
      container.appendChild(clone);
    }

    // Animate with GSAP
    gsap.to(container, {
      x: `-=${textWidth}px`, // Move by the width of one text block
      duration: 15, // Adjust for speed
      ease: "none", // Smooth continuous scrolling
      repeat: -1, // Infinite loop
    });
  }, []);

  return (
    <div className="h-screen w-full bg-white overflow-hidden text-black flex  relative">
      
      <div
        ref={marqueeContainerRef}
        className="flex items-center whitespace-nowrap -mt-[10%]"
        style={{
          willChange: "transform",
          transformStyle: "preserve-3d",
        }}
      >
        <h1
          className="marquee-text text-[180px] font-bold uppercase mx-10"
          style={{
            transform: "translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)",
          }}
        >
          WHAT WE’VE MADE
        </h1>

      </div>
      <div><p className=" absolute bottom-28 left-4  w-1/2 p-[5%] text-3xl">Discover our portfolio and see how we transform ideas into impactful digital experiences. Explore our projects to see the innovation and creativity we bring to every <span className="text-[#24CFA6]">design</span>.</p></div>



    </div>
  );
};

export default Headline;
