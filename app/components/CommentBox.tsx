import { formatDate } from "@/utils/helpers";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

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

const CommentBox = ({
  comment,
  isAuthenticated,
  initialComments,
  blogId,
  token,
}: any) => {
  const router = useRouter();
  const [replyText, setReplyText] = useState<Record<string, string>>({});

  console.log("token", token);

  // Handle adding a reply to a comment
  const handleAddReply = async (commentId: string) => {
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }

    const trimmedReplyText = replyText[commentId]?.trim();
    if (trimmedReplyText) {
      try {
        const payload = {
          comment: trimmedReplyText,
          blog_id: blogId,
          parent_id: commentId,
        };

        const response = await fetch("http://localhost:5000/v1/blog/addReply", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          throw new Error("Failed to add reply.");
        }

        const newReply: Reply = await response.json();
        comment.replies.push(newReply); // Update the replies array directly
        setReplyText((prev) => ({ ...prev, [commentId]: "" }));
      } catch (error) {
        console.error("Error adding reply:", error);
        alert("Failed to add reply. Please try again.");
      }
    }
  };

  return (
    <li key={comment.comment_id}>
      <p style={{ color: "blue", fontWeight: "bold" }}>{comment.username}</p>
      <p>{comment.comment}</p>
      <small>{formatDate(comment.createdAt)}</small>

      {/* Render replies */}
      {comment.replies && comment.replies.length > 0 ? (
        <ul>
          {comment.replies.map((reply: Reply) => (
            <li key={reply.comment_id}>
              <p style={{ color: "green", fontWeight: "bold" }}>
                {reply.username}
              </p>
              <p>{reply.comment}</p>
              <small>{formatDate(reply.createdAt)}</small>
            </li>
          ))}
        </ul>
      ) : (
        <p>No replies yet.</p>
      )}

      {/* Reply input */}
      {isAuthenticated ? (
        <>
          <textarea
            placeholder="Write a reply..."
            value={replyText[comment.comment_id] || ""}
            onChange={(e) =>
              setReplyText((prev) => ({
                ...prev,
                [comment.comment_id]: e.target.value,
              }))
            }
            style={{
              width: "100%",
              marginTop: "10px",
              padding: "8px",
              borderRadius: "5px",
              border: "1px solid #ddd",
            }}
          ></textarea>

          <button
            onClick={() => handleAddReply(comment.comment_id)}
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
            Reply
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
          Log in to reply
        </button>
      )}
    </li>
  );
};

export default CommentBox;
