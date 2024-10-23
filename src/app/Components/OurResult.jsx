
// import Heading from "./Heading"
// import { MdOutlineNavigateNext } from "react-icons/md";

// import Image from "next/image"
// import Link from "next/link"

// import AnimatedLink from "./AnimatedLink";
// const OurResult = () => {
//   const resultarray = ["/OurResult/Portfolio.png",
//     "/OurResult/Portfolio.png", "/OurResult/Portfolio.png", "/OurResult/Portfolio.png",
//   ]
//   return (
//     <div className="w-[80%] m-auto">
//       <Heading mainText={"Our"} subText={"Result"} />
//       <div className="my-[5vh] relative">
//         <Image
//           className=" "
//           alt="bg-shadow"
//           layout="responsive"
//           loading="lazy"
//           quality={75}
//           width={100}
//           height={100}
//           src="/OurResult/Portfolio.png"
//         ></Image>

//         <span className="absolute bottom-[5%] left-10 inline-block px-4 py-2   duration-1000 hover:-pl-[40px] rounded-3xl transition-all ease-out">
//           <AnimatedLink href={"#"} content={"view All Projects"} />
//         </span>
//         <button  className="absolute bottom-[5%s] right-8 border-2 rounded-full border-[#333] p-2"> <span><MdOutlineNavigateNext className="text-2xl" /></span>
//         </button>
//       </div>
//     </div>
//   )
// }

// export default OurResult



// "use client"
// import Heading from "./Heading";
// import { MdOutlineNavigateNext } from "react-icons/md";
// import Image from "next/image";
// import { useState, useRef, useEffect } from "react";
// import gsap from "gsap";
// import AnimatedLink from "./AnimatedLink";

// const OurResult = () => {
//   const resultarray = [
//     "/OurResult/Portfolio.png",
//     "/OurResult/Container.jpg",
//     "/OurResult/Portfolio.png",
//     "/OurResult/Portfolio.png",
//   ];

//   const [currentIndex, setCurrentIndex] = useState(0);
//   const imageRefs = useRef([]);
//   const buttonRef = useRef(null);

//   const handleNextImage = () => {
//     const tl = gsap.timeline();
//     const currentImage = imageRefs.current[currentIndex];

//     // Animate current image to slide out to the right
//     tl.to(currentImage, {
//       xPercent: 100,
//       opacity: 0,
//       duration: .3,
//       ease: "power2.inOut",
//       onComplete: () => {
//         setCurrentIndex((prev) => (prev + 1 < resultarray.length ? prev + 1 : prev));
//       },
//     });

//     // Animate the next image scaling up a little
//     if (currentIndex + 1 < resultarray.length) {
//       const nextImage = imageRefs.current[currentIndex- 1];
//       tl.fromTo(
//         nextImage,
//         { scale: 0.7 },
//         { scale: 1, duration: .5, ease: "power2.inOut" },
//         "-=1" // Synchronize with the first animation
//       );
//     }
//   };

//   useEffect(() => {
//     // Hide the button when all images are shown
//     if (currentIndex === resultarray.length - 1) {
//       gsap.to(buttonRef.current, { opacity: 0, duration: 0.3, pointerEvents: "none" });
//     }
//   }, [currentIndex, resultarray.length]);

//   return (
//     <div className="w-[80%] m-auto relative">
//       <Heading mainText={"Our"} subText={"Result"} />
//       <div className="my-[5vh] relative h-[100vh]">
//         {resultarray.map((src, index) => (
//           <div
//             key={index}
//             ref={(el) => (imageRefs.current[index] = el)}
//             className={`absolute inset-0 transition-all duration-1000 ${
//               index < currentIndex ? "hidden" : "block"
//             }`}
//             style={{
//               zIndex: resultarray.length - index,
//             }}
//           >
//             <Image
//               alt={`result-${index}`}
//               layout="fill"
//               objectFit="cover"
//               objectPosition="center"
//               quality={75}
//               src={src}
//               loading="lazy"
//               className="rounded-xl h-[100vh] w-full"
//             />
//           </div>
//         ))}

