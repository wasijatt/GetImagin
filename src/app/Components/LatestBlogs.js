'use client';
import AnimatedLink from './AnimatedLink';
import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase/config';
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
import Link from 'next/link';
import Image from 'next/image';
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:my-28">
        <div className="animate-pulse  flex justify-center items-center gap-5 ">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-80 w-[30%] bg-gray-200 rounded-lg rounded-tr-[100px]"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <section className=" py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between text-center mb-8">
          <h2 className="text-3xl  font-bold text-white"><span className='font-neueMachina'>Latest</span>  articles</h2>
         <AnimatedLink  className='hidden md:block' href={"/blogs"} content={"view All Posts"} style={{background : "#fffff"}}/>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 rounded-tr-[100px]">
          {blogs.map((blog) => (
            <article 
              key={blog.id}
              className=" bg-[#ffffff8a] rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
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

        <div className='m-auto w-1/2 md:hidden my-7'>
        <AnimatedLink href={"/blogs"} content={"view All Posts"} style={{background : "#fffff"}}/>

        </div>
        
      </div>
    </section>
  );
} 