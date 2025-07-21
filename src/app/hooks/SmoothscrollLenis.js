"use client";
import Lenis from "@studio-freight/lenis";
import { useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const useLenis = () => {
  useEffect(() => {
    const lenis = new Lenis({
      smooth: true,
      // duration: 2.0,
    lerp:0.05,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -12 * t)),
      smoothTouch: false,
      touchMultiplier: 1.5,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // 🔁 Sync GSAP ScrollTrigger with Lenis
    lenis.on("scroll", ScrollTrigger.update);

    // 🧠 Tell ScrollTrigger to use Lenis's scroll position
    ScrollTrigger.scrollerProxy(document.body, {
      scrollTop(value) {
        return arguments.length
          ? lenis.scrollTo(value)
          : lenis.scroll.instance.scroll.y;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
      // Pin works properly on mobile
      pinType: document.body.style.transform ? "transform" : "fixed",
    });

    // Refresh ScrollTrigger on resize or scroll update
   ScrollTrigger.addEventListener("refresh", () => lenis.raf(performance.now()));

    ScrollTrigger.refresh();

    return () => {
      lenis.destroy();
      ScrollTrigger.removeEventListener("refresh", () => lenis.update());
    };
  }, []);
};

export default useLenis;
