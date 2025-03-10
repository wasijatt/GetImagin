
const Heading = ({mainText,subText}) => {
  return (
    <h1 className="font-neueMachina font-normal text-4xl mt-4 md:text-[40px] lg:text-[150px] leading-none">
    {mainText} <br /> <span className="ml-16 fontspring ">{subText}</span>
  </h1>
  )
}

export default Heading
