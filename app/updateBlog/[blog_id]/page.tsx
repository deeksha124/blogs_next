// "use client"; 
// import React, { useState } from 'react';
// import SlateEditor from '../../components/Editor'; // Adjust the path if necessary
// import "../[blog_id]/updateBlog.css";

// const UpdatePost: React.FC = () => {
//   const [title, setTitle] = useState<string>('');
//   const [content, setContent] = useState<string>(''); // HTML content
//   const [image, setImage] = useState<File | null>(null); // State for the image
//   const [isPreview, setIsPreview] = useState<boolean>(false); // Preview state
//   const [loading, setLoading] = useState<boolean>(false); // Loading state
//   const [errorMessage, setErrorMessage] = useState<string>(''); // Error message state

//   const handleSubmit = async () => {
//     // Validate inputs
//     if (!title || !content) {
//       setErrorMessage("Title and content cannot be empty.");
//       return;
//     }

//     const formData = new FormData();
//     formData.append('title', title);
//     formData.append('content', content);
//     if (image) {
//       formData.append('image', image);
//     }

//     setLoading(true);
//     setErrorMessage(''); // Reset error message

//     try {
//       const apiUrl = process.env.NEXT_PUBLIC_API_URL; // Ensure you're using NEXT_PUBLIC_
//       if (!apiUrl) throw new Error('API URL is not defined');

//       const response = await fetch(`${apiUrl}/blog/addblog`, {
//         method: 'POST',
//         body: formData,
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.message || 'Network response was not ok');
//       }

//       const data = await response.json();
//       setTitle('');
//       setContent('');
//       setImage(null); // Reset image state
//       setIsPreview(false);
//       window.alert(`Post created: ${data.message}`);

//     } catch (error) {
//       setErrorMessage(`Error: ${(error as Error).message}`);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handlePreview = () => {
//     if (content) {
//       setIsPreview(true);
//       setErrorMessage(''); // Reset error message if preview is valid
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
//         {loading ? 'Submitting...' : 'Submit'}
//       </button>
//       <button type="button" onClick={handlePreview}>Preview</button>

//       {isPreview && content && (
//         <>
//           <h2>Output:</h2>
//           <div style={{ border: '1px solid #ccc', padding: '10px', minHeight: '150px' }}>
//             <div dangerouslySetInnerHTML={{ __html: content }} />
//           </div>
//           {image && <img src={URL.createObjectURL(image)} alt="Preview" style={{ maxWidth: '100%' }} />}
//           <button type="button" onClick={handleEdit}>Edit</button>
//         </>
//       )}
//     </div>
//   );
// };










// "use client";
// import React, { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';
// import Head from 'next/head';
// import "../[blog_id]/updateBlog.css";
// import SlateEditor from '../../components/Editor';
// import { toast, Toaster } from 'react-hot-toast';

// interface Post {
//   blog_id: string;
//   user_id: string;
//   title: string;
//   slug: string;
//   content: string;
//   image: string;
// }

// const UpdateBlogPage: React.FC<{ params: { blog_id: string } }> = ({ params }) => {
//   const router = useRouter();
//   const { blog_id } = params;
//   const [post, setPost] = useState<Post | null>(null);
//   const [error, setError] = useState<string | null>(null);
//   const [content, setContent] = useState<string>(''); // HTML content
//   const [image, setImage] = useState<File | null>(null); // New image file

//   const fetchPostById = async (blog_id: string) => {
//     const apiUrl = process.env.NEXT_PUBLIC_API_URL;
//     if (!apiUrl) throw new Error('API URL is not defined');
//     const response = await fetch(`${apiUrl}/blog/viewblog/${blog_id}`);
//     if (!response.ok) {
//       const errorText = await response.text();
//       console.error('Error fetching post:', errorText); // Log the error response
//       throw new Error('Failed to fetch post');
//     }
//     return response.json();
//   };

//   useEffect(() => {
//     const getPost = async () => {
//       try {
//         const fetchedPost = await fetchPostById(blog_id);
//         if (!fetchedPost) {
//           throw new Error('Post not found');
//         }
//         setPost(fetchedPost);
//         setContent(fetchedPost.content); // Set existing content
//         setImage(null); // Reset image state on fetch
//       } catch (err) {
//         console.error('Error fetching post:', err); // Log error
//         setError(err instanceof Error ? err.message : 'An error occurred');
//       }
//     };

//     getPost();
//   }, [blog_id]);

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
//         <div>Blog ID: {blog_id}</div> {/* Display blog_id for debugging */}
//       </>
//     );
//   }

//   const handleSubmit = async (event: React.FormEvent) => {
//     event.preventDefault();

