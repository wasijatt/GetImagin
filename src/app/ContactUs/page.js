import Link from "next/link"
import HeroSection from "../Components/HeroSection"
import Login from "../Components/Login"
const page = () => {
  return (
    <div>
      <HeroSection head={"Get thing happen when you say hey."}/>
      <Login/>
      <div className="flex justify-between items-center w-[90%] px-[10%]" >
        <div className="bg-[#e7e7e7] rounded-tr-[150px] "> 
            <div className=" flex p-[5%]">
                <div className="">
                    <h1>Mutan</h1>
                    <Link href={"getimagin.com"}>Getimagin</Link>
                    <p> Gulgasht Kalooni Multan</p>
                </div>
                <div className="">
                    <h1>M.Garh</h1>
                    <Link href={"getimagin.com"}>Getimagin</Link>
                    <p> Railway Road M.Garh</p>

                </div>
               <Link href={""}>+923401438235</Link>
               <Link href={""}>+923005452425</Link>
               <p>{`Have a quick question you need answering?
               Check out - FAQ's : Working with Get Imagin`}</p>
            </div>
        </div>
      </div>
    </div>
  )
}

export default page