//         <span className="absolute bottom-[20%] left-40 inline-block px-4 py-2 rounded-3xl transition-all ease-out">
//           <AnimatedLink href={"#"} content={"View All Projects"} />
//         </span>

//         <button
//           ref={buttonRef}
//           onClick={handleNextImage}
//           className="absolute bottom-[10%] right-8 border-2 rounded-full border-[#333] p-2 z-30"
//         >
//           <MdOutlineNavigateNext className="text-2xl" />
//         </button>
//       </div>
//     </div>
//   );
// };

// export default OurResult;

// "use client"
// import { useEffect } from 'react';
// import { gsap } from 'gsap';
// import { Flip } from 'gsap/Flip';

// gsap.registerPlugin(Flip);

// const Slider = () => {
//   useEffect(() => {
//     const slider = document.querySelector('.slider');
//     const moveCard = () => {
//       const lastItem = slider.querySelector('.item:last-child');

//       if (slider && lastItem) {
//         lastItem.style.display = 'none'; // Hide the last item
//         const newItem = document.createElement('div');
//         newItem.className = lastItem.className; // Set the same class name
//         newItem.textContent = lastItem.textContent; // Copy the text content
//         slider.insertBefore(newItem, slider.firstChild); // Insert the new item at the beginning
//       }
//     };

//     const handleClick = () => {
//       const state = Flip.getState('.item');
//       moveCard();

//       Flip.from(state, {
//         targets: '.item',
//         ease: 'sine.inOut',
//         absolute: true,
//         onEnter: (elements) => {
//           return gsap.from(elements, {
//             yPercent: 20,
//             opacity: 0,
//             ease: 'sine.out',
//           });
//         },
//         onLeave: (element) => {
//           return gsap.to(element, {
//             // yPercent: 20,
//             xPercent: 20,
//             transformOrigin: 'bottom left',
//             opacity: 0,
//             ease: 'sine.out',
//             onComplete() {
//               slider.removeChild(element[0]);
//             },
//           });
//         },
//       });
//     };

//     document.body.addEventListener('click', handleClick);

//     return () => {
//       document.body.removeEventListener('click', handleClick);
//     };
//   }, []);

//   return (
//     <div className="flex justify-center items-center h-screen cursor-pointer">
//       <div className="slider relative w-full h-[100vh] perspective-[100px]">
//         <div className="item item-5 absolute w-full h-full bg-[#e1faff] flex justify-center items-center text-2xl text-black rounded-lg">5</div>
//         <div className="item item-4 absolute w-full h-full bg-[#fec5fb] flex justify-center items-center text-2xl text-black rounded-lg">4</div>
//         <div className="item item-3 absolute w-full h-full bg-[#00bae2] flex justify-center items-center text-2xl text-black rounded-lg">3</div>
//         <div className="item item-2 absolute w-full h-full bg-[#febef8] flex justify-center items-center text-2xl text-black rounded-lg">2</div>
//         <div className="item item-1 absolute w-full h-full bg-[#bef3fe] flex justify-center items-center text-2xl text-black rounded-lg">1</div>
//       </div>
//     </div>
//   );
// };

// export default Slider;


// "use client";
// import { useEffect } from 'react';
// import { gsap } from 'gsap';
// import { Flip } from 'gsap/Flip';
// import Image from 'next/image';
// import Heading from './Heading';
// import { MdOutlineNavigateNext } from "react-icons/md";
// import AnimatedLink from './AnimatedLink';
// gsap.registerPlugin(Flip);

// const Slider = () => {
//   const images = [
//     { src: "/OurResult/Container.jpg", alt: "Container" },
//     { src: "/OurResult/Portfolio.jpg", alt: "Portfolio" },
//     { src: "/OurResult/Container.jpg", alt: "Container" },
//     { src: "/OurResult/Container.jpg", alt: "Container" },
//   ];
//   useEffect(() => {
//     const slider = document.querySelector('.slider');
//     const moveCard = () => {
//       const lastItem = slider.querySelector('.item:last-child');

