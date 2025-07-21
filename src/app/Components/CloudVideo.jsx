
// const CloudVideo = ({
//     publicId ,
//     cloudName = "dgqftl3o8",  
//     width   = 660,
//     height  = 1200,
//     autoplay =true,
//     controls=false,
//     loop =true,   
//     muted =true,
//     className="",
// }) => {

//     const videoUrl = `https://res.cloudinary.com/${cloudName}/video/upload/f_auto,q_auto,vc_auto,w_720,c_fill/${publicId}.mp4`;
//   return (
//     <video
//       className={`rounded-lg md:rounded-xl rounded-tr-[70px] md:rounded-tr-[100px] ${className}`}
//       width={width}
//       height={height}
//       autoPlay={autoplay}
//       controls={controls}
//       loop={loop}
//       muted={muted}
//       loading="lazy"
//       preload="auto"
//         playsInline
        
//     >
//       <source src={videoUrl} type="video/mp4" />
//       Your browser does not support the video tag.
//     </video>
//   )
// }

// export default CloudVideo


const CloudVideo = ({
  publicId,
  cloudName = "dgqftl3o8",
  autoplay = true,
  controls = false,
  loop = true,
  muted = true,
  className = "",
}) => {
  const videoUrl = `https://res.cloudinary.com/${cloudName}/video/upload/f_auto,q_auto,vc_auto/${publicId}.mp4`;

  return (
    <div
      className={`w-full h-full max-h-screen overflow-hidden flex items-center justify-center ${className}`}
    >
      <video
        src={videoUrl}
        autoPlay={autoplay}
        controls={controls}
        loop={loop}
        muted={muted}
        playsInline
        preload="auto"
        loading="lazy"
        className="h-full w-auto object-cover rounded-lg md:rounded-xl rounded-tr-[70px] md:rounded-tr-[100px]"
      >
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default CloudVideo;
