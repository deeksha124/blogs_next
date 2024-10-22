"use client"; // This marks the component as a Client Component

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import './view.css'; // Ensure to import your CSS file

interface Post {
  blog_id: string;
  title: string;
}

const ViewBlogsPage: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const fetchPosts = async (): Promise<Post[]> => {
    if (!apiUrl) throw new Error('API URL is not defined');
    
    const response = await fetch(`${apiUrl}/blog/viewblogslist`); // Use the API URL

    console.log("response--" ,response)

    if (!response.ok) {
      throw new Error('Failed to fetch posts');
    }
    
    const data = await response.json();
    return data; // Adjust this if your API wraps the array in another object
  };

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const fetchedPosts = await fetchPosts();
        setPosts(fetchedPosts);
      } catch (error) {
        console.error('Error fetching posts:', error);
        setError('Failed to load posts');
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, []); // Empty dependency array means this runs once when the component mounts

  if (loading) {
    return <div>Loading...</div>;
  }

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
