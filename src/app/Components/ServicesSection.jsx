"use client"
import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
const ScrollPinComponent = () => {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const sections = gsap.utils.toArray('.panel');

    sections.forEach((section, index) => {
      // Pin each section and ensure the next section overlaps properly
      ScrollTrigger.create({
        trigger: section,
        start: 'top top', // Start pinning when the section reaches the top
        pin: true, // Pin the section
        scale:0.5,
        pinSpacing: false, // No extra space between sections
        scrub: true, // Smooth scrolling animation
        end: () => `+=250%`, // Scroll for one viewport height
      });

      // If not the last section, make the next one come from the bottom and overlap
      if (index !== sections.length - 1) {
        gsap.fromTo(
          sections[index + 1],
          { y: '100%' }, // Start from below
          {
            y: '0%', // Move to the top
            scrollTrigger: {
              trigger: section,
              start: 'top top', // Animate the next section as soon as the current one hits the top
              end: 'bottom top', // Until the current section leaves the viewport
              scrub: 4, // Smooth scroll animation
              pinSpacing: 1,
        end: () => `+=90%`, // Scroll for one viewport height

              onLeave: () => ScrollTrigger.refresh(), // Ensures a smooth transition between sections
            },
          }
        );
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill()); // Clean up on unmount
    };
  }, []);

  return (
    <div className="scroll-container mb-[20vh] ">
      <div className="panel w-full h-[100vh] bg-blue-500 flex items-center justify-center text-white text-3xl">
      <div className="w-full h-[100vh] design service bg-yellow-600 flex justify-around items-center">
          <div className="w-[60%]">
            <h2 className="text-[#24CFA6] text-base md:text-[20px] lg:text-[50px] leading-none">
              Graphic Design
            </h2>
          </div>
          <Image
            alt="Services Images"
            loading="lazy"
            quality={75}
            width={100}
            height={100}
            src="/HeaderLogo/Getimagin.png" // Adjusted src to remove public from path
          />
        </div>
      </div>
      <div className="panel bg-green-500 flex items-center justify-center text-white text-3xl">
      <div className="w-full h-[100vh] design service bg-red-600 flex justify-around items-center">
          <div className="w-[60%]">
            <h2 className="text-[#24CFA6] text-base md:text-[20px] lg:text-[50px] leading-none">
              Graphic Design
            </h2>
          </div>
          <Image
            alt="Services Images"
            loading="lazy"
            quality={75}
            width={100}
            height={100}
            src="/HeaderLogo/Getimagin.png" // Adjusted src to remove public from path
          />
        </div>
      </div>
      <div className="panel w-full h-[100vh] bg-red-500 flex items-center justify-center text-white text-3xl">
      <div className="w-full h-[100vh] design service bg-purple-600 flex justify-around items-center">
          <div className="w-[60%]">
            <h2 className="text-[#24CFA6] text-base md:text-[20px] lg:text-[50px] leading-none">
              Graphic Design
            </h2>
          </div>
          <Image
            alt="Services Images"
            loading="lazy"
            quality={75}
            width={100}
            height={100}
            src="/HeaderLogo/Getimagin.png" // Adjusted src to remove public from path
          />
        </div>
      </div>
    </div>
  );
};

export default ScrollPinComponent;
