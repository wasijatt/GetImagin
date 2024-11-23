'use client';
import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase/config';
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
import Link from 'next/link';

export default function LatestBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLatestBlogs() {
      try {
        const blogsRef = collection(db, 'blogs');
        const q = query(
          blogsRef,
          orderBy('createdAt', 'desc'), // Latest first
          limit(3) // Only get 3 posts
        );
        
        const querySnapshot = await getDocs(q);
        const latestBlogs = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate?.()?.toISOString()
        }));

        setBlogs(latestBlogs);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchLatestBlogs();
  }, []);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="animate-pulse space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-40 bg-gray-200 rounded-lg"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <section className="bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Latest Updates</h2>
          <p className="mt-2 text-lg text-gray-600">Stay up to date with our latest news and insights</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <article 
              key={blog.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {blog.title}
                </h3>
                <div 
                  className="text-gray-600 mb-4 line-clamp-3 prose"
                  dangerouslySetInnerHTML={{ 
                    __html: blog.content.split('</p>')[0] + '</p>' 
                  }}
                />
                <div className="flex items-center justify-between">
                  <time 
                    className="text-sm text-gray-500"
                    dateTime={blog.createdAt}
                  >
                    {new Date(blog.createdAt).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </time>
                  <Link
                    href={`/blogs#${blog.id}`}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    Read more →
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link
            href="/blogs"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
          >
            View All Posts
          </Link>
        </div>
      </div>
    </section>
  );
} 