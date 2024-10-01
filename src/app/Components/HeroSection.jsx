// "use client" 
// // import useCounterAnimation from "../hooks/CounterAnimationHook"
// import { useEffect, useRef } from "react";

// import { gsap } from "gsap";
// const HeroSection = ({ fhead, span, head, HerosectionPara, HerosectionButton ,projects,clients,countries }) => {
//   const countersRef = useRef([]); // To reference each counter block for GSAP animations

//   const CounterData = [
//     {
     
//       title: "Projects Completed",
//       number: projects,
//     },
//     {
    
//       title: "Satisfied Clients",
//       number: clients,
//     },
//     { 
//       title: "Countries Worldwide",
//       number: countries,
//     },
//   ];

//   return (
//     <div className='w-full  text-center   flex flex-col justify-center items-center'>



//       <h1 className="text-xl md:text-5xl  leading-tight z-50 w-[40%]">
//         {fhead}
//         <span className="text-teal-400">{
//           span}</span> {head}
//       </h1>
//       <p className="ml-[700px] text-sm w-[300px]">{HerosectionPara}</p>
//       <button className="bg-[#24CFA6] px-10 py-3 rounded-3xl">{HerosectionButton}</button>


//       <div className="flex flex-wrap justify-center text-[#E9E9E9] items-center lg:justify-between w-full lg:w-[80%] m-auto lg:mt-7">
//       {CounterData.map((counterItem, index) => {
//         // Use the custom hook to animate numbers
//         const animatedNumber = useCounterAnimation(counterItem.number, 2000); // 2 seconds duration

//         return (
//           <div
//             ref={(el) => (countersRef.current[index] = el)} // Set the ref for each counter
//             key={index}
//             className=" text-center w-[90%] sm:w-[70%] md:w-[48%] lg:w-[30%] m-4 py-10 lg:py-20 rounded-3xl"
//           >
            
//             <h1 className="text-xl lg:text-[40px]  ">
//               {animatedNumber}+
//             </h1>
//             <h1 className=" text-lg lg:text-[25px] mt-2 lg:mt-6 font-bold">
//               {counterItem.title}
//             </h1>
//           </div>
//         );
//       })}
//     </div>
//     </div>
//   )
// }

// export default HeroSection



"use client";

const HeroSection = ({ fhead, span, head, HerosectionPara, HerosectionButton, projects, clients, countries }) => {
  
  const CounterData = [
    {
      title: "Projects Completed",
      number: projects,
    },
    {
      title: "Satisfied Clients",
      number: clients,
    },
    {
      title: "Countries Worldwide",
      number: countries,
    },
  ];

  // Call useCounterAnimation at the top level and store the animated numbers
  
  return (
    <div className="w-full text-center flex flex-col justify-center items-center">
      <h1 className="text-xl md:text-5xl leading-tight z-50 w-[40%]">
        {fhead}
        <span className="text-teal-400">{span}</span> {head}
      </h1>
      <p className="ml-[700px] text-sm w-[300px]">{HerosectionPara}</p>
      <button className="bg-[#24CFA6] px-10 py-3 rounded-3xl">{HerosectionButton}</button>

      <div className="flex flex-wrap justify-center text-[#E9E9E9] items-center lg:justify-between w-full lg:w-[80%] m-auto lg:mt-7">
        {CounterData.map((counterItem, index) => (
          <div

            key={index}
            className="text-center w-[90%] sm:w-[70%] md:w-[48%] lg:w-[30%] m-4 py-10 lg:py-20 rounded-3xl"
          >
            <h1 className="text-xl lg:text-[40px]">{counterItem.number}+</h1>
            <h1 className="text-lg lg:text-[25px] mt-2 lg:mt-6 font-bold">
              {counterItem.title}
            </h1>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HeroSection;
