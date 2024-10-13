// "use client";
// import Link from "next/link";
// import { useState, useEffect, useRef } from "react";
// import Image from "next/image";
// import { gsap } from "gsap";
// import style from "../Styles/HeroSection.module.css";
// import { FaArrowRight } from "react-icons/fa";

// const Header = () => {
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const dropdownRef = useRef(null);

//   const toggleDropdown = () => {
//     setIsDropdownOpen(!isDropdownOpen);
//   };

//   useEffect(() => {
//     if (isDropdownOpen) {
//       // Set display to block before the animation starts
//       gsap.set(dropdownRef.current, { display: "block" });

//       // Open dropdown with GSAP animation
//       gsap.fromTo(
//         dropdownRef.current,
//         { scale: 0, opacity: 0 },
//         { scale: 1, opacity: 1, duration: 0.8,  transformOrigin: "100% 0%",  ease: "power3.out" }
//       );
//     } else {
//       // Close dropdown with GSAP animation
//       gsap.to(dropdownRef.current, {
//         scale: 1,
//         opacity: 0,
//         duration: 0.8,
//         ease: "power3.in",
//         onComplete: () => {
//           // Set display to none after animation completes
//           gsap.set(dropdownRef.current, { display: "none" });
//         },
//       });
//     }
//   }, [isDropdownOpen]);

//   return (
//     <div className="flex items-center justify-between px-20 pt-4  relative">
//       {/* <Image
//         className="absolute top-0 left-[10%] w-[400px] h-30 filter-none mix-blend-multiply bg-transparent"
//         alt="bg-shadow"
//         layout="responsive"
//         loading="lazy"
//         quality={75}
//         width={400}
//         height={100}
//         src="/HeaderLogo/bgshadow.png"
//       ></Image> */}
//       <div>
//         <Link href={"/"}>
//           <Image

//             alt="Get Imagin"
//             width={50}
//             height={50}
//             src="/HeaderLogo/Getimagin.png"
//           ></Image>
//         </Link>
//       </div>
//       <div
//         className=" relative "
//         onClick={toggleDropdown}
//       >
//         <div className=" dropdown flex flex-col justify-center rounded-full z-50 border-[3px] border-[#24CFA6] w-[50px] h-[50px] ">
//           <div className={`${style.Logo} ml-3`}></div>
//           <div className={`${style.Logo} ml-2 mt-2`}></div>
//         </div>
//         <div
//           ref={dropdownRef}
//           className="absolute  -top-[45%] -right-[45%] bg-[#464646] text-white h-[350px] py-10 w-[400px] my-2  z-30 p-4 opacity-0 hidden rounded-3xl"
//           style={{ display: isDropdownOpen ? "block" : "none" }}
//         >

//           <ul className="flex flex-col  px-10 text-[#d2d3d3] text-2xl gap-5  ">

//             <li><Link href="/page3">Our Services</Link></li>
//             <li><Link href="/AboutUs">About Us</Link></li>
//             <li><Link href="/contact">Contact Us</Link></li>
//             <li><Link href="/page2">Privacy Policy</Link></li>
//             <Link href={"#"} className="py-1 px-4 border-[#838282] border-2 rounded-3xl text-lg w-3/4"> Lets start Projects <span className="inline-block my-auto"><FaArrowRight /></span> </Link>
//           </ul>
//         </div>
//       </div>

//       {/* Dropdown Menu */}

//     </div>
//   );
// };

// export default Header;



// "use client";
// import Link from "next/link";
// import { useState, useEffect, useRef } from "react";
// import Image from "next/image";
// import { gsap } from "gsap";
// import style from "../Styles/HeroSection.module.css";
// import { FaArrowRight } from "react-icons/fa";

// const Header = () => {
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const dropdownRef = useRef(null);
//   const toggleRef = useRef(null);

//   const toggleDropdown = () => {
//     setIsDropdownOpen(!isDropdownOpen);
//   };

//   // Function to close the dropdown when clicking outside
//   const handleClickOutside = (e) => {
//     if (
//       isDropdownOpen && 
//       dropdownRef.current && 
//       !dropdownRef.current.contains(e.target) &&
//       !toggleRef.current.contains(e.target)
//     ) {
//       setIsDropdownOpen(false);
//     }
//   };

//   useEffect(() => {
//     // Add click event listener to close the dropdown on outside click
//     document.addEventListener("mousedown", handleClickOutside);

//     return () => {
//       // Cleanup listener when component unmounts
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [isDropdownOpen]);

//   useEffect(() => {
//     if (isDropdownOpen) {
//       // Set display to block before the animation starts
//       gsap.set(dropdownRef.current, { display: "block" });

//       // Open dropdown with GSAP animation
//       gsap.fromTo(
//         dropdownRef.current,
//         { scale: 0, opacity: 0 },
//         { scale: 1, opacity: 1, duration: 0.8,  transformOrigin: "100% 0%",  ease: "power3.out" }
//       );

//       // Animate inner divs (toggle menu bars)
//       gsap.to(`.upper`, {
//         rotation: 45, // Rotate for effect
//         duration: 0.5,
//         ease: "power3.out"
//       });
//       gsap.to(`.lower`, {
//         rotation: -45, // Rotate for effect
//         duration: 0.5,
//         ease: "power3.out"
//       });
//     } else {
//       // Close dropdown with GSAP animation
//       gsap.to(dropdownRef.current, {
//         scale: 1,
//         opacity: 0,
//         duration: 0.8,
//         ease: "power3.in",
//         onComplete: () => {
//           // Set display to none after animation completes
//           gsap.set(dropdownRef.current, { display: "none" });
//         },
//       });

