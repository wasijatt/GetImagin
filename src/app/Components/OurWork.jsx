
"use client";
import { useRef, useEffect } from "react";
import Image from "next/image";
import { FaArrowRight } from "react-icons/fa";
import Heading from "./Heading";
import Link from "next/link";
import useAnimatedLink from "../hooks/useAnimatedLink"; // Import the hook
import { gsap } from "gsap";
import AnimatedLink from "./AnimatedLink";
const OurWork = () => {
  const workgallery = [
    "/OurWork/link5.png",
    "/OurWork/link6.png",
    "/OurWork/Link (1).png",
    "/OurWork/Link.png",
    "/OurWork/Link (3).png",
  ];

  // Using the animated link hook
  const {
    isHovered,
    translateX,
    translateY,
    setIsHovered,
    handleMouseMove,
    handleMouseLeave,
  } = useAnimatedLink();

  const borderRef = useRef(null); // Reference for animated border

  useEffect(() => {
    // Set initial width to 100%
    gsap.set(borderRef.current, { width: "100%" });
  }, []);

  // Merge your mouse enter logic with GSAP animation
  const handleMouseEnter = (e) => {
    setIsHovered(true); // Call hook's logic for hover state
    handleMouseMove(e); // Call hook's mouse move handler

    // GSAP animation for reducing border width
    gsap.to(borderRef.current, {
      width: "25%",
      duration: .3,
      ease: "power2.out",
    });
  };

  // Merge your mouse leave logic with GSAP animation
  const handleMouseLeaveMerged = (e) => {
    setIsHovered(false); // Call hook's logic for leaving hover state
    handleMouseLeave(e); // Call hook's mouse leave handler

    // GSAP animation for reverting border width
    gsap.to(borderRef.current, {
      width: "100%",
      duration: 0.5,
      ease: "power2.out",
    });
  };

  return (
    <div>
      <div className="flex px-[10%] justify-between items-center py-[7vh] my-8">
        <Heading mainText="Our" subText="Work" />
        <div className="w-1/2">
          <h1 className="text-lg lg:text-4xl ">
            Making brands a damn site better.
          </h1>
          <p className="text-[12px] mt-4 w-3/4">
            Let’s face it, first impressions matter. Your website’s an
            opportunity to wow your audience, so why choose bad design? Brands
            win over fans when they’re brave enough to go beyond their creative
            comfort zone.
          </p>
        </div>
      </div>

      <div className="flex flex-wrap justify-center items-center w-full overflow-hidden gap-4 px-[5%]">
        {workgallery.map((img, index) => (
          <div key={index} className={`relative`}>
            <Image
              className={`${index === 0 ? "w-full" : "w-[45%]"}`}
              src={img}
              alt={`Gallery image ${index + 1}`}
              loading="lazy"
              layout="responsive"
              width={100}
              height={100} // Adjust height based on your needs
              objectFit="cover"
            />
          </div>
        ))}
      </div>

      <div className="w-full my-20 text-center">
      



        <AnimatedLink href={"#"} content={"view All Projects "}/>
      </div>
    </div>
  );
};

export default OurWork;
