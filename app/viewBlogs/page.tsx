
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
      <h1>Your Blogs</h1>
      <ol>
        {posts.map((post, index) => (
          <li key={post.blog_id} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
            <span style={{ flex: 1 }}>
              {index + 1}. {post.title}
            </span>
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



export async function generateMetadata({ }: Props): Promise<{ title: string; description: string }> {
   return {
      title: 'viewBlogs',
      description: 'viewBlogs',
    };
  } 


export default Page;
