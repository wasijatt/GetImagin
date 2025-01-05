import BrandingPageComponent from "@/app/Components/BrandingPageComponent";

const page = () => {



  const branding = [
    {
      title: "Cynatic",
      subtitle: "Solution",
      description: "Cynetic Solutions is a digital tech company specializing in eCommerce solutions, business automation, and advanced tools to help businesses grow and succeed. Their services simplify operations, boost efficiency, and create innovative digital experiences. By combining creativity and technology, Cynetic Solutions empowers businesses to thrive in today’s fast-paced digital world.",
      category: "ECOMMERCE",
      images: [
        {
          src: "/OurWork/Cynetis Branding/Cynetis Brandin-get imagin-Services 01.jpg",
          // width: 1900,
          // height: 1900,
          // imgClasses: "w-full h-[100vh] bg-green-400",
          // containerClasses: "w-full",
        },
        {
          src: "/OurWork/Cynetis Branding/Cynetis Brandin-get imagin-Services02.jpg",
          // width: 1600,
          // height: 1900,
          // imgClasses: "w-full h-full bg-green-400",
          // containerClasses: "w-3/4",
        },
       
        {
          src: "/OurWork/Cynetis Branding/Cynetis Brandin-get imagin-Services09.jpg",
        },
        {
          src: "/OurWork/Cynetis Branding/Cynetis Brandin-get imagin-Services10.jpg",
        },
        {
          src: "/OurWork/Cynetis Branding/Cynetis Brandin-get imagin-Services11.jpg",
        },
        {
          src: "/OurWork/Cynetis Branding/Cynetis Brandin-get imagin-Services12.jpg",
        },
        {
          src: "/OurWork/Cynetis Branding/Cynetis Brandin-get imagin-Services13.jpg",
        },
        {
          src: "/OurWork/Cynetis Branding/Cynetis Brandin-get imagin-Services14.jpg",
        },
        {
          src: "/OurWork/Cynetis Branding/Cynetis Brandin-get imagin-Services15.jpg",
        },
        {
          src: "/OurWork/Cynetis Branding/Cynetis Brandin-get imagin-Services16.jpg",
        },
        {
          src: "/OurWork/Cynetis Branding/Cynetis Brandin-get imagin-Services17.jpg",
        },
        {
          src: "/OurWork/Cynetis Branding/Cynetis Brandin-get imagin-Services18.jpg",
        },
        {
          src: "/OurWork/Cynetis Branding/Cynetis Brandin-get imagin-Services19.jpg",
        },
        {
          src: "/OurWork/Cynetis Branding/Cynetis Brandin-get imagin-Services20.jpg",
        },
        {
          src: "/OurWork/Cynetis Branding/Cynetis Brandin-get imagin-Services21.jpg",
        },
        {
          src: "/OurWork/Cynetis Branding/Cynetis Brandin-get imagin-Services03.jpg",
        },
        {
          src: "/OurWork/Cynetis Branding/Cynetis Brandin-get imagin-Services04.jpg",
        },
        {
          src: "/OurWork/Cynetis Branding/Cynetis Brandin-get imagin-Services05.jpg",
        },
        {
          src: "/OurWork/Cynetis Branding/Cynetis Brandin-get imagin-Services06.jpg",
        },
        {
          src: "/OurWork/Cynetis Branding/Cynetis Brandin-get imagin-Services07.jpg",
        },
        {
          src: "/OurWork/Cynetis Branding/Cynetis Brandin-get imagin-Services08.jpg",
        },
      ],
    },
  ];
  return (
    <div >
      <BrandingPageComponent items={branding}  />
    </div>
  )
}

export default page
