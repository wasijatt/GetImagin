// "use client"
// import { useEffect, useRef, useState } from "react";
// import { FaArrowLeft } from "react-icons/fa6";
// import Image from "next/image";
// import Link from "next/link";
// import gsap from "gsap";
// import ScrollTrigger from "gsap/dist/ScrollTrigger";

// gsap.registerPlugin(ScrollTrigger);

// const OurServices = () => {
//   const servicesRef = useRef(null);
//   const [arrowRotated, setArrowRotated] = useState(false); // Arrow rotation state

//   const Services = [
//     {
//       ServiceHead: "Web design & development",
//       services: [
//         { name: "Creative web design", link: "#" },
//         { name: "Web development", link: "#" },
//         { name: "Copywriting", link: "#" },
//         { name: "E-Commerce", link: "#" },
//         { name: "WordPress", link: "#" },
//         { name: "SEO", link: "#" }
//       ],
//       ServiceDis:
//         "Crafting digital experiences where beauty meets ROI, turning heads and unlocking revenue potential with every click.",
//       buton: "Find out more",
//       Img: "/public/HeaderLogo/Getimagin.png"
//     },
//     {
//       ServiceHead: "E-Commerce Development",
//       services: [
//         { name: "Shopify", link: "#" },
//         { name: "Magento", link: "#" },
//         { name: "WooCommerce", link: "#" },
//         { name: "BigCommerce", link: "#" }
//       ],
//       ServiceDis:
//         "We build scalable e-commerce platforms designed to enhance online shopping experiences and drive conversions.",
//       buton: "Find out more",
//       Img: "/public/HeaderLogo/Getimagin.png"
//     },
//     {
//       ServiceHead: "E- Development",
//       services: [
//         { name: "Shopify", link: "#" },
//         { name: "Magento", link: "#" },
//         { name: "WooCommerce", link: "#" },
//         { name: "BigCommerce", link: "#" }
//       ],
//       ServiceDis:
//         "We build scalable e-commerce platforms designed to enhance online shopping experiences and drive conversions.",
//       buton: "Find out more",
//       Img: "/public/HeaderLogo/Getimagin.png"
//     },  {
//       ServiceHead: "E-Commerce ",
//       services: [
//         { name: "Shopify", link: "#" },
//         { name: "Magento", link: "#" },
//         { name: "WooCommerce", link: "#" },
//         { name: "BigCommerce", link: "#" }
//       ],
//       ServiceDis:
//         "We build scalable e-commerce platforms designed to enhance online shopping experiences and drive conversions.",
//       buton: "Find out more",
//       Img: "/public/HeaderLogo/Getimagin.png"
//     },  {
//       ServiceHead: "E-Commerce Development",
//       services: [
//         { name: "Shopify", link: "#" },
//         { name: "Magento", link: "#" },
//         { name: "WooCommerce", link: "#" },
//         { name: "BigCommerce", link: "#" }
//       ],
//       ServiceDis:
//         "We build scalable e-commerce platforms designed to enhance online shopping experiences and drive conversions.",
//       buton: "Find out more",
//       Img: "/public/HeaderLogo/Getimagin.png"
//     },  {
//       ServiceHead: "E-Commerce Development",
//       services: [
//         { name: "Shopify", link: "#" },
//         { name: "Magento", link: "#" },
//         { name: "WooCommerce", link: "#" },
//         { name: "BigCommerce", link: "#" }
//       ],
//       ServiceDis:
//         "We build scalable e-commerce platforms designed to enhance online shopping experiences and drive conversions.",
//       buton: "Find out more",
//       Img: "/public/HeaderLogo/Getimagin.png"
//     },  {
//       ServiceHead: "E-Commerce Development",
//       services: [
//         { name: "Shopify", link: "#" },
//         { name: "Magento", link: "#" },
//         { name: "WooCommerce", link: "#" },
//         { name: "BigCommerce", link: "#" }
//       ],
//       ServiceDis:
//         "We build scalable e-commerce platforms designed to enhance online shopping experiences and drive conversions.",
//       buton: "Find out more",
//       Img: "/public/HeaderLogo/Getimagin.png"
//     },    // Add more services if needed...
//   ];

//   useEffect(() => {
//     const serviceDivs = gsap.utils.toArray(".service-section");

//     serviceDivs.forEach((div, index) => {
//       // Set initial opacity and position for the upcoming divs (except the first one)
//       if (index !== 0) {
//         gsap.set(div, { opacity: 0, scale: 0.9 });
//       }

