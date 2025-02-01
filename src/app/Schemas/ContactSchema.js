// import { z } from 'zod';

// export const contactSchema = z.object({
//     firstName: z.string().min(2, 'First name is too short'),
//     lastName: z.string().min(2, 'Last name is too short'),
//     email: z.string().email('Invalid email address'),
//     budget: z.number().min(0, 'Budget must be positive'),
//     message: z.string().optional(),
//     interests: z.array(z.string()).min(1, 'Please select at least one interest'),
//     gmailNotification: z.boolean(),
//     agree: z.boolean().refine(val => val === true, {
//         message: 'You must agree to the privacy policy'
//     })
// });