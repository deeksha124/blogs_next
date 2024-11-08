"use client";
import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode"; // Assuming jwt-decode is installed
import Cookies from "js-cookie"; // Import js-cookie
import "../dashboard/dashboard.css";

// Types for dashboard data
interface Blog {
  blog_id: string;
  user_id: number;
  title: string;
  slug: string;
  content: string | null; // Content can be nullable
  image: string | null;
  createdAt: string;
  updatedAt: string;
}

interface DashboardProps {
  error?: string;
}

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
}

const Dashboard: React.FC<DashboardProps> = ({ error }) => {
  const [user, setUser] = useState<User | null>(null);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [blogCount, setBlogCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    const fetchDashboardData = async () => {
      const token = Cookies.get("token"); // Get token from cookies using js-cookie
      console.log("Token retrieved from cookies:", token); // Debugging log

      if (!token) {
        console.log("No token found, redirecting to login.");
        window.location.replace("/login");
        return;
      }

      try {
        console.log("Token found:", token);
        const decodedToken: any = jwtDecode(token);

        // Optionally check if the token is expired
        const currentTime = Date.now() / 1000; // Current time in seconds
        if (decodedToken.exp < currentTime) {
          console.log("Token expired, redirecting to login.");
          window.location.replace("/login");
          return;
        }

        const response = await fetch(
          "http://localhost:5000/v1/user/dashboard",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`, // Make sure token is in the Authorization header
            },
            credentials: "include", // Ensure cookies are sent with the request
          }
        );

        console.log("response------", response);
        if (!response.ok) {
          throw new Error("Failed to fetch dashboard data");
        }

        const data = await response.json();
        console.log("API response data:", data.data);

        if (data.data && data.data.user && Array.isArray(data.data.blogs)) {
          setUser(data.data.user);
          setBlogs(data.data.blogs);
          setBlogCount(data.data.blogCount || 0);
        } else {
          throw new Error("Invalid response data format");
        }
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "An unexpected error occurred";
        console.error("Error fetching dashboard data:", errorMessage);
        setErrorMessage(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (errorMessage) {
    return <div>Error: {errorMessage}</div>;
  }

  return (
    <div className="dashboard-container">
      <h1>Welcome to your Dashboard</h1>
      {user && (
        <div className="user-info">
          <h2>User Information</h2>
          <p>
            <strong>Name:</strong> {user.name}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Phone:</strong> {user.phone}
          </p>
        </div>
      )}

      <div className="blog-info">
        <h2>Your Blogs</h2>
        <p>
          <strong>Total Blogs:</strong> {blogCount}
        </p>

        <div className="button-group">
          <button
            className="create-blog-button"
            onClick={() => window.location.replace("/addBlog")}
          >
            Create Blog
          </button>

          <button
            className="view-blogs-button"
            onClick={() => window.location.replace("/viewBlogs")}
          >
            View Blogs
          </button>
        </div>

        <div className="blog-list">
          {Array.isArray(blogs) && blogs.length > 0 ? (
            blogs.map((blog) => (
              <div key={blog.blog_id} className="blog-item">
                <h3>{blog.title}</h3>

                <img
                  src={blog.image ? `${blog.image}` : "/default-image.png"}
                  alt={blog.title}
                  style={{
                    width: "100%",
                    height: "auto",
                    maxHeight: "200px",
                    objectFit: "cover",
                  }}
                />

                <a href={`/viewBlogs/${blog.slug}`} className="view-more">
                  View More
                </a>
              </div>
            ))
          ) : (
            <p>No blogs found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