//       if (slider && lastItem) {
//         lastItem.style.display = 'none'; // Hide the last item
//         const newItem = document.createElement('div');
//         newItem.className = lastItem.className; // Set the same class name
//         newItem.textContent = lastItem.textContent; // Copy the text content
//         slider.insertBefore(newItem, slider.firstChild); // Insert the new item at the beginning
//       }
//     };

//     const handleClick = () => {
//       const state = Flip.getState('.item');
//       moveCard();
    
//       const items = slider.querySelectorAll('.item');
    
//       Flip.from(state, {
//         targets: items,
//         ease: 'sine.inOut',
//         snap: true,
//         absolute: true,
//         onEnter: (elements) => {
//           updateScales(items);

//           return gsap.from(elements, {
//             scale: 0.8, // Start smaller for incoming items
//             opacity: 0,
//             ease: 'sine.out',
//           });
//         },
//         onLeave: (element) => {
//           return gsap.to(element, {
//             xPercent: 100,
//             transformOrigin: 'bottom left',
//             opacity: 0,
//             ease: 'ease-out',
//             onComplete() {
//               slider.removeChild(element[0]);
//             },
//           });
//         },
//         onComplete: () => {
//         },
//       });
//     };
    
//     const updateScales = (items) => {
//       items.forEach((item, index) => {
//         let scaleValue = 1 - index * 0.2; // Scale decreases by 0.2 for each index
//         scaleValue = Math.max(scaleValue, 0.6); // Set a minimum scale value
//         gsap.to(item, {
//           scale: scaleValue,
//           ease: 'sine.inOut',
//         });
//       });
//     };
    

//     // Add the click handler directly to the button
//     const button = document.querySelector('.slider-button');
//     if (button) {
//       button.addEventListener('click', handleClick);
//     }

//     return () => {
//       if (button) {
//         button.removeEventListener('click', handleClick);
//       }
//     };
//   }, []);

//   return (
//     <div className='w-[90%] m-auto'>
//       <Heading className="ml-[20%]" mainText={"Our"} subText={"Result"} />
//       <div className="flex flex-col   h-screen cursor-pointer">
//         <div className="slider relative w-full h-[100vh] perspective-[100px] flex  ">
//           <button className="absolute right-[5%] bottom-[5%]  slider-button  border-2 rounded-full border-[#f1f1f1] p-2 z-30">       <MdOutlineNavigateNext className="text-3xl" />
//           </button>
//           <span className="absolute bottom-[5%] left-[3%] inline-block px-4 z-30 py-2 rounded-3xl transition-all ease-out">
//             <AnimatedLink href={"#"} content={"View All Projects"} />        </span>
//           {images.map((item, index) => (
//             <div key={index} className={`item absolute w-full h-full  text-2xl rounded-tr-full ${index === images.length - 1 ? 'ml-[5%]' : ''}`}>
//               <Image
//                 alt={item.alt}
//                 layout="fill"
//                 objectFit="cover"
//                 objectPosition="center"
//                 quality={75}
//                 src={item.src}
//                 loading="lazy"
//                 className="rounded-tr-[130px] h-full w-full border-[#333] border-2"
//               />
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Slider;


"use client";
import { useEffect } from 'react';
import { gsap } from 'gsap';
import { Flip } from 'gsap/Flip';
import Image from 'next/image';
import Heading from './Heading';
import { MdOutlineNavigateNext } from "react-icons/md";
import AnimatedLink from './AnimatedLink';

gsap.registerPlugin(Flip);

