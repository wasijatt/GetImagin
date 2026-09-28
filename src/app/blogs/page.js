import Link from "next/link";
import { getSortedPostsData } from "../lib/api";
import Image from "next/image";
import Header from "../Components/Header";
import Footer from "../Components/Footer";

export const metadata = {
  title: "Insights & Articles — Web Design, Branding & Web3 | Get Imagin",
  description:
    "Explore our latest design guides, branding strategies, Web3 development tutorials, and creative industry insights from the Get Imagin team.",
  alternates: {
    canonical: "/blogs",
  },
  openGraph: {
    title: "Insights & Articles — Web Design, Branding & Web3 | Get Imagin",
    description:
      "Explore design guides, branding strategies, and Web3 development insights from the Get Imagin team.",
    url: "https://getimagin.com/blogs",
    siteName: "Get Imagin Blog",
    type: "website",
  },
};

export default function BlogPage() {
  const blogs = getSortedPostsData();

  return (
    <>
      <Header />
      <main className="py-12 px-6 md:px-12 max-w-7xl mx-auto min-h-screen">
        <h1 className="text-3xl md:text-5xl font-bold mb-4">Latest Insights & Articles</h1>
        <p className="text-gray-400 text-lg mb-10 max-w-2xl">
          Deep dives into modern web design, brand strategy, creative technology, and Web3 experiences.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <Link
              key={blog.slug}
              href={`/blogs/${blog.slug}`}
              className="shadow-md rounded-lg overflow-hidden border border-neutral-800 hover:border-neutral-700 transition-all block group"
            >
              <div className="overflow-hidden">
                <Image
                  src={blog.featuredImage || "/HeaderLogo/Getimagin.png"}
                  width={800}
                  height={450}
                  alt={`Featured image for ${blog.title}`}
                  className="rounded-t-lg group-hover:scale-105 transition-transform duration-300 w-full object-cover aspect-video"
                  priority={true}
                />
              </div>
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-2 group-hover:text-emerald-400 transition-colors">
                  {blog.title}
                </h2>
                {blog.description && (
                  <p className="text-gray-400 text-sm line-clamp-2">{blog.description}</p>
                )}
              </div>
            </Link>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
