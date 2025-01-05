

"use client";
import { useState, useEffect, useRef } from "react";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import { gsap } from "gsap";
import Image from "next/image";

const Slider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState("next");
  const [previousIndex, setPreviousIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false); // Track mobile screen size
  const images = [
    "/OurWork/Beauty-WebDevelopment -Getimagin.jpg",
    "/OurWork/Beauty-WebDevelopment -Getimagin.jpg",
    "/OurWork/Beauty-WebDevelopment -Getimagin.jpg",
    "/OurWork/Beauty-WebDevelopment -Getimagin.jpg",
    "/OurWork/Beauty-WebDevelopment -Getimagin.jpg",
    "/OurWork/Beauty-WebDevelopment -Getimagin.jpg",
    "/OurWork/Beauty-WebDevelopment -Getimagin.jpg",
    
  ];

  const imageRef = useRef(null);

  const nextSlide = () => {
    setDirection("next");
    setPreviousIndex(currentIndex);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setDirection("prev");
    setPreviousIndex(currentIndex);
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    // Handle GSAP animation for sliding
    if (imageRef.current) {
      const timeline = gsap.timeline();
      if (direction === "next") {
        timeline.fromTo(
          imageRef.current,
          { x: 300 },
          { x: 0, duration: 0.5, ease: "none" }
        );
      } else if (direction === "prev") {
        timeline.fromTo(
          imageRef.current,
          { x: -300 },
          { x: 0, duration: 0.5, ease: "none" }
        );
      }
    }
  }, [currentIndex, direction]);

  useEffect(() => {
    // Update `isMobile` based on screen size
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Initial check
    handleResize();

    // Listen for resize events
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="relative w-full mx-auto py-8 overflow-hidden">
      {/* Popup */}
      <div className="absolute top-0 left-0 w-full h-[90vh] flex items-center z-50 bg-opacity-40">
        <button
          className="absolute left-[40%] text-4xl top-1/2 transform -translate-y-1/2 z-50 p-4 text-[#24CFA6] bg-opacity-80 bg-white rounded-full"
          onClick={prevSlide}
        >
          <FaArrowLeft />
        </button>
        <button
          className="absolute right-[16%] top-1/2 transform -translate-y-1/2 z-50 text-4xl p-4 text-[#24CFA6] bg-opacity-80 bg-white rounded-full"
          onClick={nextSlide}
        >
          <FaArrowRight />
        </button>
        <div className="relative w-[90%] md:w-[30%] left-[5%] md:left-[47%] h-[90vh] border-2 border-[#24CFA6] shadow-lg rounded-tr-[80px] rounded-lg overflow-hidden">
          {/* Static Background Image */}
          <div className="absolute w-full h-full overflow-hidden">
            <Image
              src={images[previousIndex]}
              alt={`Background Image ${previousIndex}`}
              width={400}
              height={600}
              quality={100}
              loading="lazy"
              className="w-full h-full object-cover rounded-tr-[50px] opacity-100"
            />
          </div>

          {/* Foreground Image */}
          <div className="relative w-full h-full overflow-hidden">
            <Image
              ref={imageRef}
              src={images[currentIndex]}
              alt={`Foreground Image ${currentIndex}`}
              width={400}
              height={600}
              quality={100}
              loading="lazy"
              className="w-[100vw] md:w-full h-full object-cover rounded-tr-[50px]"
            />
          </div>
        </div>
      </div>

      {/* Slider Images */}
      <div
        className="flex transition-transform duration-1000 ease-in-out py-[2%] opacity-30"
        style={{
          transform: `translateX(-${currentIndex * (isMobile ? 100 : 25)}%)`,
        }}
      >
        {images.map((image, index) => (
          <div
            key={index}
            className="w-[100vw] md:w-[25%] flex-shrink-0 px-2"
          >
            <Image
              src={image}
              alt={`Image ${index}`}
              width={400}
              height={600}
              quality={90}
              loading="lazy"
              className="w-full h-[400px] md:h-auto object-cover rounded-tr-[10px]"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Slider;
