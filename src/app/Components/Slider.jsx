
// "use client";
// import { useState, useEffect, useRef } from "react";
// import { FaArrowRight, FaArrowLeft, FaLinkedin, FaInstagram, FaFacebook } from "react-icons/fa";
// import { gsap } from "gsap";
// import Image from "next/image";

// import Link from "next/link";
// const Slider = () => {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [ishovered, setIshovered] = useState(false);


//   const [direction, setDirection] = useState("next"); // Track navigation direction
//   const [previousIndex, setPreviousIndex] = useState(0); // Keep track of the previous index

//   const images = [
//     {
//       image:" AboutUs/team/Muhammad Wasim . the Full stack Developer-min.jpg", 
//       names: "Muhammad Wasim",
//       facebook: "",
//       Linkedin: "",
//       instagramme: "",
//     },{
//     image:"/AboutUs/team/Muhammad Yousaf  The Lottie Animator.jpg",
//       names: "Muhammad Yousaf",
//       facebook: "",
//       Linkedin: "",
//       instagramme: "",
//   },
//     {image:"/AboutUs/team/jaan Muhammad The Social Media Manager.jpg",
//        names: "Jaan Muhammad",
//       facebook: "",
//       Linkedin: "",
//       instagramme: "",
//     },
//     {image:"/AboutUs/team/Abdullah - Graphic Designer.jpg",
//        names: " Muhammad Abdullah",
//       facebook: "",
//       Linkedin: "",
//       instagramme: "",
//     },
//     {image:"/AboutUs/team/usman-video editor.jpg",
//        names: " Muhammad Usman",
//       facebook: "",
//       Linkedin: "",
//       instagramme: "",
//     },
//   ];

//   // Create a ref to hold the container of the popup image for GSAP
//   const imageRef = useRef(null);

//   const nextSlide = () => {
//     setDirection("next"); // Set direction as "next"
//     setPreviousIndex(currentIndex); // Update previous index before setting new one
//     setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
//   };


//   const prevSlide = () => {
//     setDirection("prev"); // Set direction as "prev"
//     setPreviousIndex(currentIndex); // Update previous index before setting new one
//     setCurrentIndex((prevIndex) =>
//       prevIndex === 0 ? images.length - 1 : prevIndex - 1
//     );
//   };

//   useEffect(() => {
//     // GSAP animation when the image changes (on currentIndex change)
//     if (imageRef.current) {
//       const timeline = gsap.timeline();

//       if (direction === "next") {
//         // Slide the image in from the right for the "next" button
//         timeline.fromTo(
//           imageRef.current,
//           { x: 300 }, // Start from right when new image appears
//           { x: 0, duration: .5, ease: "none" }
//         );
//       } else if (direction === "prev") {
//         // Slide the image in from the left for the "prev" button
//         timeline.fromTo(
//           imageRef.current,
//           { x: -300 }, // Start from left when new image appears
//           { x: 0, duration: .5, ease: "none" }
//         );
//       }
//     }
//   }, [currentIndex, direction]); // Re-run animation on direction or index change

//   return (
//     <div className="relative w-full h-[80vh] mx-auto py-8 ">
//       {/* Popup */}
//       <div className="absolute -top-[10%] left-0 w-full h-inherit flex items-center z-50 bg-opacity-40" >
//         {/* navigation */}
//         <button
//           className="absolute left-[40%] text-4xl top-1/2 transform -translate-y-1/2 z-50 p-4 text-[#24CFA6] bg-opacity-80 bg-white rounded-full"
//           onClick={prevSlide}
//         >
//           <FaArrowLeft />
//         </button>
//         <button
//           className="absolute right-[16%] top-1/2 transform -translate-y-1/2 z-50 text-4xl p-4 text-[#24CFA6] bg-opacity-80 bg-white rounded-full"
//           onClick={nextSlide}
//         >
//           <FaArrowRight />
//         </button>
//         <div className="relative w-[30%] left-[47%] h-[90vh] border-2 border-[#24CFA6] shadow-lg rounded-tr-[80px] rounded-lg overflow-hidden mb-5">
//           {/* static bg Background  */}
//           <div className="absolute w-full h-full overflow-hidden ">
//             <Image

//               src={images[previousIndex]}
//               alt={`Background Image ${previousIndex}`}
//               layout="fill"
//               quality={100}
//               loading="lazy"
//               className="w-full h-full object-cover rounded-tr-[50px] s"
//             />


//           </div>

//           {/* Foreground Image */}
//           {/* <div className="relative w-full h-full overflow-hidden">
//             <Image

