import Image from "next/image"
import style from "../Styles/HeroSection.module.css"
const Header = () => {
  return (
    <div className="flex items-center justify-between px-20 pt-4 bg-black relative ">
        <Image className="absolute top-0 left-[20%] w-[400px] h-400px" alt="bg-shadow" width={400} height={400} src={"/HeaderLogo/bgshadow.png"}></Image>
      <div>
     <Image alt="Get Imagin" width={50} height={50} src={"/HeaderLogo/Getimagin.png"}></Image>
      </div>
      <div className="flex flex-col  justify-center rounded-full border-[3px] border-[#24CFA6] w-[50px] h-[50px]">
     <div className= {`${style.Logo} ml-3`}></div>
     <div className= {`${style.Logo} ml-2 mt-2 ` }></div>
    
      </div>
    </div>
  )
}

export default Header
