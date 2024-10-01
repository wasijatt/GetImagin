import Heading from "./Heading"
import { FaArrowLeft } from "react-icons/fa";

const OurPartner = () => {
  return (
    <div>
       <div className="flex items-center justify-between w-[70%] m-auto py-4 my-10">
          <Heading mainText={"Our"} subText={"Partner"} />
          <div className="relative">
            <FaArrowLeft className="arrow-icon text-base md:text-[40px] lg:text-[100px] font-normal z-50" />
          </div>
        </div>
    </div>
  )
}

export default OurPartner
