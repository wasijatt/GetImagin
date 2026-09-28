import dynamic from "next/dynamic";
import Header from "./Components/Header";
import HeroSection from "./Components/HeroSection";
import ScrollSection from "./Components/ScrollSection";
import { getSortedPostsData } from "./lib/api";

const Impact = dynamic(() => import("./Components/Impact"));
const OurWork = dynamic(() => import("./Components/OurWork"));
const OurResult = dynamic(() => import("./Components/OurResult"));
const Faqs = dynamic(() => import("./Components/Faqs"));
const LatestBlogs = dynamic(() => import("./Components/LatestBlogs"));
const Footer = dynamic(() => import("./Components/Footer"));

export const metadata = {
  title: "Get Imagin | Creative Design, Branding & Web3 Development Agency",
  description:
    "We are a top creative design & development agency crafting bespoke branding, high-converting websites, Web3 experiences, and powerful free digital tools for ambitious brands.",
  keywords: [
    "creative design agency",
    "custom web development",
    "branding agency",
    "web3 agency",
    "UI UX design agency",
    "Next.js agency",
    "Get Imagin",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Get Imagin | Creative Design, Branding & Web3 Development Agency",
    description:
      "Crafting bespoke branding, high-converting web experiences, and digital tools for forward-thinking brands.",
    url: "https://getimagin.com/",
    siteName: "Get Imagin",
    type: "website",
    images: [
      {
        url: "/HeaderLogo/Getimagin.png",
        width: 1200,
        height: 630,
        alt: "Get Imagin Creative Agency",
      },
    ],
  },
};

const homeFaqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What services does Get Imagin provide?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Get Imagin specializes in Creative Branding, Custom Web Design, Web3 & SaaS Development, UI/UX Design, and High-Performance Digital Tooling.",
      },
    },
    {
      "@type": "Question",
      name: "How can I start a project with Get Imagin?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "You can reach out directly via our Contact Us page, email us at getimagin@gmail.com, or message us directly via WhatsApp to discuss your project scope and timelines.",
      },
    },
    {
      "@type": "Question",
      name: "Do you offer browser-based creative tools?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, Get Imagin offers a suite of 100% free, private in-browser creative tools including Image Compressors, SVG Vectorizers, Format Converters, and Video Compressors.",
      },
    },
  ],
};

export default function Home() {
  const blogs = getSortedPostsData().slice(0, 3);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeFaqJsonLd) }}
      />
      <main>
        <Header />
        <HeroSection
          fhead={"We Do What We're "}
          span={"Best"}
          head={" At—Creating "}
          chfont={"good"}
          Last={" Design."}
          HerosectionPara={
            "We are creative designing and development agency based in Pakistan that craft beautiful work for brands who"
          }
          herop={" refuse to blend in."}
          HerosectionButton={"See Designs—Make an Impact"}
        />
        <ScrollSection />
        <Impact />
        <OurWork />
        <OurResult />
        <LatestBlogs blogs={blogs} />
        <Faqs />
        <Footer />
      </main>
    </>
  );
}
