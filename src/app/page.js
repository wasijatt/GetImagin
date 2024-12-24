import HeroSection from "./Components/HeroSection";
import Impact from "./Components/Impact";
import OurWork from "./Components/OurWork";
import OurResult from "./Components/OurResult";
import Faqs from "./Components/Faqs";
import ScrollSection from "./Components/ScrollSection";
import LatestBlogs from "./Components/LatestBlogs";
import OurPartner from "./Components/OurPartner";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import { getSortedPostsData } from "./lib/api";


export default function Home() {
  const blogs = getSortedPostsData().slice(0, 3);
  return (<>
<Header/>
    <HeroSection fhead={"We Do What We're "} span={"Best"} head={" At—Creating "} chfont={"good"} Last={" Design."} HerosectionPara={"We are creative designing and development agency based in Pakistan that craft beautiful work for brands wo"} herop={" refuse to blend in."} HerosectionButton={"See Designs—Make an Impact"} />
    <ScrollSection />


    <Impact />/
    <OurWork />
    <OurResult />
    <LatestBlogs blogs = {blogs}/>
    <OurPartner />
    <Faqs />
    <Footer />

  </>
  );
}
