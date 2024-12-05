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
  { src: "/OurResult/Container.jpg", alt: "Portfolio", logo: "", Desc: "", heading:"76.8%" },
  { src: "/OurResult/Container.jpg", alt: "Container", logo: "", Desc: "", heading:"76.8%" },
  { src: "/OurResult/Container.jpg", alt: "Container", logo: "", Desc: "", heading:"76.8%" },
]

// Memoized Image component
const SliderImage = memo(({ src, alt }) => (
  <Image
    alt={alt}
    src={src}
    layout="fill"
    objectFit="cover"
    objectPosition="center"
    quality={75}
    loading="lazy"
    className="rounded-tr-[130px] h-full w-full border-[#333] border-2"
  />
));

SliderImage.displayName = 'SliderImage';

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
            className="absolute right-[5%] bottom-[5%] slider-button  rounded-full border-white p-2 z-30 transition-opacity duration-300 opacity-0 pointer-events-none"
            aria-label="Next slide"
          >
            <MdOutlineNavigateNext className="text-3xl" />
          </button>
          <span className="absolute bottom-[5%] left-[3%] inline-block px-4 z-30 py-2 rounded-3xl transition-all ease-out">
            <AnimatedLink href="#" content="View All Projects" />
          </span>
          {SLIDER_IMAGES.map((item, index) => (
            <div
              key={index}
              className="item absolute w-full h-full text-2xl rounded-tr-full"
              style={{ zIndex: index + 1 }}
            >
              <div className=''>
                <Image src={item.logo}
                  width={300} height={100} layout='fill' quality={75} alt='Logo-GetImagin'
                />
                <h1 className='mdl:text-2xl' >{item.heading}</h1>
              </div>
              <SliderImage {...item} />

            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default memo(Slider);

