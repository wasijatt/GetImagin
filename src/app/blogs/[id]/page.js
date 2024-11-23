import { db } from '@/lib/firebase/config';
import { doc, getDoc } from 'firebase/firestore';
import Link from 'next/link';

// Correct way to handle params in generateMetadata
export async function generateMetadata({ params: { id } }) {
  const docRef = doc(db, "blogs", id);
  const docSnap = await getDoc(docRef);
  const blog = docSnap.exists() ? docSnap.data() : null;

  return {
    title: blog ? blog.title : 'Blog Post',
    description: blog ? blog.content.substring(0, 160) : 'Blog post details',
  };
}

// Correct way to handle params in page component
export default async function BlogPost({ params: { id } }) {
  const docRef = doc(db, "blogs", id);
  const docSnap = await getDoc(docRef);
  
  if (!docSnap.exists()) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-2xl font-bold">Blog post not found</h1>
        <Link 
          href="/blogs" 
          className="main-color  mt-4 inline-block"
        >
          ← Back to Blogs
        </Link>
      </div>
    );
  }

  const blog = {
    id: docSnap.id,
    ...docSnap.data()
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link 
        href="/blogs" 
        className="main-color  mb-8 inline-block"
      >
        ← Back to Blogs
      </Link>
      
      {blog.imageUrl && (
        <img 
          src={blog.imageUrl} 
          alt={blog.title} 
          className="w-full h-64 object-cover rounded-lg mb-8"
        />
      )}
      
      <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>
      <div className="prose max-w-none">
        {blog.content}
      </div>
    </div>
  );
} 