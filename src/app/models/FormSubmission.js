import mongoose from 'mongoose';

const FormSubmissionSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  budget: Number,
  message: String,
  selectedItems: [String],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.FormSubmission ||
  mongoose.model('FormSubmission', FormSubmissionSchema);
