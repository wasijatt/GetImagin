import { FaArrowLeft } from "react-icons/fa6";
import Image from "next/image";




const OursServices = () => {


    const Services = [
        {
            ServiceHead: "Web design & development",
            b1: "Creative web design",
            b2: "Web development",
            b3: "Copywriting",
            b4: "E-Commerce",
            b5: "WordPress",
            b6: "SEO",
            ServiceDis: "Crafting digital experiences where beauty meets ROI, turning heads and unlocking revenue potential with every click.",
            buton: "Find our more",
            Img :'.public/HeaderLogo/Getimagin.png'
        },
        {
            ServiceHead: "Web design & development",
            b1: "Creative web design",
            b2: "Web development",
            b3: "Copywriting",
            b4: "E-Commerce",
            b5: "WordPress",
            b6: "SEO",
            ServiceDis: "Crafting digital experiences where beauty meets ROI, turning heads and unlocking revenue potential with every click.",
            buton: "Find our more"
        }, {
            ServiceHead: "Web design & development",
            b1: "Creative web design",
            b2: "Web development",
            b3: "Copywriting",
            b4: "E-Commerce",
            b5: "WordPress",
            b6: "SEO",
            ServiceDis: "Crafting digital experiences where beauty meets ROI, turning heads and unlocking revenue potential with every click.",
            buton: "Find our more"
        }, {
            ServiceHead: "Web design & development",
            b1: "Creative web design",
            b2: "Web development",
            b3: "Copywriting",
            b4: "E-Commerce",
            b5: "WordPress",
            b6: "SEO",
            ServiceDis: "Crafting digital experiences where beauty meets ROI, turning heads and unlocking revenue potential with every click.",
            buton: "Find our more"
        }
    ]
    return (
        <div className="w-full bg-black text-[#E9E9E9]">
            <div className="flex items-center justify-between w-[70%] m-auto">
                <h1 className="text-base md:text-[40px] lg:text-[70px] leading-none ">Our <br /> <span className="ml-9">Services</span> </h1>
                <div className="relative">
                    <div className=" radialshadow "></div>
                    <FaArrowLeft className="text-base md:text-[40px] lg:text-[100px] z-50" />
                </div>
            </div>
            
                <div className="flex  flex-col bg-white w-3/4 m-auto">
                    {Services.map((service, index) => (
                       
                      
                        <div key={index} className=" w-full border p-6 flex rounded-3xl shadow-lg">
                        <div>
                            <h2 className="text-[#24CFA6] text-base md:[20px] lg:[30px]">{service.ServiceHead}</h2>
                            <ul className="mb-4">
                                <li><a href="#" className="text-blue-600 hover:underline">{service.b1}</a></li>
                                <li><a href="#" className="text-blue-600 hover:underline">{service.b2}</a></li>
                                <li><a href="#" className="text-blue-600 hover:underline">{service.b3}</a></li>
                                <li><a href="#" className="text-blue-600 hover:underline">{service.b4}</a></li>
                                <li><a href="#" className="text-blue-600 hover:underline">{service.b5}</a></li>
                                <li><a href="#" className="text-blue-600 hover:underline">{service.b6}</a></li>
                            </ul>
                            <p className="mb-4">{service.ServiceDis}</p>
                            <a href="#" className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                                {service.buton}
                            </a>
                            </div>
                        <Image alt="Services Images" loading="lazy" quality={75} width={100} height={100} src={Services.Img}/>
                        </div>

                        
                    ))}
                </div>
               
                <div>
                    i
                </div>
            </div>
      
    )
}

export default OursServices
