import React from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";

export const metadata = {
  title: "Privacy Policy — Get Imagin",
  description:
    "Privacy Policy for Get Imagin creative agency and online tools. Learn how we collect, handle, and safeguard your data.",
  alternates: {
    canonical: "/PrivacyPolicy",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <Header />
      <main className="px-6 md:px-16 py-12 max-w-5xl mx-auto text-[#b7b6b6] min-h-screen">
        <h1 className="text-4xl font-bold mb-6 text-white font-neueMachina">Privacy Policy</h1>
        <p className="mb-4 text-lg">
          Welcome to <strong className="text-white">Get Imagin</strong>. We value your privacy and are committed to protecting your personal data. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website, use our online creative tools, or work with our design & development agency.
        </p>

        {/* 1. In-Browser Tools & Zero Server Uploads */}
        <h2 className="text-2xl font-semibold mt-8 mb-2 text-white">1. In-Browser Creative Tools Privacy</h2>
        <p className="mb-4">
          All client-side creative tools hosted on Get Imagin (such as Image Compressors, Video Compressors, Format Converters, and SVG Vectorizers) process your files <strong>100% locally within your browser</strong> using WebAssembly and HTML5 APIs. Your uploaded images, videos, and files are <strong>never sent to or stored on our servers</strong>.
        </p>

        {/* 2. Information We Collect */}
        <h2 className="text-2xl font-semibold mt-8 mb-2 text-white">2. Information We Collect</h2>
        <p className="mb-4">
          We may collect personal information that you voluntarily provide to us when you:
        </p>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li>Fill out our contact form or project inquiry</li>
          <li>Request a custom design or development quote</li>
          <li>Communicate with us via email, WhatsApp, or chat</li>
        </ul>
        <p className="mb-4">
          This may include your name, email address, phone number, company name, and project requirements.
        </p>

        {/* 3. How We Use Your Information */}
        <h2 className="text-2xl font-semibold mt-8 mb-2 text-white">3. How We Use Your Information</h2>
        <p className="mb-4">
          Your data helps us:
        </p>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li>Provide, deliver, and manage our creative design and development services</li>
          <li>Respond directly to your inquiries and support requests</li>
          <li>Improve our website performance and user experience</li>
        </ul>

        {/* 4. Data Sharing & Security */}
        <h2 className="text-2xl font-semibold mt-8 mb-2 text-white">4. Data Sharing & Security</h2>
        <p className="mb-4">
          We do not sell, rent, or trade your personal information. We implement strict digital security measures to safeguard all communication and submitted project details.
        </p>

        {/* 5. Contact Us */}
        <h2 className="text-2xl font-semibold mt-8 mb-2 text-white">5. Contact Us</h2>
        <p className="mb-4">
          If you have any questions regarding this Privacy Policy, please contact us at{" "}
          <a href="mailto:getimagin@gmail.com" className="text-[#24CFA6] underline">
            getimagin@gmail.com
          </a>.
        </p>
      </main>
      <Footer />
    </>
  );
}
