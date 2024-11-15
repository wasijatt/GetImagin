import MiniHeroSection from "../Components/MiniHeroSection"
import Space from "../Components/Space"
import Services from "../Components/Services"
import Headline from "../Components/Headline"
const page = () => {
  return (
    <div>
      <>
      <MiniHeroSection className="h-screen" head={" Our Get Imagin Work & Services That Will Send You to SPACE."} />
<Space/>
<Services/>
<Headline/>


      </>
    </div>
  )
}

export default page
