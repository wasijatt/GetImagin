

"use client"
import { useState , useEffect ,useRef } from "react";
import gsap from "gsap";
import Image from "next/image";
import Link from "next/link";
const HeroSection = ({ fhead, span, head, HerosectionPara, HerosectionButton, chfont , Last , herop }) => {
  const [projects, setProjects] = useState(0);
  const [clients, setClients] = useState(0);
  const [countries, setCountries] = useState(0);
  const countersRef = useRef([]);

  const CounterData = [
    {
      title: "Projects Completed",
      number: projects,
    },
    {
      title: "Satisfied Clients",
      number: clients,
    },
    {
      title: "Countries Worldwide",
      number: countries,
    },
  ];

  useEffect(() => {
    // Set the counter numbers after a delay
    setTimeout(() => {
      setProjects(1500);
      setClients(900);
      setCountries(157);
    }, 4000);

    // GSAP animation
    const animateCounters = (ref) => {
      gsap.fromTo(
        ref,
        { opacity: 0, y: 50 }, // Initial state
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power4.out",
          stagger: 1,
        } // Final state
      );
    };

    // IntersectionObserver to trigger animation
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounters(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    // Observe all counters
    const currentRefs = countersRef.current;
    currentRefs.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    // Cleanup
    return () => {
      currentRefs.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  
  return (
    <div className="w-full text-center flex flex-col justify-center items-center mt-6 md:mt-0">
      <h1 className="text-2xl md:text-5xl 2xl:text-[6rem] leading-tight z-30  w-[70%] md:w-[40%] 2xl:w-[60%] py-16 ">

        {fhead}
        <span className="text-teal-400">{span}</span> <span>{head}</span> <span className="fontspring relative">
         
           {chfont}<Image
         className="  md:w-52 h-6  absolute   right-[5%]"
         src={"/Footer/good ki line.svg"}
         width={100}
         height={30}
         alt="GoodLine "
        //  layout="responsive"
         quality={75}
         /></span>{Last}
      </h1>
      <p className=" hidden md:block ml-[700px] text-sm w-[300px] -z-20 text-[#E9E9E9]">{HerosectionPara} <i className="main-color font-semibold ">  {herop}</i></p>
      <Link  href="/works" className="bg-[#24CFA6] mt-5 px-5 md:px-10 py-3 text-sm md:text-xl rounded-3xl text-black font-semibold">{HerosectionButton}</Link>

      <div className="hidden md:flex flex-wrap justify-center text-[#E9E9E9] items-center lg:justify-between w-full lg:w-[65%] m-auto lg:mt-14">
        {CounterData.map((counterItem, index) => (
          <div
          ref={(el) => (countersRef.current[index] = el)}
          key={index}
         
            className="text-center  lg:w-[30%] 2xl:m-4 py-10 lg:py-20 rounded-3xl"
          >
            <h2 className="text-xl lg:text-[35px] font-bold">{counterItem.number}+</h2>
            <p className="text-lg lg:text-[22px] mt-2 lg:mt-2  font-light fontneue">
              {counterItem.title}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HeroSection;
