import React from "react";
import "../app/homePage.css";
import BlogPost from "./components/BlogPost";
import Header from "./components/Header";
import LikeButton from "../app/components/LikeButton"; // Import the LikeButton

// interface Blog {
//   blog_id: string;
//   user_id: number;
//   title: string;
//   slug: string;
//   content: string;
//   image: string | null;
//   likeCount: number;
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

// Fetch blogs server-side
async function fetchBlogs(
  page: number,
  limit: number
): Promise<{ blogs: Blog[]; totalPages: number }> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const response = await fetch(
    `${apiUrl}/user/homepage?page=${page}&limit=${limit}`,
    { cache: "no-store" }
  );
  const data = await response.json();

  if (data.error === false && data.data.blogs) {
    return {
      blogs: data.data.blogs,
      totalPages: data.data.totalPages,
    };
  } else {
    return { blogs: [], totalPages: 0 };
  }
}

interface HomePageProps {
  searchParams: { page?: string };
}

// Server-rendered HomePage component
const HomePage: React.FC<HomePageProps> = async ({ searchParams }) => {
  const page = parseInt(searchParams.page || "1", 10);
  const limit = 10;

  const { blogs, totalPages } = await fetchBlogs(page, limit);

  return (
    <>
      <header>
        <Header />
      </header>

      <div className="blogs-list">
        {blogs.map((blog: Blog) => (
          <div key={blog.blog_id} className="blog-post">
            <BlogPost blog={blog} />
            <LikeButton blog_id={blog.blog_id} initialLikes={blog.likeCount} />
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div
        className="pagination"
        style={{ textAlign: "center", margin: "20px 0" }}
      >
        <a
          href={`?page=${page - 1}`}
          style={{
            margin: "0 5px",
            padding: "5px 10px",
            cursor: page === 1 ? "not-allowed" : "pointer",
            color: page === 1 ? "gray" : "#007bff",
          }}
        >
          Previous
        </a>

        <span style={{ margin: "0 10px" }}>
          Page {page} of {totalPages}
        </span>

        <a
          href={`?page=${page + 1}`}
          style={{
            margin: "0 5px",
            padding: "5px 10px",
            cursor: page === totalPages ? "not-allowed" : "pointer",
            color: page === totalPages ? "gray" : "#007bff",
          }}
        >
          Next
        </a>
      </div>
    </>
  );
};

export default HomePage;
