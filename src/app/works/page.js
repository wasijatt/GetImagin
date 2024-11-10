const page = () => {
  const workmenu = [
    
       "Shedapk",
     

       "LOt",
     
   
       "QuranSpirits",
 
      "Not",
     


      "Madni",
    
    
  ];

  return (
    <div>
      <div className="flex  items-center  flex-col">
        {workmenu.map((item, index) => (
          <div key={index} className="h-[400px]">
            <div>0{index+1}</div> 
             <div className="h-full text-[10em] font-neueMachina">{item}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default page;
