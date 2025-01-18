"use client";
import { useRef, useEffect } from "react";
import Image from "next/image";
import useAnimatedLink from "../hooks/useAnimatedLink";
import { gsap } from "gsap";
import AnimatedLink from './AnimatedLink';
import Heading from './Heading';

const OurWork = () => {
  const workgallery = [
    { img :  "/OurWork/Branding-getimagin services.webp",
      year: "2024",
      brandname:"Kotto"
    },
   { img :  "/OurWork/Branding.webp",
    year: "2023",
    brandname:"Cloud"
   },
    {img :  "/OurWork/Get Imagin Illustration.webp",
      year: "2023",
      brandname:"Schaeffler"
    },
    {img :  "/OurWork/GetImagin Branding.webp",
      year: "2023",
      brandname:"Owo"
    },
   { img :  "/OurWork/Web Design .webp",
    year: "2023",
    brandname:"Shingfong"
   },
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
            <strong className="main-color"> comfort </strong> zone.
          </p>
        </div>
      </div>

      {/* Work Gallery */}
      <div className="flex flex-wrap justify-center items-center w-full overflow-hidden gap-4 px-[5%]">
        {workgallery.map((item, index) => (
          <div key={index} className={` border-[2px] rounded-xl border-[#383838] relative group ${index === 0 ? "w-[95%]" : " w-[95%] md:w-[47%]"} `} >
            <div className="w-full px-4 py-2 flex justify-between"> 
              <h4 className="flex "> <Image
              className='rounded-xl mr-2'
              style={{ width: "45%" }}
              src={"/OurWork/arooow.svg"}
              alt={`Gallery image ${index}`}
              loading="lazy"
              layout="responsive"
              width={100}
              height={100}
              objectFit="cover"
            />{ item.brandname}</h4>
              <h4>{item.year}</h4>
            </div>
            <Image
              className='rounded-xl '
              style={{ width: "45%" }}
              src={item.img}
              alt={`Gallery image ${index}`}
              loading="lazy"
              layout="responsive"
              width={100}
              height={100}
              objectFit="cover"
            />

          </div>
        ))}
      </div>

      <div className="w-full my-20 text-center">
        <AnimatedLink href={"/work"} content={"view All Projects"} style={{ backGround: "yellow" }} />
      </div>
    </div>
  );
};

export default OurWork;