//       ScrollTrigger.create({
//         trigger: servicesRef.current,
//         start: () => `top+=${index * 100} center`, // Trigger each div as you scroll down
//         end: () => `+=${100}`,
//         onEnter: () => {
//           // When the first scroll happens, rotate the arrow 45 degrees
//           if (index === 0 && !arrowRotated) {
//             setArrowRotated(true);
//             gsap.to(".arrow-icon", {
//               rotation: -45,
//               duration: 1,

//               ease: "power2.out"
//             });
//           }


//         },
//         onLeaveBack: () => {

//           if (index === 0 && arrowRotated) {
//             setArrowRotated(false);
//             gsap.to(".arrow-icon", {
//               rotation: 0,
//               duration: 1,
//               ease: "power2.out"
//             });
//           }


//           if (index > 0) {
//             const previousDiv = serviceDivs[index - 1];
//             gsap.to(previousDiv, {
//               scale: 1,
//               opacity: 1,
//               y: 0,
//               zIndex: 1,
//               duration: 0.5,
//               ease: "power2.out"
//             });
//           }
//         }
//       });
//     });
//   }, [arrowRotated]);

//   return (
//     <div className="w-full bg-black text-[#E9E9E9]">

//       <div className="  z-50 bg-black w-full">
//         <div className="flex items-center justify-between w-[70%] m-auto py-4">
//           <h1 className="text-base md:text-[40px] lg:text-[70px] leading-none">
//             Our <br /> <span className="ml-9">Services</span>
//           </h1>
//           <div className="relative">
//             <div className="radialshadow"></div>

//             <FaArrowLeft className={`arrow-icon text-base md:text-[40px] lg:text-[100px] z-50  ${arrowRotated ? "rotate-45" : ""}`} />
//           </div>
//         </div>
//       </div>


//       <div ref={servicesRef} className=" overflow-hidden w-full m-auto h-[100vh] bg-black">
//         {Services.map((service, index) => (
//           <div
//             key={index}
//             className={`service-section  w-[95%] m-auto h-[100vh] top-0 left-0 border p-6 flex bg-blue-600 rounded-3xl shadow-lg justify-around items-center transition-all duration-500 ease-in-out`}
//           >
//             <div className="w-[60%]">
//               <h2 className="text-[#24CFA6] text-base md:text-[20px] lg:text-[50px] leading-none">
//                 {service.ServiceHead}
//               </h2>
//               <ul className="mb-4">
//                 {service.services.map((item, idx) => (
//                   <li
//                     key={idx}
//                     className="px-5 py-2 border-[1px] border-[#24CFA6] rounded-3xl m-2 inline-block"
//                   >
//                     <Link href={item.link} className="text-black">
//                       {item.name}
//                     </Link>
//                   </li>
//                 ))}
//               </ul>
//               <p className="mb-4 text-black">{service.ServiceDis}</p>
//               <Link href="#" className="inline-block border-2 border-black text-[#24CFA6] px-4 py-2 rounded">
//                 {service.buton}
//               </Link>
//             </div>
//             <Image
//               alt="Services Images"
//               loading="lazy"
//               quality={75}
//               width={100}
//               height={100}
//               src={service.Img}
//             />
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default OurServices;


// "use client";
// import { useEffect, useRef } from "react";
// import { FaArrowLeft } from "react-icons/fa6";
// import Image from "next/image";
// import Link from "next/link";
// import gsap from "gsap";
// import ScrollTrigger from "gsap/dist/ScrollTrigger";

// gsap.registerPlugin(ScrollTrigger);

// const OurServices = () => {
//   const servicesRef = useRef(null);

