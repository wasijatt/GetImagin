
// // "use client"
// // import { useState } from 'react';
// // import { FaArrowRight } from "react-icons/fa";
// // import { FaArrowLeft } from "react-icons/fa";

// // const Slider = () => {
// //   const [currentIndex, setCurrentIndex] = useState(2); // Start with the third image as active
// //   const images = [
// //    " /OurWork/Link (1).png",
// //    " /OurWork/Link (3).png",
// //    " /OurWork/Link (4).png",
   

// //    " /OurWork/Link (1).png"
// //   ]; // Replace with your image paths

// //   const nextSlide = () => {
// //     setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
// //   };

// //   const prevSlide = () => {
// //     setCurrentIndex((prevIndex) =>
// //       prevIndex === 0 ? images.length - 1 : prevIndex - 1
// //     );
// //   };

// //   return (
// //     <div className="relative w-full mx-auto py-8">
// //       {/* Navigation Arrows */}
// //       <button
// //         className="absolute left-[40%] text-4xl top-1/2 transform -translate-y-1/2 z-50 p-10 text-[#24CFA6] bg-opacity-80 bg-white rounded-full"
// //         onClick={prevSlide}
// //       >
// //       <FaArrowLeft/>
// //       </button>
// //       <button
// //         className="absolute right-[10%] top-1/2 transform -translate-y-1/2 z-50  text-4xl p-10 text-[#24CFA6] bg-opacity-80 bg-white rounded-full"
// //         onClick={nextSlide}
// //       >
// //       <FaArrowRight/>
      
// //       </button>

// //       {/* Slider Images */}
// //       <div className="flex justify-center items-center space-x-4 overflow-hidden">
// //         {images.map((image, index) => {
// //           const isActive = index === currentIndex;
// //           const isPrev = index === (currentIndex - 1 + images.length) % images.length;
// //           const isNext = index === (currentIndex + 1) % images.length;

// //           return (
// //             <div
// //               key={index}
// //               className={`relative transition-transform duration-500 ease-in-out transform ${
// //                 isActive
// //                   ? 'scale-110 opacity-100 z-10'
// //                   : isPrev || isNext
// //                   ? 'scale-90 opacity-80'
// //                   : 'scale-75 opacity-60'
// //               }`}
// //               style={{ width: '25%' }} // To show 4 images
// //             >
// //               <img
// //                 src={image}
// //                 alt={`Image ${index}`}
// //                 className="w-full h-[400px] object-cover rounded-tr-[100px]"
// //               />
// //             </div>
// //           );
// //         })}
// //       </div>
// //     </div>
// //   );
// // };

// // export default Slider;



// "use client"
// import { useState } from 'react';
// import { FaArrowRight } from "react-icons/fa";
// import { FaArrowLeft } from "react-icons/fa";

// const Slider = () => {
//   const [currentIndex, setCurrentIndex] = useState(2); // Start with the third image as active
//   const images = [
//     " /OurWork/Link (1).png",
//     " /OurWork/Link (3).png",
//     " /OurWork/Link (4).png",
//     " /OurWork/Link (1).png"
//   ]; // Replace with your image paths

//   const nextSlide = () => {
//     setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
//   };

//   const prevSlide = () => {
//     setCurrentIndex((prevIndex) =>
//       prevIndex === 0 ? images.length - 1 : prevIndex - 1
//     );
//   };

//   return (
//     <div className="relative w-full mx-auto py-8">
//       {/* Navigation Arrows */}
//       <button
//         className="absolute left-[40%] text-4xl top-1/2 transform -translate-y-1/2 z-50 p-10 text-[#24CFA6] bg-opacity-80 bg-white rounded-full"
//         onClick={prevSlide}
//       >
//         <FaArrowLeft />
//       </button>
//       <button
//         className="absolute right-[10%] top-1/2 transform -translate-y-1/2 z-50 text-4xl p-10 text-[#24CFA6] bg-opacity-80 bg-white rounded-full"
//         onClick={nextSlide}
//       >
//         <FaArrowRight />
//       </button>

//       {/* Slider Images */}
//       <div className="flex justify-center items-center space-x-4 overflow-hidden">
//         {images.map((image, index) => {
//           const adjustedIndex = (index - currentIndex + images.length) % images.length;

//           // Check the relative position to the currentIndex (third position logic)
//           const isThird = adjustedIndex === 2; // Middle image
//           const isSecond = adjustedIndex === 1 || adjustedIndex === 3; // Previous or next images

