import { getPostBySlug ,getSortedPostsData } from "../../lib/api";
import Head from "next/head";
import Header from "@/app/Components/Header";

export default async function BlogPost({ params }) {
  // Await params to ensure slug is accessible
  const resolvedParams = await params;
  const post = getPostBySlug(resolvedParams.slug);

  if (!post) {
    return <h1>Post not found</h1>;
  }

  // Generate JSON-LD structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    image: [post.featuredImage],
    datePublished: post.date,
    author: {
      "@type": "Person",
      name: post.author,
    },
    description: post.description,
  };

  return (
    <>

      <Head>
        <title>{post.title}</title>
        <meta name="description" content={post.description} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>
      <Header/>
      <div className="max-w-4xl  mx-auto px-10 py-12">
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        <p className=" mb-8">{post.description}</p>
        <div
          className=" !text-white prose"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </div>
    </>
  );
}

export async function generateStaticParams() {
  const posts = getSortedPostsData();
  return posts.map((post) => ({ slug: post.slug }));
}
