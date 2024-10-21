// app/viewBlogs/page.tsx

import React from 'react';
import Link from 'next/link';
import './view.css'; // Ensure to import your CSS file

interface Post {
  blog_id: string;
  title: string;
}


const ViewBlogsPage: React.FC = async () => {
  let posts: Post[] = [];

  const fetchPosts = async (): Promise<Post[]> => {
    const response = await fetch('http://192.168.8.237:5000/v1/blog/viewblogslist');
  
    console.log("response----->>>>" , response)
    if (!response.ok) {
      throw new Error('Failed to fetch posts');
    }
    const data = await response.json();
    console.log("Data------>>" ,data)
    return data; // Adjust this if your API wraps the array in another object
  };
  

  try {
    posts = await fetchPosts();
  } catch (error) {
    console.error('Error fetching posts:', error);
    // You may want to handle error state here (e.g., display an error message)
  }

  return (
    <div className="blog-posts">
      <h1>Blog Posts</h1>
      <ol>
        {posts.map((post, index) => (
          <li key={post.blog_id}>
            <span>{index + 1}. </span>
            <Link href={`/viewBlogs/${post.blog_id}`}>
              <span>{post.blog_id}</span>&nbsp;&nbsp;: <span>{post.title}</span>
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default ViewBlogsPage;