//           return (
//             <div
//               key={index}
//               className={`relative transition-transform duration-500 ease-in-out transform ${
//                 isThird
//                   ? 'scale-110 opacity-100 z-10' // The third image
//                   : isSecond
//                   ? 'scale-90 opacity-80' // Previous and next images
//                   : 'scale-75 opacity-60' // Remaining images
//               }`}
//               style={{ width: '25%' }} // To show 4 images
//             >
//               <img
//                 src={image}
//                 alt={`Image ${index}`}
//                 className="w-full h-[400px] object-cover rounded-tr-[100px]"
//               />
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default Slider;












// "use client"
// import { useState } from 'react';
// import { FaArrowRight, FaArrowLeft } from "react-icons/fa";

// const Slider = () => {
//   const [currentIndex, setCurrentIndex] = useState(0); // Start with the first image as active
//   const images = [
//     "/OurWork/Link (1).png",
//     "/OurWork/Link (3).png",
//     "/OurWork/Link (4).png",
//     "/OurWork/Link (4).png",
//     "/OurWork/Link (4).png",
//     "/OurWork/Link (4).png",
//     "/OurWork/Link (1).png"
//   ]; // Replace with your image paths

//   const nextSlide = () => {
//     setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
//   };

//   const prevSlide = () => {
//     setCurrentIndex((prevIndex) =>
//       prevIndex === 0 ? images.length - 1 : prevIndex - 1
//     );
//   };

//   return (
//     <div className="relative w-full mx-auto py-8 overflow-hidden">
//       {/* Navigation Arrows */}
//       <button
//         className="absolute left-[40%] text-4xl top-1/2 transform -translate-y-1/2 z-50 p-4 text-[#24CFA6] bg-opacity-80 bg-white rounded-full"
//         onClick={prevSlide}
//       >
//         <FaArrowLeft />
//       </button>
//       <button
//         className="absolute right-[15%] top-1/2 transform -translate-y-1/2 z-50 text-4xl p-4 text-[#24CFA6] bg-opacity-80 bg-white rounded-full"
//         onClick={nextSlide}
//       >
//         <FaArrowRight />
//       </button>

//       {/* Slider Images */}
//       <div
//         className="flex transition-transform duration-500 ease-in-out"
//         style={{
//           transform: `translateX(-${currentIndex * 25}%)`, // Moves the slider based on the current index
//         }}
//       >
//         {images.map((image, index) => (
//           <div key={index} className="w-[25%] flex-shrink-0 px-2">
//             <img
//               src={image}
//               alt={`Image ${index}`}
//               className={`w-full h-[400px] object-cover rounded-tr-[100px] transition-transform duration-500 ease-in-out ${
//                 index === (currentIndex + 2) % images.length
//                   ? 'scale-110 opacity-100' // Middle image (active one)
//                   : 'scale-90 opacity-50'
//               }`}
//             />
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Slider;





// "use client"
// import { useState } from 'react';
// import { FaArrowRight, FaArrowLeft } from "react-icons/fa";

// const Slider = () => {
//   const [currentIndex, setCurrentIndex] = useState(0); // Start with the first image as active
//   const images = [
//     "/OurWork/Link (1).png",
//     "/OurWork/Link (4).png",
//     "/OurWork/Link (3).png",
//     "/OurWork/Link (4).png",
//     "/OurWork/Link (1).png",
//     "/OurWork/Link (4).png",
//     "/OurWork/Link (4).png",
//   ]; 

//   const nextSlide = () => {
//     setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
//   };

//   const prevSlide = () => {
//     setCurrentIndex((prevIndex) =>
//       prevIndex === 0 ? images.length - 1 : prevIndex - 1
//     );
//   };

//   const activeIndex = (currentIndex + 2) % images.length; // The active image index is the one in the center (third image)

//   return (
//     <div className="relative w-full mx-auto py-8 overflow-hidden">
//       {/* Popup for Active Image */}
//       <div className="absolute top-0 left-0 w-full h-full flex items-center  z-50  bg-opacity-40">
//         <div className="absolute w-[28%] left-[47%] h-[500px] border-2 border-[#24CFA6] shadow-lg rounded-tr-[100px] rounded-lg">
//           {/* Active Image in Popup */}
//           <div className="   w-full h-[400px]">
//             <img
//               src={images[activeIndex]}
//               alt={`Active Image ${activeIndex}`}
//               className="w-full h-full object-cover rounded-tr-[100px]"
//             />
//           </div>