//       // Reset the inner divs (toggle menu bars)
//       gsap.to(`.${style.Logo}`, {
//         rotation: 0, // Reset rotation
//         duration: 0.5,
//         ease: "power3.in"
//       });
//     }
//   }, [isDropdownOpen]);

//   return (
//     <div className="flex items-center justify-between px-20 pt-4  relative">
//       <div>
//         <Link href={"/"}>
//           <Image
//             alt="Get Imagin"
//             width={50}
//             height={50}
//             src="/HeaderLogo/Getimagin.png"
//           />
//         </Link>
//       </div>
//       <div className="relative" ref={toggleRef} onClick={toggleDropdown}>
//         <div className="dropdown flex flex-col items-center justify-center rounded-full z-50 border-[3px] border-[#24CFA6] w-[50px] h-[50px]">
//           <div className={`${style.Logo} upper `}></div>
//           <div className={`${style.Logo} lower  mt-2`}></div>
//         </div>
//         <div
//           ref={dropdownRef}
//           className="absolute -top-[45%] -right-[45%] bg-[#464646] text-white h-[350px] py-10 w-[400px] my-2 z-30 p-4 opacity-0 hidden rounded-3xl"
//           style={{ display: isDropdownOpen ? "block" : "none" }}
//         >
//           <ul className="flex flex-col px-10 text-[#d2d3d3] text-2xl gap-5">
//             <li><Link href="/page3">Our Services</Link></li>
//             <li><Link href="/AboutUs">About Us</Link></li>
//             <li><Link href="/contact">Contact Us</Link></li>
//             <li><Link href="/page2">Privacy Policy</Link></li>
//             <Link href={"#"} className="py-1 px-4 border-[#838282] border-2 rounded-3xl text-lg w-3/4">
//               Lets start Projects <span className="inline-block my-auto"><FaArrowRight /></span>
//             </Link>
//           </ul>
//         </div>
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
import { FaArrowRight } from "react-icons/fa";

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const toggleRef = useRef(null);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Close dropdown when clicking outside
  const handleClickOutside = (e) => {
    if (
      isDropdownOpen &&
      dropdownRef.current &&
      !dropdownRef.current.contains(e.target) &&
      !toggleRef.current.contains(e.target)
    ) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    // Add listener to detect clicks outside
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      // Cleanup listener on component unmount
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  useEffect(() => {
    if (isDropdownOpen) {
      // Show dropdown and animate it
      gsap.set(dropdownRef.current, { display: "block" });

      gsap.fromTo(
        dropdownRef.current,
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.8, transformOrigin: "100% 0%", ease: "power3.out" }
      );

      // Animate toggle bars to form 'X'
      gsap.to(".upper", {
        rotation: 45,
        y: 5, // Move down to center the bar
        duration: 0.5,
        ease: "power3.out",
      });
      gsap.to(".lower", {
        rotation: -45,
        y: -5, // Move up to center the bar
        duration: 0.5,
        ease: "power3.out",
      });
    } else {
      // Animate dropdown close and hide it
      gsap.to(dropdownRef.current, {
        scale: 0.3,
        opacity: 0,
        duration: 1,
        ease: "power3.in",
        // onComplete: () => {
        //   gsap.set(dropdownRef.current, { display: "none" });
        // },
      });

      // Reset toggle bars back to original position
      gsap.to(".upper", {
        rotation: 0,
        y: 0,
        duration: 0.5,
        ease: "power3.in",
      });
      gsap.to(".lower", {
        rotation: 0,
        y: 0,
        duration: 0.5,
        ease: "power3.in",
      });
    }
  }, [isDropdownOpen]);

  return (
    <div className="flex items-center justify-between px-20 pt-4 relative">
      <div>
        <Link href={"/"}>
          <Image
            alt="Get Imagin"
            width={50}
            height={50}
            src="/HeaderLogo/Getimagin.png"
          />
        </Link>
      </div>
      <div className="relative" ref={toggleRef} onClick={toggleDropdown}>
        <div className="dropdown flex flex-col items-center justify-center rounded-full z-50 border-[3px] border-[#24CFA6] w-[50px] h-[50px]">
          <div className={`${style.Logo} upper`}></div>
          <div className={`${style.Logo} lower mt-2`}></div>
        </div>
        <div
          ref={dropdownRef}
          className="absolute -top-[45%] -right-[45%] bg-[#464646] text-white h-[350px] py-10 w-[320px] my-2 -z-10 p-4 opacity-0 hidden rounded-3xl"
          style={{ display: isDropdownOpen ? "block" : "none" }}
        >
          <ul className="flex flex-col px-10 text-[#d2d3d3] text-2xl gap-5">
            <li><Link href="/page3">Our Services</Link></li>
            <li><Link href="/AboutUs">About Us</Link></li>
            <li><Link href="/contact">Contact Us</Link></li>
            <li><Link href="/page2">Privacy Policy</Link></li>
            <Link href={"#"} className="py-1 px-4 border-[#838282] border-2 rounded-3xl text-lg ">
              Lets start Projects <span className="inline-block my-auto"><FaArrowRight /></span>
            </Link>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