//   const Services = [
//     {
//       ServiceHead: "Web design & development",
//       services: [
//         { name: "Creative web design", link: "#" },
//         { name: "Web development", link: "#" },
//         { name: "Copywriting", link: "#" },
//         { name: "E-Commerce", link: "#" },
//         { name: "WordPress", link: "#" },
//         { name: "SEO", link: "#" },
//       ],
//       ServiceDis:
//         "Crafting digital experiences where beauty meets ROI, turning heads and unlocking revenue potential with every click.",
//       buton: "Find out more",
//       Img: "/public/HeaderLogo/Getimagin.png",
//     },
//     {
//       ServiceHead: "E-Commerce Development",
//       services: [
//         { name: "Shopify", link: "#" },
//         { name: "Magento", link: "#" },
//         { name: "WooCommerce", link: "#" },
//         { name: "BigCommerce", link: "#" },
//       ],
//       ServiceDis:
//         "We build scalable e-commerce platforms designed to enhance online shopping experiences and drive conversions.",
//       buton: "Find out more",
//       Img: "/public/HeaderLogo/Getimagin.png",
//     },  {
//       ServiceHead: "E-Commerce Development",
//       services: [
//         { name: "Shopify", link: "#" },
//         { name: "Magento", link: "#" },
//         { name: "WooCommerce", link: "#" },
//         { name: "BigCommerce", link: "#" },
//       ],
//       ServiceDis:
//         "We build scalable e-commerce platforms designed to enhance online shopping experiences and drive conversions.",
//       buton: "Find out more",
//       Img: "/public/HeaderLogo/Getimagin.png",
//     },  {
//       ServiceHead: "E-Commerce ",
//       services: [
//         { name: "Shopify", link: "#" },
//         { name: "Magento", link: "#" },
//         { name: "WooCommerce", link: "#" },
//         { name: "BigCommerce", link: "#" },
//       ],
//       ServiceDis:
//         "We build scalable e-commerce platforms designed to enhance online shopping experiences and drive conversions.",
//       buton: "Find out more",
//       Img: "/public/HeaderLogo/Getimagin.png",
//     },  {
//       ServiceHead: "E- Development",
//       services: [
//         { name: "Shopify", link: "#" },
//         { name: "Magento", link: "#" },
//         { name: "WooCommerce", link: "#" },
//         { name: "BigCommerce", link: "#" },
//       ],
//       ServiceDis:
//         "We build scalable e-commerce platforms designed to enhance online shopping experiences and drive conversions.",
//       buton: "Find out more",
//       Img: "/public/HeaderLogo/Getimagin.png",
//     },  {
//       ServiceHead: "Commerce Development",
//       services: [
//         { name: "Shopify", link: "#" },
//         { name: "Magento", link: "#" },
//         { name: "WooCommerce", link: "#" },
//         { name: "BigCommerce", link: "#" },
//       ],
//       ServiceDis:
//         "We build scalable e-commerce platforms designed to enhance online shopping experiences and drive conversions.",
//       buton: "Find out more",
//       Img: "/public/HeaderLogo/Getimagin.png",
//     },

//   ];



//   return (
//     <div className="w-full bg-black text-[#E9E9E9]">
//       <div className="z-50 bg-black w-full">
//         <div className="flex items-center justify-between w-[70%] m-auto py-4">
//           <h1 className="text-base md:text-[40px] lg:text-[70px] leading-none">
//             Our <br /> <span className="ml-9">Services</span>
//           </h1>
//           <div className="relative">
//             <FaArrowLeft className="arrow-icon text-base md:text-[40px] lg:text-[100px] z-50" />
//           </div>
//         </div>
//       </div>

//       <div
//         ref={servicesRef}
//         className="overflow-hidden w-full h-auto m-auto bg-yellow-600"
//       >
//         {Services.map((service, index) => (
//           <div
//             key={index}
//             className="service-section w-[95%] m-auto h-[100vh] flex bg-blue-600 rounded-3xl shadow-lg justify-around items-center transition-all duration-500 ease-in-out"
//           >
//             <div className="w-[60%]">
//               <h2 className="text-[#24CFA6] text-base md:text-[20px] lg:text-[50px] leading-none">
//                 {service.ServiceHead}
//               </h2>
//               <ul className="mb-4">
//                 {service.services.map((item, idx) => (
//                   <li
//                     key={idx}
//                     className="px-5 py-2 border-[1px] border-[#24CFA6] rounded-3xl m-2 inline-block"
//                   >
//                     <Link href={item.link} className="text-black">
//                       {item.name}
//                     </Link>
//                   </li>
//                 ))}
//               </ul>
//               <p className="mb-4 text-black">{service.ServiceDis}</p>
//               <Link
//                 href="#"
//                 className="inline-block border-2 border-black text-[#24CFA6] px-4 py-2 rounded"
//               >
//                 {service.buton}
//               </Link>
//             </div>
//             <Image
//               alt="Services Images"
//               loading="lazy"
//               quality={75}
//               width={100}
//               height={100}
//               src={service.Img}
//             />
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default OurServices;


// "use client"
// import React, { useEffect, useRef } from "react";
// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import Image from "next/image";
// import Link from "next/link";
// import { FaArrowLeft } from "react-icons/fa";

// // Register ScrollTrigger plugin
// gsap.registerPlugin(ScrollTrigger);

// const ServicesComponent = () => {
//   const servicesRef = useRef(null);

//   useEffect(() => {
//     const services = gsap.utils.toArray(".service-section");

//     services.forEach((service, i) => {
//       // Create a GSAP timeline for each service section
//       const timeline = gsap.timeline({
//         scrollTrigger: {
//           trigger: ".sparent",
//           start: "top 0%", // When the section hits the top of the viewport
//           end: "bottom -100%", // The point at which the animation should end (adjust if needed)
//           scrub: true, // Sync animation with scroll progress
//           pin: true, // Pin the section in place while scrolling

//         },
//       });

