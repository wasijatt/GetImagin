
const MiniHeroSection = ({head,chfont,Last, fhead,span}) => {
  return (
    <div className="w-full text-center flex flex-col justify-center items-center mt-6 md:mt-0 bg-white text-black">
      
    <h1 className="text-2xl md:text-5xl 2xl:text-[4rem] leading-tight z-30  w-[70%] md:w-[40%] ">
      {fhead}
      <span className="text-teal-400">{span}</span> <span>{head}</span> <span className="font-fontspring"> {chfont}</span>{Last}
    </h1>
   

  
  </div>
  )
}

export default MiniHeroSection
