"use client"
import Heading from "./Heading"
import { MdOutlineNavigateNext } from "react-icons/md";
import { useState } from "react";
import Image from "next/image"
import Link from "next/link"
import { FaArrowRight } from "react-icons/fa";
import useAnimatedLink from "../hooks/useAnimatedLink";
const OurResult = () => {

  const {
    isHovered,
    translateX,
    translateY,
    setIsHovered,
    handleMouseMove,
    handleMouseLeave,
  } = useAnimatedLink(); // Use the hook
  return (
    <div className="w-[80%] m-auto">
      <Heading mainText={"Our"} subText={"Result"} />
      <div className="my-[5vh] relative">
        <Image
          className=" "
          alt="bg-shadow"
          layout="responsive"
          loading="lazy"
          quality={75}
          width={100}
          height={100}
          src="/OurResult/Portfolio.png"
        ></Image>
    
  <Link
      href={"#"}
      className={`absolute bottom-[5%] left-10 inline-block px-4 py-2 border-2 hover:border-none  border-[#f1eeee] hover:-pl-[40px] rounded-3xl transition-all duration-500 ease-out`}
      style={{
        transform: `translate(${translateX}px, ${translateY}px)`,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      View All Projects
      <span className="relative inline-block ml-6">
        <FaArrowRight className="inline transition-transform duration-500 ease-out" />
        {/* The border animation around the span */}
        <span
          className={`absolute inset-0 b rounded-3xl transition-all duration-500 ease-out ${
            isHovered ? "opacity-100 w-full h-full" : "opacity-0 w-0 h-0"
          }`}
        ></span>
      </span>
    </Link>
        <Link href={"#"} className="absolute bottom-[5%] right-8 border-2 rounded-full border-[#333] p-2"> <span><MdOutlineNavigateNext className="text-2xl" /></span>
        </Link>
      </div>
    </div>
  )
}

export default OurResult
