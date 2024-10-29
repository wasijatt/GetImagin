import Link from "next/link"
import AnimatedLink from "./AnimatedLink"
AnimatedLink
const Login = () => {
    const UserInterest = [
        {
            buton: "A new Website",
            src: "#",
        }, {
            buton: "Branding",
            src: "#",
        }, {
            buton: "Motion Graphics",
            src: "#",
        }, {
            buton: "E-commerce",
            src: "#",
        }, {
            buton: "Development",
            src: "#",
        }, {
            buton: "On-going Support ",
            src: "#",
        }, {
            buton: "App from scratch",
            src: "#",
        },
    ]

    return (
        <div className="w-full p-[8%]">
            <h1 className="text-lg lg:text-4xl 2xl:text-[45px]">{` I am interested in :`}</h1>
            <div className="flex flex-wrap w-3/4 gap-4  mt-4">
                {UserInterest.map((item, index) => (
                    <Link
                        key={index}
                        href={item.src}
                        className="px-4 py-2 border-2 border-[#c4c4c4] hover:text-black duration-800 text-white rounded-3xl hover:bg-[#eef0f0] transition font-semibold"
                    >
                        {item.buton}
                    </Link>
                ))}
            </div>
<form className="font-neueMachina mt-[7%]"  action=""> 
    <input className="w-[20%]" type="text" placeholder="First Name*" name="firstName" required/>
    <input className="w-[20%]" type="text"  placeholder="Last Name*" name="lastName"  required/>
    <input className="w-[40%]" type="email"  placeholder="Email*" name="email"  required/>
    <label htmlFor=""><input className="w-[45%]" type="Number" name="Budget"  placeholder="Budget($)" required /></label>
    <input className="w-[40%] " type="file"  placeholder="Attachments" name="Attachments"  accept=".doc,.docx,.pdf,image/*" required/>
    <input className="w-[90%]" type="text" name="Message" placeholder="Message"  />
    <label className="block mt-5"  htmlFor=""><input className="accent-[#24CFA6] " type="radio" name="gmailNotification" id="gmailNotification" />I'm happy to receive a monthly newsletter from Get Imagin</label>
    <label htmlFor=""><input  className="accent-[#24CFA6]" type="radio" name="agree" id="agree" />I understand that Get Imagin will securely hold my data in accordance with their privacy policy.</label>
   <button className="border-2 borde-white px-3 -py-1  rounded-3xl ml-[5%]" type="submit"><AnimatedLink content={"Submit"} href={""} style={{borderColor:"transparent"}}/></button>
</form>
        </div>
    )
}

export default Login
