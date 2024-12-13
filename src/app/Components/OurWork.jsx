"use client";
import { useRef, useEffect } from "react";
import Image from "next/image";
import useAnimatedLink from "../hooks/useAnimatedLink";
import { gsap } from "gsap";
import AnimatedLink from './AnimatedLink';
import Heading from './Heading';

const OurWork = () => {
  const workgallery = [
    "/OurWork/Branding-getimagin services.webp",
    "/OurWork/Branding.webp",
    "/OurWork/Get Imagin Illustration.webp",
    "/OurWork/GetImagin Branding.webp",
    "/OurWork/Web Design .webp",
  ];
  const projectLinks = [
    [
      { text: "View Project 1", href: "/project1" },
      { text: "View Project 2", href: "/project2" },
      { text: "View Project 3", href: "/project3" },
    ],
    [
      { text: "View Project 4", href: "/project4" },
      { text: "View Project 5", href: "/project5" },
      { text: "View Project 6", href: "/project6" },
    ],
    [
      { text: "View Project 7", href: "/project7" },
      { text: "View Project 8", href: "/project8" },
      { text: "View Project 9", href: "/project9" },
    ],
    [
      { text: "View Project 10", href: "/project10" },
      { text: "View Project 11", href: "/project11" },
      { text: "View Project 12", href: "/project12" },
    ],
    [
      { text: "View Project 13", href: "/project13" },
      { text: "View Project 14", href: "/project14" },
      { text: "View Project 15", href: "/project15" },
    ],
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
      duration: 0.3,
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
      <div className="flex flex-col-reverse md:flex-row px-[10%] justify-between md:items-center md:py-[7vh] my-8">
        <Heading mainText="Our" subText="Work" />
        <div className="md:w-1/2">
          <h1 className="text-xl lg:text-4xl ">
            Making brands a damn site better.
          </h1>
          <p className="text-[14px] mt-4 md:w-3/4">
            Let’s face it, first impressions matter. Your website’s an
            opportunity to wow your audience, so why choose bad design? Brands
            win over fans when they’re brave enough to go beyond their creative
            comfort zone.
          </p>
        </div>
      </div>

      {/* Work Gallery */}
      <div className="flex flex-wrap justify-center items-center w-full overflow-hidden gap-4 px-[5%]">
        {workgallery.map((img, index) => (
          <div key={index} className={`relative group ${index === 0 ? "w-[95%]" : " w-[95%] md:w-[47%]"} `} >
            <Image
              className='rounded-xl '
              style={{ width: "45%" }}
              src={img}
              alt={`Gallery image ${index}`}
              loading="lazy"
              layout="responsive"
              width={100}
              height={100}
              objectFit="cover"
            />

            {/* Overlay Menu */}
            <div className="absolute inset-0 bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 flex justify-around  items-center transition-opacity duration-500">
              <div className="text-center text-white ">
                <h2 className="text-xl font-bold mb-[10%] block">We Created Visualization AND </h2>
                <div className='flex'>
                  {projectLinks[index].map((link ,linkindex ) => (

                    <div key={`project-${index}-${linkindex}`}
                    


                      className="px-4 py-2 rounded-3xl text-sm bg-teal-400 hover:bg-teal-500 transition-colors duration-600 m-2 text-center"
                    >
                      {link.text} {/* Use the text from the object */}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="w-full my-20 text-center">
        <AnimatedLink href={"#"} content={"view All Projects"} style={{ backGround: "yellow" }} />
      </div>
    </div>
  );
};

export default OurWork;