
import Heading from "./Heading"
import { MdOutlineNavigateNext } from "react-icons/md";

import Image from "next/image"
import Link from "next/link"

import AnimatedLink from "./AnimatedLink";
const OurResult = () => {

  return (
    <div className="w-[80%] m-auto">
      <Heading mainText={"Our"} subText={"Result"} />
      <div className="my-[5vh] relative">
        <Image
          className=" "
          alt="bg-shadow"
          layout="responsive"
          loading="lazy"
          quality={75}
          width={100}
          height={100}
          src="/OurResult/Portfolio.png"
        ></Image>
    
    <span className="absolute bottom-[5%] left-10 inline-block px-4 py-2   duration-1000 hover:-pl-[40px] rounded-3xl transition-all ease-out">
          <AnimatedLink href={"#"} content={"view All Projects"} />
        </span>
        <Link href={"#"} className="absolute bottom-[5%s] right-8 border-2 rounded-full border-[#333] p-2"> <span><MdOutlineNavigateNext className="text-2xl" /></span>
        </Link>
      </div>
    </div>
  )
}

export default OurResult
