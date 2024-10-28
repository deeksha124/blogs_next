import React from "react";
import Head from "next/head";
import '../[blog_id]/blog_id.css';

interface Post {
  id: string;
  user_id: string;
  title: string;
  slug: string;
  content: string;
  image: string;
}

const BlogPostPage = async ({ params }: { params: { blog_id: string } }) => {
  const { blog_id } = params;
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!apiUrl) {
    return (
      <>
        <Head>
          <title>Error</title>
        </Head>
        <div className="error">Error: API URL is not defined</div>
      </>
    );
  }

  let post: Post | null = null;
  let error: string | null = null;

  try {
    const response = await fetch(`${apiUrl}/blog/viewblog/${blog_id}`);
    
    if (!response.ok) {
      throw new Error("Failed to fetch post");
    }

    post = await response.json();

    console.log(post)
  } catch (err) {
    error = err instanceof Error ? err.message : "An error occurred";
  }

  if (error) {
    return (
      <>
        <Head>
          <title>Error</title>
        </Head>
        <div className="error">Error: {error}</div>
      </>
    );
  }

  if (!post) {
    return (
      <>
        <Head>
          <title>Post Not Found</title>
        </Head>
        <div className="error">Post not found.</div>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>{post.title || "View Content"}</title>
      </Head>
      <div className="blog-post">
        {post.image && (
          <div className="banner">
            <img
              src={post.image}
              alt={post.title}
            />
          </div>
        )}
        <h1>{post.title.toUpperCase()}</h1>
        <div className="content-container">
          <div
            dangerouslySetInnerHTML={{ __html: post.content }}
            className="content"
          />
        </div>
      </div>
    </>
  );
};

export default BlogPostPage;
