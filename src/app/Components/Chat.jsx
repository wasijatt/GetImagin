import { IoChatbubbleEllipses } from "react-icons/io5";
import Link from "next/link";
const chat = () => {
  return (
    <div className="flex flex-col items-center justify-center py-[8%] ">
        <h1 className="text-sm">(Say Hi, or Start a New Project!)</h1>
        <Link href={"#"}>
    <h1 className="w-[300px] text-center my-[2%]">
      <IoChatbubbleEllipses className="inline text-5xl mx-1"  /> <span className="text-4xl  ">Let’s Have a Chat</span>

    </h1>
    </Link>
    </div>
  )
}

export default chat
