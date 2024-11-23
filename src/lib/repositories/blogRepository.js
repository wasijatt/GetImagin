import { db } from '../firebase/config';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';

export class BlogRepository {
  async getAll() {
    try {
      console.log('Fetching blogs from Firestore...');
      
      const blogsRef = collection(db, 'blogs');
      const q = query(blogsRef, orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      
      const blogs = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        // Convert Firestore Timestamp to ISO string
        createdAt: doc.data().createdAt?.toDate?.()?.toISOString() || null,
        updatedAt: doc.data().updatedAt?.toDate?.()?.toISOString() || null,
      }));

      console.log(`Successfully fetched ${blogs.length} blogs:`, blogs);
      return blogs;
      
    } catch (error) {
      console.error('Error fetching blogs:', error);
      throw error;
    }
  }
} 