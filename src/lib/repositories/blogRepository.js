import { db } from '../firebase/config';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';

export class BlogRepository {
  async getAll() {
    try {
      console.log('Fetching blogs from Firestore...');
      
      const blogsRef = collection(db, 'blogs');
      const q = query(blogsRef, orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      
      const blogs = querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          // Convert Firestore Timestamp to Date string
          createdAt: data.createdAt?.toDate?.()?.toISOString() || null,
          updatedAt: data.updatedAt?.toDate?.()?.toISOString() || null,
        };
      });

      console.log(`Successfully fetched ${blogs.length} blogs`);
      return blogs;
      
    } catch (error) {
      console.error('Error fetching blogs:', error);
      throw error;
    }
  }
} 