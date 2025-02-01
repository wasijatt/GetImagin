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



'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLayoutEffect } from 'react'

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger)

const Space = () => {
  const containerRef = useRef(null)
  const videoRef = useRef(null)

  // Use layoutEffect to prevent flash of unstyled content
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (!videoRef.current || !containerRef.current) return

      // Initial state
      gsap.set(videoRef.current, {
        width: '10vw',
        height: 'auto',
      })

      // Create animation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'top top',
          scrub: 1, // Smooth scrubbing
          pin: true,
          anticipatePin: 1, // Improves pin performance
          invalidateOnRefresh: true, // Handles resize properly
        },
      })

      tl.to(videoRef.current, {
        width: '100vw',
        height: '100vh',
        ease: 'none', // Linear animation for smooth scroll
      })

      // Cleanup function
      return () => {
        tl.kill()
        ScrollTrigger.getAll().forEach(trigger => trigger.kill())
      }
    }, containerRef) // Scope GSAP to our component

    return () => ctx.revert() // Clean up context
  }, [])

  return (
    <div 
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden bg-black"
    >
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className="absolute left-1/2 top-1/2 h-auto w-[10vw] -translate-x-1/2 -translate-y-1/2 object-cover"
      >
        <source src="https://cdn.prod.website-files.com/6694cfbb7de2e7a505091bcd%2F669e188ae962be55ac7f4bf0_SaCZ_-owaHrwwJFz5CebZZlFtC3o28mkSMfoe0eg6xo-transcode.webm" type="video/mp4" />
      </video>
    </div>
  )
}

export default Space