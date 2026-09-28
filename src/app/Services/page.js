import MiniHeroSection from "../Components/MiniHeroSection";
import Space from "../Components/Space";
import Services from "../Components/Services";
import Headline from "../Components/Headline";
import Footer from "../Components/Footer";
import ServicesnextGen from "../Components/ServicesnextGen";
import Header from "../Components/Header";

export const metadata = {
  title: "Bespoke Creative Services — Branding, UI/UX, Web & Web3 Development | Get Imagin",
  description:
    "Explore our creative design services: Brand Identity, Custom UI/UX, High-Conversion Next.js Web Development, and Web3 Experiences tailored for modern businesses.",
  alternates: {
    canonical: "/Services",
  },
  openGraph: {
    title: "Bespoke Creative Services — Branding, UI/UX & Web Development | Get Imagin",
    description:
      "Full-spectrum creative design, UI/UX, branding, and custom web development services designed to help brands stand out.",
    url: "https://getimagin.com/Services",
    siteName: "Get Imagin Services",
    type: "website",
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Creative Design & Web Development",
  provider: {
    "@type": "Organization",
    name: "Get Imagin",
    url: "https://getimagin.com",
  },
  areaServed: "Worldwide",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Digital Creative Services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Brand Identity & Strategy",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "UI/UX Design & Prototyping",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Custom Web & Web3 Development",
        },
      },
    ],
  },
};

const Page = () => {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <main className="bg-white">
        <Header />
        <MiniHeroSection
          className="max-h-min md:h-screen"
          fhead={"Our"}
          span={" Get Imagin"}
          head={" & Services That Will Send You to SPACE."}
        />
        <Space />
        <Services />
        <Headline />
        <ServicesnextGen />
        <Footer />
      </main>
    </>
  );
};

export default Page;