//     const formData = new FormData();
//     formData.append('blog_id', blog_id);
//     formData.append('title', post.title);
//     formData.append('content', content || post.content);

//     // Only append image if a new one is selected
//     if (image) {
//       formData.append('image', image);
//     }

//     const apiUrl = process.env.NEXT_PUBLIC_API_URL;
//     if (apiUrl) {
//       const response = await fetch(`${apiUrl}/blog/edit`, {
//         method: 'PUT',
//         body: formData,
//       });

//       if (!response.ok) {
//         const errorText = await response.text();
//         console.error('Update failed:', errorText); // Log the error response
//         toast.error("Update failed. Please try again."); // Show error toast
//       } else {
//         console.log('Update successful');
//         toast.success("Update Successful!"); // Show success toast

//         // Delay redirect to allow toast message to show
//         setTimeout(() => {
//           router.push(`/viewBlogs`);
//         }, 1500); // Redirect after 1.5 seconds
//       }
//     }
//   };

//   return (
//     <>
//       <Toaster />
//       <Head>
//         <title>Update Post: {post.title}</title>
//       </Head>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Title:</label>
//           <input
//             type="text"
//             value={post.title}
//             onChange={(e) => setPost({ ...post, title: e.target.value })}
//           />
//         </div>
//         <div>
//           <label>Content:</label>
//           <SlateEditor
//             content={content} // Bind the Slate editor to the content state
//             onChange={setContent} // Capture the updated content
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="image">Upload Image:</label>
//           <input
//             type="file"
//             id="image"
//             accept="image/*"
//             onChange={(e) => {
//               if (e.target.files) {
//                 setImage(e.target.files[0]); // Set the selected file
//               }
//             }}
//           />
//         </div>
//         {post.image && (
//           <div>
//             <h4>Current Image:</h4>
//             <img src={post.image} alt="Current" style={{ width: '100%', height: 'auto' }} />
//           </div>
//         )}
//         <button type="submit">Edit</button>
//       </form>
//     </>
//   );
// };

// export default UpdateBlogPage;














// "use client";
// import React, { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';
// import Head from 'next/head';
// import "../[blog_id]/updateBlog.css";
// import SlateEditor from '../../components/Editor';
// import { toast, Toaster } from 'react-hot-toast';
// import Layout from './layout'; // Adjust the import path if necessary

// interface Post {
//   blog_id: string;
//   user_id: string;
//   title: string;
//   slug: string;
//   content: string;
//   image: string;
// }

// const UpdateBlogPage: React.FC<{ params: { blog_id: string } }> = ({ params }) => {
//   const router = useRouter();
//   const { blog_id } = params;
//   const [post, setPost] = useState<Post | null>(null);
//   const [error, setError] = useState<string | null>(null);
//   const [content, setContent] = useState<string>(''); // HTML content
//   const [image, setImage] = useState<File | null>(null); // New image file

//   const fetchPostById = async (blog_id: string) => {
//     const apiUrl = process.env.NEXT_PUBLIC_API_URL;
//     if (!apiUrl) throw new Error('API URL is not defined');
//     const response = await fetch(`${apiUrl}/blog/viewblog/${blog_id}`);
//     if (!response.ok) {
//       const errorText = await response.text();
//       console.error('Error fetching post:', errorText); // Log the error response
//       throw new Error('Failed to fetch post');
//     }
//     return response.json();
//   };

//   useEffect(() => {
//     const getPost = async () => {
//       try {
//         const fetchedPost = await fetchPostById(blog_id);
//         if (!fetchedPost) {
//           throw new Error('Post not found');
//         }
//         setPost(fetchedPost);
//         setContent(fetchedPost.content); // Set existing content
//         setImage(null); // Reset image state on fetch
//       } catch (err) {
//         console.error('Error fetching post:', err); // Log error
//         setError(err instanceof Error ? err.message : 'An error occurred');
//       }
//     };

//     getPost();
//   }, [blog_id]);

//   if (error) {
//     return (
//       <Layout>
//         <Head>
//           <title>Error</title>
//         </Head>
//         <div className="error">Error: {error}</div>
//       </Layout>
//     );
//   }

//   if (!post) {
//     return (
//       <Layout>
//         <Head>
//           <title>Post Not Found</title>
//         </Head>
//         <div className="error">Post not found.</div>
//         <div>Blog ID: {blog_id}</div> {/* Display blog_id for debugging */}
//       </Layout>
//     );
//   }

//   const handleSubmit = async (event: React.FormEvent) => {
//     event.preventDefault();

//     const formData = new FormData();
//     formData.append('blog_id', blog_id);
//     formData.append('title', post.title);
//     formData.append('content', content || post.content);

//     // Only append image if a new one is selected
//     if (image) {
//       formData.append('image', image);
//     }