//               ref={imageRef}
//               src={images[currentIndex]}
//               alt={`Foreground Image ${currentIndex}`}
//               layout="fill"
//               quality={100}
//               loading="lazy"
//               className="w-full h-full object-cover rounded-tr-[50px]"
//             />
//           </div> */}
//           <div className="absolute w-full h-full overflow-hidden group"
//           >
//             {/* Background Image */}
//             <Image
//               src={images[previousIndex]}
//               alt={`Background Image ${previousIndex}`}
//               layout="fill"
//               quality={100}
//               loading="lazy"
//               className="w-full h-full object-cover rounded-tr-[50px]"
//             />

//             {/* Overlay */}
//             <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center z-10 rounded-tr-[50px]">
//               <div className="bg-[#00000080] flex justify-center items-center"></div>
//               {images.map((member, index) => (
//                 <div key={index} className=" shadow rounded-lg p-6 text-center">
//                   <h2 className="text-xl font-semibold mb-2">{member.names}</h2>
//                   <div className="flex justify-center gap-4 text-2xl text-gray-700">
//                     {member.Linkedin && (
//                       <Link href={member.Linkedin} target="_blank" aria-label="LinkedIn">
//                         <FaLinkedin className="hover:text-blue-600 transition" />
//                       </Link>
//                     )}
//                     {member.facebook && (
//                       <Link href={member.facebook} target="_blank" aria-label="Facebook">
//                         <FaFacebook className="hover:text-blue-500 transition" />
//                       </Link>
//                     )}
//                     {member.instagramme && (
//                       <Link href={member.instagramme} target="_blank" aria-label="Instagram">
//                         <FaInstagram className="hover:text-pink-500 transition" />
//                       </Link>
//                     )}
//                   </div>
//                 </div>
//               ))}

//             </div>
//           </div>


//         </div>
//       </div>

//       {/* Slider Images*/}
//       <div
//         className="flex transition-transform duration-1000 ease-in-out py-[2%] opacity-30"
//         style={{
//           transform: `translateX(-${currentIndex * 25}%)`,
//         }}
//       >
//         {images.map((image, index) => (
//           <div key={index} className="w-[25%] flex-shrink-0 px-2">
//             <Image
//               src={image}
//               alt={`Image ${index}`}
//               width={400}
//               height={600}
//               quality={90}
//               loading="lazy"
//               className="w-full h-[400px] object-cover rounded-tr-[30px]"
//             />
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Slider;



"use client";
import { useState, useEffect, useRef } from "react";
import { FaArrowRight, FaArrowLeft, FaLinkedin, FaInstagram, FaFacebook } from "react-icons/fa";
import { gsap } from "gsap";
import Image from "next/image";
import Link from "next/link";

