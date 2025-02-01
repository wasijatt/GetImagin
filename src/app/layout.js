
import "./globals.css";

import CustomCursor from "./Components/CustomCursor";

// import SmoothScroll from "./Components/SmoothScroll";
export const metadata = {
  title: 'Get Imagin| Creative Design Agency',
  description: 'Professional web design and development agency specializing in creative solutions, branding, and Web3 development.',
  keywords: 'web design, creative agency, branding, Web3, development, Pakistan',
  openGraph: {
    title: 'Get Imagin| Creative Design Agency',
    description: 'Professional web design and development agency specializing in creative solutions, branding, and Web3 development.',
    images: ['/path-to-your-og-image.jpg'],
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  }
}

export default function RootLayout({ children }) {
  
  return (
    <html lang="en">
      <head>
        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','G-Z2Y2RNNK3J');`
          }}
        />
        
        {/* Schema.org JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Get Imagin",
              "url": "https://getimagin.com",
              "logo": "https://getimagin.com/logo.png",
              "description": "Professional web design and development agency specializing in creative solutions.",
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "Pakistan"
              },
              "sameAs": [
                "https://facebook.com/getimagin",
                "https://twitter.com/getimagin",
                "https://linkedin.com/getimagin"
              ]
            })
          }}
        />
      </head>
      <body>
     {/* <SmoothScroll> */}
            <CustomCursor/>
            {children}
          
            {/* </SmoothScroll> */}
      </body>
    </html>
  )
}