//       // Scale and fade the section according to scroll progress
//       timeline.fromTo(
//         service,
//         { opacity: 1, scale: 1 }, // Initial state
//         {
//           opacity: 1, // Fade out as you scroll down
//           scale: 0.8, // Scale down as you scroll down
//           ease: "none", // No easing for linear fade and scale
//         }
//       );
//     });
//   }, []);

//   const Services = [
//     {
//       ServiceHead: "Web design & development",
//       services: [
//         { name: "Creative web design", link: "#" },
//         { name: "Web development", link: "#" },
//         { name: "Copywriting", link: "#" },
//         { name: "E-Commerce", link: "#" },
//         { name: "WordPress", link: "#" },
//         { name: "SEO", link: "#" },
//       ],
//       ServiceDis:
//         "Crafting digital experiences where beauty meets ROI, turning heads and unlocking revenue potential with every click.",
//       buton: "Find out more",
//       Img: "/public/HeaderLogo/Getimagin.png",
//     },
//     {
//       ServiceHead: "E-Commerce Development",
//       services: [
//         { name: "Shopify", link: "#" },
//         { name: "Magento", link: "#" },
//         { name: "WooCommerce", link: "#" },
//         { name: "BigCommerce", link: "#" },
//       ],
//       ServiceDis:
//         "We build scalable e-commerce platforms designed to enhance online shopping experiences and drive conversions.",
//       buton: "Find out more",
//       Img: "/public/HeaderLogo/Getimagin.png",
//     },{
//       ServiceHead: "E-Commerce Development",
//       services: [
//         { name: "Shopify", link: "#" },
//         { name: "Magento", link: "#" },
//         { name: "WooCommerce", link: "#" },
//         { name: "BigCommerce", link: "#" },
//       ],
//       ServiceDis:
//         "We build scalable e-commerce platforms designed to enhance online shopping experiences and drive conversions.",
//       buton: "Find out more",
//       Img: "/public/HeaderLogo/Getimagin.png",
//     },{
//       ServiceHead: "E-Commerce Development",
//       services: [
//         { name: "Shopify", link: "#" },
//         { name: "Magento", link: "#" },
//         { name: "WooCommerce", link: "#" },
//         { name: "BigCommerce", link: "#" },
//       ],
//       ServiceDis:
//         "We build scalable e-commerce platforms designed to enhance online shopping experiences and drive conversions.",
//       buton: "Find out more",
//       Img: "/public/HeaderLogo/Getimagin.png",
//     },{
//       ServiceHead: "E-Commerce Development",
//       services: [
//         { name: "Shopify", link: "#" },
//         { name: "Magento", link: "#" },
//         { name: "WooCommerce", link: "#" },
//         { name: "BigCommerce", link: "#" },
//       ],
//       ServiceDis:
//         "We build scalable e-commerce platforms designed to enhance online shopping experiences and drive conversions.",
//       buton: "Find out more",
//       Img: "/public/HeaderLogo/Getimagin.png",
//     },
//   ];

//   return (
//     <div className="w-full bg-black text-[#E9E9E9]">
//       <div className="z-50 bg-black w-full">
//         <div className="flex items-center justify-between w-[70%] m-auto py-4">
//           <h1 className="text-base md:text-[40px] lg:text-[70px] leading-none">
//             Our <br /> <span className="ml-9">Services</span>
//           </h1>
//           <div className="relative">
//             <FaArrowLeft className="arrow-icon text-base md:text-[40px] lg:text-[100px] z-50" />
//           </div>
//         </div>
//       </div>

//       <div ref={servicesRef} className="overflow-hidden w-full h-auto m-auto sparent">
//         {Services.map((service, index) => (
//           <div
//             key={index}
//             className="service-section w-[95%] m-auto h-[100vh] flex bg-blue-600 rounded-3xl shadow-lg justify-around items-center transition-all duration-500 ease-in-out"
//           >
//             <div className="w-[60%]">
//               <h2 className="text-[#24CFA6] text-base md:text-[20px] lg:text-[50px] leading-none">
//                 {service.ServiceHead}
//               </h2>
//               <ul className="mb-4">
//                 {service.services.map((item, idx) => (
//                   <li
//                     key={idx}
//                     className="px-5 py-2 border-[1px] border-[#24CFA6] rounded-3xl m-2 inline-block"
//                   >
//                     <Link href={item.link} className="text-black">
//                       {item.name}
//                     </Link>
//                   </li>
//                 ))}
//               </ul>
//               <p className="mb-4 text-black">{service.ServiceDis}</p>
//               <Link
//                 href="#"
//                 className="inline-block border-2 border-black text-[#24CFA6] px-4 py-2 rounded"
//               >
//                 {service.buton}
//               </Link>
//             </div>
//             <Image
//               alt="Services Images"
//               loading="lazy"
//               quality={75}
//               width={100}
//               height={100}
//               src={service.Img}
//             />
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ServicesComponent;


