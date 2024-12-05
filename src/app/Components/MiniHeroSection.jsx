
const MiniHeroSection = ({head,chfont,Last, fhead,span}) => {
  return (
    <div className="w-full   px-[10%] mt-6 md:mt-0  pt-[5%] text-black">
      
    <h1 className="text-2xl md:text-5xl 2xl:text-[8rem] leading-tight z-30  w-90%] md:w-[70%]">
      {fhead}
      <span className="text-teal-400 font-bold">{span}</span> <span>{head}</span> <span className="font-fontspring"> {chfont}</span>{Last}
    </h1>
   

  
  </div>
  )
}

export default MiniHeroSection
