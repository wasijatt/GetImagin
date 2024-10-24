
import "./globals.css";
import Header from "./Components/Header";
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

        <Header/>
        <CustomCursor />
        {children}
        <Footer/>

      </body>
    </html>
  );
}
