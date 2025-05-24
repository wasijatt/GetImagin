"use client"

import Image from "next/image"
import { useRef } from "react";
const ServicesnextGen = () => {
    const videoRef = useRef(null);
    const nextgen = [
        {
            imgsrc: "/Services/Cynetis Brandin-get imagin-Services09.jpg",
            title: "NextGen Properties",
            description: "NextGenTransformed custom design into Webflow, enhancing user experience and modern co-living solutions. "
        },
        {
            imgsrc: "/Services/Pokru Szone Brandin-get imagin-Services 19.jpg",
            title: "NextGen Properties",
            description: "Transformed custom design into Webflow, enhancing user experience and modern co-living solutions."
        },]

    const handleMouseEnter = () => {
        if (videoRef.current) {
            videoRef.current.play();
        }
    };

    const handleMouseLeave = () => {
        if (videoRef.current) {
            videoRef.current.pause();
        }
    };
    return (
        <div className="">
            <div className=" md:flex  text-black justify-center items-center">

                {nextgen.map((image, index) => (
                    <div key={index} className="w-full md:w-[40%] flex flex-col gap-5 p-6  md:p-11">
                        <Image className="w-full h-full" src={image.imgsrc} alt={`Image ${index}`} width={800} height={800} />
                        <h1 className="text-black">{image.title}</h1>
                        <p>{image.description}</p>
                    </div>
                ))}



            </div>




{/* <div className="relative bg-[#d82424e5] w-[95%] h-36 md:w-[70%] py-3 md:py-10 text-white m-auto rounded-2xl flex justify-center items-center">
  <div className="absolute inset-0 z-10 rounded-2xl overflow-hidden">
    <video
      src="/Services/lets caht with getimagin desing agency.mp4"
      controls
      autoPlay
      playsInline
      muted
      loop
      className="w-full h-full object-cover rounded-xl shadow-lg"
    >
      Your browser does not support the video tag.
    </video>
  </div>
</div> */}




            <div
                className=" w-full md:w-[80%] h-auto m-auto text-center -mb-[30%] md:mb-96  bg-black relative"

            >
                <video
                    ref={videoRef}
                    className=" z-10 video w-full h-auto absolute top-0 rounded-2xl left-0"
                    loop
                    muted
                    playsInline
                    preload="auto"
                    src="/Services/lets caht with getimagin desing agency.mp4"
                >

                </video>
                <div className="w-full h-auto absolute top-0 rounded-2xl z-10 left-0 bg-[#00000068] "></div>
                <div className=" z-10 absolute mt-[10%] left-[10%] md:left-[18%] bg-black ">
                    <h1 className=" text-white text-xl md:text-4xl 2xl:text-5xl ">
                        Need Something Else{' '}
                        <span className="text-[#24CFA6] cursor-pointer">Designed?</span>
                    </h1>
                    <p className=" text-sm md:text-2xl text-[#ffffffb9] md:py-7  ">
                        Let us know how we can help your brand grow.
                    </p>
                </div>


            </div>
            {/* <div className=" md:h-16 "></div> */}
        </div>
    )
}

export default ServicesnextGen
