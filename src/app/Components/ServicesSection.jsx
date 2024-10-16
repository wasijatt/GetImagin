
"use client";
import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

const ScrollPinComponent = () => {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const sections = gsap.utils.toArray('.panel');

    sections.forEach((section, index) => {
      // Pin each section and ensure the next section overlaps properly
      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        pin: true,
        pinSpacing: false, // Allow space between sections to avoid overlap
        scrub: 4,
        end: () => index === sections.length - 1 ? '+=200%' : '+=100%', // Extend the last section's scroll duration
      });

      // Apply the scroll animation for each section except the last one
      if (index !== sections.length - 1) {
        gsap.fromTo(
          sections[index + 1],
          { y: '100%' },
          {
            y: '0%',
            scrollTrigger: {
              trigger: section,
              start: 'top top',
              end: 'bottom top',
              scrub: 4,
              onLeave: () => ScrollTrigger.refresh(),
            },
          }
        );
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const services = [
    {
      bgColor: "red",
      title: "Web design & development",
      services: [
        { name: "Creative web design", link: "#" },
        { name: "Web development", link: "#" },
        { name: "Copywriting", link: "#" },
        { name: "E-Commerce", link: "#" },
        { name: "WordPress", link: "#" },
        { name: "SEO", link: "#" }
      ],
      ServiceDis:
        "Crafting digital experiences where beauty meets ROI, turning heads and unlocking revenue potential with every click.",
      buton: "Find out more",
      Img: "/HeaderLogo/Getimagin.png"
    },
    {
      bgColor: "blue",
      title: "E-Commerce Development",
      services: [
        { name: "Shopify", link: "#" },
        { name: "Magento", link: "#" },
        { name: "WooCommerce", link: "#" },
        { name: "BigCommerce", link: "#" }
      ],
      ServiceDis:
        "We build scalable e-commerce platforms designed to enhance online shopping experiences and drive conversions.",
      buton: "Find out more",
      Img: "/HeaderLogo/Getimagin.png"
    },
    {
      bgColor: "white",
      title: "E-Development",
      services: [
        { name: "Shopify", link: "#" },
        { name: "Magento", link: "#" },
        { name: "WooCommerce", link: "#" },
        { name: "BigCommerce", link: "#" }
      ],
      ServiceDis:
        "We build scalable e-commerce platforms designed to enhance online shopping experiences and drive conversions.",
      buton: "Find out more",
      Img: "/HeaderLogo/Getimagin.png"
    }
  ];

  return (
    <div className="scroll-container mb-[100vh]">
      {services.map((service, index) => (
        <div key={index} className={`panel w-full h-[100vh] flex items-center justify-center bg-white text-3xl`}>
          <div className="w-full h-[100vh] design service flex justify-around items-center">
            <div className="w-[60%]">
              <h2 className="text-[#24CFA6] text-base md:text-[20px] lg:text-[50px] leading-none">
                {service.title}
              </h2>
            </div>
            <Image
              alt={service.title}
              loading="lazy"
              quality={75}
              width={100}
              height={100}
              src={service.Img} // Fixed the image path to remove '/public'
            />
          </div>
        </div>
      ))}
      {/* Add a next section with enough height to avoid congestion */}
      <div className="w-full h-[100vh] bg-gray-500 flex items-center justify-center text-black text-3xl">
        Next Section Content Here
      </div>
    </div>
  );
};

export default ScrollPinComponent;
