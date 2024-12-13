export const metadata = async ({ params }) => {
  const post = getPostBySlug(params.slug);

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      images: [{ url: post.featuredImage, alt: `Image for ${post.title}` }],
    },
    structuredData: {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: post.title,
      image: [post.featuredImage],
      datePublished: post.date,
      author: { "@type": "Person", name: post.author },
      description: post.description,
    },
  };
};
