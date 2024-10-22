

// -----------------------------------------------------------------------------------------------------------------
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

//   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     const blogPost = { title, content };

//     setLoading(true);
//     setErrorMessage(''); // Reset error message

//     try {
//       console.log("==================>>>>>",`${process.env.BACKEND_PORT}+/blog/addblog`)
//       const response = await fetch(`${process.env.API_URL}+/blog/addblog`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(blogPost),
//       });

//       if (!response.ok) {
//         throw new Error('Network response was not ok');
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

//   // const handlePreview = () => setIsPreview(true);
//   const handleEdit = () => setIsPreview(false);

//   return (
//     <div className="form-container">
//       <h1>Create a New Blog Post</h1>
//       <form onSubmit={handleSubmit}>
//         <div className="form-group">
//           <label htmlFor="title">Post Title:</label>
//           <input
//             type="text"
//             id="title"
//             name="title"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="content">Content:</label>
//           <SlateEditor content={content} onChange={setContent} />
//         </div>
//         {errorMessage && <div className="error-message">{errorMessage}</div>}
//         <button type="submit" disabled={loading}>{loading ? 'Submitting...' : 'Submit'}</button>
//       </form>

//       {isPreview && (
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

//   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     const blogPost = { title, content };

//     setLoading(true);
//     setErrorMessage(''); // Reset error message

//     try {
//       const apiUrl = process.env.API_URL; // Ensure you're using NEXT_PUBLIC_
//       console.log("apiUrl------" , apiUrl)
//       if (!apiUrl) throw new Error('API URL is not defined');

//       const response = await fetch(`${apiUrl}/blog/addblog`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(blogPost),
//       });

//       if (!response.ok) {
//         throw new Error('Network response was not ok');
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

//   const handlePreview = () => setIsPreview(true);
//   const handleEdit = () => setIsPreview(false);

//   return (
//     <div className="form-container">
//       <h1>Create a New Blog Post</h1>
//       <form onSubmit={handleSubmit}>
//         <div className="form-group">
//           <label htmlFor="title">Post Title:</label>
//           <input
//             type="text"
//             id="title"
//             name="title"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="content">Content:</label>
//           <SlateEditor content={content} onChange={setContent} />
//         </div>
//         {errorMessage && <div className="error-message">{errorMessage}</div>}
//         <button type="submit" disabled={loading}>{loading ? 'Submitting...' : 'Submit'}</button>
//         <button type="button" onClick={handlePreview}>Preview</button>
//       </form>

//       {isPreview && (
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


"use client"; 
import React, { useState, FormEvent } from 'react';
import SlateEditor from '../components/Editor'; // Adjust the path if necessary
import "../addBlog/addBlog.css";

const CreatePost: React.FC = () => {
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>(''); // HTML content
  const [isPreview, setIsPreview] = useState<boolean>(false); // Preview state
  const [loading, setLoading] = useState<boolean>(false); // Loading state
  const [errorMessage, setErrorMessage] = useState<string>(''); // Error message state

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const blogPost = { title, content };

    setLoading(true);
    setErrorMessage(''); // Reset error message

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL; // Ensure you're using NEXT_PUBLIC_
      console.log("apiUrl------", apiUrl);
      if (!apiUrl) throw new Error('API URL is not defined');

      const response = await fetch(`${apiUrl}/blog/addblog`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(blogPost),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setTitle('');
      setContent('');
      setIsPreview(false);
      window.alert(`Post created: ${data.message}`);
      
    } catch (error) {
      setErrorMessage(`Error: ${(error as Error).message}`);
    } finally {
      setLoading(false);
    }
  };

  const handlePreview = () => setIsPreview(true);
  const handleEdit = () => setIsPreview(false);

  return (
    <div className="form-container">
      <h1>Create a New Blog Post</h1>
      <form onSubmit={handleSubmit}>
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
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        <button type="submit" disabled={loading}>{loading ? 'Submitting...' : 'Submit'}</button>
        <button type="button" onClick={handlePreview}>Preview</button>
      </form>

      {isPreview && (
        <>
          <h2>Output:</h2>
          <div style={{ border: '1px solid #ccc', padding: '10px', minHeight: '150px' }}>
            <div dangerouslySetInnerHTML={{ __html: content }} />
          </div>
          <button type="button" onClick={handleEdit}>Edit</button>
        </>
      )}
    </div>
  );
};

export default CreatePost;
