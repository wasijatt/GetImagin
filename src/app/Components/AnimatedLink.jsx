"use client";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import useAnimatedLink from "../hooks/useAnimatedLink"; // Import your hook
import { FaArrowRight } from "react-icons/fa";
import Link from "next/link";

const AnimatedLink = ({ href, children,content, className = "", style = {} }) => {
  const {
    isHovered,
    translateX,
    translateY,
    setIsHovered,
    handleMouseMove,
    handleMouseLeave,
  } = useAnimatedLink();

  const borderRef = useRef(null);

  useEffect(() => {
    // Set initial border width
    gsap.set(borderRef.current, { width: "100%" });
  }, []);

  // Merge your mouse enter logic with GSAP animation
  const handleMouseEnter = (e) => {
    setIsHovered(true);
    handleMouseMove(e);

    gsap.to(borderRef.current, {
      width: "25%",
      duration: 0.3,
      ease: "power2.out",
    });
  };

  // Merge your mouse leave logic with GSAP animation
  const handleMouseLeaveMerged = (e) => {
    setIsHovered(false);
    handleMouseLeave(e);

    gsap.to(borderRef.current, {
      width: "100%",
      duration: 0.5,
      ease: "power2.out",
    });
  };

  return (
    <Link
      href={href}
      className={`inline-block relative px-4 py-3  rounded-3xl transition-all ease-out duration-1000 ${className}`}
      style={{
        transform: `translate(${translateX}px, ${translateY}px)`,
        ...style,
      }}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeaveMerged}
    >
      <span
        ref={borderRef}
        className="absolute top-0 right-0 h-full w-full border-[3px] rounded-3xl z-0"
        style={{
          height: "100%",
          borderColor: "#fff", // Adjust color as needed
        }}
      ></span>
 <span> {content}</span> 
      <span className="relative z-10 inline-block ml-5 top-[2px] "><FaArrowRight/></span>
    </Link>
  );
};

export default AnimatedLink;
