// import Image from "next/image"
// import { FaArrowRight } from "react-icons/fa";
// import Heading from "./Heading";
// import Link from "next/link";
// import useAnimatedLink from "../hooks/useAnimatedLink";
// const OurWork = () => {
//   const {
//     isHovered,
//     translateX,
//     translateY,
//     setIsHovered,
//     handleMouseMove,
//     handleMouseLeave,
//   } = useAnimatedLink(); // Use the hook
//   const workgallery = [
//     "/OurWork/link5.png",
//     "/OurWork/link6.png",
//     "/OurWork/Link (1).png",
//     "/OurWork/Link.png",
//     "/OurWork/Link (3).png",

//   ]
//   return (
//     <div>
//       <div className="flex px-[10%] justify-between items-center py-[7vh] my-8 ">
//         <Heading mainText="Our" subText="Work" />

//         <div className="w-1/2">
//           <h1 className="text-lg lg:text-4xl "> Making brands a damn site better.</h1>
//           <p className="text-[12px] mt-4 w-3/4">Let’s face it, first impressions matter. Your website’s an opportunity to wow your audience, so why choose bad design? Brands win over fans when they’re brave enough to go beyond their creative comfort zone.</p>
//         </div>
//       </div>


//       <div className="flex flex-wrap justify-center items-center w-full overflow-hidden gap-4 px-[5%]">
//         {workgallery.map((img, index) => (
//           <div
//             key={index}
//             className={`relative  `}
//           >
//             <Image
//               className={`${index === 0 ? 'w-full  ' : 'w-[45%]'}  `}
//               src={img}
//               alt={`Gallery image ${index + 1}`}
//               loading="lazy"
//               layout="responsive"
//               width={100}
//               height={100} // Adjust height based on your needs
//               objectFit="cover"

//             />
//           </div>
//         ))}
//       </div>
//       <div className="w-full my-20   text-center">
//         <Link className="px-8 py-2 border-[1px] rounded-3xl duration-1000 border-teal-400" href = {"#"}  style={{
//         transform: `translate(${translateX}px, ${translateY}px)`,
//       }}
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseMove={handleMouseMove}
//       onMouseLeave={handleMouseLeave}>view All Projects <span><FaArrowRight className="inline "  /></span>
//     </Link>
//       </div>
//     </div>
//   )
// }

// export default OurWork


import Image from "next/image";
import { FaArrowRight } from "react-icons/fa";
import Heading from "./Heading";
import Link from "next/link";
// import useAnimatedLink from "../hooks/useAnimatedLink"; // Correct path to the hook

const OurWork = () => {
  
  // const {
  //   isHovered,
  //   translateX,
  //   translateY,
  //   setIsHovered,
  //   handleMouseMove,
  //   handleMouseLeave,
  // } = useAnimatedLink(); // Use the hook

  const workgallery = [
    "/OurWork/link5.png",
    "/OurWork/link6.png",
    "/OurWork/Link (1).png",
    "/OurWork/Link.png",
    "/OurWork/Link (3).png",
  ];

  return (
    <div>
      <div className="flex px-[10%] justify-between items-center py-[7vh] my-8 ">
        <Heading mainText="Our" subText="Work" />
        <div className="w-1/2">
          <h1 className="text-lg lg:text-4xl "> Making brands a damn site better.</h1>
          <p className="text-[12px] mt-4 w-3/4">
            Let’s face it, first impressions matter. Your website’s an
            opportunity to wow your audience, so why choose bad design? Brands
            win over fans when they’re brave enough to go beyond their creative
            comfort zone.
          </p>
        </div>
      </div>

      <div className="flex flex-wrap justify-center items-center w-full overflow-hidden gap-4 px-[5%]">
        {workgallery.map((img, index) => (
          <div key={index} className={`relative`}>
            <Image
              className={`${index === 0 ? "w-full" : "w-[45%]"}`}
              src={img}
              alt={`Gallery image ${index + 1}`}
              loading="lazy"
              layout="responsive"
              width={100}
              height={100} // Adjust height based on your needs
              objectFit="cover"
            />
          </div>
        ))}
      </div>

      <div className="w-full my-20 text-center">
        {/* <Link
          className="px-8 py-2 border-[1px] rounded-3xl duration-1000 border-teal-400"
          href={"#"}
          style={{
            transform: `translate(${translateX}px, ${translateY}px)`,
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          view All Projects <span><FaArrowRight className="inline" /></span>
        </Link> */}
      </div>
    </div>
  );
};

export default OurWork;
