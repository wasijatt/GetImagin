

"use client";

import { useState } from "react";


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
    
        // Prepare form data and selected interests
        const interests = selectedItems.map(index => UserInterest[index].buton);
    
        const formDataToSend = new FormData();
        formDataToSend.append('firstName', formData.firstName);
        formDataToSend.append('lastName', formData.lastName);
        formDataToSend.append('email', formData.email);
        formDataToSend.append('budget', formData.budget);
        formDataToSend.append('message', formData.message);
        formDataToSend.append('interests', JSON.stringify(interests));
    
        // Attach file if present
        if (formData.attachments) {
            formDataToSend.append('attachments', formData.attachments);
        }
    
        const res = await fetch('/api/formSubmit', {
            method: 'POST',
            body: formDataToSend,
        });
    
        if (res.ok) {
            alert('Form submitted successfully!');
        } else {
            alert('There was an error submitting the form.');
        }
    };
    

    return (
        <div className="w-full p-[8%]">
            <h1 className="text-lg lg:text-4xl 2xl:text-[45px]">{` I am interested in :`}</h1>
            <div className="flex flex-wrap w-[90%] md:w-3/4 gap-4 mt-4">
                {UserInterest.map((item, index) => (
                    <label key={index} className="cursor-pointer mt-2 md:mt-8">
                        <input
                            type="checkbox"
                            checked={selectedItems.includes(index)}
                            onChange={() => toggleSelection(index)}
                            className="hidden" // Hides the checkbox input from view
                        />
                        <span
                            className={`px-4  py-2 border-2 text-sm md:text-lg border-[#c4c4c4] duration-800 rounded-3xl transition font-semibold ${
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
                <input className="w-[90%] md:w-[20%]" type="text" placeholder="First Name*" name="firstName" required onChange={handleChange} />
                <input className="w-[90%] md:w-[20%]" type="text" placeholder="Last Name*" name="lastName" required onChange={handleChange} />
                <input className="w-[90%] md:w-[40%]" type="email" placeholder="Email*" name="email" required onChange={handleChange} />
                <input className="w-[90%] md:w-[45%]" type="number" name="budget" placeholder="Budget($)" required onChange={handleChange} />
                <input className="w-[90%] md:w-[40%]" type="file" placeholder="Attachments" name="attachments" accept=".doc,.docx,.pdf,image/*" onChange={handleChange} />
                <input className="w-[90%]" type="text" name="message" placeholder="Message" onChange={handleChange} />
                <label className="block mt-5" htmlFor="">
                    <input className="accent-[#24CFA6] text-sm " type="checkbox" name="gmailNotification" id="gmailNotification" />
                    {`I'm happy to receive a monthly newsletter from Get Imagin`}
                </label>
                <label htmlFor="">
                    <input className="accent-[#24CFA6]" type="checkbox" name="agree" id="agree" />
                    I understand that Get Imagin will securely hold my data in accordance with their privacy policy.
                </label>
                
                <button className="border-2 borde-white px-4 py-1 rounded-3xl ml-[35%] " type="submit">
                     submit
                </button>
            </form>
        </div>
    );
};

export default Login;
