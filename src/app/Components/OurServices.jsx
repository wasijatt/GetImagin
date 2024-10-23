"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { IoMdArrowBack  } from "react-icons/fa";
import Heading from "./Heading";
import ServicesSection from "./ServicesSection";
// import Impact from "./Impact";
gsap.registerPlugin(ScrollTrigger);


const OurServices = () => {

  useEffect(() => {

    gsap.to(".arrow-icon ", {
      scrollTrigger: {
        trigger: ".arrow-icon",
        start: "top center",
        end: "top 400px",
        scrub: 4,
//  markers:true
      },
      rotate: "-45",
      duration: .5,
      // ease:none
    })
  
  }, [])
  return (
    <div className="relative w-full h-[400vh] bg-black text-[#E9E9E9] ">
      {/* Sticky heading */}
      <div className="z-50 bg-black w-full">
        <div className="flex items-center justify-between w-[70%] m-auto py-4">
          <Heading mainText={"Our"} subText={"Services"} />
          <div className="relative">
            <IoMdArrowBack  className="arrow-icon text-base md:text-[40px] lg:text-[150px] z-50" />
          </div>
        </div>
      </div>

      {/* Service section */}
      <ServicesSection />
      {/* <Impact/> */}
    </div>
  );
};

export default OurServices;
