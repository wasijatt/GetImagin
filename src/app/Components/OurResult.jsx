
// "use client";
// import dynamic from 'next/dynamic';
// import { useEffect } from 'react';
// import { gsap } from 'gsap';
// import { Flip } from 'gsap/Flip';
// import Image from 'next/image';
 
// import { MdOutlineNavigateNext } from "react-icons/md";
// const Heading = dynamic(() => import('./Heading'), { ssr: false });
// const AnimatedLink = dynamic(() => import('./AnimatedLink'), { ssr: false });

 

// gsap.registerPlugin(Flip);

// const Slider = () => {
//   const images = [
//     { src: "/OurResult/Portfolio.jpg", alt: "Portfolio" },
//     { src: "/OurResult/Container.jpg", alt: "Container" },
//     { src: "/OurResult/Container.jpg", alt: "Container" },
//     // { src: "/OurResult/Container.jpg", alt: "Container" },
//   ];

//   useEffect(() => {
//     const slider = document.querySelector('.slider');

//     // Function to set initial scales for images (inverse order)
//     const setInitialScales = () => {
//       const items = slider.querySelectorAll('.item');
//       items.forEach((item, index) => {
//         let scaleValue = 0.6 + index * 0.2; // Set scaling based on position
//         gsap.set(item, { scale: scaleValue });
//       });
//     };

  
//     // Function to move the last card to the beginning
//     const moveCard = () => {
//       const lastItem = slider.querySelector('.item:last-child');
//       if (slider && lastItem) {
//         lastItem.style.display = 'none'; // Temporarily hide the last item
//         const newItem = lastItem.cloneNode(true); // Clone the last item
//         slider.insertBefore(newItem, slider.firstChild); // Insert it at the start
//       }
//     };

//     // Function to handle the click event
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
//           updateScales(items); // Apply smooth scaling
//           return gsap.from(elements, {
//             scale: 0.8,
//             opacity: 0,
//             ease: 'sine.out',
//           });
//         },
//         onLeave: (element) => {
//           return gsap.to(element, {
//             xPercent: 100,
//             opacity: 0,
//             ease: 'ease-out',
//             onComplete() {
//               slider.removeChild(element[0]); // Remove after animation
//             },
//           });
//         },
//       });
//     };

//     // Set initial scales for images when the component mounts
//     setInitialScales();

//     // Add click handler to the button
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
//     <div className='w-[90%] '>
//       <Heading className="ml-[20%]" mainText={"Our"} subText={"Result"} />
//       <div className="flex justify- flex-col h-screen cursor-pointer">
//         <div className="slider relative w-full h-[100vh] perspective-[100px] flex ">
//           <button className="absolute right-[5%] bottom-[5%] slider-button border-2 rounded-full border-[#f1f1f1] p-2 z-30">
//             <MdOutlineNavigateNext className="text-3xl" />
//           </button>
//           <span className="absolute bottom-[5%] left-[3%] inline-block px-4 z-30 py-2 rounded-3xl transition-all ease-out">
//             <AnimatedLink href={"#"} content={"View All Projects"} />
//           </span>
//           {images.map((item, index) => (
//             <div key={index}
//              className={`item absolute w-full h-full text-2xl rounded-tr-full ${index === images.length - 1 ? '-ml-[5%]' : ''}`}
//             >
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
  ];

  useEffect(() => {
    const slider = document.querySelector('.slider');

    const setInitialScales = () => {
      const items = slider.querySelectorAll('.item');
      items.forEach((item, index) => {
        let scaleValue = 0.6 + index * 0.2;
        gsap.set(item, { scale: scaleValue });
      });
    };

    const updateScales = (items) => {
      items.forEach((item, index) => {
        let scaleValue = 0.6 + index * 0.2;
        gsap.to(item, {
          scale: scaleValue,
          duration: 0.6,
          ease: 'sine.inOut',
        });
      });
    };

    const moveCard = () => {
      const lastItem = slider.querySelector('.item:last-child');
      if (slider && lastItem) {
        lastItem.style.display = 'none';
        const newItem = lastItem.cloneNode(true);
        slider.insertBefore(newItem, slider.firstChild);
      }
    };

    const handleClick = () => {
      const state = Flip.getState('.item');
      moveCard();

      const items = slider.querySelectorAll('.item');

      Flip.from(state, {
        targets: items,
        ease: 'sine.inOut',
        snap: true,
        absolute: true,
        onEnter: (elements) => {
          updateScales(items);
          return gsap.from(elements, {
            scale: 0.8,
            opacity: 0,
            ease: 'sine.out',
          });
        },
        onLeave: (element) => {
          return gsap.to(element, {
            xPercent: 100,
            opacity: 0,
            ease: 'ease-out',
            onComplete() {
              element.remove(); // Avoiding `[0]` indexing here
            },
          });
        },
      });
    };

    setInitialScales();

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
    <div className='w-[90%] '>
      <Heading className="ml-[20%]" mainText={"Our"} subText={"Result"} />
      <div className="flex flex-col h-screen cursor-pointer">
        <div className="slider relative w-full h-[100vh] perspective-[100px] flex">
          <button className="absolute right-[5%] bottom-[5%] slider-button border-2 rounded-full border-[#f1f1f1] p-2 z-30">
            <MdOutlineNavigateNext className="text-3xl" />
          </button>
          <span className="absolute bottom-[5%] left-[3%] inline-block px-4 z-30 py-2 rounded-3xl transition-all ease-out">
            <AnimatedLink href={"#"} content={"View All Projects"} />
          </span>

          {images.map((item, index) => (
            <div
              key={index}
              className={`item absolute w-full h-full text-2xl rounded-tr-full ${index === 0 ? 'ml-[5%] scale-75' : ''} ${index === 1 ? 'ml-[10%]' : ''} ${index === 2 ? 'ml-[15%]' : ''}`}
            >
              <Image
                src={item.src}
                alt={item.alt}
                layout="fill"
                objectFit="cover"
                objectPosition="center"
                quality={75}
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
