import Image from "next/image"
const ServicesnextGen = () => {
    const nextgen = [
        {
            imgsrc: "",
            title: "NextGen Properties",
            description: "NextGenTransformed custom design into Webflow, enhancing user experience and modern co-living solutions. "
        },
        {
            imgsrc: "",
            title: "NextGen Properties",
            description: "Transformed custom design into Webflow, enhancing user experience and modern co-living solutions."
        }, ]
    return (
        <>
        <div className="flex p-[5%] justify-center items-center">

            {nextgen.map((image, index) => (
                <div key={index} className="w-full md:w-[40%]  p-11">
                    <Image src={image.imgsrc} alt={`Image ${index}`} width={500} height={500} />
                    <h1>{image.title}</h1>
                    <p>{image.description}</p>
                </div>
            ))}



        </div>
        <div className="bg-[#1c1c1c] md:py-[4%] w-full md:w-[80%] m-auto text-center rounded-2xl">
            <h2 className="text-xl md:text-4xl 2xl:text-5xl">Need Something Else <span className="text-[#24CFA6]">Designed?</span> </h2>
            <p className="text-lg md:text-2xl text-[#ffffffb9] md:py-7">Let us know how we can help your brand grow.</p>
        </div>
        </>
    )
}

export default ServicesnextGen
