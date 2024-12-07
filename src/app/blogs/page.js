import Link from "next/link";
import { getSortedPostsData } from "../lib/getMarkdownData.js";
import Image from "next/image.js";
import Header from "../Components/Header.jsx";
import AnimatedLink from "../Components/AnimatedLink.jsx";

export default function BlogPage() {
  const blogs = getSortedPostsData();

  return (
    <>
    <Header/>
    <section className="py-12">
      <div className="max-w-7xl mx-auto ">
        <h1 className="text-3xl font-bold px-8 mb-8">Latest Articles</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogs.map((blog) => {
            // Ensure each blog has a valid slug
            if (!blog.slug) {
              console.error("Missing slug in blog data", blog);
            }

            return (
              <div key={blog.slug} className=" shadow-md rounded-lg">
                <Image
                
                  src={blog.featuredImage}
                  width={600}
                  height={300}
                  alt={blog.title}
                  className="w-full h-96 object-cover rounded-t-lg"
                />
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-2">{blog.title}</h2>
                  <p className="text-gray-400 text-sm mb-4">
                    {new Date(blog.date).toLocaleDateString()} by {blog.author}
                  </p>
                  <p className="text-gray-400 mb-4">{blog.description}</p>
                  <div
                   
                    className="  font-medium"
                  >
                    <AnimatedLink style={{backGround:"white" , fontSize:"16px"}} 
                    //  href={`/posts/${blog.slug}`}
                    href={"#"}
                      content={"Explore More "} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
    </>
  );
}
