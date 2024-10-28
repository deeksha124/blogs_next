// "use client"; // This marks the component as a Client Component

// import React from 'react';
// import { useRouter } from 'next/navigation';

// interface Post {
//   blog_id: string;
//   title: string;
// }

// interface BlogActionsProps {
//   post: Post;
// }

// const BlogActions: React.FC<BlogActionsProps> = ({ post }) => {
//   const router = useRouter();

//   const deletePost = async () => {
//     if (!window.confirm('Are you sure you want to delete this post?')) {
//       return; // Exit if the user cancels
//     }

//     const apiUrl = process.env.NEXT_PUBLIC_API_URL;

//     if (!apiUrl) throw new Error('API URL is not defined');

//     const response = await fetch(`${apiUrl}/blog/delete/${post.blog_id}`, {
//       method: 'DELETE',
//     });

//     if (!response.ok) {
//       throw new Error('Failed to delete post');
//     }

//     // Refresh the page to reflect the deletion
//     router.refresh(); // This will refresh the current page to show updated posts
//   };

//   const handlePreview = () => {
//     router.push(`/viewBlogs/${post.blog_id}`);
//   };

//   const handleUpdate = () => {
//     router.push(`/updateBlog/${post.blog_id}`);
//   };

//   return (
//     <div className='actionButtons'>
//       <button type='button' onClick={handlePreview}>
//         Preview
//       </button>
//       <button type='button' onClick={handleUpdate}>
//         Update
//       </button>
//       <button type='button' onClick={deletePost}>
//         Delete
//       </button>
//     </div>
//   );
// };
"use client"; // This marks the component as a Client Component

import React from 'react';
import { useRouter } from 'next/navigation';

interface Post {
  blog_id: string;
  title: string;
}

interface BlogActionsProps {
  post: Post;
}

const BlogActions: React.FC<BlogActionsProps> = ({ post }) => {
  const router = useRouter();

  const deletePost = async () => {
    if (!window.confirm('Are you sure you want to delete this post?')) {
      return; // Exit if the user cancels
    }

    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    if (!apiUrl) throw new Error('API URL is not defined');

    const response = await fetch(`${apiUrl}/blog/delete/${post.blog_id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to delete post');
    }

    // Refresh the page to reflect the deletion
    router.refresh(); // This will refresh the current page to show updated posts
  };

  const handlePreview = () => {
    router.push(`/viewBlogs/${post.blog_id}`);
  };

  const handleUpdate = () => {
    router.push(`/updateBlog/${post.blog_id}`);
  };

  return (
    <div className='actionButtons' style={{ display: 'flex', alignItems: 'center' }}>
      <img 
        src="/icons/search.png" // Path to your preview icon
        alt="Preview"
        onClick={handlePreview}
        style={{ cursor: 'pointer', marginRight: '10px', width: '24px', height: '24px' }} // Adjust size as needed
      />
      <img 
        src="/icons/edit.png" // Path to your update icon
        alt="Update"
        onClick={handleUpdate}
        style={{ cursor: 'pointer', marginRight: '10px', width: '24px', height: '24px' }} // Adjust size as needed
      />
      <img 
        src="/icons/delete.png" // Path to your delete icon
        alt="Delete"
        onClick={deletePost}
        style={{ cursor: 'pointer', width: '24px', height: '24px' }} // Adjust size as needed
      />
    </div>
  );
};

export default BlogActions;
