// "use client"
// import Link from "next/link"
// import { useState } from "react"
// import AnimatedLink from "./AnimatedLink"
// AnimatedLink
// const Login = () => {
//     const [selectedItems, setSelectedItems] = useState([]);

//     const toggleSelection = (index) => {
//         setSelectedItems((prevSelected) =>
//             prevSelected.includes(index)
//                 ? prevSelected.filter((i) => i !== index)
//                 : [...prevSelected, index]
//         );
//     };
//     const UserInterest = [
//         {
//             buton: "A new Website",
//             src: "#",
//         }, {
//             buton: "Branding",
//             src: "#",
//         }, {
//             buton: "Motion Graphics",
//             src: "#",
//         }, {
//             buton: "E-commerce",
//             src: "#",
//         }, {
//             buton: "Development",
//             src: "#",
//         }, {
//             buton: "On-going Support ",
//             src: "#",
//         }, {
//             buton: "App from scratch",
//             src: "#",
//         },
//     ]

//     return (
//         <div className="w-full p-[8%]">
//             <h1 className="text-lg lg:text-4xl 2xl:text-[45px]">{` I am interested in :`}</h1>
//             <div className="flex flex-wrap w-3/4 gap-4  mt-4">
//             {UserInterest.map((item, index) => (
//                 <label key={index} className="cursor-pointer mt-8">
//                     <input
//                         type="checkbox"
//                         checked={selectedItems.includes(index)}
//                         onChange={() => toggleSelection(index)}
//                         className="hidden  "  // Hides the checkbox input from view
//                     />
//                     <span
//                         className={`px-4 py-2 border-2 border-[#c4c4c4] duration-800 rounded-3xl transition font-semibold ${
//                             selectedItems.includes(index)
//                                 ? 'bg-[#eef0f0] text-black'
//                                 : 'bg-transparent text-white'
//                         }`}
//                     >
//                         {item.buton}
//                     </span>
//                 </label>
//             ))}
//             </div>
// <form className="font-neueMachina mt-[7%]"  action=""> 
//     <input className="w-[20%]" type="text" placeholder="First Name*" name="firstName" required/>
//     <input className="w-[20%]" type="text"  placeholder="Last Name*" name="lastName"  required/>
//     <input className="w-[40%]" type="email"  placeholder="Email*" name="email"  required/>
//     <label htmlFor=""><input className="w-[45%]" type="Number" name="Budget"  placeholder="Budget($)" required /></label>
//     <input className="w-[40%] " type="file"  placeholder="Attachments" name="Attachments"  accept=".doc,.docx,.pdf,image/*" />
//     <input className="w-[90%]" type="text" name="Message" placeholder="Message"  />
//     <label className="block mt-5"  htmlFor=""><input className="accent-[#24CFA6] " type="checkbox" name="gmailNotification" id="gmailNotification" />{`I'm happy to receive a monthly newsletter from Get Imagin`}</label>
//     <label htmlFor=""><input  className="accent-[#24CFA6] " type="checkbox" name="agree" id="agree" />I understand that Get Imagin will securely hold my data in accordance with their privacy policy.</label>
//    <button className="border-2 borde-white px-3 -py-1  rounded-3xl ml-[5%]" type="submit"><AnimatedLink content={"Submit"} href={""} style={{borderColor:"transparent"}}/></button>
// </form>
//         </div>
//     )
// }

// export default Login


// src/components/Login.js





// "use client"
// import { useState } from 'react';

