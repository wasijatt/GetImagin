

// import Head from 'next/head'
// import { getPostBySlug, getAllPosts } from '../../lib/posts'

// export default function BlogPost({ post }) {
//   return (
//     <>
//       <Head>
//         <title>{post.title} - My Blog</title>
//         <meta name="description" content={post.description} />
//         <meta property="og:title" content={post.title} />
//         <meta property="og:description" content={post.description} />
//         <meta property="og:image" content={post.featuredImage} />
//         <meta property="og:url" content={`https://yourdomain.com/blog/${post.slug}`} />
//         <meta name="twitter:card" content="summary_large_image" />
//         <meta name="twitter:title" content={post.title} />
//         <meta name="twitter:description" content={post.description} />
//         <meta name="twitter:image" content={post.featuredImage} />
//       </Head>
//       <div>
//         <h1>{post.title}</h1>
//         <p>{post.date} by {post.author}</p>
//         <div>
//           <img src={post.featuredImage} alt={post.title} />
//         </div>
//         <div dangerouslySetInnerHTML={{ __html: post.content }} />
//       </div>
//     </>
//   )
// }

// export async function getStaticPaths() {
//   const posts = await getAllPosts()
//   const paths = posts.map(post => ({
//     params: { slug: post.slug }
//   }))

//   return {
//     paths,
//     fallback: true
//   }
// }

// export async function getStaticProps({ params }) {
//   const post = await getPostBySlug(params.slug)
//   return {
//     props: {
//       post
//     }
//   }
// }



// ./src/app/blogs/[slug]/page.js

// import { getPostBySlug } from "../../lib/api"; // adjust the import based on your project structure

// // React Server Component: Fetching data inside the component
// export default async function BlogPost({ params }) {
//   const post = await getPostBySlug(params.slug);  // Fetch post data using slug
  
//   return (
//     <div>
//       <h1>{post.title}</h1>
//       <p>{post.content}</p>
//       {/* Render other post details */}
//     </div>
//   );
// }

// // This will pre-render dynamic routes at build time
// export async function generateStaticParams() {
//   // Assuming you have a function that returns all available slugs
//   const slugs = await getAllPostSlugs();
//   return slugs.map(slug => ({
//     slug: slug,
//   }));
// }
