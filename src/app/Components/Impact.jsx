
'use client';
import { useState } from 'react';
import CustomCursor from './CustomCursor';

const Impact = () => {
  const [cursorContent, setCursorContent] = useState(null);

  const thingsData = [
    {
      sorc: '/HeaderLogo/Link(3).png',
      id: '01',
      title: 'Beauty',
      description: 'Developing stunning one-of-a-kind digital design that catches people’s eyes and brings your brand to life online.',
      highlightedText: 'one-of-a-kind',
    },
    {
      sorc: '/OurWork/Link.png',
      id: '02',
      title: 'Thought',
      description: 'As a web design agency, we love to deliver meaningful and intuitive user experiences that build trust with your target audience.',
      highlightedText: 'user experiences',
    },
    {
      sorc: '/OurWork/link5.png',
      id: '03',
      title: 'Impact',
      description: 'Designing tailor-made solutions that resonate with your customers and drive them to act.',
      highlightedText: 'act',
    },
  ];

  return (
    <section className="py-20 px-6 md:px-12 bg-black mt-[50%] relative">
      {/* Render the custom cursor */}
      <CustomCursor cursorContent={cursorContent} />

      <div className="text-center">
        <h1 className="text-xl md:text-5xl leading-tight">
          We develop bespoke <br /> websites with{' '}
          <span className="text-teal-400">three</span> <br /> things in mind
        </h1>
      </div>

      <div>
        {thingsData.map((thing) => (
          <div
            key={thing.id}
            onMouseEnter={() => setCursorContent(thing.sorc)} // Set the image source when hovering
            onMouseLeave={() => setCursorContent(null)} // Clear the cursor content when leaving hover
            className="flex items-center px-[5%] py-[9%] opacity-30 hover:opacity-100 duration-1000 text-left border-b-2 border-[#333]"
          >
            <div className="flex flex-col w-full">
              <h2 className="text-xl font-bold text-gray-500">{thing.id}/</h2>
              <div>
                <h1 className="text-6xl">{thing.title}</h1>
              </div>
            </div>
            <div className="w-1/2">
              <p className="text-gray-300 text-left">
                {thing.description.split(thing.highlightedText)[0]}
                <span className="text-teal-400">{thing.highlightedText}</span>
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
