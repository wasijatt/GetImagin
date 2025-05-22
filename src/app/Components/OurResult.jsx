"use client";
import { useEffect, useCallback, useRef, memo } from 'react';
import dynamic from 'next/dynamic';
import { gsap } from 'gsap';
import Image from 'next/image';
import { MdOutlineNavigateNext } from "react-icons/md";

// Dynamic imports with loading boundaries
const Heading = dynamic(() => import('./Heading'), {
  ssr: false,
  loading: () => <div className="h-[50px]" />
});

const AnimatedLink = dynamic(() => import('./AnimatedLink'), {
  ssr: false,
  loading: () => <span className="opacity-0" />
});

// Constants
const ANIMATION_DURATION = 0.8;
const ANIMATION_STAGGER = 0.2;
const SCALE_LARGE = 1;
const SCALE_SMALL = 0.8;

// Image data
const SLIDER_IMAGES = [
  {
    src: "/OurResult/",
    alt: "Portfolio",
    logo: "/OurResult/Healthy brand GetImagin.png",
    Desc: "Achieved a 76.8% increase in average engagement time within 3 months.",
    heading: "76.8%",
    mainImage: "/OurResult/Healthy brand GetImagin 2.png"
  },
  { src: "/OurResult/Container.jpg", alt: "Container", logo: "/OurResult/Abyss-brading-getimagin-services (2).png", Desc: "increase in sales after 1 year.", heading: "87.14%", mainImage: "/OurResult/Abyss-brading-getimagin-services (1).png" },
  { src: "/OurResult/Container.jpg", alt: "Container", logo: "/OurResult/Biker-brading-getimagin-desingagecny-services (2).png", Desc: "rise in engaged sessions per user after 1 month", heading: "67.4%", mainImage: "/OurResult/Biker-brading-getimagin-desingagecny-services (1).png" },
]




const Slider = () => {
  const sliderRef = useRef(null);
  const buttonRef = useRef(null);
  const currentIndexRef = useRef(0);
  const isAnimatingRef = useRef(false);

  // Animation setup
  const setInitialPositionsAndAnimate = useCallback(() => {
    if (!sliderRef.current || !buttonRef.current) return;

    const items = sliderRef.current.querySelectorAll('.item');
    const button = buttonRef.current;

    const timeline = gsap.timeline({
      defaults: { duration: ANIMATION_DURATION, ease: 'power2.out' }
    });

    items.forEach((item, index) => {
      const isLast = index === items.length - 1;

      gsap.set(item, {
        xPercent: 100,
        scale: isLast ? SCALE_LARGE : SCALE_SMALL,
        zIndex: index + 1,
        opacity: 0
      });

      timeline.to(item, {
        xPercent: 0,
        opacity: 1,
        delay: index * ANIMATION_STAGGER
      }, 0);
    });

    timeline.call(() => {
      button.style.pointerEvents = 'auto';
      button.style.opacity = 1;
    });
  }, []);

  // Handle click animation
  const handleClick = useCallback(() => {
    if (!sliderRef.current || isAnimatingRef.current ||
      currentIndexRef.current >= SLIDER_IMAGES.length - 1) return;

    isAnimatingRef.current = true;
    const items = sliderRef.current.querySelectorAll('.item');
    const topItem = items[items.length - 1];
    const nextTopItem = items[items.length - 2];

    const timeline = gsap.timeline({
      defaults: { duration: ANIMATION_DURATION, ease: 'sine.inOut' },
      onComplete: () => {
        isAnimatingRef.current = false;
      }
    });

    // Animate out top item
    timeline.to(topItem, {
      xPercent: 100,
      opacity: 0.8,
      onComplete: () => {
        sliderRef.current?.insertBefore(topItem, sliderRef.current.firstChild);
        gsap.set(topItem, {
          xPercent: 0,
          opacity: 1,
          scale: SCALE_SMALL,
          zIndex: 1
        });
      }
    })
      // Scale up next item
      .to(nextTopItem, {
        scale: SCALE_LARGE,
        zIndex: items.length
      }, '<');

    // Update remaining items' z-indices
    items.forEach((item, index) => {
      if (item !== topItem && item !== nextTopItem) {
        timeline.to(item, {
          zIndex: index + 1,
          duration: 0
        }, '<');
      }
    });

    currentIndexRef.current++;
    if (currentIndexRef.current >= SLIDER_IMAGES.length - 1) {
      buttonRef.current.style.display = 'none';
    }
  }, []);

  // Setup effect
  useEffect(() => {
    setInitialPositionsAndAnimate();

    const button = buttonRef.current;
    if (button) {
      button.addEventListener('click', handleClick);
      return () => button.removeEventListener('click', handleClick);
    }
  }, [setInitialPositionsAndAnimate, handleClick]);

  return (
    <div className='w-[98%] md:w-[90%] 2xl:w-[80%] m-auto'>
      <Heading className="ml-[20%]" mainText="Our" subText="Result" />
      <div className="flex flex-col h-screen cursor-pointer">
        <div ref={sliderRef} className="slider relative w-full h-[100vh] perspective-[100px] flex">
          <button
            ref={buttonRef}
            className="absolute right-[5%] bottom-[15%] slider-button  rounded-full border-[#b6b6b683] border-2 p-2 z-30 transition-opacity duration-300 opacity-0 pointer-events-none"
            aria-label="Next slide"
          >
            <MdOutlineNavigateNext className="text-3xl" />
          </button>
          <span className="absolute bottom-[15%] left-[3%] inline-block px-4 z-30 py-2 rounded-3xl transition-all ease-out">
            <AnimatedLink href="/works" content="View All Projects" />
          </span>
          {SLIDER_IMAGES.map((item, index) => (
            <div
              key={index}
              className="item absolute w-full h-[90vh] text-2xl md:rounded-tr-[200px] 2xl:rounded-tr-[300px] rounded-tr-[100px] flex flex-col-reverse md:flex-row rounded-xl justify-center items-center px-6 md:px-[5%] border-2 border-[#b6b6b683] 2xl:px-[8%] bg-black"
              style={{
                zIndex: index + 1,
                backgroundImage: `url("/AboutUs/bg-con.jpg")`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            >
              <div className='md:w-1/2 z-10 h-3/4 mix-blend-normal flex justify-evenly flex-col '>
                <div>
                  <Image src={item.logo}
                  className='max-w-min  '
                  width={1200} height={100} quality={75} alt='Logo-GetImagin'
                />
                </div>
                <div className='mb-4'>
                  <h1 className='text-[6rem] main-color' >{item.heading}</h1>
                  <p className='text-base md:text-xl mt-10'>{item.Desc}</p>
                </div>
              </div>
              <div className='md:w-1/2'>
                <Image src={item.mainImage}
                  className='w-[900px] '
                  width={1000} height={1100} quality={75} alt='Logo-GetImagin'
                />
              </div>

            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default memo(Slider);
