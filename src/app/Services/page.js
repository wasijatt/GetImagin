import MiniHeroSection from "../Components/MiniHeroSection"
import Space from "../Components/Space"
import Services from "../Components/Services"
import Headline from "../Components/Headline"
import Chat from "../Components/Chat"
import ServicesnextGen from "../Components/ServicesnextGen"
const page = () => {
  return (
    <div className="bg-white">
      <>
      <MiniHeroSection className="h-screen" head={" Our Get Imagin Work & Services That Will Send You to SPACE."} />
<Space/>
<Services/>
<Headline/>
<ServicesnextGen/>

<Chat/>


      </>
    </div>
  )
}

export default page
