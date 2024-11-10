import Link from "next/link"
import HeroSection from "../Components/HeroSection"
import Login from "../Components/Login"
const page = () => {

  const mailsarray = [
    {


      text: "General",
      mail: "getimagin@gmail.com"
    }, {


      text: "New business",
      mail: "quranspirits@gmail.com"
    }, {


      text: "Work with us",
      mail: "Imaginthreads@gmail.com"
    }
  ]
  return (
    <div>
      <HeroSection head={"Get thing happen when you say hey."} />
      <Login />
      <div className="flex justify-around  opacity-60">

        <div className="bg-[#e7e7e7] [40%] rounded-tr-[150px] text-black p-[5%]">
          <div className=" flex  ">
            <div className="w-[45%] mb-8">
              <h2 className="text-xl font-bold md:text-3xl">Mutan</h2>
              <Link className="cursor-pointer text-sm md:text-xl" href={"getimagin.com"}>Getimagin</Link>
              <p className="cursor-pointer text-sm md:text-xl"> Gulgasht Kalooni Multan</p>
            </div>
            <div className="">
              <h2 className="text-xl font-bold md:text-3xl">M.Garh</h2>
              <Link className="cursor-pointer text-sm md:text-xl" href={"getimagin.com"}>Getimagin</Link>
              <p className="cursor-pointer text-sm md:text-xl"> Railway Road M.Garh</p>

            </div>

          </div>
          <Link href={""} className=" text-xl md:text-3xl font-semibold font-neueMachina block">+923401438235</Link>
          <Link href={""} className=" mb-8 text-xl md:text-3xl font-semibold font-neueMachina block">+923005452425</Link>
          <p>{`Have a quick question you need answering?
               Check out - FAQ's : Working with Get Imagin`}</p>
        </div>
        <div className="[40%] text-[#ffffff]  ">
          {mailsarray.map((item, index) =>
            <div key={index} >
              <p className="text-sm md:text-[16px]"> {item.text}</p>
              <h1 className="text-xl md:text-3xl">{item.mail}</h1>
            </div>
          )}
        </div>
      </div>



    </div >
  )
}

export default page
