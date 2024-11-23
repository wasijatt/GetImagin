import { addSubmission, uploadFile } from '@/lib/firebase/formOperations';
import nodemailer from 'nodemailer';

export async function POST(request) {
  try {
    const formData = await request.formData();
    
    // Handle file upload if present
    let fileURL = null;
    const attachment = formData.get('attachments');
    if (attachment && attachment.size > 0) {
      fileURL = await uploadFile(attachment);
    }

    // Save to Firebase
    const docRef = await addSubmission(formData, fileURL);

    // Send thank you email
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: formData.get('email'),
      subject: 'Thank you for your submission',
      html: `
        <h1>Thank you for contacting us, ${formData.get('firstName')}!</h1>
        <p>We have received your submission and will get back to you shortly.</p>
        <p>Your selected interests: ${JSON.parse(formData.get('interests')).join(', ')}</p>
      `,
    });

    return new Response(JSON.stringify({ 
      success: true, 
      message: 'Form submitted successfully',
      submissionId: docRef.id 
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Submission error:', error);
    return new Response(JSON.stringify({ 
      error: 'Internal server error',
      message: error.message 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
} 