const Slider = () => {
  const images = [
    { src: "/OurResult/Portfolio.jpg", alt: "Portfolio" },
    { src: "/OurResult/Container.jpg", alt: "Container" },
    { src: "/OurResult/Container.jpg", alt: "Container" },
    { src: "/OurResult/Container.jpg", alt: "Container" },
  ];

  useEffect(() => {
    const slider = document.querySelector('.slider');

    // Function to set initial scales for images (inverse order)
    const setInitialScales = () => {
      const items = slider.querySelectorAll('.item');
      items.forEach((item, index) => {
        let scaleValue = 0.4 + index * 0.2; // Scale decreases as index increases
        scaleValue = Math.max(scaleValue, 0.6); // Set a minimum scale value of 0.6
        gsap.set(item, { scale: scaleValue });
      });
    };

    // Function to move the last card to the beginning
    const moveCard = () => {
      const lastItem = slider.querySelector('.item:last-child');

      if (slider && lastItem) {
        lastItem.style.display = 'none'; // Hide the last item
        const newItem = document.createElement('div');
        newItem.className = lastItem.className; // Set the same class name
        newItem.innerHTML = lastItem.innerHTML; // Copy the inner content (image)
        slider.insertBefore(newItem, slider.firstChild); // Insert the new item at the beginning
      }
    };

    // Function to handle the click event
    const handleClick = () => {
      const state = Flip.getState('.item');
      moveCard(); // Move last card to the beginning

      const items = slider.querySelectorAll('.item');

      Flip.from(state, {
        targets: items,
        ease: 'sine.inOut',
        snap: true,
        absolute: true,
        onEnter: (elements) => {
          // updateScales(items); // Update scales after entering new items

          return gsap.from(elements, {
            scale: 0.8, // Start smaller for incoming items
            opacity: 0,
            ease: 'sine.out',
          });
        },
        onLeave: (element) => {
          return gsap.to(element, {
            xPercent: 100,
            transformOrigin: 'bottom left',
            opacity: 0,
            ease: 'ease-out',
            onComplete() {
              slider.removeChild(element[0]); // Remove the old element after leaving
            },
          });
        },
      });
    };

    // Function to update scales for all items in the slider (reverse scaling)
    // const updateScales = (items) => {
    //   items.forEach((item, index) => {
    //     let scaleValue = 1 - index * 0.2; // The first item has a scale of 1, next has 0.8, and so on
    //     scaleValue = Math.max(scaleValue, 0.6); // Ensure minimum scale of 0.6
    //     gsap.to(item, {
    //       scale: scaleValue,
    //       x: index * 30, // Add a small x-offset to create left alignment effect
    //       ease: 'sine.inOut',
    //     });
    //   });
    // };

    // Set initial scales for images when the component mounts
    // setInitialScales();

    // Add click handler to the button
    const button = document.querySelector('.slider-button');
    if (button) {
      button.addEventListener('click', handleClick);
    }

    return () => {
      if (button) {
        button.removeEventListener('click', handleClick);
      }
    };
  }, []);

  return (
    <div className='w-[90%] m-auto'>
      <Heading className="ml-[20%]" mainText={"Our"} subText={"Result"} />
      <div className="flex flex-col h-screen cursor-pointer">
        <div className="slider relative w-full h-[100vh] perspective-[100px] flex "> {/* Adjusted to justify-start for left alignment */}
          <button className="absolute right-[5%] bottom-[5%] slider-button border-2 rounded-full border-[#f1f1f1] p-2 z-30">
            <MdOutlineNavigateNext className="text-3xl" />
          </button>
          <span className="absolute bottom-[5%] left-[3%] inline-block px-4 z-30 py-2 rounded-3xl transition-all ease-out">
            <AnimatedLink href={"#"} content={"View All Projects"} />
          </span>
          {images.map((item, index) => (
            <div key={index} className={`item absolute w-full h-full text-2xl rounded-tr-full ${index === images.length - 1 ? 'ml-[5%]' : ''}`}>
              <Image
                alt={item.alt}
                layout="fill"
                objectFit="cover"
                objectPosition="center"
                quality={75}
                src={item.src}
                loading="lazy"
                className="rounded-tr-[130px] h-full w-full border-[#333] border-2"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slider;
