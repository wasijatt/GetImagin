"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { FaArrowLeft } from "react-icons/fa";
import Heading from "./Heading";
import ScrollPinComponent from "./ServicesSection";
// import Impact from "./Impact";
gsap.registerPlugin(ScrollTrigger);

const ServicesComponent = () => {
 
  return (
    <div className="relative w-full h-[400vh] bg-black text-[#E9E9E9] ">
      {/* Sticky heading */}
      <div className="z-50 bg-black w-full">
        <div className="flex items-center justify-between w-[70%] m-auto py-4">
          <Heading mainText={"Our"} subText={"Services"} />
          <div className="relative">
            <FaArrowLeft className="arrow-icon text-base md:text-[40px] lg:text-[100px] z-50" />
          </div>
        </div>
      </div>

      {/* Service section */}
    <ScrollPinComponent/>
    {/* <Impact/> */}
    </div>
  );
};

export default ServicesComponent;
