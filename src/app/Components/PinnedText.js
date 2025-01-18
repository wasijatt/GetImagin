"use client";
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
  const vectorRef = useRef(null);
  const miniVectorRef = useRef(null);

  useEffect(() => {
    const pinDistance = 2000;

    // Set initial states
    gsap.set(stepsRef.current, { autoAlpha: 0, y: 20 });

    // Scroll animation for images
    gsap.to(vectorRef.current, {
      y: -80, // Scroll up
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=" + pinDistance,
        scrub: 0.5,
      },
    });

    gsap.to(miniVectorRef.current, {
      y: -80, // Scroll up
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=" + pinDistance,
        scrub: 0.5,
      },
    });

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=" + pinDistance,
        scrub: 1,
        pin: containerRef.current,
      },
    });

    // Animation for each service step
    stepsRef.current.forEach((step, index) => {
      const heading = step.querySelector("h1");
      const listItems = listRefs.current[index] || [];

      const sectionTimeline = gsap.timeline();
      sectionTimeline
        .to(step, {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: "power1.inOut",
        })
        .from(heading, {
          scale: 0.9,
          opacity: 0,
          duration: .6,
          ease: "power1",
        })
        .from(
          listItems,
          {
            y: 30,
            opacity: 0,
            duration: 0.7,
            stagger: 0.1,
            ease: "power1",
            scrub: 1,
          },
          "<"
        )
        .to(step, {
          autoAlpha: 0,
          duration: 0.3,
          ease: "power1",
        });

      timeline.add(sectionTimeline, index * 1.5);
    });
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative bg-cover bg-center h-screen flex flex-col items-center overflow-hidden"
      style={{ backgroundImage: "url('/Services/getimagin-Background.svg')" }}
    >
      <div>
        <Image
          ref={vectorRef}
          src="/Services/Vector.svg"
          className="vector w-2/3 md:w-[800px] absolute bottom-2/4 md:-bottom-[20%] blur-lg overflow-hidden -left-[10%]"
          width={750}
          height={750}
          quality={75}
          alt="Get Imagin"
        />
        <Image
          ref={miniVectorRef}
          src="/Services/minivector.svg"
          className="minivector w-20 md:w-[300px] blur-[1px] absolute top-3/4 md:top-[25%] right-[8%]"
          width={750}
          height={750}
          quality={75}
          alt="Get Imagin"
        />
      </div>
      <h3 className=" mt-[60%] md:mt-[8%] opacity-70 text-lg md:text-3xl sticky">
        Things That We are Expert on
      </h3>
      {items.map((item, index) => (
        <div
          key={index}
          ref={(el) => (stepsRef.current[index] = el)}
          className="absolute opacity-0 w-full text-center px-4 transform scale-90"
        >

          <h1 className="mt-[80%] md:mt-[13%] text-4xl md:text-8xl">{item.heading} <span className="fontspring" >{item.subHead}</span> </h1>
          <h2 className="mt-[10%] md:mt-[3%] text-lg md:text-3xl font-semibold">
            What You will Get
          </h2>
          <ul className=" mt-10 md:mt-20 2xl:mt-44 flex flex-wrap md:w-1/2 m-auto">
            {item.subservice.map((sub, idx) => (
              <li
                key={idx}
                ref={(el) => {
                  if (!listRefs.current[index]) {
                    listRefs.current[index] = [];
                  }
                  listRefs.current[index][idx] = el;
                }}
                className="text-lg md:text-2xl w-1/2 py-2"
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
