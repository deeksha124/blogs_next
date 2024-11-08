import React from "react";
import BlogActions from "./BlogActions"; // Adjust path if needed
import "./view.css";
import { cookies } from "next/headers";

interface Post {
  blog_id: string;
  title: string;
}

interface Props {
  posts: Post[];
  error?: string;
}

// Component to display blog posts
const ViewBlogsPage: React.FC<Props> = ({ posts, error }) => {
  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="blog-posts">
      <h1>Your Blogs</h1>
      <ol>
        {posts.map((post, index) => (
          <li
            key={post.blog_id}
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "10px",
            }}
          >
            <span style={{ flex: 1 }}>
              {index + 1}. {post.title}
            </span>
            <BlogActions post={post} />
          </li>
        ))}
      </ol>
    </div>
  );
};

// Function to fetch posts from the API with token authentication (GET request)
async function fetchPosts(): Promise<{ posts: Post[]; error?: string }> {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;

  console.log("======", token);

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!apiUrl) {
    console.error("API URL is not defined");
    return { posts: [], error: "API URL is not defined" };
  }

  // Log API URL and token for debugging
  console.log("API URL:", apiUrl);
  console.log("Token:", token);

  try {
    const response = await fetch(`${apiUrl}/blog/viewblogslist`, {
      method: "GET", // Set the request method to GET
      headers: {
        Authorization: `Bearer ${token}`, // Include token in Authorization header
        "Content-Type": "application/json", // Content-Type for the request
      },
      credentials: "include", // Ensure cookies are sent with the request
    });
    console.log("=====1", response);
    if (!response.ok) {
      const errorDetails = await response.text(); // Get more details from the API response
      console.error("API Error:", errorDetails);
      throw new Error("Failed to fetch posts");
    }

    const data: Post[] = await response.json();
    return { posts: data };
  } catch (error) {
    console.error("Error fetching posts:", error);
    return { posts: [], error: "Failed to load posts" };
  }
}

// Server Component (async function to fetch and render data)
const Page = async () => {
  const { posts, error } = await fetchPosts();
  return <ViewBlogsPage posts={posts} error={error} />;
};

// Metadata generation (this works in Next.js 13 with the App Directory)
export const metadata = {
  title: "View Blogs",
  description: "A list of your blog posts",
};

export default Page;
