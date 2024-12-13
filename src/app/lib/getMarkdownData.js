// import fs from "fs";
// import path from "path";
// import matter from "gray-matter";

// const postsDirectory = path.join(process.cwd(), "posts");

// export function getSortedPostsData() {
//   if (!fs.existsSync(postsDirectory)) {
//     console.warn("The posts directory does not exist.");
//     return [];
//   }

//   const fileNames = fs.readdirSync(postsDirectory);
//   const allPostsData = fileNames.map((fileName) => {
//     const id = fileName.replace(/\.md$/, "");
//     const fullPath = path.join(postsDirectory, fileName);
//     const fileContents = fs.readFileSync(fullPath, "utf8");
//     const { data } = matter(fileContents);

//     return {
//       id,
//       ...data,
//     };
//   });

//   return allPostsData.sort((a, b) => new Date(b.date) - new Date(a.date));
// }



import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "posts");

export function getPostBySlug(slug) {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  if (!fs.existsSync(fullPath)) {
    console.warn(`Post with slug '${slug}' not found.`);
    return null;
  }
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    slug,
    ...data,
    content,
  };
}
