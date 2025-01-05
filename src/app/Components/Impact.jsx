'use client';
import dynamic from 'next/dynamic';
const CustomCursor = dynamic(() => import('./CustomCursor'), { ssr: false });
import { useState } from 'react';
import Image from 'next/image';


const Impact = () => {
  const [cursorContent, setCursorContent] = useState(null);

  const thingsData = [
    {
      sorc: '/OurWork/Beauty-WebDevelopment -Getimagin.jpg',
      innerImg: '/OurWork/Beauty-WebDevelopment -Getimagin.jpg',

      id: '01',
      title: 'Beauty',
      bea: 'Beauty',
      description: 'Developing stunning one-of-a-kind digital design that catches people’s eyes and brings your brand to life online.',
      highlightedText: 'one-of-a-kind',
    },
    {
      innerImg: '/OurWork/Thoughts WebDesign -Getimagin.webp',

      sorc: '/OurWork/Thoughts WebDesign -Getimagin.webp',
      id: '02',
      title: 'Thought',
      description: 'As a web design agency, we love to deliver meaningful and intuitive user experiences that build trust with your target audience.',
      highlightedText: 'user experiences',
    },
    {
      sorc: '/OurWork/Impact - Social Media Design -Getimagin.webp',
      innerImg: '/OurWork/Impact - Social Media Design -Getimagin.webp',

      id: '03',
      title: 'Impact',
      description: 'Designing tailor-made solutions that resonate with your customers and drive them to act.',
      highlightedText: 'act',
    },
  ];

  return (
    <section className="py-8 md:py-20 px-1 md:px-12 bg-black md:mt-[50%] relative">

      <CustomCursor cursorContent={cursorContent} />

      <div className="text-center ">
        <h1 className="text-2xl md:text-6xl 2xl:text-8xl leading-tight z-10 ">
          We develop bespoke <br /> websites with{' '}
          <span className="text-teal-400">three</span> <br /> <span className='fontspring'>things</span>  in mind
        </h1>
        {/* <Image src={"/Footer/good ki line.svg"} alt="Get Imagin Shadow"
              className="w-[900px] h-10 absolute -bottom-2 left-[25%] hidden 2xl:block"
             width={300}
             height={20}
              loading="lazy"
              quality={75} /> */}
      </div>
      <div className="radialshadow  w-[300px] overflow-hidden"></div>

      <div>
        {thingsData.map((thing) => (
          <div
            key={thing.id}
            onMouseEnter={() => setCursorContent(thing.sorc)} // Set the image source when hovering
            onMouseLeave={() => setCursorContent(null)} // Clear the cursor content when leaving hover
            className="flex flex-col md:flex-row items-center px-[5%] py-[9%] md:opacity-30 hover:opacity-100 duration-1000 text-left border-b-2 border-[#333]"
          >
            <div className="flex flex-col w-full">
              <h2 className=" text-sm md:text-xl font-bold text-gray-500">{thing.id}/</h2>
              <div>
                <h1 className=" text-3xl md:text-8xl">{thing.title}</h1>
            <Image src={thing.innerImg} alt="Get Imagin Shadow"
              className="w-full rounded-xl my-7 md:hidden"
             width={500}
             height={500}
              loading="lazy"
              quality={75} />

             
              </div>
            </div>
            <div className="md:w-1/2">
              <p className="text-gray-300 text-left">
                {thing.description.split(thing.highlightedText)[0]}
                <i className="text-teal-400 font-bold">{thing.highlightedText}</i>
                {thing.description.split(thing.highlightedText)[1]}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Impact;
