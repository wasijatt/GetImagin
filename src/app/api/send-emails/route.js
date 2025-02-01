import nodemailer from 'nodemailer';

// Create email transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_APP_PASSWORD
    }
});

// HTML template for user email
const getUserEmailTemplate = (data) => `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #333;">Thank you for contacting Get Imagin!</h1>
        
        <p>Dear ${data.firstName},</p>
        
        <p>We've received your inquiry and will get back to you shortly. Here's a summary of your submission:</p>
        
        <h3>Your Interests:</h3>
        <ul>
            ${data.interests.map(interest => `<li>${interest}</li>`).join('')}
        </ul>
        
        <p>If you need to reference this submission later, your submission ID is: ${data.submissionId}</p>
        
        <p>Best regards,<br>The Get Imagin Team</p>
    </div>
`;

// HTML template for admin email
const getAdminEmailTemplate = (data) => `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #333;">New Contact Form Submission</h1>
        
        <h3>Contact Details:</h3>
        <ul>
            <li><strong>Name:</strong> ${data.firstName} ${data.lastName}</li>
            <li><strong>Email:</strong> ${data.email}</li>
            <li><strong>Budget:</strong> $${data.budget}</li>
            <li><strong>Submission ID:</strong> ${data.submissionId}</li>
        </ul>
        
        <h3>Selected Interests:</h3>
        <ul>
            ${data.interests.map(interest => `<li>${interest}</li>`).join('')}
        </ul>
        
        ${data.message ? `
            <h3>Message:</h3>
            <p>${data.message}</p>
        ` : ''}
        
        <h3>Additional Information:</h3>
        <ul>
            <li>Newsletter Signup: ${data.gmailNotification ? 'Yes' : 'No'}</li>
            <li>Submission Time: ${new Date().toLocaleString()}</li>
        </ul>
    </div>
`;

export async function POST(req) {
    try {
        const data = await req.json();

        // Send confirmation email to user
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: data.email,
            subject: 'Thank you for contacting Get Imagin',
            html: getUserEmailTemplate(data)
        });

        // Send notification to admin
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: process.env.ADMIN_EMAIL,
            subject: 'New Contact Form Submission - Get Imagin',
            html: getAdminEmailTemplate(data)
        });

        return new Response(
            JSON.stringify({ success: true }),
            {
                status: 200,
                headers: { 'Content-Type': 'application/json' }
            }
        );
    } catch (error) {
        console.error('Email sending error:', error);
        return new Response(
            JSON.stringify({ success: false, error: 'Failed to send emails' }),
            {
                status: 500,
                headers: { 'Content-Type': 'application/json' }
            }
        );
    }
}