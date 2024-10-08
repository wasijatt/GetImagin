
import "./globals.css";
import Header from "./Components/Header";
import Footer from "./Components/Footer";


export const metadata = {
  title: "Get Imagin",
  description: "Design And Develop Your Future ",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header/>
        {children}
        <Footer/>

      </body>
    </html>
  );
}
