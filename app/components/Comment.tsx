"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import CommentBox from "./CommentBox";

interface Reply {
  comment_id: string;
  username: string;
  comment: string;
  createdAt: string;
}

interface Comment {
  comment_id: string;
  username: string;
  comment: string;
  createdAt: string;
  replies: Reply[]; // Should be initialized as an empty array if no replies exist
}

interface CommentProps {
  blogId: string;
  initialComments: Comment[];
}

const CommentComponent: React.FC<CommentProps> = ({
  blogId,
  initialComments,
}) => {
  const router = useRouter();
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [commentText, setCommentText] = useState("");
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = Cookies.get("token");
    setToken(storedToken || null);
  }, []);

  const isAuthenticated = !!token;

  const handleAddComment = async () => {
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }

    const trimmedCommentText = commentText.trim();
    if (trimmedCommentText) {
      try {
        const payload = {
          comment: trimmedCommentText,
          blog_id: blogId,
        };

        const response = await fetch("http://localhost:5000/v1/blog/comment", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          throw new Error("Failed to add comment.");
        }

        const newComment: Comment = await response.json();
        setComments([...comments, newComment]);
        setCommentText("");
      } catch (error) {
        console.error("Error adding comment:", error);
        alert("Failed to add comment. Please try again.");
      }
    }
  };

  return (
    <div className="comment-section" style={{ marginTop: "10px" }}>
      <h4>Comments</h4>

      {comments.length > 0 ? (
        <ul>
          {comments.map((comment) => (
            <CommentBox
              key={comment.comment_id} // Add unique key here
              comment={comment}
              isAuthenticated={isAuthenticated}
              initialComments={comments}
              blogId={blogId}
              token={token}
            />
          ))}
        </ul>
      ) : (
        <p>No comments yet. Be the first to comment!</p>
      )}

      {isAuthenticated ? (
        <>
          <textarea
            placeholder="Add a comment..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            style={{
              width: "100%",
              marginTop: "10px",
              padding: "8px",
              borderRadius: "5px",
              border: "1px solid #ddd",
            }}
          ></textarea>

          <button
            onClick={handleAddComment}
            style={{
              marginTop: "5px",
              padding: "8px 12px",
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Add Comment
          </button>
        </>
      ) : (
        <button
          onClick={() => router.push("/login")}
          style={{
            marginTop: "10px",
            padding: "8px 12px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Log in to add a comment
        </button>
      )}
    </div>
  );
};

export default CommentComponent;
