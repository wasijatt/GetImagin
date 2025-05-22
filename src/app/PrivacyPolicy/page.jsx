'use client';
import React from 'react';

const PrivacyPolicy = () => {
  return (
    <section className="px-6 md:px-16 py-12 max-w-5xl mx-auto text-[#b7b6b6]">
      <h1 className="text-4xl font-bold mb-6 privacypagetext">Privacy Policy</h1>
      <p className="mb-4 text-lg">
        Welcome to <strong>GetImagine</strong>. We value your privacy and are committed to protecting your personal data. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website or use our services.
      </p>

      {/* 1. Information We Collect */}
      <h2 className="text-2xl font-semibold mt-8 mb-2 privacypagetext">1. Information We Collect</h2>
      <p className="mb-4">
        We may collect personal information that you voluntarily provide to us when you:
      </p>
      <ul className="list-disc pl-6 mb-4">
        <li>Fill out our contact form</li>
        <li>Subscribe to our newsletter</li>
        <li>Request a quote or service</li>
        <li>Communicate with us via email or chat</li>
      </ul>
      <p className="mb-4">
        This may include your name, email address, phone number, company name, and project details.
      </p>

      {/* 2. How We Use Your Information */}
      <h2 className="text-2xl font-semibold mt-8 mb-2 privacypagetext">2. How We Use Your Information</h2>
      <p className="mb-4">
        Your data helps us:
      </p>
      <ul className="list-disc pl-6 mb-4">
        <li>Provide and manage our digital services</li>
        <li>Respond to your inquiries or service requests</li>
        <li>Improve our website and user experience</li>
        <li>Send project updates and relevant marketing emails (with your consent)</li>
      </ul>

      {/* 3. Sharing Your Information */}
      <h2 className="text-2xl font-semibold mt-8 mb-2 privacypagetext">3. Sharing Your Information</h2>
      <p className="mb-4">
        We do not sell or rent your personal information. We may share it with trusted partners and third-party tools we use strictly for operational purposes (e.g., email services, analytics, or payment providers), and always with confidentiality agreements.
      </p>

      {/* 4. Cookies and Tracking Technologies */}
      <h2 className="text-2xl font-semibold mt-8 mb-2 privacypagetext">4. Cookies and Tracking Technologies</h2>
      <p className="mb-4">
        We use cookies to enhance your browsing experience and analyze site traffic. You can choose to disable cookies through your browser settings.
      </p>

      {/* 5. Data Security */}
      <h2 className="text-2xl font-semibold mt-8 mb-2 privacypagetext">5. Data Security</h2>
      <p className="mb-4">
        We implement appropriate security measures to protect your information from unauthorized access, alteration, or disclosure.
      </p>

      {/* 6. Your Rights */}
      <h2 className="text-2xl font-semibold mt-8 mb-2 privacypagetext">6. Your Rights</h2>
      <p className="mb-4">
        You have the right to:
      </p>
      <ul className="list-disc pl-6 mb-4">
        <li>Access the personal data we hold about you</li>
        <li>Request corrections or deletion</li>
        <li>Withdraw consent at any time</li>
      </ul>

      {/* 7. Changes to This Policy */}
      <h2 className="text-2xl font-semibold mt-8 mb-2 privacypagetext">7. Changes to This Policy</h2>
      <p className="mb-4">
        We may update this Privacy Policy occasionally to reflect changes in our practices or for legal compliance. Updated versions will be posted on this page.
      </p>

      {/* 8. Contact Us */}
      <h2 className="text-2xl font-semibold mt-8 mb-2 privacypagetext">8. Contact Us</h2>
      <p className="mb-4">
        If you have any questions about our Privacy Policy or how your data is handled, feel free to contact us at:
      </p>
      <p className="mb-4">
        <strong>Email:</strong> contact@getimagin.com<br />
        <strong>Phone:</strong> +44 7506592977<br />
      </p>
    </section>
  );
};

export default PrivacyPolicy;
