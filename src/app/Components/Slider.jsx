
"use client";
import { useState, useEffect, useRef } from "react";
import { FaArrowRight, FaArrowLeft , FaLinkedin, FaInstagram , FaFacebook } from "react-icons/fa";
import { gsap } from "gsap";
import Image from "next/image";

import Link from "next/link";
const Slider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [ishovered, setIshovered] = useState(false);
  

  const [direction, setDirection] = useState("next"); // Track navigation direction
  const [previousIndex, setPreviousIndex] = useState(0); // Keep track of the previous index
  const OurData = [
    {
      names :"Muhammad Wasim",
      facebook : "", 
      Linkedin: "", 
      instagramme:"",
    },
     {
      names :"Muhammad Yousaf",
      facebook : "", 
      Linkedin: "", 
      instagramme:"",
    }, {
      names :"Jaan Muhammad",
      facebook : "", 
      Linkedin: "", 
      instagramme:"",
    }, {
      names :"Muhammad Abdullah",
      facebook : "", 
      Linkedin: "https://www.linkedin.com/in/design-by-rajput/", 
      instagramme:"https://www.instagram.com/design_by_rajput/",
    }, {
      names :"Muhammad Usman",
      facebook : "", 
      Linkedin: "", 
      instagramme:"",
    }
  ]
  const images = [
    "/AboutUs/team/Muhammad Wasim . the Full stack Developer-min.jpg",
    "/AboutUs/team/Muhammad Yousaf  The Lottie Animator.jpg",
    "/AboutUs/team/jaan Muhammad The Social Media Manager.jpg",
    "/AboutUs/team/Abdullah - Graphic Designer.jpg",
    "/AboutUs/team/usman-video editor.jpg",
  ];

  // Create a ref to hold the container of the popup image for GSAP
  const imageRef = useRef(null);

  const nextSlide = () => {
    setDirection("next"); // Set direction as "next"
    setPreviousIndex(currentIndex); // Update previous index before setting new one
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };
  

  const prevSlide = () => {
    setDirection("prev"); // Set direction as "prev"
    setPreviousIndex(currentIndex); // Update previous index before setting new one
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    // GSAP animation when the image changes (on currentIndex change)
    if (imageRef.current) {
      const timeline = gsap.timeline();

      if (direction === "next") {
        // Slide the image in from the right for the "next" button
        timeline.fromTo(
          imageRef.current,
          { x: 300 }, // Start from right when new image appears
          { x: 0, duration: .5, ease: "none" }
        );
      } else if (direction === "prev") {
        // Slide the image in from the left for the "prev" button
        timeline.fromTo(
          imageRef.current,
          { x: -300 }, // Start from left when new image appears
          { x: 0, duration: .5, ease: "none" }
        );
      }
    }
  }, [currentIndex, direction]); // Re-run animation on direction or index change

  return (
    <div className="relative w-full h-[80vh] mx-auto py-8 ">
      {/* Popup */}
      <div className="absolute -top-[10%] left-0 w-full h-inherit flex items-center z-50 bg-opacity-40" >
        {/* navigation */}
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
        <div className="relative w-[30%] left-[47%] h-[90vh] border-2 border-[#24CFA6] shadow-lg rounded-tr-[80px] rounded-lg overflow-hidden mb-5">
          {/* static bg Background  */}
          <div className="absolute w-full h-full overflow-hidden ">
            <Image

              src={images[previousIndex]}
              alt={`Background Image ${previousIndex}`}
              layout="fill"
              quality={100}
              loading="lazy"
              className="w-full h-full object-cover rounded-tr-[50px] s"
            />
           

          </div>

          {/* Foreground Image */}
          {/* <div className="relative w-full h-full overflow-hidden">
            <Image
             
              ref={imageRef}
              src={images[currentIndex]}
              alt={`Foreground Image ${currentIndex}`}
              layout="fill"
              quality={100}
              loading="lazy"
              className="w-full h-full object-cover rounded-tr-[50px]"
            />
          </div> */}
<div className="absolute w-full h-full overflow-hidden group"
>
  {/* Background Image */}
  <Image
    src={images[previousIndex]}
    alt={`Background Image ${previousIndex}`}
    layout="fill"
    quality={100}
    loading="lazy"
    className="w-full h-full object-cover rounded-tr-[50px]"
  />

  {/* Overlay */}
  <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center z-10 rounded-tr-[50px]">
    <div className="text-center bg-[#000000c0] text-white w-full py-5">
      <h2 className="text-2xl font-bold mb-2">hujysdfuiygsdfyugs
        {/* {getNameFromPath(images[previousIndex])} */}
      </h2>
      <div  className="flex gap-4 justify-center text-xl">
        <Link href={[OurData].Linkedin} aria-label="LinkedIn">bbjzs</Link>
        <Link href={[OurData].facebook} aria-label="Facebook">bbjzs</Link>
        <Link href={[OurData].instagramme} aria-label="Instagram">bbjzs</Link>
      </div>
     
    </div>
  </div>
</div>


        </div>
      </div>

      {/* Slider Images*/}
      <div
        className="flex transition-transform duration-1000 ease-in-out py-[2%] opacity-30"
        style={{
          transform: `translateX(-${currentIndex * 25}%)`,
        }}
      >
        {images.map((image, index) => (
          <div key={index} className="w-[25%] flex-shrink-0 px-2">
            <Image
              src={image}
              alt={`Image ${index}`}
              width={400}
              height={600}
              quality={90}
              loading="lazy"
              className="w-full h-[400px] object-cover rounded-tr-[30px]"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Slider;
