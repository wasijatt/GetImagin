// src/lib/metadata.js
// export function generatePostMetadata(post) {
//     return {
//       title: post.title,
//       description: post.description,
//       openGraph: {
//         title: post.title,
//         description: post.description,
//         images: [
//           {
//             url: post.featuredImage,
//             alt: `Image for ${post.title}`,
//           },
//         ],
//       },
//     };
//   }
  


export async function generateMetadata({ params }) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    return {
      title: "Post Not Found",
      description: "The post you are looking for does not exist.",
      openGraph: {
        title: "Post Not Found",
        description: "The post you are looking for does not exist.",
      },
    };
  }

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      images: [{ url: post.featuredImage, alt: `Image for ${post.title}` }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [post.featuredImage],
    },
  };
}
