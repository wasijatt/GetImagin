// "use client"
// import { useEffect, useRef } from 'react';
// import gsap from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';
// import Image from 'next/image';
// gsap.registerPlugin(ScrollTrigger);

// const Space = () => {
//   const videoRef = useRef(null);

//   useEffect(() => {
//     if (videoRef.current) {
//       // Set the initial scale to 0.3
//       gsap.set(videoRef.current, { scale: 0 });

//       // Animate to full scale on scroll trigger
//       gsap.to(videoRef.current, {
//         scale: 1, // Scale up to 1
//         width: '100vw',
//         height: '100vh',
//         ease: "power1",
//         scrollTrigger: {
//           trigger: videoRef.current,
//           start: 'top bottom', // 70% from top (or 30% from bottom)
//           end: 'top top',
//           scrub: true, // Smooth animation on scroll
//           pin: true,
//           // toggleActions: 'play none none reverse', // Play on enter, reverse on leave
//         },
//       });
//     }
//   }, []);

//   return (
//     <div className=" hidden  w-full md:flex justify-start "> {/* Overflow-hidden for smooth scaling */}
//       <div className="w-full overflow-hidden relative">
//         <video
//           ref={videoRef}
//           className="w-full h-auto"
//           autoPlay
//           loop
//           muted
//           playsInline
//           preload="auto"
//         >
//           <source
//             src="https://cdn.prod.website-files.com/6694cfbb7de2e7a505091bcd%2F669e188ae962be55ac7f4bf0_SaCZ_-owaHrwwJFz5CebZZlFtC3o28mkSMfoe0eg6xo-transcode.webm"
//             type="video/webm"
//           />
//         </video>
//         <Image
//           className=' absolute w-full h-1/2 -mt-[25%] !z-50'
//           src="/Services/Space Gradient.svg"
//           alt="Get-Imagin-space-gradient"
//           width={1200}
//           height={700}
//           quality={75}
//           loading="lazy"
//         ></Image>
//       </div>
//     </div>
//   );
// };

// export default Space;



// "use client";
// import { useEffect, useRef } from 'react';
// import gsap from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';
// gsap.registerPlugin(ScrollTrigger);

// const Space = () => {
//   const videoRef = useRef(null);

//   useEffect(() => {
//     if (videoRef.current) {
//       // Set initial width to 10vw
//       gsap.set(videoRef.current, { width: '10vw' });

//       // Animate width from 10vw to 100vw on scroll
//       gsap.to(videoRef.current, {
//         width: '100vw', // Animate to full width
//         ease: "power1.out", // Linear easing for smooth scroll-based animation
//         scrollTrigger: {
//           trigger: videoRef.current, // Use the video as the trigger
//           start: 'bottom bottom', // Start animation when the bottom of the video hits the bottom of the viewport
//           end: 'top top', // End animation when the top of the video hits the top of the viewport
//           scrub: true, // Smoothly animate based on scroll position
//           markers: false, // Set to true for debugging (shows start/end markers)
//         },
//       });
//     }
//   }, []);

//   return (
//     <div style={{ height: '100vh', position: 'relative', overflow: 'hidden' }}>
//       <video
//         ref={videoRef}
//         style={{
//           position: 'absolute',
//           bottom: 0,
//           left: '50%',
//           transform: 'translateX(-50%)',
//           height: '100%',
//           objectFit: 'cover',
//         }}
//         autoPlay
//         muted
//         loop
//       >
//         <source src="https://cdn.prod.website-files.com/6694cfbb7de2e7a505091bcd%2F669e188ae962be55ac7f4bf0_SaCZ_-owaHrwwJFz5CebZZlFtC3o28mkSMfoe0eg6xo-transcode.webm" type="video/mp4" />
//         Your browser does not support the video tag.
//       </video>
//     </div>
//   );
// };

// export default Space;



"use client";
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const Space = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      // Set initial width to 10vw
      gsap.set(videoRef.current, { width: '10vw' });

      // Animate width from 10vw to 100vw on scroll
      gsap.to(videoRef.current, {
        width: '100vw', // Animate to full width
        ease: "none", // Linear easing for smooth scroll-based animation
        scrollTrigger: {
          trigger: videoRef.current, // Use the video as the trigger
          start: 'top bottom', // Start animation when the bottom of the video hits the bottom of the viewport
          end: 'top top', // End animation when the top of the video hits the top of the viewport
          scrub: 1, // Smoothly animate based on scroll position (1 second delay for smoothness)
          markers: false, // Set to true for debugging (shows start/end markers)
          invalidateOnRefresh: true, // Ensures the animation recalculates on window resize
        },
      });
    }

    // Cleanup ScrollTrigger on component unmount
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div style={{ height: '100vh', position: 'relative', overflow: 'hidden' }}>
      <video
        ref={videoRef}
        style={{
          position: 'absolute',
          bottom: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          height: '100%',
          objectFit: 'cover',
        }}
        autoPlay
        muted
        loop
      >
        <source src="https://cdn.prod.website-files.com/6694cfbb7de2e7a505091bcd%2F669e188ae962be55ac7f4bf0_SaCZ_-owaHrwwJFz5CebZZlFtC3o28mkSMfoe0eg6xo-transcode.webm" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default Space;