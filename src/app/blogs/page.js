// // src/app/blogs/page.js

// export default async function BlogPage() {
//     const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/blogs`);
//     if (!res.ok) {
//       return <div>Error fetching blogs. Please try again later.</div>;
//     }
  
//     const blogs = await res.json();
    
//     return (
//       <div>
//         <h1>Blog Posts</h1>
//         <ul>
//           {blogs.map((blog) => (
//             <li key={blog._id}>
//               <h2>{blog.title}</h2>
//               <p>{blog.content}</p>
//               <p>{new Date(blog.publishedAt).toLocaleDateString()}</p>
//             </li>
//           ))}
//         </ul>
//       </div>
//     );
//   }
  