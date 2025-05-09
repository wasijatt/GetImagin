import dynamic from "next/dynamic";
const HeroSection = dynamic(() => import('./Components/HeroSection'));
const Impact = dynamic(() => import('./Components/Impact'));
const OurWork = dynamic(() => import('./Components/OurWork'));
const OurResult = dynamic(() => import('./Components/OurResult'));
const Faqs = dynamic(() => import('./Components/Faqs'));
const ScrollSection = dynamic(() => import('./Components/ScrollSection'));
const LatestBlogs = dynamic(() => import('./Components/LatestBlogs'));
const Header = dynamic(() => import('./Components/Header'));
const Footer = dynamic(() => import('./Components/Footer'));
    

import { getSortedPostsData } from "./lib/api";


export default function Home() {
  const blogs = getSortedPostsData().slice(0, 3);
  return (<>
<Header/>
    <HeroSection fhead={"We Do What We're "} span={"Best"} head={" At—Creating "} chfont={"good"} Last={" Design."} HerosectionPara={"We are creative designing and development agency based in Pakistan that craft beautiful work for brands wo"} herop={" refuse to blend in."} HerosectionButton={"See Designs—Make an Impact"} />
    <ScrollSection />


    <Impact />
    <OurWork />
    <OurResult />
    <LatestBlogs blogs = {blogs}/>
     
    <Faqs />
    <Footer />

  </>
  );
}