// "use client";

// import { useEffect } from "react";
// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import Image from "next/image";
// import Link from "next/link";
// import { FaArrowLeft } from "react-icons/fa";
// import Heading from "./Heading";

// gsap.registerPlugin(ScrollTrigger);

// const ServicesComponent = () => {
//   useEffect(() => {
//     // Initialize ScrollTrigger
//     ScrollTrigger.refresh();

//     // Create scrollTrigger animations for each service section
//     gsap.to(".service-1", {
//       scrollTrigger: {
//         trigger: ".service-section",
//         start: "top top",
//         pin:true,
//         end: "bottom -100%",
//         scrub: 1, // Adjust the scrub value as needed for smoother scrolling
//       },
//       pin: true, // Pin the element to the viewport
//       top: 0, // Position the element at the top of the viewport
//     });

//     gsap.to(".service-2", {
//       scrollTrigger: {
//         trigger: ".service-2",
//         start: "top bottom",
//         end: "bottom bottom",
//         scrub: 1,
//         pin:true,
//       },
//       scale: 0.8, // Scale down the element
//       opacity: 0.5, // Reduce opacity
//     });

//     // ... (similar animations for service-3 and service-4)
//   }, []);
//   return (
//     <div className="w-full bg-black text-[#E9E9E9]">
//       <div className="z-50 bg-black w-full">
//         <div className="flex items-center justify-between w-[70%] m-auto py-4">
//           <Heading mainText={"Our"} subText={"Services"} />
//           <div className="relative">
//             <FaArrowLeft className="arrow-icon text-base md:text-[40px] lg:text-[100px] z-50" />
//           </div>
//         </div>
//       </div>

//       <div className="service-section overflow-hidden w-full h-auto m-auto">
//         {/* First Service Section */}
//         <div className="w-[95%] service-1 m-auto mt-3 h-[100vh] flex bg-white rounded-3xl shadow-lg justify-around items-center transition-all duration-500 ease-in-out">
//           <div className="w-[60%]">
//             <h2 className="text-[#24CFA6] text-base md:text-[20px] lg:text-[50px] leading-none">
//               Web design & development
//             </h2>
//             <ul className="mb-4">
//               <li className="px-5 py-2 border-[1px] border-[#24CFA6] rounded-3xl m-2 inline-block">
//                 <Link href="#">Creative web design</Link>
//               </li>
//               <li className="px-5 py-2 border-[1px] border-[#24CFA6] rounded-3xl m-2 inline-block">
//                 <Link href="#">Web development</Link>
//               </li>
//               <li className="px-5 py-2 border-[1px] border-[#24CFA6] rounded-3xl m-2 inline-block">
//                 <Link href="#">Copywriting</Link>
//               </li>
//               <li className="px-5 py-2 border-[1px] border-[#24CFA6] rounded-3xl m-2 inline-block">
//                 <Link href="#">E-Commerce</Link>
//               </li>
//               <li className="px-5 py-2 border-[1px] border-[#24CFA6] rounded-3xl m-2 inline-block">
//                 <Link href="#">WordPress</Link>
//               </li>
//               <li className="px-5 py-2 border-[1px] border-[#24CFA6] rounded-3xl m-2 inline-block">
//                 <Link href="#">SEO</Link>
//               </li>
//             </ul>
//             <p className="mb-4 text-black">
//               Crafting digital experiences where beauty meets ROI, turning heads and unlocking revenue potential with every click.
//             </p>
//             <Link href="#" className="inline-block border-2 border-black text-[#24CFA6] px-4 py-2 rounded">
//               Find out more
//             </Link>
//           </div>
//           <Image alt="Services Images" loading="lazy" quality={75} width={100} height={100} src="/public/HeaderLogo/Getimagin.png" />
//         </div>

