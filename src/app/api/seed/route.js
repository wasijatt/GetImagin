import { db } from '@/lib/firebase/config';
import { collection, addDoc, getDocs, query, where, serverTimestamp } from 'firebase/firestore';
import { NextResponse } from 'next/server';
import { blogs } from '@/data/blogs';

export async function GET() {
  try {
    const blogsRef = collection(db, 'blogs');
    
    // Get existing blog titles
    const snapshot = await getDocs(blogsRef);
    const existingTitles = snapshot.docs.map(doc => doc.data().title);

    // Filter out blogs that already exist
    const newBlogs = blogs.filter(blog => !existingTitles.includes(blog.title));

    if (newBlogs.length === 0) {
      return NextResponse.json({ 
        success: true, 
        message: 'No new blogs to add',
        added: 0
      });
    }

    // Add only new blogs
    const additions = newBlogs.map(blog => 
      addDoc(blogsRef, {
        ...blog,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      })
    );
    
    const results = await Promise.all(additions);

    return NextResponse.json({ 
      success: true, 
      message: `Added ${results.length} new blog posts`,
      newBlogIds: results.map(ref => ref.id)
    });
  } catch (error) {
    console.error('Seeding error:', error);
    return NextResponse.json({ 
      success: false, 
      error: error.message 
    }, { status: 500 });
  }
} 