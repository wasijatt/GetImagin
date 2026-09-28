import Header from "../Components/Header";
import Footer from "../Components/Footer";
import WorksClient from "../Components/WorksClient";

export const metadata = {
  title: "Our Work — Brand Design & Web Development Case Studies | Get Imagin",
  description:
    "Explore featured case studies and portfolio projects by Get Imagin, including Cynetic, Likhon.Net, Pokruszone, Transcend, Mr Franky, and Pasco Pastry.",
  alternates: {
    canonical: "/works",
  },
  openGraph: {
    title: "Our Work — Brand Design & Web Development Case Studies | Get Imagin",
    description:
      "Explore award-winning portfolio projects, brand identities, and Web3 designs created by Get Imagin.",
    url: "https://getimagin.com/works",
    siteName: "Get Imagin",
    type: "website",
  },
};

export default function WorksPage() {
  return (
    <main className="min-h-screen flex flex-col justify-between">
      <Header />
      <div className="py-8 text-center">
        <h1 className="text-3xl md:text-5xl font-bold font-neueMachina mb-2">Selected Works</h1>
        <p className="text-gray-400">Scroll to explore our featured digital experiences & brand identities</p>
      </div>
      <WorksClient />
      <Footer />
    </main>
  );
}
