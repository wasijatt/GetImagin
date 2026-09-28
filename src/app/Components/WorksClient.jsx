"use client";

import { useEffect, useRef, useMemo } from "react";
import Link from "next/link";

export default function WorksClient() {
  const menuItems = useMemo(
    () => [
      { name: "Cynetic", href: "/works/Cynetic" },
      { name: "Likhon.Net", href: "/works/Likhon" },
      { name: "Pokruszone", href: "/works/Pokruszone" },
      { name: "Transcend", href: "/works/Transcend" },
      { name: "Mr Franky", href: "/works/MrFranky" },
      { name: "Pasco Pastry", href: "/works/PascoPastry" },
    ],
    []
  );

  const containerRef = useRef(null);
  const animationRef = useRef(null);
  const scrollingRef = useRef(false);
  const currentRef = useRef(0);
  const targetRef = useRef(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const ease = 0.05;

    const fragment = document.createDocumentFragment();
    const originalItems = container.querySelectorAll(".work-item");
    if (!originalItems.length) return;

    for (let i = 0; i < 4; i++) {
      originalItems.forEach((item) => {
        fragment.appendChild(item.cloneNode(true));
      });
    }
    container.appendChild(fragment);

    const items = container.querySelectorAll(".work-item");
    const itemHeight = items[0]?.offsetHeight || 100;
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

    const handleWheel = (e) => {
      targetRef.current += e.deltaY;
      if (!scrollingRef.current) {
        scrollingRef.current = true;
        updateScale(0.8);
      }
      clearTimeout(container.scrollTimeout);
      container.scrollTimeout = setTimeout(() => {
        scrollingRef.current = false;
        updateScale(1);
      }, 150);
    };

    window.addEventListener("wheel", handleWheel, { passive: true });
    animationRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("wheel", handleWheel);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <div className="relative w-full h-[80vh] overflow-hidden">
      <div ref={containerRef} className="flex flex-col items-center justify-center">
        {menuItems.map((item, index) => (
          <div key={index} className="work-item py-6">
            <div className="content-wrapper">
              <Link
                href={item.href}
                className="text-4xl md:text-7xl font-bold font-neueMachina hover:text-emerald-400 transition-colors"
              >
                {item.name}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
