import PinnedText from "./PinnedText";

const Services = () => {
  const ServicesSec = [
    {
      heading: "Web Designing",
      subservice: [
        "Custom Design",
        "App Design",
        "SEO Optimization",
        "Responsive Layout",
        "Animations",
        "User Experience",
      ],
    },{
        heading: "Web Development",
        subservice: [
          " Custom Web Dev ",
          "WordPress",
          "CMS Integration",
          "Responsive Layout",
          "Speed Optimization",
          " E-commerce Development",
        ],
      },{
        heading: "Graphic Design",
        subservice: [
          "Logo Design",
          "Branding & Identity Design",
          "Advertising Design",
          "Social Media Graphics",
          "Content Creation",
       
        ],
      },{
        heading: "Data Analytics ",
        subservice: [
          "Power BI",
          " Power Query ",
          " Pivot table ",
          " Dashboarding",
      
        ],
      },{
        heading: "Facebook Services",
        subservice: [
          "Facebook Reviews",
          "Facebook Feedback",
        
        ],
      },
   
  ];

  return (
    <div className="bg-blue min-h-screen">
      <PinnedText items={ServicesSec} />
    </div>
  );
};

export default Services;
