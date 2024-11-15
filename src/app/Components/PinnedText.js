"use client"
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PropTypes from "prop-types";
import Image from "next/image";
gsap.registerPlugin(ScrollTrigger);

const PinnedText = ({ items }) => {
  const containerRef = useRef(null);
  const stepsRef = useRef([]);
  const listRefs = useRef([]);

  useEffect(() => {
    listRefs.current.forEach((list) => {
      gsap.from(list, {
        y: 20,
        // opacity: 0,
        stagger: 0.4,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: list,
          start: "top 80%", // Start animation when the list is 80% from the top of the viewport
        },
      });
    });
  }, []);
  useEffect(() => {
    const pinDistance = 1400; // Adjust as needed for scroll distance
    gsap.set(stepsRef.current, { autoAlpha: 0, y: 20 }); // Initial state

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=" + pinDistance,
        scrub: 1, // Sync with scroll position
        pin: containerRef.current,
      },
    });

    // Animate each step in sequence, with conditional forward/backward handling
    stepsRef.current.forEach((step, index) => {
      timeline.to(step, {
        autoAlpha: 1,
        y: 0,
        duration: 0.4,
        stagger: 0.5,

        ease: "power1.inOut",
        onComplete: () => gsap.to(step, { autoAlpha: 0, duration: 0.4 }), // Fade out on completion
      }, index * 0.3); // Staggered start time for each step
    });
  }, []);

  return (
    <div ref={containerRef} className="relative bg-cover bg-center  h-screen flex flex-col items-center  overflow-hidden bg-[yellow] "  style={{ backgroundImage: "url('/Services/getimagin-Background.svg')" }}>

      
       <div  >
       <Image
       src="/Services/Vector.svg"
       className= " vector w-[600px] absolute bottom-0 left-6"
     width={750}
     height={750}
       quality={75}
       alt="Get Imagin"
       />
        <Image
       src="/Services/minivector.svg"
       className=" minivector w-[300px] absolute top-[20%] right-[8%]"
     width={750}
     height={750}
       quality={75}
       alt="Get Imagin"
       />
     </div>
      {items.map((item, index) => (
        <div
          key={index}
          ref={(el) => (stepsRef.current[index] = el)}
          className="absolute opacity-0 w-full text-center px-4 transform scale-90 "
        >
          
           <h2 className=" mt-[5%] text-xl md:text-3xl">Things That We’re Expert on</h2>
          <h1 className=" mt-[8%] text-2xl md:text-6xl font-semibold">{item.heading}</h1>
          <h2 className=" mt-[3%] text-xl md:text-3xl font-semibold">What You’ll Get</h2>
          <ul
            className="mt-14 flex flex-wrap w-1/2 m-auto"
            ref={(el) => (listRefs.current[index] = el)}
          >
            {item.subservice.map((sub, idx) => (
              <li
              ref={(el) => (listRefs.current[index] = el)}
                key={idx}
                className="text-xl md:text-2xl w-1/2 py-2" 
              >
                {sub}
              </li>
            ))}
          </ul>
        </div>
      ))}
     
    </div>
  );
};

PinnedText.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      heading: PropTypes.string.isRequired,
      subservice: PropTypes.arrayOf(PropTypes.string).isRequired,
    })
  ).isRequired,
};

export default PinnedText;
