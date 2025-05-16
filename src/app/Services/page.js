import MiniHeroSection from "../Components/MiniHeroSection"
import Space from "../Components/Space"
import Services from "../Components/Services"
import Headline from "../Components/Headline"
import Footer from "../Components/Footer"
import ServicesnextGen from "../Components/ServicesnextGen"
import Header from "../Components/Header"
const page = () => {
  return (
    <main className="bg-white  ">
      
<Header/>
      <MiniHeroSection className=" max-h-min md:h-screen  " fhead={"Our"} span={" Get Imagin"} head={" & Services That Will Send You to SPACE."} />
<Space/>
<Services/>
<Headline/>
<ServicesnextGen/>
<Footer/>




      
    </main>
  )
}

export default page
