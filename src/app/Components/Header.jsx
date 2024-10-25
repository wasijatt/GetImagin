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
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

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
          className={`absolute -top-[45%] -right-[45%] bg-white h-[350px] py-10 w-[320px] my-2 -z-10 p-4 rounded-3xl ${isDropdownOpen ? 'block opacity-100' : 'hidden opacity-0'}`}
        >
          <ul className="flex flex-col px-10 text-[#000000] font-semibold text-2xl gap-5 cursor-pointer">
            <li>
              <Link href="/page3">
                Our Services
              </Link>
            </li>
            <li>
              <Link href="/AboutUs">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/contact">
                Contact Us
              </Link>
            </li>
            <li>
              <Link href="/page2">
                Privacy Policy
              </Link>
            </li>
            <Link
              href={"#"}
              className="py-1 px-4 border-[#838282] border-2 rounded-3xl text-lg"
            >
              {`Let's start Projects`} <span className="inline-block my-auto"><FaArrowRight /></span>
            </Link>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
