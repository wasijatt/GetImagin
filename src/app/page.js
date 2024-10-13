import HeroSection from "./Components/HeroSection";
import Impact from "./Components/Impact";
import OurWork from "./Components/OurWork";
import OurResult from "./Components/OurResult";
import Faqs from "./Components/Faqs";
import OurServices from "./Components/OursServices"
import OurPartner from "./Components/OurPartner";

export default function Home() {
  return (<>
    <HeroSection fhead={"We Do What We’re "} span={"Best"} head={" At—Creating good Designs."} HerosectionPara={"We are creative designing and development agency based in Pakistan that craft beautiful work for brands wo refuse to blend in."} HerosectionButton={"See Designs—Make an Impact"}/>
    {/* <OurServices /> */}
   
    <Impact/>
    <OurWork/>
    <OurResult/>
    <OurPartner/>
    <Faqs/>
  
  </>
  );
}
