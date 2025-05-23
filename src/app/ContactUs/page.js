import Link from "next/link"
import Header from "../Components/Header"
import SecondHero from "../Components/SecondHero"
import ContactForm from "../Components/ContactForm"
import Footer from "../Components/Footer"
// import ChatWidget from "../Components/ChatWidget"
import styles from "@/app/Styles/chat.module.css"
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
    <>
    
    <main>
      <Header/>
      <SecondHero sfhead={"Get thing happen when you say hey."} />
      <ContactForm />
      {/* <div className={styles.container}>
      <h1>Agency AI Assistant</h1> */}
      {/* <ChatWidget /> */}   
       {/* </div> */}
<div className="flex flex-col md:flex-row justify-around opacity-60 space-y-8 md:space-y-0 md:space-x-8 p-4 md:p-8">
  <div className="bg-[#e7e7e7] 2xl:w-[35%] md:w-[40%] rounded-tr-[150px] text-black p-6 md:p-10">
    <div className="flex flex-col md:flex-row md:justify-between space-y-6 md:space-y-0 mb-6">
      <div className="w-full md:w-[45%] ">
        <h2 className="text-lg font-bold md:text-2xl">Mutan</h2>
        <Link href={"https://getimagin.com"} className="cursor-pointer text-sm md:text-base">Getimagin</Link>
        <p className="cursor-pointer text-sm md:text-base">Gulgasht Kalooni Multan</p>
      </div>
      <div className="w-full md:w-[45%]">
        <h2 className="text-lg font-bold md:text-2xl">M.Garh</h2>
        <Link href={"https://getimagin.com"} className="cursor-pointer text-sm md:text-base">Getimagin</Link>
        <p className="cursor-pointer text-sm md:text-base">Railway Road M.Garh</p>
      </div>
    </div>
    <Link href={"tell:+923401438235"} className="text-base md:text-2xl font-semibold fontneue block mb-2">+923401438235</Link>
    <Link href={"tell:+4407506592977"} className="text-base md:text-2xl font-semibold fontneue block mb-6">+4407506592977</Link>
    <p className="text-sm md:text-base">{`Have a quick question you need answering? Check out - FAQ's : Working with Get Imagin`}</p>
  </div>
  <div className="md:w-[40%] text-white">
    {mailsarray.map((item, index) => (
      <div key={index} className="mb-4">
        <p className="text-sm md:text-base">{item.text}</p>
        <h1 className="text-lg md:text-2xl">{item.mail}</h1>
      </div>
    ))}
    <div className="flex flex-col md:flex-row md:items-center mt-8 text-lg md:text-xl space-y-4 md:space-y-0 md:space-x-6">
      <h2 className="md:text-2xl">Follow us</h2>
      <Link href="https://www.instagram.com/getimagin/" className="text-sm md:text-base">Instagram</Link>
      <Link href="https://web.facebook.com/profile.php?id=61565487723248" className="text-sm md:text-base">Facebook</Link>
      <Link href="https://www.linkedin.com/company/get-imagin/" className="text-sm md:text-base">LinkedIn</Link>
    </div>
  </div>
</div>



    </main >
    <Footer/>
   </>
  )
}

export default page
