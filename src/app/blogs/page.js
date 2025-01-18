
import Link from "next/link";
import { getSortedPostsData } from "../lib/api";
import Image from "next/image";
import Header from "../Components/Header";
import AnimatedLink from "../Components/AnimatedLink";
import Footer from "../Components/Footer";
export default function BlogPage() {
  const blogs = getSortedPostsData();

  return (
    <>
      <Header />
      <section className="py-12">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold px-8 mb-8">Latest Articles</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogs.map((blog) => (
              <Link key={blog.slug} 
              href={`/blogs/${blog.slug}`} className="shadow-md rounded-lg">

                <Image
                src={blog.featuredImage}
                width={800}
                height={450}
                alt={`Featured image for ${blog.title}`}
                className="rounded-lg mb-6"
                priority={true}
                placeholder="blur"
                blurDataURL="/path/to/placeholder"
                />
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-2 break-words">{blog.title}</h2>
                  {/* <p className="text-gray-400 text-sm mb-4">
                    {new Date(blog.date).toLocaleDateString()} by {blog.author}
                  </p>
                  <p className="text-gray-400 mb-4">{blog.description.slice(0,100)}</p>
                  <div>
                    <AnimatedLink
                      href={`/blogs/${blog.slug}`}
                      content="Explore More"
                      style={{ background: "black", fontSize: "16px" }}
                    />
                  </div> */}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
<Footer/>
    </>
  );
}
