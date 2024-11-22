"use client";
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import Image from 'next/image';
import { GoArrowLeft } from "react-icons/go";
const Heading = dynamic(() => import('./Heading'), { ssr: false });
const AnimatedLink = dynamic(() => import('./AnimatedLink'), { ssr: false });

gsap.registerPlugin(ScrollTrigger);

const ScrollSection = () => {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    // Check screen size
    const handleResize = () => setIsDesktop(window.innerWidth >= 768);
    handleResize(); // Set initial value

    // Add resize event listener
    window.addEventListener('resize', handleResize);

    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (!isDesktop) return; // Only apply scroll animations on desktop

    let panels = gsap.utils.toArray(".panel");

    gsap.to(".arrow-icon", {
      scrollTrigger: {
        trigger: ".arrow-icon",
        start: "top center",
        end: "top 400px",
        scrub: 2,
      },
      rotate: "-45",
      duration: 0.3,
    });

    panels.forEach((panel, index) => {
      ScrollTrigger.create({
        trigger: panel,
        start: () => panel.offsetHeight < window.innerHeight ? "top top" : "bottom bottom",
        pin: true,
        pinSpacing: false,
      });

      ScrollTrigger.create({
        trigger: panel,
        start: "top top",
        end: "bottom top",
        scrub: true,
        onUpdate: (self) => {
          const scale = 1 - self.progress * 0.2;
          const opacity = 1 - self.progress * 1;
          gsap.to(panel, { scale, opacity, duration: 0.8, ease: "power2.out" });
        }
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, [isDesktop]);

  const sections = [
        {
          title: "Web design & development",
          btn: [
            { buton: "Creative web design", href: "#" },
            { buton: "Web development", href: "#" },
      
            { buton: "E-Commerce", href: "#" },
            { buton: "WordPress", href: "#" },
            { buton: "SEO", href: "#" },
          ],
          para: "Crafting digital experiences where beauty meets ROI, turning heads and ",
          spanpara: "unlocking",
          lastpara: " revenue potential with every click.",
          imageAlt: "Get-imagin Web Development and Design Agency ",
          imageUrl: "/Animation .mp4",
          findmorebuton: "Find Our More "
        },
        {
          title: "Branding",
          btn: [
            { buton: "Brand strategy", href: "#" },
            { buton: "Visual identity", href: "#" },
          ],
          para: "It all starts with your brand. We use sound strategic thinking to create or elevate your ",
          spanpara: "brand identity, ",
          lastpara: " from your visuals to your voice.",
          imageAlt: "Get-Imagin Branding",
          imageUrl: "/Poster.mp4",
          findmorebuton: "Find Our More "
        },
        {
          title: "Digital Marketing",
          btn: [
            { buton: "Motion graphics", href: "#" },
            { buton: "Creative campaigns", href: "#" },
            { buton: "Marketing support", href: "#" },
          ],
          para: "Delivering motion graphics and campaigns that earn attention, spark emotion and increase conversions.",
          imageAlt: "Get Imagin Marketing",
          imageUrl: "/Dranding About Main Pictures.mp4",
          findmorebuton: "Find Our More "
        }
      ];
    

  return (
    <div>
      <div className={`${isDesktop ? "panel" : ""} w-full md:-mt-[20%] flex justify-center items-center`}>
        <div className="flex items-center justify-between w-[90%] md:w-[70%] m-auto py-8 md:py-4">
          <Heading mainText={"Our"} subText={"Services"} />
          <div className="relative">
            <div className="aboutusShadow hidden"></div>
            <GoArrowLeft className="arrow-icon text-6xl md:text-[40px] lg:text-[200px] md:mt-16 z-50" />
          </div>
        </div>
      </div>
      {sections.map((section, index) => (
        <section
          key={index}
          className={`${isDesktop ? "panel" : ""} max-h-fit md:h-screen flex justify-center my-4 md:my-0 items-center text-white`}
        >
          <div className="w-full md:w-[85%] rounded-xl md:rounded-[70px] py-[10%] px-[7%] md:px-[5%] md:mx-[4%] max-h-fit md:h-[100vh] flex flex-col-reverse md:flex-row items-center bg-white">
            <div className="w-full md:w-[50%]">
              <h1 className="text-[#24CFA6] text-3xl  lg:text-[50px] pt-8 leading-none">
                {section.title}
              </h1>
              <div className="flex text-[#303030] flex-wrap gap-1 md:gap-2 mt-2 md:mt-9">
                {section.btn.map((button, i) => (
                  <Link
                    key={i}
                    href={button.href}
                    className=" text-sm md:text-lg hover:bg-[#303030] hover:text-[#e9e7e7] transition duration-600 py-2 px-6 border-[#303030] border-2 rounded-3xl my-1"
                  >
                    {button.buton}
                  </Link>
                ))}
                <p className="text-lg">
                  {section.para} <br />
                  <span className="text-bold text-sm md:text-lg text-[#24CFA6] font-juanaAlt">
                    {section.spanpara}
                  </span>
                  {section.lastpara}
                </p>
              </div>
              <AnimatedLink
                className="text-black text-lg md:text-xl mt-0"
                style={{ borderColor: "#303030" }}
                content="Find Our More"
                href="#"
              />
            </div>
            <div className="w-full md:w-1/2">
              <video loop muted autoPlay className="w-full h-full rounded-lg md:rounded-xl rounded-tr-[70px] md:rounded-tr-[100px]">
                <source src={section.imageUrl} type="video/mp4" />
              </video>
            </div>
          </div>
        </section>
      ))}
    </div>
  );
};

export default ScrollSection;
