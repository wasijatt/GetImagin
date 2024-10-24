import React from 'react'

const Heading = ({mainText,subText}) => {
  return (
    <h1 className="font-neueMachina font-normal text-base md:text-[40px] lg:text-[100px] leading-none">
    {mainText} <br /> <span className="ml-9 font-fontspring ">{subText}</span>
  </h1>
  )
}

export default Heading
