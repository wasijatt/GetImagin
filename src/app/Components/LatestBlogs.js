import React from "react";
import Link from "next/link";
import AnimatedLink from "./AnimatedLink";
import Image from "next/image";

const LatestBlogs = ({ blogs }) => {
  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl md:text-5xl font-bold fontspring text-white">
            <span className="fontneue">Latest</span  > articles
          </h2>
          <AnimatedLink
            className="hidden md:block"
            href="/blogs"
            content="View All Posts"
            // style={{ background: "#ffffff" }}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <div
              key={blog.slug}
              className="bg-[#dfdfdf93] shadow-md rounded-lg  rounded-tr-[120px] overflow-hidden"
            >
              <Image
                src={blog.featuredImage}
                alt={blog.title}
                width={500}
                height={300}
                priority={true}
                className="w-full h-56 object-cover  rounded-tr-[120px]"
              />
              <div className="px-10 py-5">
                <h3 className="text-lg font-semibold mb-2">{blog.title}</h3>
                <p className="text-base text-gray-300 mb-4">
                  {new Date(blog.date).toLocaleDateString()} by {blog.author}
                </p>
                {/* <p className="text-gray-300 mb-4 text-[12px]">{blog.description}</p> */}
                <Link
                  href={`/blogs/${blog.slug}`}
                  className="main-color hover:underline font-medium"
                >
                  Read More →
                </Link>
              </div>
            </div>
          ))}
        </div>
        <div className="m-auto w-1/2 md:hidden my-7">
          <AnimatedLink
            href="/blogs"
            content="View All Posts"
            // style={{ background: "#ffffff" }}
          />
        </div>
      </div>
    </section>
  );
};

export default LatestBlogs;
