
"use client";
import dynamic from 'next/dynamic';
import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import Image from 'next/image';
import { GoArrowLeft } from "react-icons/go";
const Heading = dynamic(() => import('./Heading'), { ssr: false });
const AnimatedLink = dynamic(() => import('./AnimatedLink'), { ssr: false });


gsap.registerPlugin(ScrollTrigger);

const ScrollSection = () => {


  useEffect(() => {
    let panels = gsap.utils.toArray(".panel");


    gsap.to(".arrow-icon ", {
      scrollTrigger: {
        trigger: ".arrow-icon",
        start: "top center",
        end: "top 400px",
        scrub: 2,

      },
      rotate: "-45",
      duration: .3,
     
    })
    panels.forEach((panel, index) => {
      // Pin the current section
      ScrollTrigger.create({
        trigger: panel,
        start: () => panel.offsetHeight < window.innerHeight ? "top top" : "bottom bottom",
        pin: true,
        pinSpacing: false,
      });

      // Scale and fade the section when the next one reaches 20% from the bottom
      ScrollTrigger.create({
        trigger: panel,
        start: "top top",  
        end: "bottom top",  
        scrub: true,
        onUpdate: (self) => {
          // Scale down and fade out the current section
          const scale = 1 - self.progress * 0.2;  
          const opacity = 1 - self.progress * 1; 
          gsap.to(panel, { scale, opacity, duration: 0.8, ease: "power2.out" });
        }
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  // Data array for sections
  const sections = [
    {
      title: "Web design & development",
      btn: [
        { buton: "Creative web design", href: "#" },
        { buton: "Web development", href: "#" },
        { buton: "Copywriting", href: "#" },
        { buton: "E-Commerce", href: "#" },
        { buton: "WordPress", href: "#" },
        { buton: "SEO", href: "#" },
      ],
      para: "Crafting digital experiences where beauty meets ROI, turning heads and ",
      spanpara: "unlocking",
      lastpara: " revenue potential with every click.",
      imageAlt: "cvgbh",
      imageUrl: "/OurWork/Link (1).png",
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
      imageAlt: "gfdsds",
      imageUrl: "/OurWork/Link (1).png",
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
      imageAlt: "uytbvre",
      imageUrl: "/OurWork/Link (1).png",
      findmorebuton: "Find Our More "
    }
  ];

  return (
    <div>
      <div className="  w-full panel flex justify-center items-center h-1/2 -mt-[30vh]">
    <div className="flex items-center justify-between w-[70%] m-auto py-4">
      <Heading mainText={"Our"} subText={"Services"} />
      <div className="relative">
        <div className='aboutusShadow'></div>
        <GoArrowLeft  className="arrow-icon text-base md:text-[40px]  lg:text-[200px] mt-16 z-50" />
      </div>
    </div>
  </div>
      {sections.map((section, index) => (
        <section
          key={index}
          className="panel h-screen flex justify-center items-center text-6xl text-white"
        >
          <div className="w-[80%] rounded-[70px] px-[5%] msy-[2%] mx-[4%] h-[100vh] design service flex flex-grow justify-around items-center bg-white">
            <div className="w-[50%]">
              <h1 className="text-[#24CFA6] text-base md:text-[20px] lg:text-[50px] leading-none">
                {section.title}
              </h1>
              <div className="flex text-[#303030] flex-wrap gap-2 mt-9">
                {section.btn.map((button, i) => (
                  <Link
                    key={i}
                    href={button.href}
                    className="text-lg hover:bg-[#303030] hover:text-[#e9e7e7] transition duration-600 py-[4px] px-6 border-[#303030] border-2 rounded-3xl my-1"
                  >
                    {button.buton}
                  </Link>
                ))}
                <p className="text-lg">
                  {section.para} <br />
                  <span className="text-bold text-[#24CFA6] font-juanaAlt">
                    {section.spanpara}
                  </span>
                  {section.lastpara}
                </p>
                <button className="text-xl rounded-5xl">
                  <AnimatedLink
                    style={{ borderColor: "#303030" }}
                    content="Find Our More"
                    href="#"
                  />
                </button>
              </div>
            </div>
            <div className='w-1/2'>
              <Image
                alt={section.imageAlt}
                loading="lazy"
                quality={75}
              width={400}
              height={700}
                src={section.imageUrl}
                className="w-full h-full rounded-tr-[100px]"
              />
            </div>
          </div>
        </section>
      ))}
    </div>
  );
};

export default ScrollSection;
