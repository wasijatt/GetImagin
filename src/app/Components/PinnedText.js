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
    const pinDistance = 2000;
    gsap.set(stepsRef.current, { autoAlpha: 0, y: 20 });

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=" + pinDistance,
        scrub: 1,
        pin: containerRef.current,
      },
    });

    stepsRef.current.forEach((step, index) => {
      const heading = step.querySelector('h1');
      const listItems = listRefs.current[index] || [];

      const sectionTimeline = gsap.timeline();
      
      sectionTimeline
        .to(step, {
          autoAlpha: 1,
          y: 0,
          duration: 0.3,
        })
        .from(heading, {
          y: 30,
          opacity: 0,
          duration: 0.3
        })
        .from(listItems, {
          y: 30,
          opacity: 0,
          duration: 0.3,
          stagger: 0.1,
          scrub:1, 
          onComplete: () => {
            if (index < stepsRef.current.length - 1) {
              gsap.to(step, { autoAlpha: 0, duration: 0.3, });
            }
          }
        });

      timeline.add(sectionTimeline, index * 1);
    });

    
  }, []);

  return (
    <div ref={containerRef} className="relative bg-cover bg-center h-screen flex flex-col items-center overflow-hidden " style={{ backgroundImage: "url('/Services/getimagin-Background.svg')" }}>
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
          className="absolute opacity-0 w-full text-center px-4 transform scale-90"
        >
          <h3 className="mt-[5%] text-xl md:text-3xl sticky">Things That We are Expert on</h3>
          <h1 className="mt-[8%] text-2xl md:text-8xl ">{item.heading}</h1>
          <h2 className="mt-[3%] text-xl md:text-3xl font-semibold">What You will Get</h2>
          <ul className="mt-14 flex flex-wrap w-1/2 m-auto">
            {item.subservice.map((sub, idx) => (
              <li
                key={idx}
                ref={(el) => {
                  if (!listRefs.current[index]) {
                    listRefs.current[index] = [];
                  }
                  listRefs.current[index][idx] = el;
                }}
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
