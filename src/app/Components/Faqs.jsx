"use client";
import { useEffect, useState } from "react";
import { FaPlus,FaMinus } from "react-icons/fa";
import Image from "next/image";
import { useRef } from "react";
const Faqs = () => {
  const [faqs, setFaqs] = useState([
    {
      question: "What are the advantages of choosing Get Imagin's services over hiring a full-time designer?",
      answer: "Choosing Get Imagin's services offers you flexibility and cost-effectiveness. With our services, you get access to a team of skilled designers without the overhead costs associated with hiring a full-time designer. Additionally, you benefit from diverse perspectives and expertise from our team, ensuring high-quality designs tailored to your needs.",
    },
    {
      question: "What is the limit on the number of services requests I can make with Get Imagin?",
      answer: "At Get Imagin, we offer flexible services packages tailored to your needs. There's no strict limit on the number of services requests you can make. We work with you to accommodate your services needs within your chosen package, ensuring you receive the designs you need to succeed.",
    },
    {
      question: "What is the turnaround time for receiving designs from Get Imagin?",
      answer: "We understand the importance of timely delivery. At Get Imagin, our turnaround time varies based on the complexity of your project and your chosen package. However, we strive to deliver your designs promptly, ensuring you receive them in a timely manner to meet your deadlines.",
    },
    {
      question: "Who are the talented designers behind Get Imagin's services?",
      answer: "At Get Imagin, we have a team of experienced and creative designers who are passionate about bringing your vision to life. Our designers are carefully selected for their expertise, creativity, and dedication to delivering exceptional designs that resonate with your audience.",
    },
    {
      question: "Can you explain how the pause feature works with Get Imagin's services?",
      answer: "The pause feature offers flexibility and control over your services requests. With this feature, you can temporarily pause your subscription while retaining your unused services requests. This allows you to manage your services projects according to your schedule and priorities, ensuring you get the most out of our services.",
    },
    {
      question: "In which services programs does Get Imagin specialize?",
      answer: "At Get Imagin, our designers are proficient in a wide range of industry-standard services and animation software, including Adobe Photoshop, Illustrator, Premiere Pro, Blender, and After Effects, among others. We leverage the latest tools and technologies to ensure your designs are created with precision and creativity. Also, our expertise is in UI/UX services and making websites through CMS platforms and code.",
    },
    {
      question: "What is the process for requesting designs with Get Imagin?",
      answer: "Requesting designs with Get Imagin is simple and hassle-free. You can submit your services requests through our website, (LINK) where you'll provide details about your project, such as your preferences, specifications, and any reference materials. Our team will then review your request and begin working on your designs promptly. Also, you can contact us directly. We respond very fast.",
    },
    {
      question: "Are there any specific types of services work that Get Imagin does not cover?",
      answer: "At Get Imagin, we offer a comprehensive range of services to meet your needs. While we specialize in graphic design, motion design, and more, there may be certain niche or highly specialized services work that we may not cover. However, we're always open to discussing your specific requirements and exploring how we can assist you.",
    },
    {
      question: "Can I use Get Imagin's services for a single services request?",
      answer: "Absolutely! At Get Imagin, we cater to clients with varying services needs, whether it's a single request or ongoing services projects. Our flexible packages allow you to utilize our services based on your specific requirements, ensuring you receive high-quality designs tailored to your needs, no matter the scope.",
    },
    {
      question: "What is the refund policy if I'm not satisfied with Get Imagin's services?",
      answer: "At Get Imagin, we strive for 100% client satisfaction. If for any reason you're not satisfied with our services, we encourage you to reach out to our customer support team to discuss your concerns. While we don't offer refunds as per our policy, we're committed to addressing any issues and ensuring you're delighted with the final outcome of your services projects.",
    },
  ]);

  const FaqItem = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => {
      setIsOpen(!isOpen);
    };

    return (
      <div className="mb-4 ">
        <div
          className="flex items-center justify-between relative cursor-pointer"
          onClick={toggle}
        >
          <h3 className=" pl-12 md:pl-20 text-white text-base md:text-lg lg:text-xl mxl:text-2xl py-4 w-full ">
            {question}
          </h3>
          {isOpen ? (
            <FaMinus className="absolute left-2 md:left-4 text-gray-400 w-5 h-5" />
          ) : (
            <FaPlus className="absolute left-2 md:left-4 text-gray-400 w-5 h-5" />
          )}
        </div>
        <div
          className={` transition-all duration-[1.2s]  ease-out ${
            isOpen ? "opacity-100 max-h-full transition-all duration-1000 ease-out" : "opacity-0 max-h-0  overflow-hidden"
          }`}
        >
          {isOpen && (
            <p className="text-gray-400 text-sm md:text-base lg:text-lg mxl:text-xl py-2 px-4 md:px-6 transition-all  duration-1000 ease-out">
              {answer}
            </p>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="relative">
        <div className="radialsshadow  overflow-hidden"></div>

      <div className="w-full lg:w-[80%] mx-auto px-4 md:px-6 lg:px-8 py-8 lg:py-16">
        <h1 className="text-white text-center text-2xl md:text-3xl lg:text-6xl font-semibold mb-8">
        Curious? Let us clear <br /> <span className="fontspring relative">
           
           <Image
           className="absolute w-20 h-20 right-0"
           src={"/HeaderLogo/svg latest articles.svg"} 
           width={100}
           height={100}
           alt="up svg "
           quality={75}

          />
           its up</span>!
        </h1>
        {faqs.map((faq, index) => (
          <FaqItem key={index} question={faq.question} answer={faq.answer} />
        ))}
      </div>
    </div>
  );
};

export default Faqs;
