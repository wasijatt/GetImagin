import Link from "next/link";
import Header from "../Components/Header";
import SecondHero from "../Components/SecondHero";
import ContactForm from "../Components/ContactForm";
import Footer from "../Components/Footer";

export const metadata = {
  title: "Contact Us — Let's Build Something Exceptional | Get Imagin",
  description:
    "Ready to scale your brand? Contact Get Imagin today for bespoke web design, Web3 development, branding, or digital product consulting.",
  alternates: {
    canonical: "/ContactUs",
  },
  openGraph: {
    title: "Contact Us — Let's Build Something Exceptional | Get Imagin",
    description:
      "Get in touch with the Get Imagin team for project inquiries, partnerships, and custom design & development solutions.",
    url: "https://getimagin.com/ContactUs",
    siteName: "Get Imagin",
    type: "website",
  },
};

const contactSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  mainEntity: {
    "@type": "Organization",
    name: "Get Imagin",
    url: "https://getimagin.com",
    email: "getimagin@gmail.com",
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer service",
        email: "getimagin@gmail.com",
      },
      {
        "@type": "ContactPoint",
        contactType: "new business",
        email: "quranspirits@gmail.com",
      },
    ],
  },
};

const Page = () => {
  const mailsarray = [
    {
      text: "General",
      mail: "getimagin@gmail.com",
    },
    {
      text: "New business",
      mail: "quranspirits@gmail.com",
    },
    {
      text: "Work with us",
      mail: "Imaginthreads@gmail.com",
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }}
      />
      <main>
        <Header />
        <SecondHero sfhead={"Great things happen when you say hey."} />
        <ContactForm />
        <div className="flex flex-col md:flex-row justify-around opacity-60 space-y-8 md:space-y-0 md:space-x-8 p-4 md:p-8">
          <div className="bg-[#e7e7e7] 2xl:w-[35%] md:w-[40%] rounded-tr-[150px] text-black p-6 md:p-10">
            <h2 className="text-xl md:text-3xl font-bold font-neueMachina text-[#1F1F1F]">
              Have a Project in Mind?
            </h2>
            <div className="w-[100%] my-3 md:my-6 h-[2px] bg-[#1f1f1f21]" />
            <div>
              {mailsarray.map((item, index) => (
                <div
                  key={index}
                  className="flex font-neueMachina justify-between items-center my-4"
                >
                  <span className="text-sm md:text-lg text-[#1F1F1F]">{item.text}</span>
                  <Link
                    className="underline text-sm md:text-lg text-[#1F1F1F]"
                    href={`mailto:${item.mail}`}
                  >
                    {item.mail}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
        <Footer />
      </main>
    </>
  );
};

export default Page;
