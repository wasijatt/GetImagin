
import "./globals.css";
import PageWrapper from "./context/PageWrapper";
import CustomCursor from "./Components/CustomCursor";
import WhatsappButtton from "./Components/WhatsappButtton";

// export const metadata = {
//   title: 'Get Imagin| Creative Design Agency',
//   description: 'Professional web design and development agency specializing in creative solutions, branding, and Web3 development.',
//   keywords: 'web design, creative agency, branding, Web3, development, Pakistan',
//   openGraph: {
//     title: 'Get Imagin| Creative Design Agency',
//     description: 'Professional web design and development agency specializing in creative solutions, branding, and Web3 development.',
//     images: ['/path-to-your-og-image.jpg'],
//     type: 'website',
//   },
//   robots: {
//     index: true,
//     follow: true,
//   }
// }

export default function RootLayout({ children }) {
  
  return (
   <html>


      <body>
 
     <WhatsappButtton/>
            <CustomCursor/>
        <PageWrapper> {children}</PageWrapper>   
   
      </body>
    </html>
  )
}