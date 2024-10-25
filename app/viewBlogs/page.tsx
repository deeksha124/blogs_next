// "use client"; // This marks the component as a Client Component

// import React, { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation'; // Use next/navigation
// import './view.css'; // Ensure to import your CSS file

// interface Post {
//   blog_id: string;
//   title: string;
// }

// const ViewBlogsPage: React.FC = () => {
//   const [posts, setPosts] = useState<Post[]>([]);
//   const [error, setError] = useState<string | null>(null);
//   const [loading, setLoading] = useState<boolean>(true);
//   const apiUrl = process.env.NEXT_PUBLIC_API_URL;
//   const router = useRouter(); // Initialize the router

//   const fetchPosts = async (): Promise<Post[]> => {
//     if (!apiUrl) throw new Error('API URL is not defined');

//     const response = await fetch(`${apiUrl}/blog/viewblogslist`);

//     if (!response.ok) {
//       throw new Error('Failed to fetch posts');
//     }

//     const data = await response.json();
//     return data; // Adjust this if your API wraps the array in another object
//   };

//   const deletePost = async (blog_id: string) => {

//     if (!window.confirm('Are you sure you want to delete this post?')) {
//       return; // Exit if the user cancels
//     }
//     if (!apiUrl) throw new Error('API URL is not defined');

    

//     const response = await fetch(`${apiUrl}/blog/delete/${blog_id}`, {
//       method: 'DELETE',
//     });

//     if (!response.ok) {
//       throw new Error('Failed to delete post');
//     }

//     // Refresh the post list after deletion
//     const updatedPosts = posts.filter(post => post.blog_id !== blog_id);
//     setPosts(updatedPosts);
//   };

//   useEffect(() => {
//     const loadPosts = async () => {
//       try {
//         const fetchedPosts = await fetchPosts();
//         setPosts(fetchedPosts);
//       } catch (error) {
//         console.error('Error fetching posts:', error);
//         setError('Failed to load posts');
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadPosts();
//   }, []); // Runs once when the component mounts

//   const handlePreview = (blog_id: string) => {
//     // Use router to navigate to the preview page
//     router.push(`/viewBlogs/${blog_id}`);
//   };

//   const handleUpdate = (blog_id: string) => {
//     // Use router to navigate to the update page
//     router.push(`/updateBlog/${blog_id}`);
//   };

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div className="error-message">{error}</div>;
//   }

//   return (
//     <div className="blog-posts">
//       <h1>Blog Posts</h1>
//       <ol>
//         {posts.map((post, index) => (
//           <li key={post.blog_id}>
//             <span>{index + 1}. </span>
//             <span>{post.title}</span>
//             <div className='actionButtons'>
//               <button type='button' onClick={() => handlePreview(post.blog_id)}>
//                 Preview
//               </button>
//               <button type='button' onClick={() => handleUpdate(post.blog_id)}>
//                 Update
//               </button>
//               <button type='button' onClick={() => deletePost(post.blog_id)}>
//                 Delete
//               </button>
//             </div>
//           </li>
//         ))}
//       </ol>
//     </div>
//   );
// };

// export default ViewBlogsPage;
import React from 'react';
import BlogActions from './BlogActions'; // Adjust the path if needed
import './view.css';

interface Post {
  blog_id: string;
  title: string;
}

interface Props {
  posts: Post[];
  error?: string;
}

const ViewBlogsPage: React.FC<Props> = ({ posts, error }) => {
  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    
    <div className="blog-posts">
      <h1>Blog Posts</h1>
      <ol>
        {posts.map((post, index) => (
          <li key={post.blog_id}>
            <span>{index + 1}. </span>
            <span>{post.title}</span>
            <BlogActions post={post} />
          </li>
        ))}
      </ol>
    </div>
  );
};

// Fetch data in the server component
async function fetchPosts() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!apiUrl) {
    return { posts: [], error: 'API URL is not defined' };
  }

  try {
    const response = await fetch(`${apiUrl}/blog/viewblogslist`);
    if (!response.ok) {
      throw new Error('Failed to fetch posts');
    }
    const data = await response.json();

    return { posts: data };
  } catch (error) {
    console.error('Error fetching posts:', error);
    return { posts: [], error: 'Failed to load posts' };
  }
}

// Server Component
const Page = async () => {
  const { posts, error } = await fetchPosts();

  return <ViewBlogsPage posts={posts} error={error} />;
};

export default Page;
