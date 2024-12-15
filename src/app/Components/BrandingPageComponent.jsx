"use client";
import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import PropTypes from "prop-types";
import Image from "next/image";
import Link from "next/link";

const BrandingPageComponent = ({ items }) => {
  const router = useRouter();

  
  const menuItems = useMemo(
    () => [
      { name: "Cynetic", href: "/works/Cynetic" },
      { name: "Likhon.Net", href: "/works/Likhon" },
      { name: "Pokruszone", href: "/works/Pokruszone" },
      { name: "Transcend", href: "/works/Transcend" },
      { name: "Mr Franky", href: "/works/MrFranky" },
      { name: "Pasco Pastry", href: "/works/PascoPastry" },
    ],
    []
  );


  const [currentIndex, setCurrentIndex] = useState(0);

  
  const handleNextProject = () => {
    const nextIndex = (currentIndex + 1) % menuItems.length; 
    setCurrentIndex(nextIndex);

    
    router.push(menuItems[nextIndex].href);
  };

  return (
    <div className="flex flex-col lg:flex-row relative h-screen ">

     

        <div className="fixed  left-[50%] md:left-[23%]  -top-[30%] md:-top-[450%]w-[250px] md:w-[1200px]  h-[700px]">
        <Image 
        className=""
          alt="Get Imagin Shadow"
          src={"/HeaderLogo/Container.svg"}
          fill
          loading="lazy"
          quality={75}
        />

      </div>
      <div className="perspective">
  <button
    className="fixed right-8 md:right-20 top-8 md:top-30 border-x-2 px-7 z-20 border-white animatedworkbutton"
    onClick={handleNextProject}
  >
    Next Project
  </button>
</div>
      {/* Left Scrollable Image Section */}
      <div className="w-full lg:w-1/2 h-full  ">
      <header>
      <nav className="perspective  z-30 fixed bottom-24 left-20 text-[#8a8989] hidden md:flex gap-5 text-[16px] mix-blend-difference font-bold "> 
<Link className=" border-[#8a8989] border-2 px-4 py-2 rounded-3xl animatedworkbutton" href="/" > / Home </Link>
<Link className="border-[#8a8989] border-2  px-4 py-2 rounded-3xl animatedworkbutton" href="/ContactUs" >Contact</Link>
<Link className="border-[#8a8989] border-2 px-4 py-2 rounded-3xl animatedworkbutton" href="/Services" > More Services </Link>
       
      </nav>
      </header>
        <div className="flex flex-col items-center">

          {/* Map through the first item's images (assuming items[0] exists) */}
          {items[0]?.images.map((img, index) => (
            <div key={index} className={img.containerClasses || "w-full  z-10 "}>
              <Image
                className={img.imgClasses || " w-full h-[full] bg-green-400"}
                alt={img.alt || "Get Imagin"}
                width={ 2500}
                height={ 1900}
                objectFit="cover"
                objectPosition="center"
                loading="lazy"
                quality={75}
                src={img.src}
              />
            </div>
          ))}
        </div>
      </div>

   
      <div className=" hidden fixed float-right right-0  w-full lg:w-1/2 h-full md:flex flex-col  justify-center items-center text-white px-10">

        <div className="space-y-6">
         
          {items[0] && (
            <>
              <button className="px-4 py-2 border-white border-2 text-white font-bold  rounded-full text-[14px]">
                {items[0].category }
              </button>
              <h1 className="md:text-[60px] 2xl:text-[80px] font-bold">
                {items[0].title} <span className="italic">{items[0].subtitle}</span>
              </h1>
              <p className="text-sm leading-relaxed ">
                {items[0].description}
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

BrandingPageComponent.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      subtitle: PropTypes.string,
      description: PropTypes.string,
      category: PropTypes.string,
      images: PropTypes.arrayOf(
        PropTypes.shape({
          src: PropTypes.string.isRequired,
          alt: PropTypes.string,
          width: PropTypes.number,
          height: PropTypes.number,
          imgClasses: PropTypes.string,
          containerClasses: PropTypes.string,
        })
      ),
    })
  ).isRequired,
};

export default BrandingPageComponent;
