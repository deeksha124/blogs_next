// import React from "react";
// import Head from "next/head";
// import { GetServerSideProps } from "next"; // Import GetServerSideProps

// interface Post {
//   id: string;
//   user_id: string;
//   title: string;
//   slug: string;
//   content: string;
//   image: string;
// }

// interface BlogPostPageProps {
//   post: Post | null;
//   error: string | null;
// }

// const BlogPostPage: React.FC<BlogPostPageProps> = ({ post, error }) => {
//   if (error) {
//     return (
//       <>
//         <Head>
//           <title>Error</title>
//         </Head>
//         <div className="error">Error: {error}</div>
//       </>
//     );
//   }

//   if (!post) {
//     return (
//       <>
//         <Head>
//           <title>Post Not Found</title>
//         </Head>
//         <div className="error">Post not found.</div>
//       </>
//     );
//   }

//   return (
//     <>
//       <Head>
//         <title>{post.title || "View Content"}</title>
//       </Head>
//       <div className="blog-post">
//         <h1>{post.title.toUpperCase()}</h1>
//         <div className="content-container">
//           <div
//             dangerouslySetInnerHTML={{ __html: post.content }}
//             className="content"
//           />
//           {post.image && (
//             <img
//               src={post.image}
//               alt={post.title}
//               style={{
//                 width: "50%",
//                 height: "auto",
//                 margin: "0 auto", // Centers horizontally
//                 display: "flex",
//                 alignItems: "center", // Centers vertically if the parent has a height
//                 justifyContent: "center", // Centers horizontally if the parent has a height
//               }}
//             />
//           )}
//         </div>
//       </div>
//     </>
//   );
// };

// // Implement getServerSideProps for server-side rendering
// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const { blog_id } = context.params as { blog_id: string }; // Get blog_id from params
//   const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  
//   if (!apiUrl) {
//     return {
//       props: {
//         post: null,
//         error: "API URL is not defined",
//       },
//     };
//   }

//   try {
//     const response = await fetch(`${apiUrl}/blog/viewblog/${blog_id}`);
    
//     if (!response.ok) {
//       throw new Error("Failed to fetch post");
//     }

//     const post = await response.json();

//     return {
//       props: {
//         post,
//         error: null,
//       },
//     };
//   } catch (err) {
//     return {
//       props: {
//         post: null,
//         error: err instanceof Error ? err.message : "An error occurred",
//       },
//     };
//   }
// };


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
