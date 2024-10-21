// // import Image from "next/image";

// // export default function createBlog() {
// //   return (
// //     <h1>hello g</h1>
// //   );
// // }

// // src/app/blog/page.tsx
// "use client"; // Mark this component as a Client Component

// import React, { useState } from 'react';

// const BlogPage = () => {
//   const [title, setTitle] = useState('');
//   const [content, setContent] = useState('');

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     // Handle form submission logic here
//     console.log('Title:', title);
//     console.log('Content:', content);
    
//     // Reset the form
//     setTitle('');
//     setContent('');
//   };

//   return (
//     <div className='bg-green-200 h-full w-full'>
//       <h1>Create a New Blog Post</h1>
//       <form onSubmit={handleSubmit}>
//         <div className='bg-red-200'>
//           <label htmlFor="title">Title:</label>
//           <input
//             type="text"
//             id="title"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             required
//           />
//         </div>
//         <div>
//           <label htmlFor="content">Content:</label>
//           <textarea
//             id="content"
//             value={content}
//             onChange={(e) => setContent(e.target.value)}
//             required
//           />
//         </div>
//         <button type="submit">Submit</button>
//       </form>
//     </div>
//   );
// };

// export default BlogPage;