//           {/* Navigation Arrows Inside Popup */}
//           <button
//             className="absolute -left-[30%] text-4xl top-1/2 transform -translate-y-1/2 z-50 p-4 text-[#24CFA6] bg-opacity-80 bg-white rounded-full"
//             onClick={prevSlide}
//           >
//             <FaArrowLeft />
//           </button>
//           <button
//             className="absolute -right-[30%] top-1/2 transform -translate-y-1/2 z-50 text-4xl p-4 text-[#24CFA6] bg-opacity-80 bg-white rounded-full"
//             onClick={nextSlide}
//           >
//             <FaArrowRight />
//           </button>
//         </div>
//       </div>

//       {/* Slider Images */}
//       <div
//         className="flex transition-transform duration-1000 ease-in-out py-[2%] opacity-30"
//         style={{
//           transform: `translateX(-${currentIndex * 25}%)`, // Moves the slider based on the current index
//         }}
//       >
//         {images.map((image, index) => (
//           <div key={index} className="w-[25%] flex-shrink-0 px-2">
//             <img
//               src={image}
//               alt={`Image ${index}`}
//               className={`w-full h-[400px] object-cover rounded-tr-[100px] transition-transform duration-500 ease-in-out ${
//                 index === (currentIndex + 2) % images.length
//                   // ? 'scale-110 opacity-100' // Middle image (active one)
//                   // : 'scale-90 opacity-80'
//               }`}
//             />
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Slider;



// "use client"
// import { useState } from 'react';
// import { FaArrowRight, FaArrowLeft } from "react-icons/fa";

// const Slider = () => {
//   const [currentIndex, setCurrentIndex] = useState(0); // Start with the first image as active
//   const [isNext, setIsNext] = useState(true); // Track if the user clicked 'next' or 'prev' for transition

//   const images = [
//     "/OurWork/Link (1).png",
//     "/OurWork/Link (4).png",
//     "/OurWork/Link (3).png",
//     "/OurWork/Link (4).png",
//     "/OurWork/Link (1).png",
//     "/OurWork/Link (4).png",
//     "/OurWork/Link (4).png",
//   ];

//   const nextSlide = () => {
//     setIsNext(true);
//     setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
//   };

//   const prevSlide = () => {
//     setIsNext(false);
//     setCurrentIndex((prevIndex) =>
//       prevIndex === 0 ? images.length - 1 : prevIndex - 1
//     );
//   };

//   const activeIndex = (currentIndex + 2) % images.length; // The active image index is the one in the center (third image)

//   return (
//     <div className="relative w-full mx-auto py-8 overflow-hidden">
//       {/* Popup for Active Image */}
//       <div className="absolute top-0 left-0 w-full h-full flex items-center  z-50  bg-opacity-40">
//         <div className="absolute w-[28%] left-[47%] h-[500px] border-2 border-[#24CFA6] shadow-lg rounded-tr-[100px] rounded-lg overflow-hidden">
//           {/* Active Image in Popup */}
//           <div className="relative w-full h-[400px]">
//             <img
//               src={images[activeIndex]}
//               alt={`Active Image ${activeIndex}`}
//               className={`w-full h-full object-cover rounded-tr-[100px] transition-transform duration-1000 ease-in-out ${
//                 isNext
//                   ? 'transform translate-x-0 animate-slide-in-right' // Slide from x-0 to x-100% when navigating next
//                   : 'transform -translate-x-full animate-slide-in-left' // Slide from x-100% to x-0 when navigating prev
//               }`}
//             />
//           </div>

//           {/* Navigation Arrows Inside Popup */}
//           <button
//             className="absolute left-[30%] text-4xl top-1/2 transform -translate-y-1/2 z-50 p-4 text-[#24CFA6] bg-opacity-80 bg-white rounded-full"
//             onClick={prevSlide}
//           >
//             <FaArrowLeft />
//           </button>
//           <button
//             className="absolute right-[30%] top-1/2 transform -translate-y-1/2 z-50 text-4xl p-4 text-[#24CFA6] bg-opacity-80 bg-white rounded-full"
//             onClick={nextSlide}
//           >
//             <FaArrowRight />
//           </button>
//         </div>
//       </div>