//         {/* Second Service Section */}
//         <div className="w-[95%] service-2 m-auto mt-3 h-[100vh] flex bg-blue-600 rounded-3xl shadow-lg justify-around items-center transition-all duration-500 ease-in-out">
//           <div className="w-[60%]">
//             <h2 className="text-[#24CFA6] text-base md:text-[20px] lg:text-[50px] leading-none">
//               E-Commerce Development
//             </h2>
//             <ul className="mb-4">
//               <li className="px-5 py-2 border-[1px] border-[#24CFA6] rounded-3xl m-2 inline-block">
//                 <Link href="#">Shopify</Link>
//               </li>
//               <li className="px-5 py-2 border-[1px] border-[#24CFA6] rounded-3xl m-2 inline-block">
//                 <Link href="#">Magento</Link>
//               </li>
//               <li className="px-5 py-2 border-[1px] border-[#24CFA6] rounded-3xl m-2 inline-block">
//                 <Link href="#">WooCommerce</Link>
//               </li>
//               <li className="px-5 py-2 border-[1px] border-[#24CFA6] rounded-3xl m-2 inline-block">
//                 <Link href="#">BigCommerce</Link>
//               </li>
//             </ul>
//             <p className="mb-4 text-black">
//               We build scalable e-commerce platforms designed to enhance online shopping experiences and drive conversions.
//             </p>
//             <Link href="#" className="inline-block border-2 border-black text-[#24CFA6] px-4 py-2 rounded">
//               Find out more
//             </Link>
//           </div>
//           <Image alt="Services Images" loading="lazy" quality={75} width={100} height={100} src="/public/HeaderLogo/Getimagin.png" />
//         </div>

//         {/* Third Service Section */}
//         <div className="w-[95%] service-3 m-auto mt-3 h-[100vh] flex bg-blue-600 rounded-3xl shadow-lg justify-around items-center transition-all duration-500 ease-in-out">
//           <div className="w-[60%]">
//             <h2 className="text-[#24CFA6] text-base md:text-[20px] lg:text-[50px] leading-none">
//               E-Commerce Development
//             </h2>
//             <ul className="mb-4">
//               <li className="px-5 py-2 border-[1px] border-[#24CFA6] rounded-3xl m-2 inline-block">
//                 <Link href="#">Shopify</Link>
//               </li>
//               <li className="px-5 py-2 border-[1px] border-[#24CFA6] rounded-3xl m-2 inline-block">
//                 <Link href="#">Magento</Link>
//               </li>
//               <li className="px-5 py-2 border-[1px] border-[#24CFA6] rounded-3xl m-2 inline-block">
//                 <Link href="#">WooCommerce</Link>
//               </li>
//               <li className="px-5 py-2 border-[1px] border-[#24CFA6] rounded-3xl m-2 inline-block">
//                 <Link href="#">BigCommerce</Link>
//               </li>
//             </ul>
//             <p className="mb-4 text-black">
//               We build scalable e-commerce platforms designed to enhance online shopping experiences and drive conversions.
//             </p>
//             <Link href="#" className="inline-block border-2 border-black text-[#24CFA6] px-4 py-2 rounded">
//               Find out more
//             </Link>
//           </div>
//           <Image alt="Services Images" loading="lazy" quality={75} width={100} height={100} src="/public/HeaderLogo/Getimagin.png" />
//         </div>

//         {/* Fourth Service Section */}
//         <div className="w-[95%] service-4 m-auto mt-3 h-[100vh] flex bg-blue-600 rounded-3xl shadow-lg justify-around items-center transition-all duration-500 ease-in-out">
//           <div className="w-[60%]">
//             <h2 className="text-[#24CFA6] text-base md:text-[20px] lg:text-[50px] leading-none">
//               E-Commerce Development
//             </h2>
//             <ul className="mb-4">
//               <li className="px-5 py-2 border-[1px] border-[#24CFA6] rounded-3xl m-2 inline-block">
//                 <Link href="#">Shopify</Link>
//               </li>
//               <li className="px-5 py-2 border-[1px] border-[#24CFA6] rounded-3xl m-2 inline-block">
//                 <Link href="#">Magento</Link>
//               </li>
//               <li className="px-5 py-2 border-[1px] border-[#24CFA6] rounded-3xl m-2 inline-block">
//                 <Link href="#">WooCommerce</Link>
//               </li>
//               <li className="px-5 py-2 border-[1px] border-[#24CFA6] rounded-3xl m-2 inline-block">
//                 <Link href="#">BigCommerce</Link>
//               </li>
//             </ul>
//             <p className="mb-4 text-black">
//               We build scalable e-commerce platforms designed to enhance online shopping experiences and drive conversions.
//             </p>
//             <Link href="#" className="inline-block border-2 border-black text-[#24CFA6] px-4 py-2 rounded">
//               Find out more
//             </Link>
//           </div>
//           <Image alt="Services Images" loading="lazy" quality={75} width={100} height={100} src="/public/HeaderLogo/Getimagin.png" />
//         </div>

//       </div>
//     </div>
//   );
// };

// export default ServicesComponent;


// "use client";

// import { useEffect } from "react";
// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import Image from "next/image";
// import Link from "next/link";
// import { FaArrowLeft } from "react-icons/fa";
// import Heading from "./Heading";

// gsap.registerPlugin(ScrollTrigger);

// const ServicesComponent = () => {
//   useEffect(() => {
//     // Create scroll-triggered animations for each service div
//     gsap.utils.toArray(".service").forEach((service, i) => {

