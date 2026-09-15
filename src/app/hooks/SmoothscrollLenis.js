"use client";
import Lenis from "@studio-freight/lenis";
import { useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const useLenis = () => {
  useEffect(() => {
    // Only run smooth Lenis proxy on non-touch desktop devices
    // On mobile / touch devices, native momentum scrolling provides the smoothest UX and prevents gesture locking
    const isTouch =
      typeof window !== "undefined" &&
      ("ontouchstart" in window ||
        navigator.maxTouchPoints > 0 ||
        window.innerWidth < 768);

    if (isTouch) {
      return;
    }

    const lenis = new Lenis({
      smooth: true,
      lerp: 0.08,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -12 * t)),
      smoothTouch: false,
    });

    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

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
      pinType: document.body.style.transform ? "transform" : "fixed",
    });

    const handleRefresh = () => lenis.raf(performance.now());
    ScrollTrigger.addEventListener("refresh", handleRefresh);
    ScrollTrigger.refresh();

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      ScrollTrigger.removeEventListener("refresh", handleRefresh);
    };
  }, []);
};

export default useLenis;