//       {/* Slider Images */}
//       <div
//         className="flex transition-transform duration-1000 ease-in-out py-[2%] opacity-30"
//         style={{
//           transform: `translateX(-${currentIndex * 25}%)`, // Moves the slider based on the current index
//         }}
//       >
//         {images.map((image, index) => (
//           <div key={index} className="w-[25%] flex-shrink-0 px-2">
//             <img
//               src={image}
//               alt={`Image ${index}`}
//               className={`w-full h-[400px] object-cover rounded-tr-[100px]`}
//             />
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Slider;



// "use client";
// import { useState, useEffect, useRef } from "react";
// import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
// import { gsap } from "gsap";

// const Slider = () => {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const images = [
//     "/OurWork/Link (1).png",
//     "/OurWork/Link (4).png",
//     "/OurWork/Link (3).png",
//     "/OurWork/Link (4).png",
//     "/OurWork/Link (1).png",
//     "/OurWork/Link (4).png",
//     "/OurWork/Link (4).png",
//   ];

//   // Create a ref to hold the container of the popup image for GSAP
//   const imageRef = useRef(null);

//   const nextSlide = () => {
//     setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
//   };

//   const prevSlide = () => {
//     setCurrentIndex((prevIndex) =>
//       prevIndex === 0 ? images.length - 1 : prevIndex - 1
//     );
//   };

//   useEffect(() => {
//     // GSAP animation when the image changes (on currentIndex change)
//     if (imageRef.current) {
//       gsap.fromTo(
//         imageRef.current,
//         { x: 400,  }, // Initial position (out of view, right side)
//         { x: 0, duration: 1,} // Final position (center view, fully visible)
//       );
//     }
//   }, [currentIndex]); // Re-run the animation whenever currentIndex changes

//   return (
//     <div className="relative w-full mx-auto py-8 overflow-hidden">
//       {/* Popup for Active Image */}
//       <div className="absolute top-0 left-0 w-full h-full flex items-center z-50 bg-opacity-40">
//         <div className="absolute w-[28%] left-[47%] h-[500px] border-2 border-[#24CFA6] shadow-lg rounded-tr-[100px] rounded-lg overflow-hidden">
//           {/* Active Image in Popup */}
//           <div className="relative w-full h-[400px] overflow-hidden">
//             <img
//               ref={imageRef} // Apply ref to the active image for GSAP animation
//               src={images[currentIndex]}
//               alt={`Active Image ${currentIndex}`}
//               className="w-full h-full object-cover rounded-tr-[100px]"
//             />
//           </div>

//           {/* Navigation Arrows Inside Popup */}
//           <button
//             className="absolute left-[30%] text-4xl top-1/2 transform -translate-y-1/2 z-50 p-4 text-[#24CFA6] bg-opacity-80 bg-white rounded-full"
//             onClick={prevSlide}
//           >
//             <FaArrowLeft />
//           </button>
//           <button
//             className="absolute right-[30%] top-1/2 transform -translate-y-1/2 z-50 text-4xl p-4 text-[#24CFA6] bg-opacity-80 bg-white rounded-full"
//             onClick={nextSlide}
//           >
//             <FaArrowRight />
//           </button>
//         </div>
//       </div>

//       {/* Slider Images (Background/Inactive images) */}
//       <div
//         className="flex transition-transform duration-1000 ease-in-out py-[2%] opacity-30"
//         style={{
//           transform: `translateX(-${currentIndex * 25}%)`, // Moves the slider based on the current index
//         }}
//       >
//         {images.map((image, index) => (
//           <div key={index} className="w-[25%] flex-shrink-0 px-2">
//             <img
//               src={image}
//               alt={`Image ${index}`}
//               className="w-full h-[400px] object-cover rounded-tr-[100px]"
//             />
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Slider;



// "use client";
// import { useState, useEffect, useRef } from "react";
// import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
// import { gsap } from "gsap";

// const Slider = () => {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [direction, setDirection] = useState("next"); // Track navigation direction
//   const images = [
//     "/OurWork/Link (1).png",
//     "/OurWork/Link (4).png",
//     "/OurWork/Link (3).png",
//     "/OurWork/Link (4).png",
//     "/OurWork/Link (1).png",
//     "/OurWork/Link (4).png",
//     "/OurWork/Link (4).png",
//   ];

//   // Create a ref to hold the container of the popup image for GSAP
//   const imageRef = useRef(null);

