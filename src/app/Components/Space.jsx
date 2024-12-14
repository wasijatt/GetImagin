"use client"
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
gsap.registerPlugin(ScrollTrigger);

const Space = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      // Set the initial scale to 0.3
      gsap.set(videoRef.current, { scale: 0 });

      // Animate to full scale on scroll trigger
      gsap.to(videoRef.current, {
        scale: 1, // Scale up to 1
        width: '100vw',
        height: '100vh',
ease: "power1",
        scrollTrigger: {
          trigger: videoRef.current,
          start: 'top bottom', // 70% from top (or 30% from bottom)
          end: 'top top',
          scrub: true, // Smooth animation on scroll
          pin: true,
          // toggleActions: 'play none none reverse', // Play on enter, reverse on leave
        },
      });
    }
  }, []);

  return (
    <div className="w-full flex justify-start md:-mt-[20%] "> {/* Overflow-hidden for smooth scaling */}
      <div className="w-full overflow-hidden relative">
        <video
          ref={videoRef}
          className="w-full h-auto"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
        >
          <source
            src="https://cdn.prod.website-files.com/6694cfbb7de2e7a505091bcd%2F669e188ae962be55ac7f4bf0_SaCZ_-owaHrwwJFz5CebZZlFtC3o28mkSMfoe0eg6xo-transcode.webm"
            type="video/webm"
          />
        </video>
      <Image 
      className=' absolute w-full h-1/2 -mt-[25%] !z-50'
        src="/Services/Space Gradient.svg"
        alt="Get-Imagin-space-gradient"
        width={1200}
        height={700}
        quality={75}
        loading="lazy"
      ></Image>
      </div>
    </div>
  );
};

export default Space;
