"use client"
import Link from "next/link"
import { useState } from "react"
import AnimatedLink from "./AnimatedLink"
AnimatedLink
const Login = () => {
    const [selectedItems, setSelectedItems] = useState([]);

    const toggleSelection = (index) => {
        setSelectedItems((prevSelected) =>
            prevSelected.includes(index)
                ? prevSelected.filter((i) => i !== index)
                : [...prevSelected, index]
        );
    };
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
                <label key={index} className="cursor-pointer">
                    <input
                        type="checkbox"
                        checked={selectedItems.includes(index)}
                        onChange={() => toggleSelection(index)}
                        className="hidden  "  // Hides the checkbox input from view
                    />
                    <span
                        className={`px-4  my-4 py-2 border-2 border-[#c4c4c4] duration-800 rounded-3xl transition font-semibold ${
                            selectedItems.includes(index)
                                ? 'bg-[#eef0f0] text-black'
                                : 'bg-transparent text-white'
                        }`}
                    >
                        {item.buton}
                    </span>
                </label>
            ))}
            </div>
<form className="font-neueMachina mt-[7%]"  action=""> 
    <input className="w-[20%]" type="text" placeholder="First Name*" name="firstName" required/>
    <input className="w-[20%]" type="text"  placeholder="Last Name*" name="lastName"  required/>
    <input className="w-[40%]" type="email"  placeholder="Email*" name="email"  required/>
    <label htmlFor=""><input className="w-[45%]" type="Number" name="Budget"  placeholder="Budget($)" required /></label>
    <input className="w-[40%] " type="file"  placeholder="Attachments" name="Attachments"  accept=".doc,.docx,.pdf,image/*" />
    <input className="w-[90%]" type="text" name="Message" placeholder="Message"  />
    <label className="block mt-5"  htmlFor=""><input className="accent-[#24CFA6] " type="checkbox" name="gmailNotification" id="gmailNotification" />I'm happy to receive a monthly newsletter from Get Imagin</label>
    <label htmlFor=""><input  className="accent-[#24CFA6] " type="checkbox" name="agree" id="agree" />I understand that Get Imagin will securely hold my data in accordance with their privacy policy.</label>
   <button className="border-2 borde-white px-3 -py-1  rounded-3xl ml-[5%]" type="submit"><AnimatedLink content={"Submit"} href={""} style={{borderColor:"transparent"}}/></button>
</form>
        </div>
    )
}

export default Login