//   const nextSlide = () => {
//     setDirection("next"); // Set direction as "next"
//     setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
//   };

//   const prevSlide = () => {
//     setDirection("prev"); // Set direction as "prev"
//     setCurrentIndex((prevIndex) =>
//       prevIndex === 0 ? images.length - 1 : prevIndex - 1
//     );
//   };

//   useEffect(() => {
//     // GSAP animation when the image changes (on currentIndex change)
//     if (imageRef.current) {
//       const timeline = gsap.timeline();

//       if (direction === "next") {
//         // Slide the image in from the right for the "next" button
    
//         timeline.fromTo(
//           imageRef.current,
//           { x: 300, }, // Start from right when new image appears
//           { x: 0, duration: 1, ease: "power3.out" }
//         );
//       } else if (direction === "prev") {
//         // Slide the image in from the left for the "prev" button
    
//         timeline.fromTo(
//           imageRef.current,
//           { x: -300 }, // Start from left when new image appears
//           { x: 0,  duration: 1, ease: "power3.out" }
//         );
//       }
//     }
//   }, [currentIndex, direction]); // Re-run animation on direction or index change

//   return (
//     <div className="relative w-full mx-auto py-8 overflow-hidden">
//       {/* Popup for Active Image */}
//       <div className="absolute top-0 left-0 w-full h-full flex items-center z-50 bg-opacity-40">
//         <div className="absolute w-[28%] left-[47%] h-[500px] border-2 border-[#24CFA6] shadow-lg rounded-tr-[100px] rounded-lg overflow-hidden">
//           {/* Active Image in Popup */}
//           <div className="relative w-full h-[400px] overflow-hidden">
//             <img
//               ref={imageRef} // Apply ref to the active image for GSAP animation
//               src={images[currentIndex]}
//               alt={`Active Image ${currentIndex}`}
//               className="w-full h-full object-cover rounded-tr-[100px]"
//             />
//           </div>

//           {/* Navigation Arrows Inside Popup */}
//           <button
//             className="absolute left-[30%] text-4xl top-1/2 transform -translate-y-1/2 z-50 p-4 text-[#24CFA6] bg-opacity-80 bg-white rounded-full"
//             onClick={prevSlide}
//           >
//             <FaArrowLeft />
//           </button>
//           <button
//             className="absolute right-[30%] top-1/2 transform -translate-y-1/2 z-50 text-4xl p-4 text-[#24CFA6] bg-opacity-80 bg-white rounded-full"
//             onClick={nextSlide}
//           >
//             <FaArrowRight />
//           </button>
//         </div>
//       </div>

//       {/* Slider Images (Background/Inactive images) */}
//       <div
//         className="flex transition-transform duration-1000 ease-in-out py-[2%] opacity-30"
//         style={{
//           transform: `translateX(-${currentIndex * 25}%)`, // Moves the slider based on the current index
//         }}
//       >
//         {images.map((image, index) => (
//           <div key={index} className="w-[25%] flex-shrink-0 px-2">
//             <img
//               src={image}
//               alt={`Image ${index}`}
//               className="w-full h-[400px] object-cover rounded-tr-[100px]"
//             />
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Slider;




"use client";
import { useState, useEffect, useRef } from "react";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import { gsap } from "gsap";
import Image from "next/image";
const Slider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState("next"); // Track navigation direction
  const [previousIndex, setPreviousIndex] = useState(0); // Keep track of the previous index
  const images = [
    "/OurWork/Link (1).png",
    "/OurWork/Link (4).png",
    "/OurWork/Link (3).png",
    "/OurWork/Link (4).png",
    "/OurWork/Link (1).png",
    "/OurWork/Link (4).png",
    "/OurWork/Link (4).png",
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
    <div className="relative w-full mx-auto py-8 overflow-hidden">
      {/* Popup */}
      <div className="absolute top-0 left-0 w-full h-[90vh] flex items-center z-50 bg-opacity-40">
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
        <div className="relative w-[30%] left-[47%] h-[90vh] border-2 border-[#24CFA6] shadow-lg rounded-tr-[80px] rounded-lg overflow-hidden">
          {/* static bg Background  */}
          <div className="absolute w-full h-full overflow-hidden ">
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
              className="w-full h-full object-cover rounded-tr-[50px]"
            />
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
              className="w-full h-[400px] object-cover rounded-tr-[10px]"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Slider;
