"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { db } from '../firebase/config';
import { collection, addDoc } from 'firebase/firestore';
import { toast } from 'react-hot-toast';

const ContactForm = () => {
    const [selectedItems, setSelectedItems] = useState([]);
    const [showThankYouPopup, setShowThankYouPopup] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm();

    const UserInterest = [
        { buton: "A new Website" },
        { buton: "Branding" },
        { buton: "Motion Graphics" },
        { buton: "E-commerce" },
        { buton: "Development" },
        { buton: "On-going Support " },
        { buton: "App from scratch" },
    ];

    const toggleSelection = (index) => {
        setSelectedItems(prev =>
            prev.includes(index)
                ? prev.filter(item => item !== index)
                : [...prev, index]
        );
    };

    const onSubmit = async (data) => {
        if (selectedItems.length === 0) {
            toast.error('Please select at least one interest');
            return;
        }

        try {
            setIsSubmitting(true);
            const selectedInterests = selectedItems.map(index => UserInterest[index].buton);

            // Prepare form data
            const formData = {
                ...data,
                interests: selectedInterests,
                createdAt: new Date().toISOString(),
                status: 'new'
            };

            // Save to Firebase
            const docRef = await addDoc(collection(db, 'contacts'), formData);

            // Send emails
            const emailResponse = await fetch('/api/send-emails', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    submissionId: docRef.id
                })
            });

            if (!emailResponse.ok) throw new Error('Failed to send emails');

            toast.success('Form submitted successfully!');
            reset();
            setSelectedItems([]);
            setShowThankYouPopup(true); // Show thank you popup
        } catch (error) {
            console.error('Submission error:', error);
            toast.error('Something went wrong. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="w-full p-[8%]">
            <h1 className="text-lg lg:text-4xl 2xl:text-[45px]">I am interested in:</h1>
            
            {/* Interest Selection */}
            <div className="flex flex-wrap w-[90%] md:w-3/4 gap-4 mt-4">
                {UserInterest.map((item, index) => (
                    <label key={index} className="cursor-pointer mt-2 md:mt-8">
                        <input
                            type="checkbox"
                            checked={selectedItems.includes(index)}
                            onChange={() => toggleSelection(index)}
                            className="hidden"
                        />
                        <span
                            className={`px-4 py-2 border-[1px] text-sm md:text-lg border-[#c4c4c4] duration-800 rounded-3xl transition font-normal ${
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
            {selectedItems.length === 0 && (
                <p className="main-color text-sm mt-5">Please select at least one interest</p>
            )}
            {/* Contact Form */}
            <form className="font-neueMachina mt-[2%] space-y-4" onSubmit={handleSubmit(onSubmit)}>
                <div className="grid md:grid-cols-2 gap-4">
                    <input
                        className="w-full p-2 rounded bg-transparent"
                        type="text"
                        placeholder="First Name*"
                        {...register("firstName", { required: "First name is required" })}
                    />
                    {errors.firstName && (
                        <span className="main-color text-sm">{errors.firstName.message}</span>
                    )}

                    <input
                        className="w-full p-2 rounded"
                        type="text"
                        placeholder="Last Name*"
                        {...register("lastName", { required: "Last name is required" })}
                    />
                    {errors.lastName && (
                        <span className="main-color text-sm">{errors.lastName.message}</span>
                    )}
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                <input
                    className="w-full p-2 rounded bg-transparent"
                    type="email"
                    placeholder="Email*"
                    {...register("email", {
                        required: "Email is required",
                        pattern: {
                            value: /^\S+@\S+$/i,
                            message: "Invalid email address"
                        }
                    })}
                />
                {errors.email && (
                    <span className="main-color text-sm">{errors.email.message}</span>
                )}

                <input
                    className="w-full p-2 rounded"
                    type="number"
                    placeholder="Budget($)*"
                    {...register("budget", {
                        required: "Budget is required",
                        min: { value: 0, message: "Budget must be positive" }
                    })}
                />
                {errors.budget && (
                    <span className="main-color text-sm">{errors.budget.message}</span>
                )}
</div>
                <textarea
                    className="w-full p-2 mx-5 rounded-2xl border-[1px] border-white bg-transparent"
                    placeholder="Share Your Thoughts"
                    rows="4"
                    {...register("message")}
                />

                <div className="space-y-2">
                    <label className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            className="accent-[#24CFA6]"
                            {...register("gmailNotification")}
                        />
                        <span className="text-sm">
                            I am happy to receive a monthly newsletter from Get Imagin
                        </span>
                    </label>

                    <label className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            className="accent-[#24CFA6]"
                            {...register("agree", {
                                required: "You must agree to the privacy policy"
                            })}
                        />
                        <span className="text-sm">
                            I understand that Get Imagin will securely hold my data in accordance with their privacy policy.
                        </span>
                    </label>
                    {errors.agree && (
                        <span className="main-color text-sm block">{errors.agree.message}</span>
                    )}
                </div>

                <button
                    className="border-2 border-white px-6 py-2 fontneue rounded-3xl mx-auto block mt-6 bg-white font-semibold text-black transition-colors disabled:opacity-50"
                    type="submit"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Submitting...' : 'Submit '}
                </button>
            </form>
            {showThankYouPopup && (
                <div className="fixed inset-0 flex items-center justify-center !bg-[#0000008a] bg-opacity-50">
                    <div className="bg-white text-black p-6 rounded-lg shadow-lg text-center">
                        <h2 className="text-2xl font-bold mb-4">Thank You!</h2>
                        <p>Your form has been submitted successfully.</p>
                        <button
                            className="mt-4 px-4 py-2 bg-[#24CFA6] text-white rounded"
                            onClick={() => setShowThankYouPopup(false)}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ContactForm;