"use client"; // Mark this file as a Client Component

import React, { useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import SlateEditor from "../components/Editor"; // Assuming you have this component
import Cookies from "js-cookie";

interface Post {
  blog_id: string;
  user_id: string;
  title: string;
  slug: string;
  content: string;
  image: string;
}

interface UpdateBlogFormProps {
  post: Post;
}

const UpdateBlogForm: React.FC<UpdateBlogFormProps> = ({ post }) => {
  console.log("post------>>>>", post);
  const [content, setContent] = useState(post.content); // Manage content for the form
  const [image, setImage] = useState<File | null>(null); // Manage image file

  // Handle content change from SlateEditor
  const handleContentChange = (newContent: string) => {
    setContent(newContent);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("blog_id", post.blog_id);
    formData.append("title", post.title);
    formData.append("content", content); // Use the updated content

    if (image) {
      formData.append("image", image);
    }

    console.log("formData----??????????????", formData);

    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    // const token = Cookies.get("token")?.value; // Retrieve token from cookies
    const token = Cookies.get("token");

    if (apiUrl && token) {
      const response = await fetch(`${apiUrl}/blog/edit`, {
        method: "PUT",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`, // Include token in headers
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Update failed:", errorText);
        toast.error("Update failed. Please try again.");
      } else {
        console.log("Update successful");
        toast.success("Update Successful!");

        // Redirect after success
        setTimeout(() => {
          window.location.href = "/viewBlogs"; // Redirect to a list of blogs after successful update
        }, 1500);
      }
    } else {
      toast.error("Authorization token is missing.");
    }
  };

  return (
    <>
      <Toaster />
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input type="text" value={post.title} readOnly />
        </div>
        <div>
          <label>Content:</label>
          <SlateEditor content={content} onChange={handleContentChange} />
        </div>
        <div className="form-group">
          <label htmlFor="image">Upload Image:</label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={(e) => {
              if (e.target.files) {
                setImage(e.target.files[0]);
              }
            }}
          />
        </div>
        {post.image && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "1rem",
            }}
          >
            <h4>Current Image:</h4>
            <img
              src={post.image}
              alt="Current"
              style={{
                width: "80%", // Controls image width to 80% of the container
                height: "auto", // Maintains the aspect ratio of the image
                borderRadius: "10px", // Optional: rounded corners for the image
              }}
            />
          </div>
        )}
        <div
          style={{
            display: "flex",
            justifyContent: "center", // Centering the button horizontally
            padding: "1rem", // Padding around the button
          }}
        >
          <button
            type="submit"
            style={{
              padding: "0.8rem 2rem",
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontSize: "1rem",
            }}
          >
            Edit
          </button>
        </div>
      </form>
    </>
  );
};

export default UpdateBlogForm;
