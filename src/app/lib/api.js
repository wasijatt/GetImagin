
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