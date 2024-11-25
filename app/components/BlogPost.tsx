// import React from "react";
// import Comment from "./Comment";

// interface Blog {
//   blog_id: string;
//   user_id: number;
//   title: string;
//   slug: string;
//   content: string;
//   image: string | null;
//   createdAt: string;
//   updatedAt: string;
//   comments: {
//     username: string;
//     comment: string;
//     createdAt: string;
//   }[];
// }

// function BlogPost({ blog }: { blog: Blog }) {
//   return (
//     <div
//       key={blog.blog_id}
//       className="blog-item"
//       style={{
//         marginBottom: "20px",
//         padding: "10px",
//         border: "1px solid #ddd",
//         borderRadius: "5px",
//       }}
//     >
//       <h2>{blog.title}</h2>

//       <p>
//         {blog.content.length > 100
//           ? `${blog.content.substring(0, 100)}...`
//           : blog.content}
//       </p>

//       {blog.image && (
//         <img
//           src={blog.image}
//           alt={blog.title}
//           className="blog-image"
//           style={{
//             width: "100%",
//             height: "auto",
//             maxHeight: "200px",
//             objectFit: "cover",
//             borderRadius: "5px",
//           }}
//         />
//       )}

//       <div className="created-at">
//         <small>Created at: {new Date(blog.createdAt).toLocaleString()}</small>
//       </div>

//       <a
//         href={`/viewBlogs/${blog.slug}`}
//         className="view-more"
//         style={{
//           color: "#007bff",
//           textDecoration: "none",
//           fontWeight: "bold",
//         }}
//       >
//         View More
//       </a>

//       {/* Pass the comments prop */}
//       <Comment blogId={blog.blog_id} initialComments={blog.comments} />
//     </div>
//   );
// }

// export default BlogPost;

// // ===============================================

import React from "react";
import Comment from "./Comment";
import FavoriteButton from "./FavoriteButton";

// interface Blog {
//   blog_id: string;
//   user_id: number;
//   title: string;
//   slug: string;
//   content: string;
//   image: string | null;
//   createdAt: string;
//   updatedAt: string;
//   comments: {
//     username: string;
//     comment: string;
//     createdAt: string;
//   }[];
// }

interface Blog {
  blog_id: string;
  user_id: number;
  title: string;
  slug: string;
  content: string;
  image: string | null;
  likeCount: number;
  createdAt: string;
  updatedAt: string;
  comments: {
    comment_id: string;
    username: string;
    comment: string;
    createdAt: string;
    replies: {
      comment_id: string;
      username: string;
      comment: string;
      createdAt: string;
    }[];
  }[];
}

function BlogPost({ blog }: { blog: Blog }) {
  // console.log("++++++++++++++++++++", blog.comments);
  return (
    <div
      key={blog.blog_id}
      className="blog-item"
      style={{
        position: "relative", // Required for positioning the favorite button
        marginBottom: "20px",
        padding: "10px",
        border: "1px solid #ddd",
        borderRadius: "5px",
      }}
    >
      {/* Favorite Button at the top-right */}
      <div style={{ position: "absolute", top: "10px", right: "10px" }}>
        <FavoriteButton blog_id={blog.blog_id} />
      </div>

      <h2>{blog.title}</h2>

      <p>
        {blog.content.length > 100
          ? `${blog.content.substring(0, 100)}...`
          : blog.content}
      </p>

      {blog.image && (
        <img
          src={blog.image}
          alt={blog.title}
          className="blog-image"
          style={{
            width: "100%",
            height: "auto",
            maxHeight: "200px",
            objectFit: "cover",
            borderRadius: "5px",
          }}
        />
      )}

      <div className="created-at">
        <small>Created at: {new Date(blog.createdAt).toLocaleString()}</small>
      </div>

      <a
        href={`/viewBlogs/${blog.slug}`}
        className="view-more"
        style={{
          color: "#007bff",
          textDecoration: "none",
          fontWeight: "bold",
        }}
      >
        View More
      </a>

      <Comment blogId={blog.blog_id} initialComments={blog.comments} />
    </div>
  );
}

export default BlogPost;
