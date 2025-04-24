
import "./globals.css";
import Script from "next/script";
import CustomCursor from "./Components/CustomCursor";
import Head from "next/head";
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
   <html>
      <head>
        <title>Get Imagin - Professional Web Design</title>
        <meta name="description" content="Professional web design and development agency specializing in creative solutions." />
        <link rel="icon" href="/favicon.ico" />
        {/* <!-- Google tag (gtag.js) --> */}
<Script async src="https://www.googletagmanager.com/gtag/js?id=G-WHQWT01LQR"/>
<Script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments)}
  gtag('js', new Date());

  gtag('config', 'G-WHQWT01LQR');
</Script>
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