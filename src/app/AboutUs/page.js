import SecondHero from "../Components/SecondHero";
import Aboutus from "../Components/Aboutus";
import Header from "../Components/Header";
import Footer from "../Components/Footer";

export const metadata = {
  title: "About Us — Top-Tier Creative Designers & Developers | Get Imagin",
  description:
    "Learn about Get Imagin, an award-winning creative design and development agency crafting remarkable brands, custom websites, and digital products.",
  alternates: {
    canonical: "/AboutUs",
  },
  openGraph: {
    title: "About Us — Top-Tier Creative Designers & Developers | Get Imagin",
    description:
      "Meet the team behind Get Imagin: specialized in branding, creative technology, UI/UX, and Web3 development.",
    url: "https://getimagin.com/AboutUs",
    siteName: "Get Imagin",
    type: "website",
  },
};

const Page = () => {
  return (
    <main>
      <Header />
      <SecondHero sfhead={"Top-Tier Creative Designer & Developers."} />
      <Aboutus />
      <Footer />
    </main>
  );
};

export default Page;
