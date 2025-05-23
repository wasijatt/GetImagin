
import Link from "next/link";
import { MdArrowOutward } from "react-icons/md";

import Image from "next/image";



const Footer = () => {
  const socialMedia = [
    { icon: "Instagram", link: "https://www.instagram.com/getimagin/" },
    { icon: "Facebook", link: "https://web.facebook.com/profile.php?id=61565487723248" },
    { icon: "Linkedin ", link: "https://www.linkedin.com/company/get-imagin/" },

  ];

  return (
    <div className="lg:p-10 bg-black ">
      <div className="  md:flex w-full lg:w-[90%] justify-around ">
        <div className="  mt-2  p-3 font-neueMachina lg:text-lg">
          <Image className="w-[218px] lg:w-[250px]" quality={75}  loading="lazy" src="/Footer/GetImagin-footer-logo.svg" alt="Get-Imagin" width={250} height={250} />

          <div className=" flex  items-center  mt-5 text-[15px] md:text-lg  pl-4  md:pr-20">
            {socialMedia.map((item, index) => (
              <Link
                target="blank"
                href={item.link}
                key={index}
                className="mr-5 flex items-center"
              >
                {Object.values(item)[0]} <span className="ml-2 hover:mb-[2px]"><MdArrowOutward />
                </span>

              </Link>
            ))}
            
          </div>
          <div className="my-10 pl-4 md:pr-20 ">
            <Link className="pr-4 py-2 " href={"ContactUs"}  >Contact Us</Link>
            <Link className="px-4 py-2 " href={"/ContactUs"}  >FAQs</Link>
            <Link className="px-4 py-2 " href={"/PrivacyPolicy"}  >Privacy Policy</Link>
            </div>
            <div className="my-10 pl-4 md:pr-20 ">
            <h1 className="pr-4 py-2 md:inline-block font-bold md:font-semibold text-sm md:text-2xl block "   >Our Sector:</h1>
            <Link className="md:px-8 px-3 text-[10px] md:text-[20px] py-1 md:py-2 border-2 rounded-3xl border-[#333]" href={"/ContactUs"}  >Relegious and study</Link>
            <Link className="md:px-8 px-3 text-[10px] md:text-[20px] py-1 md:py-2 border-2 rounded-3xl ml-4 border-[#333]" href={"/ContactUs"}  >SaaS and Tech</Link>
            </div>
        </div>
<div className=" w-full md:w-1/4 flex flex-col justify-evenly items-center">
<Link className="px-8 py-2  border-2 rounded-3xl border-[#333]"  href={"/ContactUs"}>sign up to our newslatter</Link>
<h1 className="my-7 md:my-0">© GET IMAGIN 2024</h1>
</div>


      </div> 

    </div>
  );
};
export default Footer;
