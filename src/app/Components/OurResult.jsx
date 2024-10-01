import Heading from "./Heading"
import { MdOutlineNavigateNext } from "react-icons/md";

import Image from "next/image"
import Link from "next/link"
import { FaArrowRight } from "react-icons/fa";

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
            <Link href={"#"} className="absolute bottom-[5%] left-10 border-2 rounded-3xl border-[#333] py-2 px-10">View All Projects <span><FaArrowRight className="inline "  /></span> </Link>
            <Link href={"#"} className="absolute bottom-[5%] right-8 border-2 rounded-full border-[#333] p-2"> <span><MdOutlineNavigateNext className="text-2xl" /></span>
            </Link>
            </div>
        </div>
    )
}

export default OurResult
