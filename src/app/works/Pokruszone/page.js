import BrandingPageComponent from "@/app/Components/BrandingPageComponent";

const page = () => {



  const branding = [
    {
      title: "Pokuzone",
      subtitle: " .",
      description: "Pokruszone is a renowned Polish bakery specializing in custom cakes for weddings, birthdays, and special occasions. Known for its delicious crumbly cakes, the bakery combines quality, craftsmanship, and mouthwatering treats to make every celebration special.",
      category: "Be Spoke cake design",
      images: [
        {
        src: "/OurWork/POKRUSZONE Branding/Pokru Szone Brandin-get imagin-Services 09.jpg",
       
      },{
        src: "/OurWork/POKRUSZONE Branding/Pokru Szone Brandin-get imagin-Services 17.jpg",
       
      },{
        src: "/OurWork/POKRUSZONE Branding/Pokru Szone Brandin-get imagin-Services 19.jpg",
       
      },{
        src: "/OurWork/POKRUSZONE Branding/Pokru Szone Brandin-get imagin-Services 20.jpg",
       
      },
        {
          src: "/OurWork/POKRUSZONE Branding/Pokru Szone Brandin-get imagin-Services 01.gif",
         
        },
        {
          src: "/OurWork/POKRUSZONE Branding/Pokru Szone Brandin-get imagin-Services 02.jpg",
         
        },{
          src: "/OurWork/POKRUSZONE Branding/Pokru Szone Brandin-get imagin-Services 03.jpg",
         
        },{
          src: "/OurWork/POKRUSZONE Branding/Pokru Szone Brandin-get imagin-Services 04.jpg",
         
        },{
          src: "/OurWork/POKRUSZONE Branding/Pokru Szone Brandin-get imagin-Services 05.jpg",
         
        },{
          src: "/OurWork/POKRUSZONE Branding/Pokru Szone Brandin-get imagin-Services 06.gif",
         
        },{
          src: "/OurWork/POKRUSZONE Branding/Pokru Szone Brandin-get imagin-Services 07.jpg",
         
        },{
          src: "/OurWork/POKRUSZONE Branding/Pokru Szone Brandin-get imagin-Services 08.gif",
         
        },{
          src: "/OurWork/POKRUSZONE Branding/Pokru Szone Brandin-get imagin-Services 10.jpg",
         
        },{
          src: "/OurWork/POKRUSZONE Branding/Pokru Szone Brandin-get imagin-Services 11.jpg",
         
        },{
          src: "/OurWork/POKRUSZONE Branding/Pokru Szone Brandin-get imagin-Services 12.jpg",
         
        },{
          src: "/OurWork/POKRUSZONE Branding/Pokru Szone Brandin-get imagin-Services 13.jpg",
         
        },{
          src: "/OurWork/POKRUSZONE Branding/Pokru Szone Brandin-get imagin-Services 14.jpg",
         
        },{
          src: "/OurWork/POKRUSZONE Branding/Pokru Szone Brandin-get imagin-Services 15.jpg",
         
        },{
          src: "/OurWork/POKRUSZONE Branding/Pokru Szone Brandin-get imagin-Services 16.jpg",
         
        },{
          src: "/OurWork/POKRUSZONE Branding/Pokru Szone Brandin-get imagin-Services 21.jpg",
         
        },
      ],
    },
  ];
  return (
    <main >
      <BrandingPageComponent items={branding}  />
    </main>
  )
}

export default page
