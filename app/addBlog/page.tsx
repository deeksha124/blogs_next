// "use client";
// import React, { useState } from "react";
// import { useRouter } from "next/navigation";
// import SlateEditor from "../components/Editor";
// import "../addBlog/addBlog.css";
// import Cookies from "js-cookie"; // Import js-cookie

// const CreatePost: React.FC = () => {
//   const [title, setTitle] = useState<string>("");
//   const [content, setContent] = useState<string>("");
//   const [image, setImage] = useState<File | null>(null);
//   const [isPreview, setIsPreview] = useState<boolean>(false);
//   const [loading, setLoading] = useState<boolean>(false);
//   const [errorMessage, setErrorMessage] = useState<string>("");
//   const router = useRouter();

//   const handleSubmit = async () => {
//     if (!title || !content) {
//       setErrorMessage("Title and content cannot be empty.");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("title", title);
//     formData.append("content", content);
//     if (image) {
//       formData.append("image", image);
//     }

//     setLoading(true);
//     setErrorMessage("");

//     try {
//       const apiUrl = process.env.NEXT_PUBLIC_API_URL;
//       if (!apiUrl) throw new Error("API URL is not defined");

//       // Retrieve the token (assuming it's stored in localStorage)
//       const token = Cookies.get("token"); // Get token from cookies using js-cookie
//       console.log("token----", token);
//       if (!token) throw new Error("No token found. Please log in.");

//       const response = await fetch(`${apiUrl}/blog/addblog`, {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${token}`, // Add Bearer token to headers
//         },
//         body: formData,
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.message || "Network response was not ok");
//       }

//       const data = await response.json();
//       setTitle("");
//       setContent("");
//       setImage(null);
//       setIsPreview(false);

//       window.alert(`Post created: ${data.message}`);
//       router.push("/viewBlogs");
//     } catch (error) {
//       setErrorMessage(`Error: ${(error as Error).message}`);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handlePreview = () => {
//     if (content) {
//       setIsPreview(true);
//       setErrorMessage("");
//     } else {
//       setErrorMessage("Content cannot be empty for preview.");
//     }
//   };

//   const handleEdit = () => setIsPreview(false);

//   return (
//     <div className="form-container">
//       <h1>Create a New Blog Post</h1>
//       <div className="form-group">
//         <label htmlFor="title">Post Title:</label>
//         <input
//           type="text"
//           id="title"
//           name="title"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           required
//         />
//       </div>
//       <div className="form-group">
//         <label htmlFor="content">Content:</label>
//         <SlateEditor content={content} onChange={setContent} />
//       </div>
//       <div className="form-group">
//         <label htmlFor="image">Upload Image:</label>
//         <input
//           type="file"
//           id="image"
//           accept="image/*"
//           onChange={(e) => {
//             if (e.target.files) {
//               setImage(e.target.files[0]);
//             }
//           }}
//         />
//       </div>
//       {errorMessage && <div className="error-message">{errorMessage}</div>}
//       <button onClick={handleSubmit} disabled={loading}>
//         {loading ? "Submitting..." : "Submit"}
//       </button>
//       <button type="button" onClick={handlePreview}>
//         Preview
//       </button>

//       {isPreview && content && (
//         <>
//           <h2>Output:</h2>
//           <div
//             style={{
//               border: "1px solid #ccc",
//               padding: "10px",
//               minHeight: "150px",
//             }}
//           >
//             <div dangerouslySetInnerHTML={{ __html: content }} />
//           </div>
//           {image && (
//             <img
//               src={URL.createObjectURL(image)}
//               alt="Preview"
//               style={{ maxWidth: "100%" }}
//             />
//           )}
//           <button type="button" onClick={handleEdit}>
//             Edit
//           </button>
//         </>
//       )}
//     </div>
//   );
// };

// export default CreatePost;

"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import SlateEditor from "../components/Editor";
import "../addBlog/addBlog.css";
import Cookies from "js-cookie"; // Import js-cookie

const CreatePost: React.FC = () => {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  const [isPreview, setIsPreview] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("token"); // Check token from cookies
    if (!token) {
      alert("You must be logged in to create a blog post.");
      router.push("/login"); // Redirect to the login page
    }
  }, [router]);

  const handleSubmit = async () => {
    if (!title || !content) {
      setErrorMessage("Title and content cannot be empty.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    if (image) {
      formData.append("image", image);
    }

    setLoading(true);
    setErrorMessage("");

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      if (!apiUrl) throw new Error("API URL is not defined");

      const token = Cookies.get("token");
      if (!token) throw new Error("No token found. Please log in.");

      const response = await fetch(`${apiUrl}/blog/addblog`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Network response was not ok");
      }

      const data = await response.json();
      setTitle("");
      setContent("");
      setImage(null);
      setIsPreview(false);

      alert(`Post created successfully: ${data.message}`);
      router.push("/viewBlogs");
    } catch (error) {
      setErrorMessage(`Error: ${(error as Error).message}`);
    } finally {
      setLoading(false);
    }
  };

  const handlePreview = () => {
    if (content) {
      setIsPreview(true);
      setErrorMessage("");
    } else {
      setErrorMessage("Content cannot be empty for preview.");
    }
  };

  const handleEdit = () => setIsPreview(false);

  return (
    <div className="form-container">
      <h1>Create a New Blog Post</h1>
      <div className="form-group">
        <label htmlFor="title">Post Title:</label>
        <input
          type="text"
          id="title"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="content">Content:</label>
        <SlateEditor content={content} onChange={setContent} />
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
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      <button onClick={handleSubmit} disabled={loading}>
        {loading ? "Submitting..." : "Submit"}
      </button>
      <button type="button" onClick={handlePreview}>
        Preview
      </button>

      {isPreview && content && (
        <>
          <h2>Output:</h2>
          <div
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              minHeight: "150px",
            }}
          >
            <div dangerouslySetInnerHTML={{ __html: content }} />
          </div>
          {image && (
            <img
              src={URL.createObjectURL(image)}
              alt="Preview"
              style={{ maxWidth: "100%" }}
            />
          )}
          <button type="button" onClick={handleEdit}>
            Edit
          </button>
        </>
      )}
    </div>
  );
};

export default CreatePost;
