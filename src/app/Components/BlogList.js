// src/components/BlogList.js
import Link from 'next/link';

export default function BlogList({ blogs }) {
  return (
    <ul>
      {blogs.map((blog) => (
        <li key={blog._id}>
          <Link href={`/blog/${blog._id}`}>
            <a>
              <h2>{blog.title}</h2>
              <p>{blog.author}</p>
            </a>
          </Link>
        </li>
      ))}
    </ul>
  );
}
