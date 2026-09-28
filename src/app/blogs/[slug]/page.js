import { getPostBySlug, getSortedPostsData } from "../../lib/api";
import Header from "@/app/Components/Header";
import Footer from "@/app/Components/Footer";
import Link from "next/link";
import { FaArrowLeftLong } from "react-icons/fa6";

export async function generateStaticParams() {
  const posts = getSortedPostsData();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const post = getPostBySlug(resolvedParams.slug);

  if (!post) {
    return {
      title: "Post Not Found | Get Imagin Blog",
      description: "The requested blog article could not be found.",
    };
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://getimagin.com";
  const canonicalUrl = `${siteUrl}/blogs/${resolvedParams.slug}`;

  return {
    title: `${post.title} | Get Imagin Blog`,
    description: post.description || "Read insights and articles on web design, branding, and digital innovation.",
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      url: canonicalUrl,
      type: "article",
      publishedTime: post.date,
      authors: [post.author || "Get Imagin"],
      images: [
        {
          url: post.featuredImage || "/HeaderLogo/Getimagin.png",
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [post.featuredImage || "/HeaderLogo/Getimagin.png"],
    },
  };
}

export default async function BlogPost({ params }) {
  const resolvedParams = await params;
  const post = getPostBySlug(resolvedParams.slug);

  if (!post) {
    return (
      <main className="min-h-screen text-center py-20">
        <h1 className="text-3xl font-bold">Post not found</h1>
        <Link className="mt-4 inline-block text-cyan-400" href="/blogs">
          Back to Blogs
        </Link>
      </main>
    );
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://getimagin.com";
  const canonicalUrl = `${siteUrl}/blogs/${resolvedParams.slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    image: post.featuredImage ? [`${siteUrl}${post.featuredImage}`] : [`${siteUrl}/HeaderLogo/Getimagin.png`],
    datePublished: post.date,
    dateModified: post.date,
    author: {
      "@type": "Person",
      name: post.author || "Get Imagin",
    },
    publisher: {
      "@type": "Organization",
      name: "Get Imagin",
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/HeaderLogo/Getimagin.png`,
      },
    },
    description: post.description,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": canonicalUrl,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main>
        <Header />
        <article className="max-w-4xl mx-auto px-6 md:px-10 py-12">
          <Link className="my-10 main-color inline-flex items-center text-sm md:text-base font-semibold" href={"/blogs"}>
            <FaArrowLeftLong className="mr-2" /> Back to all articles
          </Link>
          <h1 className="text-3xl md:text-5xl font-bold my-6 leading-tight">{post.title}</h1>
          <p className="text-gray-400 text-lg mb-8">{post.description}</p>
          <div
            className="!text-white prose prose-invert max-w-none leading-relaxed"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>
        <Footer />
      </main>
    </>
  );
}
