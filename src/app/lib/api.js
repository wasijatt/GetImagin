// import fs from "fs";
// import path from "path";
// import matter from "gray-matter";

// const postsDirectory = path.join(process.cwd(), "posts");

// // Fetch sorted posts for listing
// export function getSortedPostsData() {
//   if (!fs.existsSync(postsDirectory)) {
//     console.warn("The posts directory does not exist.");
//     return [];
//   }

//   const fileNames = fs.readdirSync(postsDirectory);
//   return fileNames
//     .map((fileName) => {
//       const id = fileName.replace(/\.md$/, ""); // Remove .md extension
//       const fullPath = path.join(postsDirectory, fileName);
//       const fileContents = fs.readFileSync(fullPath, "utf8");
//       const { data } = matter(fileContents);
//       return { id, ...data };
//     })
//     .sort((a, b) => new Date(b.date) - new Date(a.date));
// }

// // Fetch a single post by slug
// export function getPostBySlug(slug) {
//   const fullPath = path.join(postsDirectory, `${slug}.md`);
//   if (!fs.existsSync(fullPath)) {
//     console.warn(`Post with slug '${slug}' not found.`);
//     return null;
//   }
//   const fileContents = fs.readFileSync(fullPath, "utf8");
//   const { data, content } = matter(fileContents);
//   return { slug, ...data, content };
// }



// src/lib/api.js

// import fs from "fs";
// import path from "path";
// import matter from "gray-matter";

// const postsDirectory = path.join(process.cwd(), "posts");

// // Function to fetch a post by slug
// export function getPostBySlug(slug) {
//   const fullPath = path.join(postsDirectory, `${slug}.md`);
//   if (!fs.existsSync(fullPath)) {
//     console.warn(`Post with slug '${slug}' not found.`);
//     return null;
//   }
//   const fileContents = fs.readFileSync(fullPath, "utf8");
//   const { data, content } = matter(fileContents);
//   return { slug, ...data, content };
// }

// // Other related functions
// export function getSortedPostsData() {
//   const fileNames = fs.readdirSync(postsDirectory);
//   return fileNames.map((fileName) => {
//     const slug = fileName.replace(/\.md$/, "");
//     const fullPath = path.join(postsDirectory, fileName);
//     const fileContents = fs.readFileSync(fullPath, "utf8");
//     const { data } = matter(fileContents);
//     return { slug, ...data };
//   });
// }


import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";

const postsDirectory = path.join(process.cwd(), "posts");

// Get all post slugs
export function getAllPostSlugs() {
  return fs.readdirSync(postsDirectory).map((fileName) => fileName.replace(/\.md$/, ""));
}

// Get data and parsed content for a specific post
export function getPostBySlug(slug) {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  // Convert markdown to HTML
  const htmlContent = marked(content);

  return { slug, ...data, content: htmlContent };
}

// Get sorted posts for listing

export function getSortedPostsData() {
  const slugs = getAllPostSlugs();
  return slugs
    .map((slug) => getPostBySlug(slug))
    .sort((a, b) => new Date(b.date) - new Date(a.date));
}