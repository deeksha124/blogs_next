"use client";

import React, { useState } from "react";
import Cookies from "js-cookie"; // Import js-cookie for client-side cookie handling

interface LikeButtonProps {
  blog_id: string;
  initialLikes: number;
}

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const LikeButton: React.FC<LikeButtonProps> = ({ blog_id, initialLikes }) => {
  const [likes, setLikes] = useState(initialLikes);
  const [isLoading, setIsLoading] = useState(false);

  const handleLike = async () => {
    if (isLoading) return; // Prevent multiple clicks while loading

    setIsLoading(true);
    try {
      const storedToken = Cookies.get("token"); // Retrieve the token from cookies

      // Make an API call to increment likes, sending both blog_id and the updated like count
      const response = await fetch(`${apiUrl}/blog/addlike`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${storedToken}`, // Add the token to the Authorization header
        },
        body: JSON.stringify({ blog_id }), // Send updated like count
      });

      const data = await response.json();

      if (response.ok && data.success) {
        // Update the state if the response is successful
        setLikes(data.currentLikeCount);
      } else {
        // If there's an error from the server, log it
        console.error("Failed to add like:", data.message || "Unknown error");
      }
    } catch (error) {
      // Handle errors while making the API call
      console.error("Error while liking:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button onClick={handleLike} disabled={isLoading} className="like-button">
      <img
        src="/icons/thumbs-up.png"
        alt="thumb-up"
        style={{ width: "24px", marginRight: "8px" }}
      />
      {isLoading ? "Liking..." : `${likes} Like${likes !== 1 ? "s" : ""}`}
    </button>
  );
};

export default LikeButton;

// "use client";

// import React, { useState } from "react";
// import Cookies from "js-cookie"; // Import js-cookie for client-side cookie handling

// interface LikeButtonProps {
//   blog_id: string;
//   initialLikes: number;
// }

// const apiUrl = process.env.NEXT_PUBLIC_API_URL;

// const LikeButton: React.FC<LikeButtonProps> = ({ blog_id, initialLikes }) => {
//   const [likes, setLikes] = useState(initialLikes);
//   const [isLoading, setIsLoading] = useState(false);

//   const handleLike = async () => {
//     if (isLoading) return; // Prevent multiple clicks while loading

//     // Optimistically update the like count immediately
//     const updatedLikes = likes + 1;
//     setLikes(updatedLikes); // Show incremented likes right away
//     setIsLoading(true);

//     try {
//       const storedToken = Cookies.get("token"); // Retrieve the token from cookies

//       const response = await fetch(`${apiUrl}/blog/addlike`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${storedToken}`, // Add the token to the Authorization header
//         },
//         body: JSON.stringify({ blog_id }),
//       });

//       const data = await response.json();

//       if (response.ok && data.success) {
//         // Confirm success from server, no need to change UI as optimistic update already applied
//         console.log("Like added successfully.");
//       } else {
//         // If there's an error, revert the like count
//         console.error("Failed to add like:", data.message || "Unknown error");
//         setLikes(likes); // Revert the optimistic like update on error
//       }
//     } catch (error) {
//       // Handle errors while making the API call
//       console.error("Error while liking:", error);
//       setLikes(likes); // Revert the optimistic like update on error
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <button onClick={handleLike} disabled={isLoading} className="like-button">
//       <img
//         src="/icons/thumbs-up.png"
//         alt="thumb-up"
//         style={{ width: "24px", marginRight: "8px" }}
//       />
//       {isLoading ? "Liking..." : `${likes} Like${likes !== 1 ? "s" : ""}`}
//     </button>
//   );
// };

// export default LikeButton;
