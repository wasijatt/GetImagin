import "./globals.css";
import ClientProviders from "./Components/ClientProviders";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://getimagin.com";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Get Imagin | Top-Tier Creative Design & Web3 Development Agency",
    template: "%s | Get Imagin",
  },
  description:
    "Get Imagin is a premier creative design, branding, and Web3 development agency crafting high-impact digital experiences, custom websites, and free online creative tools.",
  keywords: [
    "creative design agency",
    "web design agency",
    "web3 development",
    "branding agency",
    "UI/UX design",
    "Next.js web development",
    "digital agency Pakistan",
    "creative tools",
    "Get Imagin",
  ],
  authors: [{ name: "Get Imagin Team", url: siteUrl }],
  creator: "Get Imagin",
  publisher: "Get Imagin",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Get Imagin | Top-Tier Creative Design & Web3 Development Agency",
    description:
      "Get Imagin is a premier creative design, branding, and Web3 development agency crafting high-impact digital experiences and free creative tools.",
    url: siteUrl,
    siteName: "Get Imagin",
    images: [
      {
        url: "/HeaderLogo/Getimagin.png",
        width: 1200,
        height: 630,
        alt: "Get Imagin — Creative Design & Development Agency",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Get Imagin | Top-Tier Creative Design & Web3 Development Agency",
    description:
      "Get Imagin crafts high-impact digital experiences, branding, web development, and browser-based creative tools.",
    images: ["/HeaderLogo/Getimagin.png"],
    creator: "@getimagin",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/HeaderLogo/Getimagin.png",
  },
  verification: {
    google: "google3c7d626f3d882d0a",
  },
};

const jsonLdOrg = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: "Get Imagin",
      url: siteUrl,
      logo: {
        "@type": "ImageObject",
        "@id": `${siteUrl}/#logo`,
        url: `${siteUrl}/HeaderLogo/Getimagin.png`,
        caption: "Get Imagin Logo",
      },
      image: `${siteUrl}/HeaderLogo/Getimagin.png`,
      sameAs: [
        "https://www.instagram.com/getimagin/",
        "https://web.facebook.com/profile.php?id=61565487723248",
        "https://www.linkedin.com/company/get-imagin/",
      ],
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "customer support",
        email: "getimagin@gmail.com",
      },
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "Get Imagin",
      description: "Creative Design & Web3 Development Agency",
      publisher: {
        "@id": `${siteUrl}/#organization`,
      },
      inLanguage: "en-US",
    },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdOrg) }}
        />
      </head>
      <body>
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
