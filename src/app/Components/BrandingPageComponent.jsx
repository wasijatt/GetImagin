import PropTypes from "prop-types";
import Image from "next/image";
const BrandingPageComponent = ({ items }) => {
    return (


        

        // <div className="w-full ">
        //     {items.map((item, index) => (
        //         <div
        //             key={index}

        //             className="w-full flex "
        //         > 
               



                    
        //             <div className="w-1/2 ">
        //             <Image
        //         className="w-full h-full bg-green-400 "
        //           alt="Get Imagin"
        //           width={1600}
        //           height={1900}
               
        //           loading="lazy"
        //           quality={75}
        //           src="/OurWork/Cynetis Branding/Cynetis Brandin-get imagin-Services 01.jpg"
        //         />
                 
                    
        //             </div>
                   
        //             <div className="w-1/2 fixed float-right  ">
                
        //             <h1 className="mt-[8%] text-2xl md:text-8xl ">{item.heading}</h1>
              
        //             <ul className="mt-14 flex flex-wrap w-1/2 m-auto"></ul>

        //             </div>
                    
        //         </div>
        //     ))}
        // </div>
       
            <div className="flex flex-col lg:flex-row h-screen bg-gray-900">
              {/* Left Scrollable Image Section */}
              <div className="w-full lg:w-1/2 h-full overflow-y-scroll  no-scollbar ">
                <div className="flex flex-col items-center  ">
                  {/* Example Image 1 */}
                  <div className="w-full">
                            <Image
                className="w-full h-[100vh] bg-green-400 "
                  alt="Get Imagin"
                  width={1900}
                  height={1900}
                  
               
                  loading="lazy"
                  quality={75}
                  src="/OurWork/Cynetis Branding/Cynetis Brandin-get imagin-Services 01.jpg"
                />
                  </div>
                  {/* Example Image 2 */}
                  <div className="w-3/4">
                          <Image
                className="w-full h-full bg-green-400 "
                  alt="Get Imagin"
                  width={1600}
                  height={1900}
               
                  loading="lazy"
                  quality={75}
                  src="/OurWork/Cynetis Branding/Cynetis Brandin-get imagin-Services 01.jpg"
                />
                  </div>
                  {/* Add more images here */}
                </div>
              </div>
        
              {/* Right Content Section */}
              <div className="w-full lg:w-1/2 h-full flex flex-col justify-center items-center text-white px-10">
                <div className="space-y-4">
                  <button className="px-4 py-2 bg-gray-700 rounded-full text-sm">
                    ECOMMERCE
                  </button>
                  <h1 className="text-6xl font-bold">
                    IMAGIN <span className="italic">THREADS</span>
                  </h1>
                  <p className="text-lg leading-relaxed">
                    Branding, an iOS app, and a complex affiliate web presence were
                    designed for BestOdds.com with industry-leading looks, in the form
                    of magazine-style layouts.
                  </p>
                </div>
              </div>
            </div>

    )
}



BrandingPageComponent.propTypes = {
    items: PropTypes.arrayOf(
        PropTypes.shape({
            heading: PropTypes.string.isRequired,

        })
    ).isRequired,
};

export default BrandingPageComponent