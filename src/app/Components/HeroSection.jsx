

const HeroSection = ({HerosectionHeading , HerosectionPara , HerosectionButton}) => {
  return (
    <div className='w-full h-1/2 bg-black text-white'>
      <h1 className="">{HerosectionHeading}</h1>
      <p>{HerosectionPara}</p>
      <button>{HerosectionButton}</button>
    </div>
  )
}

export default HeroSection
