import Image from "next/image"
const      ServicesnextGen = () => {
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
        }, ]
    return (
        <div className="">
        <div className=" md:flex  text-black justify-center items-center">

            {nextgen.map((image, index) => (
                <div key={index} className="w-full md:w-[40%] flex flex-col gap-5 p-6  md:p-11">
                    <Image  className="w-full h-full" src={image.imgsrc} alt={`Image ${index}`} width={800} height={800} />
                    <h1 className="text-black">{image.title}</h1>
                    <p>{image.description}</p>
                </div>
            ))}



        </div>
        <div className="bg-[#1c1c1c]  px-5 py-[6%]  w-full md:w-[80%] m-auto text-center my-10 rounded-2xl  ">
            <h1 className="text-xl md:text-4xl 2xl:text-5xl">Need Something Else <span className="text-[#24CFA6] cursor-pointer">Designed?</span> </h1>
            <p className="text-sm md:text-2xl text-[#ffffffb9] md:py-7">Let us know how we can help your brand grow.</p>
        </div>

        <div className=" md:h-16 "></div>
        </div>
    )
}

export default ServicesnextGen
