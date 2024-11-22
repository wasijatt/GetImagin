import { db } from '@/lib/firebase/config';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { NextResponse } from 'next/server';

const sampleBlogs = [
  {
    title: "Welcome to Our Agency",
    content: "We are a creative agency specializing in digital solutions.",
    published: true,
  },
  {
    title: "Our Design Process",
    content: "Learn about how we approach each project with creativity and precision.",
    published: true,
  },
  {
    title: "Latest Projects",
    content: "Check out our most recent work and client success stories.",
    published: true,
  }
];

export async function GET() {
  try {
    const blogsRef = collection(db, 'blogs');
    
    const results = await Promise.all(
      sampleBlogs.map(blog => 
        addDoc(blogsRef, {
          ...blog,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        })
      )
    );

    return NextResponse.json({ 
      success: true, 
      message: `Added ${results.length} blog posts`,
      ids: results.map(ref => ref.id)
    });
  } catch (error) {
    console.error('Seeding error:', error);
    return NextResponse.json({ 
      success: false, 
      error: error.message 
    }, { status: 500 });
  }
} 