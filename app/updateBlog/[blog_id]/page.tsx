// import React from "react";
// import { notFound } from "next/navigation";
// import UpdateBlogForm from "../../components/UpdateBlogForm"; // Import the Client Component

// interface Post {
//   blog_id: string;
//   user_id: string;
//   title: string;
//   slug: string;
//   content: string;
//   image: string;
// }

// // Function to fetch the post data server-side
// async function fetchPostById(blog_id: string): Promise<Post | null> {
//   const apiUrl = process.env.NEXT_PUBLIC_API_URL;
//   if (!apiUrl) throw new Error("API URL is not defined");
//   const response = await fetch(`${apiUrl}/blog/viewblog/${blog_id}`);
//   if (response.ok) {
//     return await response.json();
//   }
//   return null; // Return null if not found
// }

// // This is the Server Component
// export default async function Page({
//   params,
// }: {
//   params: { blog_id: string };
// }) {
//   const { blog_id } = params;

//   // Fetch the post data server-side
//   const post = await fetchPostById(blog_id);

//   if (!post) {
//     notFound(); // Redirect to 404 if post is not found
//   }

//   return <UpdateBlogForm post={post} />;
// }

import React from "react";
import { notFound } from "next/navigation";
import UpdateBlogForm from "../../components/UpdateBlogForm";
import { cookies } from "next/headers";

interface Post {
  blog_id: string;
  user_id: string;
  title: string;
  slug: string;
  content: string;
  image: string;
}

// Function to fetch the post data server-side
async function fetchPostById(blog_id: string): Promise<Post | null> {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;
  console.log("token-----", token);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!apiUrl) {
    console.error("API URL is not defined");
    return null;
  }

  try {
    const response = await fetch(`${apiUrl}/blog/viewblog/${blog_id}`, {
      method: "GET", // Corrected to GET
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (!response.ok) {
      console.error("Failed to fetch post:", await response.text());
      return null;
    }

    return (await response.json()) as Post;
  } catch (error) {
    console.error("Error fetching post:", error);
    return null;
  }
}

// This is the Server Component
export default async function Page({
  params,
}: {
  params: { blog_id: string };
}) {
  const { blog_id } = params;

  // Fetch the post data server-side
  const post = await fetchPostById(blog_id);

  if (!post) {
    notFound(); // Redirect to 404 if post is not found
  }

  return <UpdateBlogForm post={post} />;
}
