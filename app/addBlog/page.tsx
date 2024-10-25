

// // export default CreatePost;
// "use client"; 
// import React, { useState, FormEvent } from 'react';
// import SlateEditor from '../components/Editor'; // Adjust the path if necessary
// import "../addBlog/addBlog.css";

// const CreatePost: React.FC = () => {
//   const [title, setTitle] = useState<string>('');
//   const [content, setContent] = useState<string>(''); // HTML content
//   const [isPreview, setIsPreview] = useState<boolean>(false); // Preview state
//   const [loading, setLoading] = useState<boolean>(false); // Loading state
//   const [errorMessage, setErrorMessage] = useState<string>(''); // Error message state

//   const handleSubmit = async () => {
//     // Validate inputs
//     if (!title || !content) {
//       setErrorMessage("Title and content cannot be empty.");
//       return;
//     }

//     const blogPost = { title, content };

//     setLoading(true);
//     setErrorMessage(''); // Reset error message

//     try {
//       const apiUrl = process.env.NEXT_PUBLIC_API_URL; // Ensure you're using NEXT_PUBLIC_
//       if (!apiUrl) throw new Error('API URL is not defined');

//       const response = await fetch(`${apiUrl}/blog/addblog`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(blogPost),
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.message || 'Network response was not ok');
//       }

//       const data = await response.json();
//       setTitle('');
//       setContent('');
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
//           <button type="button" onClick={handleEdit}>Edit</button>
//         </>
//       )}
//     </div>
//   );
// };

// export default CreatePost;










// -----------------------------------------------------------------------------------------------------------------



"use client"; 
import React, { useState } from 'react';
import SlateEditor from '../components/Editor'; // Adjust the path if necessary
import "../addBlog/addBlog.css";

const CreatePost: React.FC = () => {
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>(''); // HTML content
  const [image, setImage] = useState<File | null>(null); // State for the image
  const [isPreview, setIsPreview] = useState<boolean>(false); // Preview state
  const [loading, setLoading] = useState<boolean>(false); // Loading state
  const [errorMessage, setErrorMessage] = useState<string>(''); // Error message state

  const handleSubmit = async () => {
    // Validate inputs
    if (!title || !content) {
      setErrorMessage("Title and content cannot be empty.");
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    if (image) {
      formData.append('image', image);
    }

    setLoading(true);
    setErrorMessage(''); // Reset error message

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL; // Ensure you're using NEXT_PUBLIC_
      if (!apiUrl) throw new Error('API URL is not defined');

      const response = await fetch(`${apiUrl}/blog/addblog`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Network response was not ok');
      }

      const data = await response.json();
      setTitle('');
      setContent('');
      setImage(null); // Reset image state
      setIsPreview(false);
      window.alert(`Post created: ${data.message}`);

    } catch (error) {
      setErrorMessage(`Error: ${(error as Error).message}`);
    } finally {
      setLoading(false);
    }
  };

  const handlePreview = () => {
    if (content) {
      setIsPreview(true);
      setErrorMessage(''); // Reset error message if preview is valid
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
        {loading ? 'Submitting...' : 'Submit'}
      </button>
      <button type="button" onClick={handlePreview}>Preview</button>

      {isPreview && content && (
        <>
          <h2>Output:</h2>
          <div style={{ border: '1px solid #ccc', padding: '10px', minHeight: '150px' }}>
            <div dangerouslySetInnerHTML={{ __html: content }} />
          </div>
          {image && <img src={URL.createObjectURL(image)} alt="Preview" style={{ maxWidth: '100%' }} />}
          <button type="button" onClick={handleEdit}>Edit</button>
        </>
      )}
    </div>
  );
};

export default CreatePost;

