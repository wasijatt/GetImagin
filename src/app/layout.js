
import "./globals.css";
import Script from "next/script";
import CustomCursor from "./Components/CustomCursor";
import WhatsappButtton from "./Components/whatsappButtton";
// import PageTransition from "./Components/PageTransition";
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


      <body>
 
     <WhatsappButtton/>
            <CustomCursor/>
            {children}
   
      </body>
    </html>
  )
}