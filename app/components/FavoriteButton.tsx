// "use client";
// import React, { useState } from "react";

// interface FavoriteButtonProps {
//   blog_id: string;
// }

// const FavoriteButton: React.FC<FavoriteButtonProps> = ({ blog_id }) => {
//   const [isFavorite, setIsFavorite] = useState(false);

//   const handleFavoriteClick = () => {
//     setIsFavorite(!isFavorite);
//     // Here, you might also want to save this favorite status to the server or local storage
//   };

//   return (
//     <button
//       onClick={handleFavoriteClick}
//       style={{ background: "none", border: "none", cursor: "pointer" }}
//     >
//       <img
//         src={isFavorite ? "/icons/full-heart.png" : "/icons/empty-heart.png"}
//         alt="favorite"
//         style={{ width: "24px", height: "24px" }}
//       />
//     </button>
//   );
// };

// export default FavoriteButton;

// ------------------------------------------------------------------------------------------------

"use client";
import React, { useState, useEffect } from "react";
import Cookies from "js-cookie"; // For accessing the login token

interface FavoriteButtonProps {
  blog_id: string;
}

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ blog_id }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  console.log("blog_id", blog_id);

  useEffect(() => {
    // Check if the user is logged in by looking for a token in cookies
    const token = Cookies.get("token");
    setIsLoggedIn(!!token); // Set isLoggedIn to true if a token exists
  }, []);

  const handleFavoriteClick = async () => {
    if (!isLoggedIn) return; // Prevent clicking if not logged in

    // Toggle the favorite state optimistically
    setIsFavorite(!isFavorite);

    try {
      const token = Cookies.get("token");
      const response = await fetch(`${apiUrl}/blog/addfavorite`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Use the token from cookies
        },
        body: JSON.stringify({ blog_id: blog_id }), // Send the blog ID in the request body
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        // If there's an error, revert the favorite state
        console.error(
          "Failed to add favorite:",
          data.message || "Unknown error"
        );
        setIsFavorite(!isFavorite);
      }
    } catch (error) {
      // Handle any network errors or API issues
      console.error("Error while adding favorite:", error);
      setIsFavorite(!isFavorite); // Revert favorite state on error
    }
  };

  return (
    <button
      onClick={handleFavoriteClick}
      style={{
        background: "none",
        border: "none",
        cursor: isLoggedIn ? "pointer" : "not-allowed",
      }}
      disabled={!isLoggedIn}
    >
      <img
        src={isFavorite ? "/icons/full-heart.png" : "/icons/empty-heart.png"}
        alt="favorite"
        style={{ width: "24px", height: "24px", opacity: isLoggedIn ? 1 : 0.5 }}
      />
    </button>
  );
};

export default FavoriteButton;
