"use client"
import dynamic from 'next/dynamic';
import { FaArrowLeft } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";

const Heading = dynamic(() => import('./Heading'), { ssr: false });
const Slider = dynamic(() => import('./Slider'), { ssr: false });
const Chat = dynamic(() => import('./Chat'), { ssr: false });

const Aboutus = () => {
    return (
        <>
            <div className="flex items-center justify-around my-[10vh]  m-auto py-4">

                <div className="w-[80%] md:w-1/2">
                    <h1 className="text-xl md:text-4xl border-l-2 border-[#2c7458] pl-4">Stuck with the same old design?</h1>
                    <p className="text-sm my-[2%] md:w-3/4 pl-4">We’re a global agency in Multan, Pakistan, rocking Designing, UI, UX, and Web Development. From startups to Fortune 50s, we’ve got you covered.</p>
                </div>
                <div className="relative">
                    <div className="aboutusShadow"></div>
                    <FaArrowLeft className=" hidden md:block arrow-icon  md:text-[40px] lg:text-[100px] z-50 font-normal" />
                </div>




            </div>
            <div className=" flex flex-col md:flex-row w-[90%] items-center my-[10%] gap-5">
                <h1 className="w-[90%] md:w-1/2 md:text-center text-3xl"  >(Our Values)</h1>
                <p className="w-[90%] md:w-[40%] text-sm md:text-lg"> Stuck in a digital rut? We’re here to shake things up! At our core, we value innovation, creativity, and collaboration. We don’t just design Agency; we create experiences that resonate. With a focus on seamless design and user-friendly interfaces,  we bring your vision to life while solving your digital challenges. From concept to launch, we’re dedicated to delivering excellence, one pixel at a time. Your success is our mission, and we’re committed to making every project not just good—but extraordinary.</p>
            </div>


            <div className="w-[90%] m-auto md:flex justify-around">
                <div className="relative ">
                    <section className="aboutusShadow absolute"></section>
                    <Heading className="" mainText={"Our"} subText={"Team"} /></div>
                <div className="w-full md:w-1/4 text-sm md:text-lg py-5">We will find our team across Creative Web Design, Web Development, Branding, Digital Marketing</div>
            </div>
            <Slider />
        
            <div className=" w-full md:mt-10">
                <div className=" flex justify-center items-center relative">
                    <Image
                        alt="Get Imagin"
                        width={1600}
                        height={600}
                        loading="lazy"
                        quality={75}
                        src="/AboutUs/bg-con.jpg"
                        className="w-[90%] h-96 rounded-tr-[150px]"
                    />
                    <div className="absolute top-[20%] flex flex-col md:flex-row justify-around items-center text-center text-lg lg:text-5xl">
                    <h1 className="w-[90%] md:w-[45%] leading-relaxed "> <span className="font-neueMachina font-bold">Interested </span> <br /> with working with <br /> <span className="font-fontspring"> Get Imagin </span></h1>
                    <div className="w-[90%] md:w-1/2  md:text-start ml-[5%]">
                    <h1 className="text-sm lg:text-lg">Drop us a line at</h1>
                    <Link href={"emilto:getimagin@gmail.com"} className="text-lg lg:text-4xl font-neueMachina font-bold" > getimagin@gmail.com </Link>
                    <p className="text-sm  mt-10">We’re a global agency in Multan, Pakistan, rocking Designing, UI, UX, and Web Development. <br />From startups to Fortune 50s, we’ve got you covered.</p>
                    </div>
                    </div>
                </div>
            </div>
            <Chat />
        </>
    )
}

export default Aboutus

