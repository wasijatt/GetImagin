// import localFont from "next/font/local";
import "./globals.css";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });
// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });

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