//     const apiUrl = process.env.NEXT_PUBLIC_API_URL;
//     if (apiUrl) {
//       const response = await fetch(`${apiUrl}/blog/edit`, {
//         method: 'PUT',
//         body: formData,
//       });

//       if (!response.ok) {
//         const errorText = await response.text();
//         console.error('Update failed:', errorText); // Log the error response
//         toast.error("Update failed. Please try again."); // Show error toast
//       } else {
//         console.log('Update successful');
//         toast.success("Update Successful!"); // Show success toast

//         // Delay redirect to allow toast message to show
//         setTimeout(() => {
//           router.push(`/viewBlogs`);
//         }, 1500); // Redirect after 1.5 seconds
//       }
//     }
//   };

//   return (
//     <Layout>
//       <Toaster />
//       <Head>
//         <title>Update Post: {post.title}</title>
//       </Head>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Title:</label>
//           <input
//             type="text"
//             value={post.title}
//             onChange={(e) => setPost({ ...post, title: e.target.value })}
//           />
//         </div>
//         <div>
//           <label>Content:</label>
//           <SlateEditor
//             content={content} // Bind the Slate editor to the content state
//             onChange={setContent} // Capture the updated content
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="image">Upload Image:</label>
//           <input
//             type="file"
//             id="image"
//             accept="image/*"
//             onChange={(e) => {
//               if (e.target.files) {
//                 setImage(e.target.files[0]); // Set the selected file
//               }
//             }}
//           />
//         </div>
//         {post.image && (
//           <div>
//             <h4>Current Image:</h4>
//             <img src={post.image} alt="Current" style={{ width: '100%', height: 'auto' }} />
//           </div>
//         )}
//         <button type="submit">Edit</button>
//       </form>
//     </Layout>
//   );
// };

// export default UpdateBlogPage;




"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Head from 'next/head';
import "../[blog_id]/updateBlog.css";
import SlateEditor from '../../components/Editor';
import { toast, Toaster } from 'react-hot-toast';
import Layout from './layout';

interface Post {
  blog_id: string;
  user_id: string;
  title: string;
  slug: string;
  content: string;
  image: string;
}

const UpdateBlogPage: React.FC<{ params: { blog_id: string } }> = ({ params }) => {
  const router = useRouter();
  const { blog_id } = params;
  const [post, setPost] = useState<Post | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [content, setContent] = useState<string>(''); // HTML content
  const [image, setImage] = useState<File | null>(null); // New image file

  const fetchPostById = async (blog_id: string) => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    if (!apiUrl) throw new Error('API URL is not defined');
    const response = await fetch(`${apiUrl}/blog/viewblog/${blog_id}`);
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Error fetching post:', errorText);
      throw new Error('Failed to fetch post');
    }
    return response.json();
  };

  useEffect(() => {
    const getPost = async () => {
      try {
        const fetchedPost = await fetchPostById(blog_id);
        if (!fetchedPost) {
          throw new Error('Post not found');
        }
        setPost(fetchedPost);
        setContent(fetchedPost.content);
        setImage(null); // Reset image state on fetch
      } catch (err) {
        console.error('Error fetching post:', err);
        setError(err instanceof Error ? err.message : 'An error occurred');
      }
    };

    getPost();
  }, [blog_id]);

  if (error) {
    return (
      <Layout>
        <div className="error">Error: {error}</div>
      </Layout>
    );
  }

  if (!post) {
    return (
      <Layout>
        <div className="error">Post not found.</div>
        <div>Blog ID: {blog_id}</div>
      </Layout>
    );
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('blog_id', blog_id);
    formData.append('title', post.title);
    formData.append('content', content || post.content);

    if (image) {
      formData.append('image', image);
    }

    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    if (apiUrl) {
      const response = await fetch(`${apiUrl}/blog/edit`, {
        method: 'PUT',
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Update failed:', errorText);
        toast.error("Update failed. Please try again.");
      } else {
        console.log('Update successful');
        toast.success("Update Successful!");

        setTimeout(() => {
          router.push(`/viewBlogs`);
        }, 1500);
      }
    }
  };

  return (
    <Layout>
      <Toaster />
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={post.title}
            onChange={(e) => setPost({ ...post, title: e.target.value })}
          />
        </div>
        <div>
          <label>Content:</label>
          <SlateEditor
            content={content}
            onChange={setContent}
          />
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
          <div>
            <h4>Current Image:</h4>
            <img src={post.image} alt="Current" style={{ width: '100%', height: 'auto' }} />
          </div>
        )}
        <button type="submit">Edit</button>
      </form>
    </Layout>
  );
};

export default UpdateBlogPage;