//       ScrollTrigger.create({
//         trigger: ".services",
//         start: "top top",
//         pin: "true",
//         pinSpacing: false,
//       })
//     });
//   }, []);

//   return (
//     <div className="relative w-full h-[400vh] bg-black text-[#E9E9E9]">
//       <div className="z-50 bg-black w-full ">
//         <div className="flex items-center justify-between w-[70%] m-auto py-4">
//           <Heading mainText={"Our"} subText={"Services"} />
//           <div className="relative">
//             <FaArrowLeft className="arrow-icon text-base md:text-[40px] lg:text-[100px] z-50" />
//           </div>
//         </div>
//       </div>

//       <div className="  w-full h-[100vh] m-auto services ">
//         {/* Service 1 */}
//         <div className="  w-full h-full service bg-white flex justify-around items-center">
//           <div className="w-[60%]">
//             <h2 className="text-[#24CFA6] text-base md:text-[20px] lg:text-[50px] leading-none">
//               Web design & development
//             </h2>
//             {/* Service details */}
//           </div>
//           <Image
//             alt="Services Images"
//             loading="lazy"
//             quality={75}
//             width={100}
//             height={100}
//             src="/public/HeaderLogo/Getimagin.png"
//           />
//         </div>

//         {/* Service 2 */}
//         <div className=" w-full h-full service bg-green-50 flex justify-around items-center">
//           <div className="w-[60%]">
//             <h2 className="text-[#24CFA6] text-base md:text-[20px] lg:text-[50px] leading-none">
//               E-Commerce
//             </h2>
//             {/* Service details */}
//           </div>
//           <Image
//             alt="Services Images"
//             loading="lazy"
//             quality={75}
//             width={100}
//             height={100}
//             src="/public/HeaderLogo/Getimagin.png"
//           />
//         </div>

//         {/* Service 3 */}
//         <div className=" w-full h-full service bg-yellow-600 flex justify-around items-center">
//           <div className="w-[60%]">
//             <h2 className="text-[#24CFA6] text-base md:text-[20px] lg:text-[50px] leading-none">
//               E-Commerce
//             </h2>
//             {/* Service details */}
//           </div>
//           <Image
//             alt="Services Images"
//             loading="lazy"
//             quality={75}
//             width={100}
//             height={100}
//             src="/public/HeaderLogo/Getimagin.png"
//           />
//         </div>
//         {/* Additional service sections can follow the same structure */}
//       </div>
//     </div>
//   );
// };

// export default ServicesComponent;

// "use client";

// import { useEffect } from "react";
// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import Image from "next/image";
// import { FaArrowLeft } from "react-icons/fa";
// import Heading from "./Heading";

// gsap.registerPlugin(ScrollTrigger);

// const ServicesComponent = () => {
//   useEffect(() => {
//     // Pin each service individually
//     gsap.utils.toArray(".service").forEach((service, i) => {

//     ScrollTrigger.create({

//       trigger: service, // Pin each .service div
//       start: "top top", // Start pinning when the top of .service hits the top of the viewport

//       pin: true, // Pin the element
//       pinSpacing: false, // Don't add extra spacing
//       anticipatePin: 1,
//       scrub: true, // Smooth pinning transition

//       });
//     });
//   }, []);

//   return (
//     <div className="relative w-full h-[400vh] bg-black text-[#E9E9E9]">
//       {/* Sticky heading */}
//       <div className="z-50 bg-black w-full">
//         <div className="flex items-center justify-between w-[70%] m-auto py-4">
//           <Heading mainText={"Our"} subText={"Services"} />
//           <div className="relative">
//             <FaArrowLeft className="arrow-icon text-base md:text-[40px] lg:text-[100px] z-50" />
//           </div>
//         </div>
//       </div>

//       {/* Service section */}
//       <div className="w-full m-auto services" id="ser">
//         {/* Service 1 */}
//         <div className="w-full h-[100vh] web service bg-white flex justify-around items-center">
//           <div className="w-[60%]">
//             <h2 className="text-[#24CFA6] text-base md:text-[20px] lg:text-[50px] leading-none">
//               Web design & development
//             </h2>
//           </div>
//           <Image
//             alt="Services Images"
//             loading="lazy"
//             quality={75}
//             width={100}
//             height={100}
//             src="/public/HeaderLogo/Getimagin.png"
//           />
//         </div>

//         {/* Service 2 */}
//         <div className="w-full h-[100vh] ecom service bg-green-50 flex justify-around items-center">
//           <div className="w-[60%]">
//             <h2 className="text-[#24CFA6] text-base md:text-[20px] lg:text-[50px] leading-none">
//               E-Commerce
//             </h2>
//           </div>
//           <Image
//             alt="Services Images"
//             loading="lazy"
//             quality={75}
//             width={100}
//             height={100}
//             src="/public/HeaderLogo/Getimagin.png"
//           />
//         </div>

