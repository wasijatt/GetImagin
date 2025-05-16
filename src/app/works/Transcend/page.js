import BrandingPageComponent from "@/app/Components/BrandingPageComponent";

const page = () => {



  const branding = [
    {
      title: "Transcends",
      subtitle: "",
      description: "Transcend offers secure data centers with full data control and streamlined data management solutions. Their brand emphasizes trust, privacy, and efficiency, symbolized by their neon blue circle logo. The website design is clean, modern, and professional, reflecting their commitment to privacy and security. Using advanced tools like DatoCMS and GatsbyJS, Transcend ensures a seamless digital experience for users.",
      category: "Privacy Solution",
      images: [
        {
          src: "/OurWork/Transcane Branding/Tanscend Brandin-get imagin-Services 01.jpg",

        },
        {
          src: "/OurWork/Transcane Branding/Tanscend Brandin-get imagin-Services 02.jpg",

        },
        {
          src: "/OurWork/Transcane Branding/Tanscend Brandin-get imagin-Services 03.jpg",

        },  {
          src: "/OurWork/Transcane Branding/Tanscend Brandin-get imagin-Services 04.jpg",

        },  {
          src: "/OurWork/Transcane Branding/Tanscend Brandin-get imagin-Services 05.jpg",

        },  {
          src: "/OurWork/Transcane Branding/Tanscend Brandin-get imagin-Services 06.jpg",

        },  {
          src: "/OurWork/Transcane Branding/Tanscend Brandin-get imagin-Services 07.jpg",

        },  {
          src: "/OurWork/Transcane Branding/Tanscend Brandin-get imagin-Services 08.jpg",

        },  {
          src: "/OurWork/Transcane Branding/Tanscend Brandin-get imagin-Services 09.jpg",

        },  {
          src: "/OurWork/Transcane Branding/Tanscend Brandin-get imagin-Services 10.jpg",

        },  {
          src: "/OurWork/Transcane Branding/Tanscend Brandin-get imagin-Services 11.jpg",

        },  {
          src: "/OurWork/Transcane Branding/Tanscend Brandin-get imagin-Services 12.jpg",

        },  {
          src: "/OurWork/Transcane Branding/Tanscend Brandin-get imagin-Services 13.jpg",

        },  {
          src: "/OurWork/Transcane Branding/Tanscend Brandin-get imagin-Services 14.jpg",

        },  {
          src: "/OurWork/Transcane Branding/Tanscend Brandin-get imagin-Services 15.jpg",

        },  {
          src: "/OurWork/Transcane Branding/Tanscend Brandin-get imagin-Services 16.gif",

        },

      ],
    },
  ];
  return (
    <main >
      <BrandingPageComponent items={branding} />
    </main>
  )
}

export default page