// const Login = () => {
//   const [formData, setFormData] = useState({
//     firstName: '',
//     lastName: '',
//     email: '',
//     budget: '',
//     message: '',
//     selectedItems: [],
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleCheckboxChange = (index) => {
//     setFormData((prev) => {
//       const newSelectedItems = prev.selectedItems.includes(index)
//         ? prev.selectedItems.filter((i) => i !== index)
//         : [...prev.selectedItems, index];
//       return { ...prev, selectedItems: newSelectedItems };
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await fetch('/api/formSubmit', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData),
//       });
//       if (!res.ok) throw new Error('Submission failed');
//       alert('Form submitted successfully!');
//     } catch (error) {
//       console.error('Form submission error:', error);
//       alert('Error submitting form');
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input type="text" name="firstName" placeholder="First Name" onChange={handleChange} required />
//       <input type="text" name="lastName" placeholder="Last Name" onChange={handleChange} required />
//       <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
//       <input type="number" name="budget" placeholder="Budget" onChange={handleChange} required />
//       <textarea name="message" placeholder="Message" onChange={handleChange} />
//       <button type="submit">Submit</button>
//     </form>
//   );
// };

// export default Login;



// "use client";

// import { useState } from 'react';
// import AnimatedLink from "./AnimatedLink"; // Ensure you have this component available

// const Login = () => {
//   const [formData, setFormData] = useState({
//     firstName: '',
//     lastName: '',
//     email: '',
//     budget: '',
//     message: '',
//     selectedItems: [],
//     file: null, // Add file state for the optional file input
//     gmailNotification: false, // State for the newsletter checkbox
//     agree: false, // State for the agreement checkbox
//   });

//   const UserInterest = [
//     { button: "A new Website", src: "#" },
//     { button: "Branding", src: "#" },
//     { button: "Motion Graphics", src: "#" },
//     { button: "E-commerce", src: "#" },
//     { button: "Development", src: "#" },
//     { button: "On-going Support", src: "#" },
//     { button: "App from scratch", src: "#" },
//   ];

//   const handleChange = (e) => {
//     const { name, value, type, checked, files } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: type === 'checkbox' ? checked : type === 'file' ? files[0] : value,
//     }));
//   };

//   const handleCheckboxChange = (index) => {
//     setFormData((prev) => {
//       const newSelectedItems = prev.selectedItems.includes(index)
//         ? prev.selectedItems.filter((i) => i !== index)
//         : [...prev.selectedItems, index];
//       return { ...prev, selectedItems: newSelectedItems };
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const data = new FormData(); // Use FormData to handle file uploads
//     Object.entries(formData).forEach(([key, value]) => {
//       data.append(key, value);
//     });

//     try {
//       const res = await fetch('/api/formSubmit', {
//         method: 'POST',
//         body: data,
//       });
//       if (!res.ok) throw new Error('Submission failed');
//       alert('Form submitted successfully!');
//     } catch (error) {
//       console.error('Form submission error:', error);
//       alert('Error submitting form');
//     }
//   };

//   return (
//     <div className="w-full p-[8%]">
//       <h1 className="text-lg lg:text-4xl 2xl:text-[45px]">{`I am interested in:`}</h1>
//       <div className="flex flex-wrap w-3/4 gap-4 mt-4">
//         {UserInterest.map((item, index) => (
//           <label key={index} className="cursor-pointer mt-8">
//             <input
//               type="checkbox"
//               checked={formData.selectedItems.includes(index)}
//               onChange={() => handleCheckboxChange(index)}
//               className="hidden" // Hides the checkbox input from view
//             />
//             <span
//               className={`px-4 py-2 border-2 border-[#c4c4c4] duration-800 rounded-3xl transition font-semibold ${
//                 formData.selectedItems.includes(index) ? 'bg-[#eef0f0] text-black' : 'bg-transparent text-white'
//               }`}
//             >
//               {item.button}
//             </span>
//           </label>
//         ))}
//       </div>
//       <form className="font-neueMachina mt-[7%]" onSubmit={handleSubmit}>
//         <input className="w-[20%]" type="text" placeholder="First Name*" name="firstName" required onChange={handleChange} />
//         <input className="w-[20%]" type="text" placeholder="Last Name*" name="lastName" required onChange={handleChange} />
//         <input className="w-[40%]" type="email" placeholder="Email*" name="email" required onChange={handleChange} />
//         <input className="w-[45%]" type="number" name="budget" placeholder="Budget($)" required onChange={handleChange} />
//         {/* <input className="w-[40%]" type="file" name="file" accept=".doc,.docx,.pdf,image/*" onChange={handleChange} /> */}
//         <textarea className="w-[90%]" name="message" placeholder="Message" onChange={handleChange} />
//         <label className="block mt-5">
//           <input className="accent-[#24CFA6]" type="checkbox" name="gmailNotification" onChange={handleChange} />
//           {`I'm happy to receive a monthly newsletter from Get Imagin`}
//         </label>
//         <label>
//           <input className="accent-[#24CFA6]" type="checkbox" name="agree" required onChange={handleChange} />
//           I understand that Get Imagin will securely hold my data in accordance with their privacy policy.
//         </label>
//         <button className="border-2 border-white px-3 py-1 rounded-3xl ml-[5%]" type="submit">
//           {/* <AnimatedLink content={"Submit"} href={""} style={{ borderColor: "transparent" }} /> */}
//           submit
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Login;



"use client";
import Link from "next/link";
import { useState } from "react";
import AnimatedLink from "./AnimatedLink";

const Login = () => {
    const [selectedItems, setSelectedItems] = useState([]);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        budget: '',
        message: '',
        selectedItems:[],
        // attachments: null,
    });

    const toggleSelection = (index) => {
        setSelectedItems((prevSelected) =>
            prevSelected.includes(index)
                ? prevSelected.filter((i) => i !== index)
                : [...prevSelected, index]
        );
    };

    const UserInterest = [
        { buton: "A new Website", src: "#" },
        { buton: "Branding", src: "#" },
        { buton: "Motion Graphics", src: "#" },
        { buton: "E-commerce", src: "#" },
        { buton: "Development", src: "#" },
        { buton: "On-going Support ", src: "#" },
        { buton: "App from scratch", src: "#" },
    ];

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'attachments') {
            setFormData({ ...formData, [name]: files[0] });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const interests = selectedItems.map(index => UserInterest[index].buton);

        const formDataToSend = {
            ...formData,
            interests,
        };

        const res = await fetch('/api/formSubmit', {
            method: 'POST',
            body: JSON.stringify(formDataToSend),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (res.ok) {
            alert('Form submitted successfully!');
            // Reset the form or handle success
        } else {
            alert('There was an error submitting the form.');
        }
    };

    return (
        <div className="w-full p-[8%]">
            <h1 className="text-lg lg:text-4xl 2xl:text-[45px]">{` I am interested in :`}</h1>
            <div className="flex flex-wrap w-3/4 gap-4 mt-4">
                {UserInterest.map((item, index) => (
                    <label key={index} className="cursor-pointer mt-8">
                        <input
                            type="checkbox"
                            checked={selectedItems.includes(index)}
                            onChange={() => toggleSelection(index)}
                            className="hidden" // Hides the checkbox input from view
                        />
                        <span
                            className={`px-4 py-2 border-2 border-[#c4c4c4] duration-800 rounded-3xl transition font-semibold ${
                                selectedItems.includes(index)
                                    ? 'bg-[#eef0f0] text-black'
                                    : 'bg-transparent text-white'
                            }`}
                        >
                            {item.buton}
                        </span>
                    </label>
                ))}
            </div>
            <form className="font-neueMachina mt-[7%]" onSubmit={handleSubmit}>
                <input className="w-[20%]" type="text" placeholder="First Name*" name="firstName" required onChange={handleChange} />
                <input className="w-[20%]" type="text" placeholder="Last Name*" name="lastName" required onChange={handleChange} />
                <input className="w-[40%]" type="email" placeholder="Email*" name="email" required onChange={handleChange} />
                <input className="w-[45%]" type="number" name="budget" placeholder="Budget($)" required onChange={handleChange} />
                {/* <input className="w-[40%]" type="file" placeholder="Attachments" name="attachments" accept=".doc,.docx,.pdf,image/*" onChange={handleChange} /> */}
                <input className="w-[90%]" type="text" name="message" placeholder="Message" onChange={handleChange} />
                <label className="block mt-5" htmlFor="">
                    <input className="accent-[#24CFA6]" type="checkbox" name="gmailNotification" id="gmailNotification" />
                    {`I'm happy to receive a monthly newsletter from Get Imagin`}
                </label>
                <label htmlFor="">
                    <input className="accent-[#24CFA6]" type="checkbox" name="agree" id="agree" />
                    I understand that Get Imagin will securely hold my data in accordance with their privacy policy.
                </label>
                <button className="border-2 borde-white px-3 -py-1 rounded-3xl ml-[5%]" type="submit">
                    {/* <AnimatedLink content={"Submit"} href={""} style={{ borderColor: "transparent" }} /> */}   submit
                </button>
            </form>
        </div>
    );
};

export default Login;
