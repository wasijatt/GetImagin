import mongoose from 'mongoose';

const formSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    budget: Number,
    message: String,
    interests: [String],
    file: {
        filename: String,
        contentType: String,
        data: Buffer,
    },
});

const FormData = mongoose.models.FormData || mongoose.model('FormData', formSchema);

export default FormData;