//         {/* Service 3 */}
//         <div className="w-full h-[100vh] design service bg-yellow-600 flex justify-around items-center">
//           <div className="w-[60%]">
//             <h2 className="text-[#24CFA6] text-base md:text-[20px] lg:text-[50px] leading-none">
//               E-Commerce
//             </h2>
//           </div>
//           <Image
//             alt="Services Images"
//             loading="lazy"
//             quality={75}
//             width={100}
//             height={100}
//             src="/public/HeaderLogo/Getimagin.png"
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ServicesComponent;




// "use client";

// import { useEffect } from "react";
// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import Image from "next/image";
// import { FaArrowLeft } from "react-icons/fa";
// import Heading from "./Heading";

// gsap.registerPlugin(ScrollTrigger);

// const ServicesComponent = () => {
//   useEffect(() => {
//     // Pin each service individually

//     gsap.utils.toArray(".service").forEach((service, i) => {
//       gsap.set(".service", { position: "absolute" })
//       gsap.to(".service", {
//         yPercent: -100,
//         stagger: 0.5,
//         ScrollTrigger. ({
//           trigger: ".services",
//           start: "top top", // Start pinning when the top of .service hits the top of the viewport
//           pin: true,
//           pinSpacing: true, // Keep space when pinned
//           anticipatePin: 1,
//           scrub: 1, // Smooth pinning transition
//         })
//       })

//     });
//   }, []);

//   return (
//     <div className="relative w-full h-[400vh] bg-black text-[#E9E9E9]">
//       {/* Sticky heading */}
//       <div className="z-50 bg-black w-full">
//         <div className="flex items-center justify-between w-[70%] m-auto py-4">
//           <Heading mainText={"Our"} subText={"Services"} />
//           <div className="relative">
//             <FaArrowLeft className="arrow-icon text-base md:text-[40px] lg:text-[100px] z-50" />
//           </div>
//         </div>
//       </div>

//       {/* Service section */}
//       <div className="w-full m-auto services" id="ser">
//         {/* Service 1 */}
//         <div className="w-full h-[100vh] web service bg-white flex justify-around items-center">
//           <div className="w-[60%]">
//             <h2 className="text-[#24CFA6] text-base md:text-[20px] lg:text-[50px] leading-none">
//               Web design & development
//             </h2>
//           </div>
//           <Image
//             alt="Services Images"
//             loading="lazy"
//             quality={75}
//             width={100}
//             height={100}
//             src="/HeaderLogo/Getimagin.png" // Adjusted src to remove public from path
//           />
//         </div>

//         {/* Service 2 */}
//         <div className="w-full h-[100vh] ecom service bg-green-50 flex justify-around items-center">
//           <div className="w-[60%]">
//             <h2 className="text-[#24CFA6] text-base md:text-[20px] lg:text-[50px] leading-none">
//               E-Commerce
//             </h2>
//           </div>
//           <Image
//             alt="Services Images"
//             loading="lazy"
//             quality={75}
//             width={100}
//             height={100}
//             src="/HeaderLogo/Getimagin.png" // Adjusted src to remove public from path
//           />
//         </div>

//         {/* Service 3 */}
//         <div className="w-full h-[100vh] design service bg-yellow-600 flex justify-around items-center">
//           <div className="w-[60%]">
//             <h2 className="text-[#24CFA6] text-base md:text-[20px] lg:text-[50px] leading-none">
//               Graphic Design
//             </h2>
//           </div>
//           <Image
//             alt="Services Images"
//             loading="lazy"
//             quality={75}
//             width={100}
//             height={100}
//             src="/HeaderLogo/Getimagin.png" // Adjusted src to remove public from path
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ServicesComponent;



"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { FaArrowLeft } from "react-icons/fa";
import Heading from "./Heading";
import ScrollPinComponent from "./ServicesSection";
// import Impact from "./Impact";
gsap.registerPlugin(ScrollTrigger);

const ServicesComponent = () => {
 
  return (
    <div className="relative w-full h-[400vh] bg-black text-[#E9E9E9] ">
      {/* Sticky heading */}
      <div className="z-50 bg-black w-full">
        <div className="flex items-center justify-between w-[70%] m-auto py-4">
          <Heading mainText={"Our"} subText={"Services"} />
          <div className="relative">
            <FaArrowLeft className="arrow-icon text-base md:text-[40px] lg:text-[100px] z-50" />
          </div>
        </div>
      </div>

      {/* Service section */}
    <ScrollPinComponent/>
    {/* <Impact/> */}
    </div>
  );
};

export default ServicesComponent;
