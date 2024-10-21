// "use client";

// import React, { useState, FormEvent } from 'react';
// import Editor from '../components/Editor'; // Adjust the path if necessary
// import "../addBlog/addBlog.css";

// const Page: React.FC = () => {
//   const [title, setTitle] = useState<string>('');
//   const [content, setContent] = useState<string>(''); // HTML content
//   const [image, setImage] = useState<string>('');

//   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     const blogPost = { title, content, image: image || undefined };

//     try {
//       const response = await fetch('http://192.168.8.237:5000/v1/blog/addblog', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(blogPost),
//       });

//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }

//       const data = await response.json();
//       setTitle('');
//       setContent('');
//       setImage('');

//       // Show response message as an alert
//       window.alert(`Post created: ${data.message}`);
      
//     } catch (error) {
//       window.alert(`Error: ${(error as Error).message}`);
//     }
//   };

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
//           <Editor content={content} onChange={setContent} />
//         </div>
//         <div className="form-group">
//           <label htmlFor="image">Image (optional):</label>
//           <input
//             type="text"
//             id="image"
//             name="image"
//             value={image}
//             onChange={(e) => setImage(e.target.value)}
//           />
//         </div>
//         <button type="submit">Submit</button>
//       </form>
//     </div>
//   );
// };

// export default Page;

// //////////////////////////////////////////////////////////////////////////////////////////////////////








// "use client";

// import React, { useState, FormEvent } from 'react';
// import Editor from '../components/Editor';
// import "../addBlog/addBlog.css";

// const CreatePost: React.FC = () => {
//   const [title, setTitle] = useState<string>('');
//   const [content, setContent] = useState<string>(''); // HTML content
//   const [image, setImage] = useState<string>(''); // Optional image URL
//   const [isPreview, setIsPreview] = useState<boolean>(false); // Preview state
//   const [isHtmlInput, setIsHtmlInput] = useState<boolean>(false); // Toggle for HTML input

//   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     const blogPost = { title, content, image: image || undefined };

//     try {
//       const response = await fetch('http://192.168.8.237:5000/v1/blog/addblog', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(blogPost),
//       });

//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }

//       const data = await response.json();
//       // Reset fields after successful submission
//       setTitle('');
//       setContent('');
//       setImage('');
//       setIsPreview(false); // Reset preview state
//       setIsHtmlInput(false); // Reset to rich text editor

//       // Show response message as an alert
//       window.alert(`Post created: ${data.message}`);
      
//     } catch (error) {
//       window.alert(`Error: ${(error as Error).message}`);
//     }
//   };

//   const handlePreview = () => {
//     setIsPreview(true);
//   };

//   const handleEdit = () => {
//     setIsPreview(false);
//   };

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
//           <Editor content={content} onChange={setContent} isHtmlInput={isHtmlInput} />
//         </div>
//         <div className="form-group">
//           <label htmlFor="image">Image (optional):</label>
//           <input
//             type="text"
//             id="image"
//             name="image"
//             value={image}
//             onChange={(e) => setImage(e.target.value)}
//             placeholder="Enter image URL"
//           />
//         </div>
//         <button type="submit">Submit</button>
//         <button type="button" onClick={handlePreview}>Preview</button>
//         <button type="button" onClick={() => setIsHtmlInput(!isHtmlInput)}>
//           {isHtmlInput ? 'Switch to Rich Text' : 'Switch to HTML Input'}
//         </button>
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


// -----------------------------------------------------------------------------------------------------------------
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
      const response = await fetch('http://192.168.8.237:5000/v1/blog/addblog', {
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

  // const handlePreview = () => setIsPreview(true);
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