const Slider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState("next");
  const [previousIndex, setPreviousIndex] = useState(0);

  const imageRef = useRef(null);

  const images = [
    {
      image: "/AboutUs/team/Muhammad Wasim . the Full stack Developer-min.jpg",
      names: "Muhammad Wasim",
      role: "Full Stack Developer",
      facebook: "",
      Linkedin: "https://www.linkedin.com/in/muhammad-wasim-57400a301/",
      instagramme: "https://www.instagram.com/dev_shade/",
    },
    {
      image: "/AboutUs/team/Muhammad Yousaf  The Lottie Animator.jpg",
      names: "Muhammad Yousaf",
      role: "Lottie Animator",
      facebook: "",
      Linkedin: "",
      instagramme: "",
    },
    {
      image: "/AboutUs/team/jaan Muhammad The Social Media Manager.jpg",
      names: "Jaan Muhammad",
      role: "Social Media Manager",
      facebook: "",
      Linkedin: "https://www.linkedin.com/in/jaan-muhammad-dm/",
      instagramme: "https://www.instagram.com/jaanmuhammad_dm",
    },
    {
      image: "/AboutUs/team/Abdullah - Graphic Designer.jpg",
      names: "Muhammad Abdullah",
      role: "Graphic Designer",
      facebook: "",
      Linkedin: "https://www.linkedin.com/in/design-by-rajput/",
      instagramme: "https://www.instagram.com/design_by_rajput/",
    },
    {
      image: "/AboutUs/team/usman-video editor.jpg",
      names: "Muhammad Usman",
      role: "Video Editor",
      facebook: "",
      Linkedin: "",
      instagramme: "https://www.instagram.com/uqeditor/",
    }, {
      image: "/AboutUs/team/usman-video editor.jpg",
      names: "Anas Rajput",
      role: "Web Developer",
      facebook: "https://web.facebook.com/anas.rajput.625299",
      Linkedin: "https://www.linkedin.com/in/anas-rajpoot-b39974256/",
      instagramme: "https://www.instagram.com/anas_rajput936/",
    }, {
      image: "/AboutUs/team/Muhammad Wasim . the Full stack Developer-min.jpg",
      names: "Muhammad Wasim",
      role: "Full Stack Developer",
      facebook: "",
      Linkedin: "https://www.linkedin.com/in/muhammad-wasim-57400a301/",
      instagramme: "https://www.instagram.com/dev_shade/",
    },
    {
      image: "/AboutUs/team/Muhammad Yousaf  The Lottie Animator.jpg",
      names: "Muhammad Yousaf",
      role: "Lottie Animator",
      facebook: "",
      Linkedin: "",
      instagramme: "",
    },
    {
      image: "/AboutUs/team/jaan Muhammad The Social Media Manager.jpg",
      names: "Jaan Muhammad",
      role: "Social Media Manager",
      facebook: "",
      Linkedin: "https://www.linkedin.com/in/jaan-muhammad-dm/",
      instagramme: "https://www.instagram.com/jaanmuhammad_dm",
    },
    {
      image: "/AboutUs/team/Abdullah - Graphic Designer.jpg",
      names: "Muhammad Abdullah",
      role: "Graphic Designer",
      facebook: "",
      Linkedin: "https://www.linkedin.com/in/design-by-rajput/",
      instagramme: "https://www.instagram.com/design_by_rajput/",
    },
    {
      image: "/AboutUs/team/usman-video editor.jpg",
      names: "Muhammad Usman",
      role: "Video Editor",
      facebook: "",
      Linkedin: "",
      instagramme: "https://www.instagram.com/uqeditor/",
    }, {
      image: "/AboutUs/team/usman-video editor.jpg",
      names: "Anas Rajput",
      role: "Web Developer",
      facebook: "https://web.facebook.com/anas.rajput.625299",
      Linkedin: "https://www.linkedin.com/in/anas-rajpoot-b39974256/",
      instagramme: "https://www.instagram.com/anas_rajput936/",
    }, {
      image: "/AboutUs/team/Muhammad Wasim . the Full stack Developer-min.jpg",
      names: "Muhammad Wasim",
      role: "Full Stack Developer",
      facebook: "",
      Linkedin: "https://www.linkedin.com/in/muhammad-wasim-57400a301/",
      instagramme: "https://www.instagram.com/dev_shade/",
    },
    {
      image: "/AboutUs/team/Muhammad Yousaf  The Lottie Animator.jpg",
      names: "Muhammad Yousaf",
      role: "Lottie Animator",
      facebook: "",
      Linkedin: "",
      instagramme: "",
    },
    {
      image: "/AboutUs/team/jaan Muhammad The Social Media Manager.jpg",
      names: "Jaan Muhammad",
      role: "Social Media Manager",
      facebook: "",
      Linkedin: "https://www.linkedin.com/in/jaan-muhammad-dm/",
      instagramme: "https://www.instagram.com/jaanmuhammad_dm",
    },
    {
      image: "/AboutUs/team/Abdullah - Graphic Designer.jpg",
      names: "Muhammad Abdullah",
      role: "Graphic Designer",
      facebook: "",
      Linkedin: "https://www.linkedin.com/in/design-by-rajput/",
      instagramme: "https://www.instagram.com/design_by_rajput/",
    },
    {
      image: "/AboutUs/team/usman-video editor.jpg",
      names: "Muhammad Usman",
      role: "Video Editor",
      facebook: "",
      Linkedin: "",
      instagramme: "https://www.instagram.com/uqeditor/",
    }, {
      image: "/AboutUs/team/usman-video editor.jpg",
      names: "Anas Rajput",
      role: "Web Developer",
      facebook: "https://web.facebook.com/anas.rajput.625299",
      Linkedin: "https://www.linkedin.com/in/anas-rajpoot-b39974256/",
      instagramme: "https://www.instagram.com/anas_rajput936/",
    },
  ];

  const nextSlide = () => {
    setDirection("next");
    setPreviousIndex(currentIndex);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setDirection("prev");
    setPreviousIndex(currentIndex);
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    if (imageRef.current) {
      const timeline = gsap.timeline();
      const xStart = direction === "next" ? 500 : -500;
      timeline.fromTo(
        imageRef.current,
        { x: xStart },
        { x: 0, duration: 0.7, ease: "easeinout" }
      );
    }
  }, [currentIndex, direction]);

  return (
    <div className="relative w-full h-[80vh] mx-auto md:py-8">
      <div className="absolute -top-[10%] left-0 w-full h-inherit flex items-center z-50 bg-opacity-90 ">
        <button
          className="absolute left-3/4 md:left-[40%] text-2xl md:text-4xl top-[105%] md:top-1/2 transform -translate-y-1/2 z-50 p-2 md:p-4 text-[#24CFA6] bg-opacity-80 bg-white rounded-full"
          onClick={prevSlide}
        >
          <FaArrowLeft />
        </button>
        <button
          className="absolute right-[2%] md:right-[10%]  top-[105%] md:top-1/2 transform -translate-y-1/2 z-50 text-2xl md:text-4xl p-2 md:p-4 text-[#24CFA6] bg-opacity-80 bg-white rounded-full"
          onClick={nextSlide}
        >
          <FaArrowRight />
        </button>
        <div className="absolute top-0 left-0 bg-black z-50 w-full h-full bg-opacity-50 md:hidden flex justify-center items-end" >  
          <div className="bg-[#000000c8] w-full text-center py-4 rounded-b-lg  ">
          <h2 className="text-white text-lg md:text-2xl font-semibold mb-2">
            {images[currentIndex].names}
          </h2>
          <div className="flex justify-center gap-6  py-3 text-xl text-white">
            {images[currentIndex].Linkedin && (
              <Link href={images[currentIndex].Linkedin} target="_blank" aria-label="LinkedIn">
                <FaLinkedin className="hover:text-main-color transition" />
              </Link>
            )}
            {images[currentIndex].facebook && (
              <Link href={images[currentIndex].facebook} target="_blank" aria-label="Facebook">
                <FaFacebook className="hover:text-blue-400 transition" />
              </Link>
            )}
            {images[currentIndex].instagramme && (
              <Link href={images[currentIndex].instagramme} target="_blank" aria-label="Instagram">
                <FaInstagram className="hover:main-color transition" />
              </Link>
            )}
          </div>
        </div> </div>
   
        <div className="relative w-full h-[70vh] md:w-[30%] md:left-[50%] md:h-[90vh] border-2  shadow-lg rounded-tr-[200px]  overflow-hidden mb-5">
          <div className="absolute w-full h-[90vh] overflow-hidden  bg-black">
            <Image
              src={images[previousIndex].image}
              alt={`Background Image ${previousIndex}`}
              width={400}
              height={600}
              objectFit="cover"
              quality={100}
              loading="lazy"
              className="w-full h-full object-cover rounded-tr-[150px]"
            />

          </div>

          <div className="absolute w-full h-[90vh] overflow-hidden group" ref={imageRef}>
            {/* Background Image */}
            <Image
              src={images[currentIndex].image}
              alt={`Team Member ${currentIndex}`}
              width={400}
              height={600}
              objectFit="cover"
              quality={100}
              loading="lazy"
              className="w-full h-full object-cover rounded-tr-[150px]"
            />

            {/* Overlay */}
            <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center z-10 rounded-tr-[50px] md:opacity-100 md:bg-opacity-30 md:justify-center md:items-end md:py-6">
              <div className=" w-full py-4 rounded-b-lg  px-4 ">
                <h2 className="text-white  md:text-6xl font-semibold mb-2">
                  {images[currentIndex].names}
                </h2>
                 <p className="text-white font-thin  md:text-2xl  mb-2">
                  {images[currentIndex].role}
                </p>
                <div className="flex  gap-6 text-xl text-white">
                  {images[currentIndex].Linkedin && (
                    <Link href={images[currentIndex].Linkedin} target="_blank" aria-label="LinkedIn">
                      <FaLinkedin className="hover:text-main-color transition" />
                    </Link>
                  )}
                  {images[currentIndex].facebook && (
                    <Link href={images[currentIndex].facebook} target="_blank" aria-label="Facebook">
                      <FaFacebook className="hover:text-blue-400 transition" />
                    </Link>
                  )}
                  {images[currentIndex].instagramme && (
                    <Link href={images[currentIndex].instagramme} target="_blank" aria-label="Instagram">
                      <FaInstagram className="hover:main-color transition" />
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      <div
        className="flex justify-center items-center transition-transform duration-1000 ease-in-out py-[2%] opacity-30 pt-20"
        style={{
          transform: `translateX(-${currentIndex * 17}%)`,
        }}
      >
        {images.map((image, index) => (
          <div key={index} className="w-full md:w-[17%] flex-shrink-0 px-2 border-top-right-radius-[250px] ">
            <Image
              src={image.image}
              alt={`Image ${index}`}
              width={400}
              height={400}
              objectFit="cover"
              quality={90}
              loading="lazy"
              className="w-[330px] h-[330px] object-cover rounded-tr-[130px]"
            />
          </div>
        ))}


      </div>
    </div>
  );
};

export default Slider;
