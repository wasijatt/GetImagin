import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from './config';

// Collection reference for form submissions
const submissionsCollection = collection(db, 'submissions');

// Helper function to upload file to Firebase Storage
export const uploadFile = async (file) => {
  if (!file) return null;
  
  const fileRef = ref(storage, `form-attachments/${Date.now()}-${file.name}`);
  await uploadBytes(fileRef, file);
  const downloadURL = await getDownloadURL(fileRef);
  return downloadURL;
};

// Helper function to add form submission to Firestore
export const addSubmission = async (formData, fileURL = null) => {
  try {
    const submissionData = {
      firstName: formData.get('firstName'),
      lastName: formData.get('lastName'),
      email: formData.get('email'),
      budget: formData.get('budget'),
      message: formData.get('message'),
      interests: JSON.parse(formData.get('interests')),
      attachmentURL: fileURL,
      createdAt: serverTimestamp(),
    };

    const docRef = await addDoc(submissionsCollection, submissionData);
    return docRef;
  } catch (error) {
    console.error('Error adding submission:', error);
    throw error;
  }
}; 