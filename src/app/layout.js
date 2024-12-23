// import { SmoothScrollProvider } from '@/context/SmoothScrollContext';
// import { SmoothScroll } from './Components/SmoothScroll';
import "./globals.css";

import Footer from "./Components/Footer";
import CustomCursor from "./Components/CustomCursor";


export const metadata = {
  title: "Get Imagin - Develop your Future",
  description: "Design And Develop Your Future ",
  
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {/* <SmoothScrollProvider> */}
          {/* <SmoothScroll> */}
            
            <CustomCursor />
            {children}
            {/* <Footer/> */}
          {/* </SmoothScroll> */}
        {/* </SmoothScrollProvider> */}
      </body>
    </html>
  );
}