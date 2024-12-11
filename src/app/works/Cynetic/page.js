import BrandingPageComponent from "@/app/Components/BrandingPageComponent";

const page = () => {



  const branding = [
    {
      heading: "Web Designing",
    
    },{
        heading: "Web Development",
     
      },{
        heading: "Graphic Design",
       
        
      },{
        heading: "Data Analytics ",
       
      },{
        heading: "Facebook Services",
      
      },
   
  ];
  return (
    <div >
      <BrandingPageComponent items={branding}  />
    </div>
  )
}

export default page
