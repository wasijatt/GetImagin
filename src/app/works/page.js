"use client";
import { useEffect, useRef, useMemo } from "react";
import Link from "next/link";
import Header from "../Components/Header";


const Page = () => {
  const menuItems = useMemo(() => [
    { name: "Cynetic ", href: "/works/Cynetic" },
    { name: "Likhon.Net", href: "/works/Likhon" },
    { name: "Pokruszone ", href: "/works/Pokruszone" },
    { name: "Transcend ", href: "/works/Transcend" },
    { name: "Mr Franky ", href: "/works/MrFranky" },
    { name: "Pasco Pastry ", href: "/works/PascoPastry" },
  ], []);

  const containerRef = useRef(null);
  const animationRef = useRef(null);
  const scrollingRef = useRef(false);
  const currentRef = useRef(0);
  const targetRef = useRef(0);

  useEffect(() => {
    const container = containerRef.current;
    const ease = 0.05;

    const fragment = document.createDocumentFragment();
    const originalItems = container.querySelectorAll(".work-item");

    for (let i = 0; i < 4; i++) {
      originalItems.forEach((item) => {
        fragment.appendChild(item.cloneNode(true));
      });
    }
    container.appendChild(fragment);

    const items = container.querySelectorAll(".work-item");
    const itemHeight = items[0].offsetHeight;
    const totalHeight = itemHeight * originalItems.length;

    const setTransform = (element, y) => {
      element.style.transform = `translate3d(0, ${y}px, 0)`;
    };

    const updateScale = (scale) => {
      const contents = container.querySelectorAll(".content-wrapper");
      contents.forEach((content) => {
        content.style.transform = `scale3d(${scale}, ${scale}, 1)`;
        content.style.transition = "transform 0.5s ease-out";
      });
    };

    const animate = () => {
      currentRef.current += (targetRef.current - currentRef.current) * ease;
      setTransform(container, -currentRef.current);

      if (currentRef.current >= totalHeight) {
        targetRef.current %= totalHeight;
        currentRef.current %= totalHeight;
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    let scrollTimeout;
    const handleScroll = (deltaY) => {
      targetRef.current = Math.max(0, targetRef.current + deltaY * 1.5);

      if (!scrollingRef.current) {
        scrollingRef.current = true;
        updateScale(0.9);
      }

      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        scrollingRef.current = false;
        updateScale(1);
      }, 150);
    };

    const handleWheel = (e) => {
      e.preventDefault();
      handleScroll(e.deltaY);
    };

    const handleTouchStart = (e) => {
      scrollingRef.current = e.touches[0].clientY;
    };

    const handleTouchMove = (e) => {
      const deltaY = scrollingRef.current - e.touches[0].clientY;
      handleScroll(deltaY);
      scrollingRef.current = e.touches[0].clientY;
    };

    animationRef.current = requestAnimationFrame(animate);

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      clearTimeout(scrollTimeout);
    };
  }, []);

  return (
    <main className="fixed w-full min-h-screen bg-black text-white overflow-hidden lg:overflow-visible">
      <Header />
      <div
        ref={containerRef}
        className="relative flex flex-col"
        style={{
          willChange: "transform",
          backfaceVisibility: "hidden",
          perspective: 1000,
        }}
      >
        {menuItems.map((item, index) => (
          <Link
            key={`${item.name}-${index}`}
            href={item.href}
            className="work-item h-[30vh] flex flex-col items-center justify-center cursor-pointer group"
          >
            <div
              className="content-wrapper relative overflow-hidden"
              style={{
                willChange: "transform",
                backfaceVisibility: "hidden",
              }}
            >
              <div className="text-2xl opacity-50">0{index + 1}</div>
              <div className="text-[6vw] font-neueMachina transform group-hover:translate-y-[-8px] transition-transform duration-300">
                {item.name}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
};

export default Page;
