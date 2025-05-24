"use client";
import Link from "next/link";
import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import style from "../Styles/HeroSection.module.css";
import dynamic from "next/dynamic";
const AnimatedLink = dynamic(() => import('./AnimatedLink'), { ssr: false });


const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const toggleRef = useRef(null);


  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  // Use useCallback to memoize the handleClickOutside function
  const handleClickOutside = useCallback((e) => {
    if (
      isDropdownOpen &&
      dropdownRef.current &&
      !dropdownRef.current.contains(e.target) &&
      !toggleRef.current.contains(e.target)
    ) {
      setIsDropdownOpen(false);
    }
  }, [isDropdownOpen]);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]); 

  useEffect(() => {
    if (isDropdownOpen) {
      gsap.set(dropdownRef.current, { display: "block" });
      gsap.fromTo(
        dropdownRef.current,
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.8, transformOrigin: "100% 0%", ease: "power3.out" }
      );
      gsap.to(".upper", {
        rotation: 45,
        y: 5,
        duration: 0.5,
        ease: "power3.out",
      });
      gsap.to(".lower", {
        rotation: -45,
        y: -5,
        duration: 0.5,
        ease: "power3.out",
      });
    } else {
      gsap.to(dropdownRef.current, {
        scale: 0.3,
        opacity: 0,
        duration: 1,
        ease: "power3.in",
      });
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
    <header className="flex items-center justify-between px-4 md:px-10 md:py-10 pt-4 relative bg-transparent z-20  ">
      <div className="absolute left-[20%] md:left-[10%] -z-30 -top-[550%] md:-top-[450%] w-[250px] md:w-[1200px]  h-[600px]">
        <Image
          alt="Get Imagin Shadow"
          src={"/HeaderLogo/Container.svg"}
          fill
          loading="lazy"
          quality={75}
        />
      </div>
      <nav>
        <Link href={"/"}>
          <Image
          className="w-[40px] md:w-[50px] 2xl:w-[50px]"
            alt="Get Imagin"
            width={70}
            height={70}
            loading="lazy"
            quality={75}
            src="/HeaderLogo/Getimagin.png"
          />
        </Link>
      </nav>
      <div className="relative z-50" ref={toggleRef} onClick={toggleDropdown}>
        <div className="dropdown flex flex-col items-center justify-center rounded-full border-[3px] border-[#24CFA6] w-[40px] md:w-[50px] 2xl:w-[50px]  h-[40px] md:h-[50px] 2xl:h-[50px] ">
          <div className={`${style.Logo} upper  `}></div>
          <div className={`${style.Logo} lower mt-2`}></div>
        </div>
        <div
          ref={dropdownRef}
          className={`absolute -top-[45%] -right-[40%] bg-white h-[420px] py-10 w-[280px] my-2 -z-10 p-4 rounded-3xl ${isDropdownOpen ? 'block opacity-100' : 'hidden opacity-0'}`}
        >
          <nav>
          <ul className="flex flex-col px-10 text-[#000000]  pt-10  fontneue text-2xl gap-3 cursor-pointer">
            <li >
              <Link href="/works" >
                Works
              </Link>
            </li>
            <li>
              <Link href="/Services" >
                Services
              </Link>
            </li>
            <li>
              <Link href="/blogs" >
                Blogs
              </Link>
            </li>
            <li>
              <Link href="/AboutUs" >
                About
              </Link>
            </li>
            <li>
              <Link href="/ContactUs" >
                Contact
              </Link>
            </li>
          </ul>
          </nav>
              <AnimatedLink className="text-black  text-[18px] ml-5 md:mt-6 my-4 font-semibold" content={`Let's start Projects`} href={'/ContactUs'} style={{ borderColor: "#303030" }} />
            
        </div>
      </div>
    </header>
  );
};

export default Header;
