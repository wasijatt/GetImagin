// import Image from "next/image"
// import style from "../Styles/HeroSection.module.css"
// const Header = () => {
//   return (
//     <div className="flex items-center justify-between px-20 pt-4 bg-black relative ">
//         <Image className="absolute top-0 left-[20%] w-[400px] h-400px" alt="bg-shadow" width={400} height={400} src={"/HeaderLogo/bgshadow.png"}></Image>
//       <div>
//      <Image alt="Get Imagin" width={50} height={50} src={"/HeaderLogo/Getimagin.png"}></Image>
//       </div>
//       <div className=" dropdown flex flex-col  justify-center rounded-full border-[3px] border-[#24CFA6] w-[50px] h-[50px]">
//      <div className= {`${style.Logo} ml-3`}></div>
//      <div className= {`${style.Logo} ml-2 mt-2 ` }></div>

//       </div>
//     </div>
//   )
// }

// export default Header
// "use client"
// import Link from "next/link";
// import { useState, useEffect, useRef } from "react";
// import Image from "next/image";
// import { gsap } from "gsap";
// import style from "../Styles/HeroSection.module.css";

// const Header = () => {
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const dropdownRef = useRef(null);

//   const toggleDropdown = () => {
//     setIsDropdownOpen(!isDropdownOpen);
//   };

//   useEffect(() => {
//     if (isDropdownOpen) {
//       // Open dropdown with GSAP animation
//       gsap.fromTo(
//         dropdownRef.current,
//         { y: "-100%", opacity: 0 },
//         { y: "0%", opacity: 1, duration: 0.8, ease: "power3.out" }
//       );
//     } else {
//       // Close dropdown with GSAP animation
//       gsap.to(dropdownRef.current, {
//         y: "-100%",
//         opacity: 0,
//         duration: 0.8,
//         ease: "power3.in",
//       });
//     }
//   }, [isDropdownOpen]);

//   return (
//     <div className="flex items-center justify-between px-20 pt-4 bg-black relative">
//       <Image
//         className="absolute top-0 left-[20%] w-[400px] h-[400px]"
//         alt="bg-shadow"
//         width={400}
//         height={400}
//         src="/HeaderLogo/bgshadow.png"
//       ></Image>
//       <div>
//         <Image
//           alt="Get Imagin"
//           width={50}
//           height={50}
//           src="/HeaderLogo/Getimagin.png"
//         ></Image>
//       </div>
//       <div
//         className="flex flex-col justify-center rounded-full border-[3px] border-[#24CFA6] w-[50px] h-[50px]"
//         onClick={toggleDropdown}
//       >
//         <div className={`${style.Logo} ml-3`}></div>
//         <div className={`${style.Logo} ml-2 mt-2`}></div>
//       </div>

//       {/* Dropdown Menu */}
//       <div
//         ref={dropdownRef}
//         className="absolute top-[100%] right-[5%]  bg-white w-1/4  p-4 opacity-0 hidden"
//         style={{ display: isDropdownOpen ? "block" : "none" }}
//       >
//         <ul>
//           <li><Link href="/page1">Page 1</Link></li>
//           <li><Link href="/page2">Page 2</Link></li>
//           <li><Link href="/page2">Page 2</Link></li>
//           <li><Link href="/page2">Page 2</Link></li>
//           <li><Link href="/page2">Page 2</Link></li>
//           <li><Link href="/page3">Page 3</Link></li>
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default Header;


"use client";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import style from "../Styles/HeroSection.module.css";

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    if (isDropdownOpen) {
      // Set display to block before the animation starts
      gsap.set(dropdownRef.current, { display: "block" });

      // Open dropdown with GSAP animation
      gsap.fromTo(
        dropdownRef.current,
        { y: "100%", opacity: 0 },
        { y: "0%", opacity: 1, duration: 0.8, ease: "power3.out" }
      );
    } else {
      // Close dropdown with GSAP animation
      gsap.to(dropdownRef.current, {
        y: "-100%",
        opacity: 0,
        duration: 0.8,
        ease: "power3.in",
        onComplete: () => {
          // Set display to none after animation completes
          gsap.set(dropdownRef.current, { display: "none" });
        },
      });
    }
  }, [isDropdownOpen]);

  return (
    <div className="flex items-center justify-between px-20 pt-4  relative">
      {/* <Image
        className="absolute top-0 left-[10%] w-[600px] h-30 filter-none mix-blend-screen bg-transparent"
        alt="bg-shadow"
        layout="responsive"
        loading="lazy"
        quality={75}
        width={100}
        height={100}
        src="/HeaderLogo/bgshadow.png"
      ></Image> */}
      <div>
        <Link href={"/"}>
        <Image
     
          alt="Get Imagin"
          width={50}
          height={50}
          src="/HeaderLogo/Getimagin.png"
        ></Image>
        </Link>
      </div>
      <div
        className=" relative "
        onClick={toggleDropdown}
      >
        <div className=" dropdown flex flex-col justify-center rounded-full z-50 border-[3px] border-[#24CFA6] w-[50px] h-[50px] ">
          <div className={`${style.Logo} ml-3`}></div>
          <div className={`${style.Logo} ml-2 mt-2`}></div>
        </div>
        <div
          ref={dropdownRef}
          className="absolute  -top-[45%] -right-[45%] bg-white text-black h-[300px] w-[400px] z-0 p-4 opacity-0 hidden rounded-3xl"
          style={{ display: isDropdownOpen ? "block" : "none" }}
        >

          <ul>
            <li><Link href="/AboutUs">About Us</Link></li>
            <li><Link href="/page2">Page 2</Link></li>
            <li><Link href="/page2">Page 2</Link></li>
            <li><Link href="/page2">Page 2</Link></li>
            <li><Link href="/page2">Page 2</Link></li>
            <li><Link href="/page3">Page 3</Link></li>
          </ul>
        </div>
      </div>

      {/* Dropdown Menu */}

    </div>
  );
};

export default Header;
