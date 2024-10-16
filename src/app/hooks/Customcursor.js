// import { useEffect } from 'react';

// const useCustomCursor = (content) => {
//   useEffect(() => {
//     const cursor = document.createElement('div');
//     cursor.classList.add('custom-cursor');
//     document.body.appendChild(cursor);

//     const cursorStyle = cursor.style;
//     cursorStyle.position = 'fixed';
//     cursorStyle.top = '-10px';
//     cursorStyle.left = '-20px';
//     cursorStyle.width = '10px';
//     cursorStyle.height = '10px';
//     cursorStyle.borderRadius = '50%';
//     cursorStyle.pointerEvents = 'none';
//     cursorStyle.mixBlendMode = 'difference';
//     cursorStyle.transition = 'transform 0.5s ease-out, width 0.8s ease-out, height 0.8s ease-out, background-color 0.3s ease-out';
//     cursorStyle.transform = 'translate(-50%, -50%)';

//     if (content) {
//       cursor.innerHTML = content; // Insert content (image, text, etc.) into the cursor
      
//       const img = cursor.querySelector('Image');
//       if (img) {
//         cursorStyle.width = '300px';  // Set width to 300px when there's an image
//         cursorStyle.height = '300px'; // Set height to 300px when there's an image
//         img.style.width = '100%';     // Make sure the image occupies the full cursor area
//         img.style.height = '100%';    // Make sure the image occupies the full cursor area
//         img.style.zIndex = "999"
//         cursorStyle.backgroundColor = 'none';

//       } else {
//         // Handle other types of content or leave default behavior
//         cursorStyle.width = '10px';
//         cursorStyle.height = '10px';
//       }
//     }

//     const updateCursorPosition = (event) => {
//       const { clientX, clientY } = event;
//       cursorStyle.transform = `translate(${clientX}px, ${clientY}px)`;

//       const element = document.elementFromPoint(clientX, clientY);
//       if (element) {
//         const tagName = element.tagName.toLowerCase();
//         switch (tagName) {
//           case 'h1':
//             cursorStyle.width = '90px';
//             cursorStyle.height = '90px';
//             cursorStyle.backgroundColor = '#ffffff';
//             break;
//           case 'img':
//             cursorStyle.width = '100px';
//             cursorStyle.height = '100px';
//             cursorStyle.backgroundColor = '#ffffffce';
//             break;
//           case 'a':
//             cursorStyle.width = '10px';
//             cursorStyle.height = '10px';
//             cursorStyle.backgroundColor = '#ffffffce';
//             break;
//           case 'p':
//             cursorStyle.width = '100px';
//             cursorStyle.height = '100px';
//             cursorStyle.backgroundColor = '#ffffffce';
//             break;
//           case 'button':
//             cursorStyle.width = '80px';
//             cursorStyle.height = '80px';
//             cursorStyle.backgroundColor = '#ffffffce';
//             break;
//           default:
//             if (!content) {
//               cursorStyle.width = '10px';
//               cursorStyle.height = '10px';
//               cursorStyle.backgroundColor = '#24CFA6';
//             }
//         }
//       }
//     };

//     document.addEventListener('mousemove', updateCursorPosition);

//     return () => {
//       document.removeEventListener('mousemove', updateCursorPosition);
//       if (cursor.parentNode === document.body) {
//         document.body.removeChild(cursor);
//       }
//     };
//   }, [content]); // Re-run the effect if the content changes
// };

// export default useCustomCursor;











// import { useEffect } from 'react';

// const useCustomCursor = (content) => {
//   useEffect(() => {
//     const cursor = document.createElement('div');
//     cursor.classList.add('custom-cursor');
//     document.body.appendChild(cursor);

//     const cursorStyle = cursor.style;
//     cursorStyle.position = 'fixed';
//     cursorStyle.top = '-10px';
//     cursorStyle.left = '-20px';
//     cursorStyle.width = '10px';
//     cursorStyle.height = '10px';
//     cursorStyle.borderRadius = '50%';
//     cursorStyle.pointerEvents = 'none';
//     cursorStyle.mixBlendMode = 'difference';
//     cursorStyle.transition = 'transform 0.5s ease-out, width 0.8s ease-out, height 0.8s ease-out, background-color 0.3s ease-out';
//     cursorStyle.transform = 'translate(-50%, -50%)';

//     const updateCursorPosition = (event) => {
//       const { clientX, clientY } = event;
//       cursorStyle.transform = `translate(${clientX}px, ${clientY}px)`;
//     };

//     const updateCursorContent = () => {
//       if (content) {
//         cursor.innerHTML = ''; // Clear previous content
//         cursor.appendChild(content); // Append the new content (image)
//         cursorStyle.width = '300px';  // Set cursor size when there's content
//         cursorStyle.height = '300px';
//         cursorStyle.backgroundColor = 'transparent'; // Remove background when image is present
//       } else {
//         cursor.innerHTML = ''; // Clear the content
//         cursorStyle.width = '10px'; // Default size
//         cursorStyle.height = '10px';
//         cursorStyle.backgroundColor = '#24CFA6'; // Default background color
//       }
//     };

//     updateCursorContent(); // Initial update

//     document.addEventListener('mousemove', updateCursorPosition);

//     return () => {
//       document.removeEventListener('mousemove', updateCursorPosition);
//       if (cursor.parentNode === document.body) {
//         document.body.removeChild(cursor);
//       }
//     };
//   }, [content]); // Re-run effect if content changes
// };

// export default useCustomCursor;
