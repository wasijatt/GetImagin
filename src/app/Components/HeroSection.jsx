"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const HeroSection = ({ fhead, span, head, HerosectionPara, HerosectionButton, chfont, Last, herop }) => {
  const containerRef = useRef(null);
  const numberRefs = useRef([]);

  const counters = [
    { title: "Projects Completed", value: 1500, suffix: "+" },
    { title: "Satisfied Clients", value: 900, suffix: "+" },
    { title: "Countries Worldwide", value: 157, suffix: "+" },
  ];

  useEffect(() => {
    if (!containerRef.current) return;

    numberRefs.current = numberRefs.current.slice(0, counters.length);

    numberRefs.current.forEach((el, i) => {
      gsap.fromTo(
        el,
        { innerText: 0 },
        {
          innerText: counters[i].value,
          duration: 2,
          ease: "power3.out",
          snap: { innerText: 1 },
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
          onUpdate: function () {
            const val = +el.innerText;
            el.innerText = counters[i].suffix
              ? `${val.toFixed(0)}${counters[i].suffix}`
              : `${val.toFixed(0)}`;
          },
        }
      );
    });
  }, []);

  return (
    <div className="w-full text-center flex flex-col justify-center items-center mt-6 md:mt-0">
      <h1 className="text-2xl md:text-5xl 2xl:text-[6rem] leading-tight z-30 w-[70%] md:w-[40%] 2xl:w-[60%] py-16">
        {fhead}
        <span className="text-teal-400">{span}</span> <span>{head}</span>{" "}
        <span className="fontspring relative">
          {chfont}
          <Image
            className="md:w-52 h-6 absolute right-[5%]"
            src="/Footer/good ki line.svg"
            width={100}
            height={30}
            alt="GoodLine"
            quality={75}
          />
        </span>
        {Last}
      </h1>

      <p className="hidden md:block ml-[700px] text-sm w-[300px] -z-20 text-[#E9E9E9]">
        {HerosectionPara}{" "}
        <i className="main-color font-semibold">{herop}</i>
      </p>

      <Link
        href="/works"
        className="bg-[#24CFA6] mt-5 px-5 md:px-10 py-3 text-sm md:text-xl rounded-3xl text-black font-semibold"
      >
        {HerosectionButton}
      </Link>

      <div
        ref={containerRef}
        className="hidden md:flex flex-wrap justify-center text-[#E9E9E9] items-center lg:justify-between w-full lg:w-[65%] m-auto lg:mt-14"
      >
        {counters.map((counter, index) => (
          <div
            key={index}
            className="text-center lg:w-[30%] 2xl:m-4 py-10 lg:py-20 rounded-3xl"
          >
            <h2
              ref={(el) => (numberRefs.current[index] = el)}
              className="text-xl lg:text-[35px] font-bold"
            >
              0+
            </h2>
            <p className="text-lg lg:text-[22px] mt-2 font-light fontneue">
              {counter.title}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HeroSection;
