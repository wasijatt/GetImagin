
import "./globals.css";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import CustomCursor from "./Components/CursorCustom";


export const metadata = {
  title: "Get Imagin - Design your Future",
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
