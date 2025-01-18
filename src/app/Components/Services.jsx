import PinnedText from "./PinnedText";

const Services = () => {
  const ServicesSec = [
    {
      heading: "Web ",
      subHead:"Designing",
      subservice: [
        "Custom Design",
        "App Design",
        "SEO Optimization",
        "Responsive Layout",
        "Animations",
        "User Experience",
      ],
    },{
        heading: "Web",
      subHead:"Development",

        subservice: [
          " Custom Web Dev ",
          "WordPress",
          "CMS Integration",
          "Responsive Layout",
          "Speed Optimization",
          " E-commerce Development",
        ],
      },{
        heading: "Graphic ",
      subHead:"Design",

        subservice: [
          "Logo Design",
          "Branding & Identity Design",
          "Advertising Design",
          "Social Media Graphics",
          "Content Creation",
       
        ],
      },{
        heading: "Data  ",
      subHead:"Analytics",

        subservice: [
          "Power BI",
          " Power Query ",
          " Pivot table ",
          " Dashboarding",
      
        ],
      },{
        heading: "Facebook",
      subHead:"Services",

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
