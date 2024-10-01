
import Link from "next/link";
import { MdArrowOutward } from "react-icons/md";

import Image from "next/image";
import { lazy } from "react";


const Footer = () => {
  const socialMedia = [
    { icon: "Instagram", link: "https://www.instagram.com/getimagin/" },
    { icon: "Facebook", link: "https://web.facebook.com/profile.php?id=61565487723248" },
    { icon: "FaLinkedin ", link: "https://www.linkedin.com/company/imagin-maker/" },

  ];

  return (
    <div className="lg:p-10 ">
      <div className="  flex w-full lg:w-[90%] justify-around ">
        <div className="  mt-2  p-3 font-neueMachina lg:text-lg">
          <Image className="lg:w-[250px]" quality={75} loading={"lazy"} src="/Footer/GetImagin-footer-logo.svg" alt="Get-Imagin" width={100} height={100} />

          <div className=" flex  items-center  lg:mt-5 text-lg   pl-20">
            {socialMedia.map((item, index) => (
              <Link
                target="blank"
                href={item.link}
                key={index}
                className="mr-5 flex items-center"
              >
                {Object.values(item)[0]} <span className="ml-2"><MdArrowOutward />
                </span>

              </Link>
            ))}
            
          </div>
          <div className="my-10 pl-20 ">
            <Link className="pr-4 py-2 " href={"#"}  >Contact Us</Link>
            <Link className="px-4 py-2 " href={"#"}  >FAQs</Link>
            <Link className="px-4 py-2 " href={"#"}  >Privacy Policy</Link>
            </div>
            <div className="my-10 pl-20 ">
            <h1 className="pr-4 py-2 inline-block font-bold text-2xl " href={"#"}  >Our Sector:</h1>
            <Link className="px-8 py-2 border-2 rounded-3xl border-[#333]" href={"#"}  >Relegious and study</Link>
            <Link className="px-8 py-2 border-2 rounded-3xl ml-4 border-[#333]" href={"#"}  >SaaS and Tech</Link>
            </div>
        </div>
<div className="w-1/4 flex flex-col justify-evenly items-center">
<Link className="px-8 py-2 border-2 rounded-3xl border-[#333]"  href={"#"}>sign up to our newslatter</Link>
<h1>© GET IMAGIN 2024</h1>
</div>


      </div>

    </div>
  );
};
export default Footer;
