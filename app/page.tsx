import React from "react";
import "../app/homePage.css";

interface Blog {
  blog_id: string;
  user_id: number;
  title: string;
  slug: string;
  content: string;
  image: string | null;
  createdAt: string;
  updatedAt: string;
}

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

const HomePage: React.FC<HomePageProps> = async ({ searchParams }) => {
  const page = parseInt(searchParams.page || "1", 10);
  const limit = 10;

  const { blogs, totalPages } = await fetchBlogs(page, limit);

  return (
    <>
      <header>
        <h1>Welcome to the Home Page</h1>
        <nav>
          <a href="/">Home</a> | <a href="/about">About</a>
        </nav>
      </header>

      <div className="blogs-list">
        {blogs.map((blog: Blog) => (
          <div
            key={blog.blog_id}
            className="blog-item"
            style={{
              marginBottom: "20px",
              padding: "10px",
              border: "1px solid #ddd",
              borderRadius: "5px",
            }}
          >
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
              <small>
                Created at: {new Date(blog.createdAt).toLocaleString()}
              </small>
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
