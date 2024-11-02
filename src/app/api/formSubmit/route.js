// src/app/api/formSubmit/route.js
import dbConnect from '../../utils/dbConnect';
import FormSubmission from '../../models/FormSubmission';
import sendEmail from '../../utils/sendEmail';

export async function POST(req) {
  const { firstName, lastName, email, budget, message, selectedItems } = await req.json();

  if (!firstName || !lastName || !email || !budget) {
    return new Response(JSON.stringify({ message: 'Missing required fields' }), {
      status: 400,
    });
  }

  try {
    await dbConnect();

    const newSubmission = new FormSubmission({
      firstName,
      lastName,
      email,
      budget,
      message,
      selectedItems,
    });
    await newSubmission.save();

    await sendEmail({
      to: process.env.ADMIN_EMAIL,
      subject: 'New Form Submission',
      text: `
        New form submission:
        - Name: ${firstName} ${lastName}
        - Email: ${email}
        - Budget: $${budget}
        - Selected Interests: ${selectedItems.join(', ')}
        - Message: ${message || 'No additional message provided.'}
      `,
    });

    await sendEmail({
      to: email,
      subject: 'Thank you for your submission!',
      text: `
        Hi ${firstName},
        Thank you for your interest! We have received your submission.
        - Selected Interests: ${selectedItems.join(', ')}
        - Budget: $${budget}
        We will be in touch soon!
        Best regards,
        Get Imagin Team
      `,
    });

    return new Response(JSON.stringify({ message: 'Form submitted and saved successfully' }), {
      status: 200,
    });
  } catch (error) {
    console.error('Error processing request:', error);
    return new Response(JSON.stringify({ message: 'An error occurred' }), {
      status: 500,
    });
  }
}

