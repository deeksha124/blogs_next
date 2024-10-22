// // app/posts/[blog_id]/page.tsx
// "use client"; 
// import React from 'react';
// import './blog_id.css'; // Import your CSS file

// interface Post {
//   blog_id: string;
//   user_id: string;
//   title: string;
//   slug: string;
//   content: string;
// }

// // Fetch post by ID function
// const fetchPostById = async (blog_id: string): Promise<Post> => {
//   const response = await fetch(`http://192.168.8.237:5000/v1/blog/viewblog/${blog_id}`);

//   if (!response.ok) {
//     throw new Error('Failed to fetch post');
//   }

//   return response.json();
// };

// // BlogPostPage component
// const BlogPostPage: React.FC<{ params: { blog_id: string } }> = async ({ params }) => {
//   const { blog_id } = params;
//   let post: Post | null = null;
//   let error: string | null = null;

//   try {
//     post = await fetchPostById(blog_id);
//   } catch (err) {
//     // Use unknown instead of any
//     if (err instanceof Error) {
//       error = err.message;
//     } else {
//       error = 'An error occurred';
//     }
//   }

//   if (error) {
//     return <div className="error">Error: {error}</div>;
//   }

//   if (!post) {
//     return <div className="error">Post not found.</div>;
//   }

//   return (
//     <div className="blog-post">
//       <h1>{post.title.toUpperCase()}</h1>
//       <p><strong>Blog ID:</strong> {post.blog_id}</p>
//       <p><strong>User ID:</strong> {post.user_id}</p>
//       <p><strong>Slug:</strong> {post.slug}</p>
//       <div className="content">
//         <strong>Content:</strong>
//         {/* <div>{post.content}</div> */}
//         <div style={{ position: "relative" }}>
//           <div dangerouslySetInnerHTML={{ __html: post.content }} />
//         </div>
//       </div>
      
//     </div>
//   );
// };

// export default BlogPostPage;




// app/posts/[blog_id]/page.tsx
"use client"; 
import React from 'react';
import './blog_id.css'; // Import your CSS file

interface Post {
  blog_id: string;
  user_id: string;
  title: string;
  slug: string;
  content: string;
}

// Fetch post by ID function
const fetchPostById = async (blog_id: string): Promise<Post> => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL; // Use the API URL from environment variables
  if (!apiUrl) throw new Error('API URL is not defined');

  const response = await fetch(`${apiUrl}/blog/viewblog/${blog_id}`);

  if (!response.ok) {
    throw new Error('Failed to fetch post');
  }

  return response.json();
};

// BlogPostPage component
const BlogPostPage: React.FC<{ params: { blog_id: string } }> = async ({ params }) => {
  const { blog_id } = params;
  let post: Post | null = null;
  let error: string | null = null;

  try {
    post = await fetchPostById(blog_id);
  } catch (err) {
    if (err instanceof Error) {
      error = err.message;
    } else {
      error = 'An error occurred';
    }
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  if (!post) {
    return <div className="error">Post not found.</div>;
  }

  return (
    <div className="blog-post">
      <h1>{post.title.toUpperCase()}</h1>
      <p><strong>Blog ID:</strong> {post.blog_id}</p>
      <p><strong>User ID:</strong> {post.user_id}</p>
      <p><strong>Slug:</strong> {post.slug}</p>
      <div className="content">
        <strong>Content:</strong>
        <div style={{ position: "relative" }}>
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>
      </div>
    </div>
  );
};

export default BlogPostPage;
