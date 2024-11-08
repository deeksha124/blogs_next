import React from "react";
import Head from "next/head";
import "../[blog_id]/blog_id.css";

interface Post {
  id: string;
  user_id: string;
  title: string;
  slug: string;
  content: string;
  image: string;
}

interface Props {
  params: {
    blog_id: string;
    slug: string;
  };
}

const BlogPostPage = async ({ params }: Props) => {
  const { blog_id } = params;
  console.log({ blog_id });
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  let post: Post | null = null;
  let error: string | null = null;

  try {
    const response = await fetch(`${apiUrl}/blog/viewblog/${blog_id}`);
    console.log("response----", response);
    if (!response.ok) {
      throw new Error("Failed to fetch post");
    }
    post = await response.json();
    console.log(post);
  } catch (err) {
    console.log(err);
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
        <title>{post.title}</title>
        <meta name="description" content={post.content.substring(0, 160)} />
      </Head>
      <div className="blog-post">
        {post.image && (
          <div className="banner">
            <img src={post.image} alt={post.title} />
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

export async function generateMetadata({
  params,
}: Props): Promise<{ title: string; description: string }> {
  const { blog_id } = params;
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  try {
    const response = await fetch(`${apiUrl}/blog/viewblog/${blog_id}`);

    if (!response.ok) {
      throw new Error("Failed to fetch metadata");
    }

    const post: Post = await response.json();
    // console.log("++++++++++++++++++++++++++++++++++++++");
    console.log(post); // Correct reference to post
    return {
      title: post.title,
      description: post.content.substring(0, 160),
    };
  } catch (err) {
    return {
      title: "Error",
      description: "An error occurred while fetching metadata.",
    };
  }
}

export default BlogPostPage;
