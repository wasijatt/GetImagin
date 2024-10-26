

"use client";
import { useState , useEffect ,useRef } from "react";
import gsap from "gsap";
const HeroSection = ({ fhead, span, head, HerosectionPara, HerosectionButton, chfont , Last }) => {
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
    <div className="w-full text-center flex flex-col justify-center items-center">
      <h1 className="text-xl md:text-5xl leading-tight z-30 w-[40%] text-">
        {fhead}
        <span className="text-teal-400">{span}</span> <span>{head}</span> <span className="font-fontspring"> {chfont}</span>{Last}
      </h1>
      <p className="ml-[700px] text-sm w-[300px] -z-20 text-[#E9E9E9]">{HerosectionPara}</p>
      <button className="bg-[#24CFA6] px-10 py-3 rounded-3xl">{HerosectionButton}</button>

      <div className="flex flex-wrap justify-center text-[#E9E9E9] items-center lg:justify-between w-full lg:w-[80%] m-auto lg:mt-7">
        {CounterData.map((counterItem, index) => (
          <div
          ref={(el) => (countersRef.current[index] = el)}
          key={index}
         
            className="text-center w-[90%] sm:w-[70%] md:w-[48%] lg:w-[30%] m-4 py-10 lg:py-20 rounded-3xl"
          >
            <h1 className="text-xl lg:text-[40px]">{counterItem.number}+</h1>
            <h2 className="text-lg lg:text-[25px] mt-2 lg:mt-6 font-bold">
              {counterItem.title}
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HeroSection;
