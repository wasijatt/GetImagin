import MiniHeroSection from "../Components/MiniHeroSection"
import Space from "../Components/Space"
import Services from "../Components/Services"
import Headline from "../Components/Headline"

import ServicesnextGen from "../Components/ServicesnextGen"
import Header from "../Components/Header"
const page = () => {
  return (
    <div className="bg-white pb-[%] ">
      
<Header/>
      <MiniHeroSection className="h-screen" fhead={"Our"} span={" Get Imagin"} head={" & Services That Will Send You to SPACE."} />
<Space/>
<Services/>
<Headline/>
<ServicesnextGen/>




      
    </div>
  )
}

export default page
