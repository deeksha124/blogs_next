"use client";

import React, { useState, useEffect } from "react";

interface Reply {
  id: string;
  username: string;
  comment: string;
  createdAt: string;
}

interface ReplyProps {
  commentId: string;
  blogId: string;
  token: string | null;
  addReplyToComment: (commentId: string, newReply: Reply) => void;
}

const ReplyComponent: React.FC<ReplyProps> = ({
  commentId,
  blogId,
  token,
  addReplyToComment,
}) => {
  const [replyText, setReplyText] = useState("");

  useEffect(() => {
    console.log("ReplyComponent initialized with commentId:", commentId);
  }, [commentId]);

  const handleAddReply = async () => {
    console.log("Attempting to reply to commentId:", commentId);

    if (!commentId) {
      console.error("Invalid comment ID.");
      alert("Invalid comment ID. Please try again.");
      return;
    }

    if (!token) {
      console.warn("User is not authenticated.");
      alert("You must be logged in to reply.");
      return;
    }

    const trimmedReplyText = replyText.trim();
    if (!trimmedReplyText) {
      console.warn("Reply text is empty.");
      alert("Reply cannot be empty.");
      return;
    }

    try {
      const payload = {
        comment: trimmedReplyText,
        blog_id: blogId,
        parent_id: commentId,
      };

      console.log("Sending payload:", payload);

      const response = await fetch("http://localhost:5000/v1/blog/addReply", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Failed to add reply. Status: ${response.status}`);
      }

      const newReply: Reply = await response.json();
      console.log("New reply received from API:", newReply);

      // Add the new reply to the parent comment
      addReplyToComment(commentId, newReply);

      // Clear the reply input
      setReplyText("");
    } catch (error) {
      console.error("Error adding reply:", error);
      alert("Failed to add reply. Please try again.");
    }
  };

  return (
    <div style={{ marginTop: "10px" }}>
      <textarea
        placeholder="Write a reply..."
        value={replyText}
        onChange={(e) => setReplyText(e.target.value)}
        style={{
          width: "100%",
          padding: "8px",
          borderRadius: "5px",
          border: "1px solid #ddd",
        }}
      ></textarea>
      <button
        onClick={handleAddReply}
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
        Add Reply
      </button>
    </div>
  );
};

export default ReplyComponent;
